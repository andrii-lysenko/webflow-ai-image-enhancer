import { getImageAsBase64 } from "../../../lib/utils/image";
import { AIImage } from "../../../types/types";
import { Agent } from "../../../lib/ai/agents/Agent";

export const makeEnhanceRequest = async (
  input: string,
  enhancer: Agent | null
) => {
  const selectedImage = await webflow.getSelectedElement();
  if (!selectedImage || selectedImage.type !== "Image") {
    throw new Error("Please select an image first.");
  }

  if (!enhancer) {
    throw new Error("Enhancer agent not found.");
  }

  const asset = await selectedImage.getAsset();
  if (!asset) {
    throw new Error("Please select an image first.");
  }

  const assetUrl = await asset.getUrl();
  const mimeType = await asset.getMimeType();
  const mainImageBase64 = await getImageAsBase64(assetUrl);

  if (!mainImageBase64) {
    throw new Error(
      "I couldn't process the selected image. Please try with a different image in a supported format."
    );
  }

  const image: AIImage = { data: mainImageBase64, mimeType };
  return await enhancer.respond(input, [image]);
};
