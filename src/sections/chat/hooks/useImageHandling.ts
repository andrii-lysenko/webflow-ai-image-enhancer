import { useState, useCallback, useEffect, useRef } from "react";

export const useImageHandling = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const files = Array.from(e.target.files);
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));

      setSelectedImages((prev) => [...prev, ...files]);
      setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    },
    []
  );

  const removeImage = useCallback(
    (index: number) => {
      URL.revokeObjectURL(imagePreviewUrls[index]);

      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [imagePreviewUrls]
  );

  const clearImages = useCallback(() => {
    imagePreviewUrls.forEach(URL.revokeObjectURL);
    setSelectedImages([]);
    setImagePreviewUrls([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [imagePreviewUrls]);

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach(URL.revokeObjectURL);
    };
  }, [imagePreviewUrls]);

  return {
    selectedImages,
    imagePreviewUrls,
    fileInputRef,
    handleImageSelect,
    removeImage,
    clearImages,
  };
};
