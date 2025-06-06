import { useState, useCallback, useMemo } from "react";
import { Message, ChatMode, ImageStatus } from "../types";

export const useChatMessages = () => {
  const [enhanceMessages, setEnhanceMessages] = useState<Message[]>([]);
  const [generateMessages, setGenerateMessages] = useState<Message[]>([]);

  const messages = useMemo(
    () => ({
      enhance: enhanceMessages,
      generate: generateMessages,
    }),
    [enhanceMessages, generateMessages]
  );

  const updateMessageImageStatus = useCallback(
    (messageId: string, status: ImageStatus) => {
      const updateMessages = (prevMessages: Message[]) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, imageStatus: status } : msg
        );

      setEnhanceMessages(updateMessages);
      setGenerateMessages(updateMessages);
    },
    []
  );

  const addMessage = useCallback((mode: ChatMode, message: Message) => {
    if (mode === "enhance") {
      setEnhanceMessages((prev) => [...prev, message]);
    } else {
      setGenerateMessages((prev) => [...prev, message]);
    }
  }, []);

  return {
    messages,
    addMessage,
    updateMessageImageStatus,
  };
};
