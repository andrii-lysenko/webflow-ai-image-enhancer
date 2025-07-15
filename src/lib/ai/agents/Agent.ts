import { AIImage } from "../../../types/types";

interface ImageGeneratorResponse {
  text: string;
  /**
   * Base64 encoded image data
   */
  imageData?: string;
}
export interface Agent {
  respond(query: string, images?: AIImage[]): Promise<ImageGeneratorResponse>;
}
