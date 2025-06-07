import { Agent } from "../../../lib/ai/agents/Agent";

export const makeGenerateRequest = async (
  input: string,
  selectedImages: File[],
  generator: Agent | null
) => {
  if (!generator) {
    throw new Error("Generator agent not found.");
  }

  // Convert images to base64
  const processedImages = await Promise.all(
    selectedImages.map(async (file) => {
      return new Promise<{ data: string; mimeType: string }>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          const base64Content = base64data.split(",")[1];
          resolve({
            data: base64Content,
            mimeType: file.type,
          });
        };
        reader.readAsDataURL(file);
      });
    })
  );

  return await generator.respond(input, processedImages);
};
