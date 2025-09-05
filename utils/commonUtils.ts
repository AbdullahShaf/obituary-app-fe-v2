import API_BASE_URL from "@/config/apiConfig";

export const getRemoteUrl = (filePath: string) => {
  return filePath;
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

export const KeeperData = [
  {
    value: 1,
    label: `1. Skrbnik – tedenski`,
    text: `Skrbnik – tedenski`,
    isDisabled: true,
  },
  {
    value: 2,
    label: `2. Skrbnik – mesečni`,
    text: `Skrbnik – mesečni`,
  },
  ,
  {
    value: 3,
    label: `3. Skrbnik – letni`,
    text: `Skrbnik – letni`,
    isDisabled: true,
  },
  ,
  {
    value: 4,
    label: `4. Skrbnik – 6-letni`,
    text: `Skrbnik – 6-letni`,
    isDisabled: true,
  },
  ,
];

export const getKeeperTypeById = (id: any) => {
  if (id) {
    const keeper = KeeperData.filter((item: any) => item.value == id);
    if (keeper && keeper.length) {
      return keeper[0];
    }
  }
  return null;
}
