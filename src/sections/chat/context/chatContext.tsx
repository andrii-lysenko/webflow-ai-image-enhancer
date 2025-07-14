import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { ChatMode } from "../types";
import { getModel } from "../../../lib/ai";
import { ChatContextType } from "./types/contextTypes";
import { useChatMessages } from "../hooks/useChatMessages";
import { useImageHandling } from "../hooks/useImageHandling";
import { useMessageHandler } from "../hooks/useMessageHandler";
import { ImageEnhancerAgent } from "../../../lib/ai/agents/ImageEnhancerAgent";
import { ImageGeneratorAgent } from "../../../lib/ai/agents/ImageGeneratorAgent";

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

// Create context
export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatProvider: React.FC<{
  children: ReactNode;
  token: string;
  mode: ChatMode;
}> = ({ children, token, mode }) => {
  const [input, setInput] = useState("");

  // Custom hooks
  const {
    messages: allMessages,
    addMessage,
    updateMessageImageStatus,
  } = useChatMessages();

  const messages = allMessages[mode];

  const {
    selectedImages,
    imagePreviewUrls,
    fileInputRef,
    handleImageSelect,
    removeImage,
    clearImages,
  } = useImageHandling();

  // AI agents
  const enhancer = useMemo(
    () => new ImageEnhancerAgent(getModel("gemini", token, "gemini-2.5-flash")),
    [token]
  );
  const generator = useMemo(
    () =>
      new ImageGeneratorAgent(getModel("gemini", token, "gemini-2.5-flash")),
    [token]
  );

  // Message handler
  const {
    isLoading,
    enhancedImage,
    handleSendMessage: handleSend,
  } = useMessageHandler({
    addMessage: (message) => addMessage(mode, message),
    clearImages,
    enhancer,
    generator,
  });

  // Wrap handleSendMessage to pass current state
  const handleSendMessage = () =>
    handleSend(input, selectedImages, imagePreviewUrls, mode, setInput);

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        selectedImages,
        imagePreviewUrls,
        isLoading,
        enhancedImage,
        mode,
        setInput,
        handleImageSelect,
        removeImage,
        handleSendMessage,
        updateMessageImageStatus: (id, status) =>
          updateMessageImageStatus(mode, id, status),
        fileInputRef,
        enhancer,
        generator,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
