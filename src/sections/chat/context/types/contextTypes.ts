import React from "react";
import { ChatMode, ImageStatus, Message } from "../../types";
import { Agent } from "../../../../lib/ai/agents/Agent";

export interface ChatContextType {
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
