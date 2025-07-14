import { useState, useCallback } from "react";
import { ChatMode } from "../types";
import { createMessage } from "../utils/messages";
import { makeEnhanceRequest } from "../services/enhanceService";
import { makeGenerateRequest } from "../services/generateService";
import { Agent } from "../../../lib/ai/agents/Agent";
import { Notify } from "../utils/notifications";

interface UseMessageHandlerProps {
  addMessage: (message: any) => void;
  clearImages: () => void;
  enhancer: Agent | null;
  generator: Agent | null;
}

export const useMessageHandler = ({
  addMessage,
  clearImages,
  enhancer,
  generator,
}: UseMessageHandlerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);

  const handleSendMessage = useCallback(
    async (
      input: string,
      selectedImages: File[],
      imagePreviewUrls: string[],
      currentMode: ChatMode,
      setInput: (value: string) => void
    ) => {
      if ((!input.trim() && selectedImages.length === 0) || isLoading) return;

      clearImages();

      try {
        const userMessage = createMessage(
          "user",
          input,
          imagePreviewUrls.length > 0 ? [...imagePreviewUrls] : undefined
        );

        addMessage(userMessage);
        setInput("");
        setIsLoading(true);
        setEnhancedImage(null);

        const response =
          currentMode === "enhance"
            ? await makeEnhanceRequest(input, enhancer)
            : await makeGenerateRequest(input, selectedImages, generator);

        const data = {
          response: response.text,
          imageData: response.imageData,
        };

        if (data.imageData) {
          const enhancedImageUrl = `data:image/png;base64,${data.imageData}`;
          setEnhancedImage(enhancedImageUrl);

          Notify.success("AI response with enhanced image received!");
        }

        const aiResponse = createMessage(
          "assistant",
          data.response,
          undefined,
          data.imageData
            ? `data:image/png;base64,${data.imageData}`
            : undefined,
          data.imageData
        );

        addMessage(aiResponse);
      } catch (error) {
        Notify.error(`Error getting response from server: ${error}`);

        const errorResponse = createMessage(
          "assistant",
          "I'm sorry, I encountered an error while processing your message. Please try again."
        );

        addMessage(errorResponse);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, addMessage, clearImages, enhancer, generator]
  );

  return {
    isLoading,
    enhancedImage,
    handleSendMessage,
  };
};
