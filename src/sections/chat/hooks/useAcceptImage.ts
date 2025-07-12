import { useState } from "react";
import { Notify } from "../utils/notifications";

export const useAcceptImage = () => {
  const [isCreatingAsset, setIsCreatingAsset] = useState(false);

  const createAssetFromImage = async (imageUrl: string): Promise<boolean> => {
    if (!imageUrl) return false;

    try {
      setIsCreatingAsset(true);

      // Fetch image from remote source and build a Blob object
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const fileName = `enhanced-image-${Date.now()}.png`;
      const file = new File([blob], fileName, {
        type: "image/png",
      });

      const asset = await webflow.createAsset(file);

      const selectedImage = await webflow.getSelectedElement();
      if (!selectedImage || selectedImage.type !== "Image") {
        Notify.error("Image is not selected.");
        return false;
      }

      selectedImage.setAsset(asset);

      Notify.success("Asset created successfully!");

      return true;
    } catch (error) {
      Notify.error("Error creating asset");

      return false;
    } finally {
      setIsCreatingAsset(false);
    }
  };

  return {
    isCreatingAsset,
    createAssetFromImage,
  };
};
