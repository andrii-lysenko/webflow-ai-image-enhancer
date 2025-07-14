import path from "path";
import { Notify } from "../../sections/chat/utils/notifications";

export const SUPPORTED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/heic",
  "image/heif",
];

export const SUPPORTED_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".heic",
  ".heif",
];

// Helper to get MIME type from URL
export function getMimeType(url: string): string {
  const extension = path.extname(url).toLowerCase();
  switch (extension) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".heic":
      return "image/heic";
    case ".heif":
      return "image/heif";
    default:
      return "image/jpeg"; // Default to JPEG
  }
}

// Helper to check if the image format is supported
export function isFormatSupported(mimeType: string): boolean {
  return SUPPORTED_MIME_TYPES.includes(mimeType);
}

// Helper to fetch and convert image to base64
export async function getImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result is a data URL: "data:image/png;base64,...."
        if (typeof reader.result === "string") {
          // If you want just the base64 part, split by comma
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        } else {
          reject("Failed to convert image to base64");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    Notify.error(`Error getting image as base64: ${error}`);
    return null;
  }
}

export async function createAssetFromImage(imageUrl: string) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const fileName = `enhanced-image-${Date.now()}.png`;
  const file = new File([blob], fileName, {
    type: "image/png",
  });

  const asset = await webflow.createAsset(file);

  const selectedImage = await webflow.getSelectedElement();
  if (!selectedImage || selectedImage.type !== "Image") {
    throw new Error("Image is not selected.");
  }

  selectedImage.setAsset(asset);
}
