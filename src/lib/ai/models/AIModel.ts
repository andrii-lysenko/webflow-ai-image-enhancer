import { AIImage } from "../../../types/types";

export interface AIModel {
  generate(prompt: string): Promise<string>;
  generateWithImage(
    prompt: string,
    image?: AIImage
  ): Promise<{ text: string; imageData?: string }>;
}
