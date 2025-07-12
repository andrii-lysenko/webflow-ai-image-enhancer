import { AIImage } from "../../../types/types";
import { AIModel } from "../models/AIModel";
import { Agent } from "./Agent";

interface ImageGeneratorResponse {
  text: string;
  imageData?: string; // Base64 encoded image data
}

function getPrompt(query: string) {
  return `
You are an expert AI image generator specializing in creating high-quality, professional images for web design and digital media. Your task is to generate a new image based on the user's description and any provided reference images.

GENERATION REQUEST: "${query}"

GENERATION GUIDELINES:
- Create a visually appealing and professional image suitable for web design
- If a reference image is provided, use it as inspiration for style, composition, or color palette
- Ensure the generated image has good composition following design principles (rule of thirds, balance, etc.)
- Use appropriate lighting and shadows to create depth and visual interest
- Apply consistent color schemes that work well in digital contexts
- Create sharp, clear details with good contrast
- Avoid cluttered or overly complex compositions unless specifically requested

TECHNICAL REQUIREMENTS:
- Generate high-resolution images suitable for web use
- Ensure proper aspect ratios for common web layouts
- Use web-safe colors and appropriate contrast ratios
- Create images that scale well at different sizes
- Optimize for fast loading while maintaining quality

STYLE CONSIDERATIONS:
- If no specific style is mentioned, default to clean, modern, professional aesthetics
- Consider current design trends while maintaining timeless appeal
- Ensure the image complements typical web design layouts
- Use appropriate typography integration if text elements are requested
- Balance realism with artistic appeal based on the context

REFERENCE IMAGE USAGE (if provided):
- Extract key visual elements, color schemes, or compositional structures
- Adapt the style and mood while creating something new
- Maintain the quality and professional appearance of the reference
- Use the reference as inspiration rather than direct copying

Please generate an image that fulfills this GENERATION REQUEST

Focus on creating something that would work excellently in a professional web design context.
  `;
}

export class ImageGeneratorAgent implements Agent {
  constructor(private model: AIModel) {}

  async respond(
    query: string,
    images?: AIImage[] // array of image URLs or base64 strings
  ): Promise<ImageGeneratorResponse> {
    try {
      const image = images?.length
        ? { data: images[0].data, mimeType: images[0].mimeType }
        : undefined;

      // Use the AIModel implementation to generate image based on text and reference image
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
