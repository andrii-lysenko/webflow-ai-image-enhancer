import React from "react";
import { ChatMode, ImageStatus, Message } from "../../types";
import { Agent } from "../../../../lib/ai/agents/Agent";

export interface ChatContextType {
  messages: Message[];
  input: string;
  selectedImages: File[];
  imagePreviewUrls: string[];
  isLoading: boolean;
  enhancedImage: string | null;
  mode: ChatMode;
  setInput: (input: string) => void;
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  handleSendMessage: () => Promise<void>;
  updateMessageImageStatus: (messageId: string, status: ImageStatus) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  enhancer: Agent | null;
  generator: Agent | null;
}
