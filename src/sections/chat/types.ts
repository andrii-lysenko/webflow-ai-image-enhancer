export type ChatMode = "enhance" | "generate";

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

export type MessageRole = "user" | "assistant";
export type ImageStatus = "pending" | "accepted" | "declined";
