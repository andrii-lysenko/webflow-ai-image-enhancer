import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { ChatMode } from "../types";
import { createAIAgent } from "../../../lib/ai";
import { ChatContextType } from "./types/contextTypes";
import { useChatMessages } from "../hooks/useChatMessages";
import { useImageHandling } from "../hooks/useImageHandling";
import { useMessageHandler } from "../hooks/useMessageHandler";

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
}> = ({ children, token }) => {
  const [input, setInput] = useState("");
  const [currentMode, setCurrentMode] = useState<ChatMode>("enhance");

  // Custom hooks
  const { messages, addMessage, updateMessageImageStatus } = useChatMessages();
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
    () => createAIAgent("imageEnhancer", token, "gemini-2.0-flash"),
    [token]
  );
  const generator = useMemo(
    () => createAIAgent("imageGenerator", token, "gemini-2.0-flash"),
    [token]
  );

  // Message handler
  const {
    isLoading,
    enhancedImage,
    handleSendMessage: handleSend,
  } = useMessageHandler({
    addMessage,
    clearImages,
    enhancer,
    generator,
  });

  // Wrap handleSendMessage to pass current state
  const handleSendMessage = () =>
    handleSend(input, selectedImages, imagePreviewUrls, currentMode, setInput);

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
        setMode: setCurrentMode,
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
