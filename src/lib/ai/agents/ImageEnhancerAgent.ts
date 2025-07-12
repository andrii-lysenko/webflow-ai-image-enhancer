import { AIImage } from "../../../types/types";
import { AIModel } from "../models/AIModel";
import { Agent } from "./Agent";

interface ImageGeneratorResponse {
  text: string;
  imageData?: string; // Base64 encoded image data
}

function getPrompt(query: string) {
  return `
You are an expert image enhancement AI specializing in improving visual quality and aesthetics. Your task is to enhance the provided image based on the user's specific requirements.

ENHANCEMENT REQUEST: "${query}"

ENHANCEMENT GUIDELINES:
- Maintain the original composition and subject matter unless explicitly requested to change
- Improve image quality through better lighting, contrast, and clarity
- Enhance colors to be more vibrant and balanced while keeping them natural
- Reduce noise and artifacts if present
- Sharpen details appropriately without over-processing
- Preserve important visual elements and context
- If the request is vague, apply general quality improvements (brightness, contrast, saturation, sharpness)

TECHNICAL REQUIREMENTS:
- Output a high-quality enhanced version of the input image
- Maintain appropriate resolution and aspect ratio
- Ensure the enhanced image is suitable for web use
- Apply enhancements progressively to avoid over-processing

SPECIFIC INSTRUCTIONS:
- If user mentions style changes: Apply the requested artistic modifications while preserving the core image

Please enhance the image according to these guidelines and the specific user ENHANCEMENT REQUEST
  `;
}

export class ImageEnhancerAgent implements Agent {
  constructor(private model: AIModel) {}

  async respond(
    query: string,
    images?: AIImage[] // array of base64 strings
  ): Promise<ImageGeneratorResponse> {
    try {
      if (!images || images.length === 0) {
        return {
          text: "No reference images provided.",
        };
      }

      const image = images?.length
        ? { data: images[0].data, mimeType: images[0].mimeType }
        : undefined;

      const prompt = getPrompt(query);
      const response = await this.model.generateWithImage(prompt, image);

      return response;
    } catch (error) {
      console.error("Error in ImageGeneratorAgent:", error);

      return {
        text: `There was an error generating your image. ${
          error instanceof Error ? error.message : String(error)
        }`,
      };
    }
  }
}
