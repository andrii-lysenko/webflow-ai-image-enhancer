import { MessageRole, Message } from "../types";

export function createMessage(
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

export function createUserMessage(content: string, images?: string[]): Message {
  return createMessage("user", content, images);
}

export function createAssistantMessage(
  content: string,
  enhancedImageUrl?: string,
  enhancedImageData?: string
): Message {
  return createMessage(
    "assistant",
    content,
    undefined,
    enhancedImageUrl,
    enhancedImageData
  );
}
