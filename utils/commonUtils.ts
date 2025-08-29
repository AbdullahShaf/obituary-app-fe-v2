import API_BASE_URL from "@/config/apiConfig";

export const getRemoteUrl = (filePath: string) => {
  return `${API_BASE_URL}/${filePath}`;
};

export const getTemplateCardImages = (images?: string[]) => {
  if (typeof images === 'string') {
    const imageArr = JSON.parse(images);
    return imageArr.map((image: any) => getRemoteUrl(image));
  }
  // Add proper array check
  if (!images || !Array.isArray(images) || images.length === 0) {
    return undefined;
  }
  return images.map((image) => getRemoteUrl(image));

};
