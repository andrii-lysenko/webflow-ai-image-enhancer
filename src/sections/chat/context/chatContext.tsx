import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  useMemo,
  useRef,
  useContext,
} from "react";
import { ChatMode } from "../types";
import { useAIAgent } from "../../../lib/ai/hooks/useAIModel";
import { getImageAsBase64 } from "../../../lib/utils/image";
import { AIImage } from "../../../types/types";
import { Agent } from "../../../lib/ai/agents/Agent";

// Types
type MessageRole = "user" | "assistant";
type ImageStatus = "pending" | "accepted" | "declined";

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  images?: string[]; // URLs for the images
  enhancedImageUrl?: string; // URL for the enhanced image
  enhancedImageData?: string; // Base64 data for the enhanced image
  imageStatus?: ImageStatus; // Status of the enhanced image
};

interface ChatContextType {
  messages: {
    enhance: Message[];
    generate: Message[];
  };
  input: string;
  selectedImages: File[];
  imagePreviewUrls: string[];
  isLoading: boolean;
  enhancedImage: string | null;
  currentMode: ChatMode;
  setInput: (input: string) => void;
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  handleSendMessage: () => Promise<void>;
  setMode: (mode: ChatMode) => void;
  updateMessageImageStatus: (messageId: string, status: ImageStatus) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  enhancer: Agent | null;
  generator: Agent | null;
}

// Create context
export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

// Helper function to create a message
function createMessage(
  role: MessageRole,
  content: string,
  images?: string[],
  enhancedImageUrl?: string,
  enhancedImageData?: string
): Message {
  return {
    id: Date.now().toString() + role,
    role,
    content,
    timestamp: new Date(),
    images,
    enhancedImageUrl,
    enhancedImageData,
    imageStatus: enhancedImageUrl ? "pending" : undefined,
  };
}

// Provider component
// TODO: refactor this possibly using redux
export const ChatProvider: React.FC<{
  children: ReactNode;
  token: string;
}> = ({ children, token }) => {
  // State hooks for each piece of state
  const [enhanceMessages, setEnhanceMessages] = useState<Message[]>([]);
  const [generateMessages, setGenerateMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<ChatMode>("enhance");
  const { agent: enhancer } = useAIAgent("imageEnhancer", token, "gemini");
  const { agent: generator } = useAIAgent("imageGenerator", token, "gemini");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Combine messages into expected structure
  const messages = useMemo(
    () => ({
      enhance: enhanceMessages,
      generate: generateMessages,
    }),
    [enhanceMessages, generateMessages]
  );

  // Update a message's image status
  const updateMessageImageStatus = useCallback(
    (messageId: string, status: ImageStatus) => {
      // Update in enhance messages
      setEnhanceMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, imageStatus: status } : msg
        )
      );

      // Update in generate messages
      setGenerateMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, imageStatus: status } : msg
        )
      );
    },
    []
  );

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach(URL.revokeObjectURL);
    };
  }, [imagePreviewUrls]);

  // Set current mode
  const setMode = useCallback((mode: ChatMode) => {
    setCurrentMode(mode);
  }, []);

  // Handle image selection
  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const files = Array.from(e.target.files);
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));

      setSelectedImages((prev) => [...prev, ...files]);
      setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    },
    []
  );

  // Remove a selected image
  const removeImage = useCallback(
    (index: number) => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(imagePreviewUrls[index]);

      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));

      // Reset the file input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [imagePreviewUrls]
  );

  // Make enhance request
  const makeEnhanceRequest = useCallback(async () => {
    const selectedImage = await webflow.getSelectedElement();
    if (!selectedImage || selectedImage.type !== "Image") {
      throw new Error("Please select an image first.");
    }

    if (!enhancer) {
      throw new Error("Enhancer agent not found.");
    }

    const asset = await selectedImage.getAsset();

    if (!asset) {
      throw new Error("Please select an image first.");
    }

    const assetUrl = await asset.getUrl();
    const mimeType = await asset.getMimeType();
    const mainImageBase64 = await getImageAsBase64(assetUrl);

    if (!mainImageBase64) {
      throw new Error(
        `I couldn't process the selected image. Please try with a different image in a supported format.`
      );
    }
    const image: AIImage = { data: mainImageBase64, mimeType };

    const response = await enhancer.respond(input, [image]);

    return response;
  }, [token, input]);

  // Make generate request
  const makeGenerateRequest = useCallback(async () => {
    // Convert File objects to base64 data with MIME type
    const processedImages = await Promise.all(
      selectedImages.map(async (file) => {
        return new Promise<{ data: string; mimeType: string }>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            // Remove the data URL prefix to get just the base64 data
            const base64Content = base64data.split(",")[1];
            resolve({
              data: base64Content,
              mimeType: file.type,
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );

    const response = await generator?.respond(input, processedImages);

    return response;
  }, [token, input, selectedImages]);

  // Handle sending a message
  const handleSendMessage = useCallback(async () => {
    if ((!input.trim() && selectedImages.length === 0) || isLoading) return;

    try {
      // Create a new user message
      const userMessage = createMessage(
        "user",
        input,
        imagePreviewUrls.length > 0 ? [...imagePreviewUrls] : undefined
      );

      setImagePreviewUrls([]);

      // Add user message to chat
      if (currentMode === "enhance") {
        setEnhanceMessages((prev) => [...prev, userMessage]);
      } else {
        setGenerateMessages((prev) => [...prev, userMessage]);
      }

      setInput("");
      setIsLoading(true);
      setEnhancedImage(null);

      // Call the API route
      const response =
        currentMode === "enhance"
          ? await makeEnhanceRequest()
          : await makeGenerateRequest();

      const data = {
        response: response.text,
        imageData: response.imageData,
      };

      if (data.imageData) {
        // Create data URL for the image
        const enhancedImageUrl = `data:image/png;base64,${data.imageData}`;
        setEnhancedImage(enhancedImageUrl);

        await webflow.notify({
          type: "Success",
          message: "AI response with enhanced image received!",
        });
      }

      const aiResponse = createMessage(
        "assistant",
        data.response,
        undefined,
        data.imageData ? `data:image/png;base64,${data.imageData}` : undefined,
        data.imageData
      );

      // Add AI response to chat
      if (currentMode === "enhance") {
        setEnhanceMessages((prev) => [...prev, aiResponse]);
      } else {
        setGenerateMessages((prev) => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error("Error getting response from server:", error);

      // Add error message
      const errorResponse = createMessage(
        "assistant",
        "I'm sorry, I encountered an error while processing your message. Please try again."
      );

      // Add error message to chat
      if (currentMode === "enhance") {
        setEnhanceMessages((prev) => [...prev, errorResponse]);
      } else {
        setGenerateMessages((prev) => [...prev, errorResponse]);
      }

      await webflow.notify({
        type: "Error",
        message: "Failed to process your request. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setSelectedImages([]);
      setImagePreviewUrls([]);

      // Reset the file input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [
    input,
    imagePreviewUrls,
    selectedImages,
    isLoading,
    currentMode,
    makeEnhanceRequest,
    makeGenerateRequest,
  ]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        selectedImages,
        imagePreviewUrls,
        isLoading,
        enhancedImage,
        currentMode,
        setInput,
        handleImageSelect,
        removeImage,
        handleSendMessage,
        setMode,
        updateMessageImageStatus,
        fileInputRef,
        enhancer,
        generator,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
