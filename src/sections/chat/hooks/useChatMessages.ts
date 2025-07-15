import { useCallback, useState } from "react";
import { Message, ChatMode, ImageStatus } from "../types";

type MessagesMap = { enhance: Message[]; generate: Message[] };

export const useChatMessages = () => {
  const [messages, setMessages] = useState<MessagesMap>({
    enhance: [],
    generate: [],
  });

  const addMessage = useCallback(
    (mode: ChatMode, m: Message) =>
      setMessages((prev) => ({ ...prev, [mode]: [...prev[mode], m] })),
    []
  );

  const updateMessageImageStatus = useCallback(
    (mode: ChatMode, id: string, status: ImageStatus) =>
      setMessages((prev) => ({
        ...prev,
        [mode]: prev[mode].map((msg) =>
          msg.id === id ? { ...msg, imageStatus: status } : msg
        ),
      })),
    []
  );

  return {
    messages,
    addMessage,
    updateMessageImageStatus,
  };
};
