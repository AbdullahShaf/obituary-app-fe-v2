import React from "react";
import { toast } from "react-hot-toast";

import { getCardsImageAndPdfsFiles } from "./downloadCards";

export const getValidRefs = (cardRefs: React.MutableRefObject<any[]>) => {
  return cardRefs.current.filter((ref) => {
    if (ref === null || ref === undefined) return false;
    if (ref && typeof ref === "object" && "current" in ref) {
      return ref.current !== null && ref.current !== undefined;
    }
    return true;
  });
};

export const waitForRefsReady = (
  cardRefs: React.MutableRefObject<any[]>,
  timeout: number = 10000
): Promise<boolean> => {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let isResolved = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const checkRefs = () => {
      if (isResolved) return;

      const validRefs =
        cardRefs.current && Array.isArray(cardRefs.current)
          ? getValidRefs(cardRefs)
          : [];

      if (validRefs.length >= 5) {
        isResolved = true;
        cleanup();
        resolve(true);
        return;
      }

      if (Date.now() - startTime >= timeout) {
        isResolved = true;
        cleanup();
        resolve(false);
        return;
      }

      timeoutId = setTimeout(checkRefs, 100);
    };

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    checkRefs();
  });
};

export const validateObituaryResponse = (
  obituaryResponse: any,
  setLoading: (loading: boolean) => void
) => {
  if (!obituaryResponse || !obituaryResponse.id) {
    console.error("Obituary response not available");
    toast.error("Napaka pri generiranju digitalnih kartic. Poskusite znova.");
    setLoading(false);
    return false;
  }
  return true;
};

export const validateRefsAfterWaiting = (
  allRefsReady: boolean,
  cardRefs: React.MutableRefObject<any[]>,
  setLoading: (loading: boolean) => void
) => {
  if (
    !allRefsReady ||
    !cardRefs.current ||
    !Array.isArray(cardRefs.current) ||
    cardRefs.current.length < 5
  ) {
    console.error("Card refs not populated after waiting");
    toast.error("Napaka pri generiranju digitalnih kartic. Poskusite znova.");
    setLoading(false);
    return false;
  }
  return true;
};

export const validateRefsCount = (
  validRefs: any[],
  setLoading: (loading: boolean) => void
) => {
  if (validRefs.length < 5) {
    console.error(`Only ${validRefs.length} card refs available, expected 5`);
    toast.error("Napaka pri generiranju digitalnih kartic. Poskusite znova.");
    setLoading(false);
    return false;
  }
  return true;
};

export const generateAndValidateCards = async (
  validRefs: any[],
  setLoading: (loading: boolean) => void
) => {
  const { images, pdfs } = await getCardsImageAndPdfsFiles(validRefs);

  if (!images || images.length === 0 || !pdfs || pdfs.length === 0) {
    console.error("No images or PDFs generated");
    toast.error("Napaka pri generiranju digitalnih kartic. Poskusite znova.");
    setLoading(false);
    return null;
  }

  return { images, pdfs };
};

export const createFormDataFromCards = (images: File[], pdfs: File[]) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append(`cardImages`, image);
  });
  pdfs.forEach((pdf) => {
    formData.append(`cardPdfs`, pdf);
  });
  return formData;
};

export const uploadCardsToServer = async (
  formData: FormData,
  obituaryResponse: any,
  obituaryService: any,
  setLoading: (loading: boolean) => void
) => {
  const response = await obituaryService.uploadObituaryTemplateCards(
    obituaryResponse.id,
    formData
  );

  if (response.error) {
    console.error("Upload error:", response.error);
    toast.error(response.error || "Napaka pri nalaganju digitalnih kartic.");
    setLoading(false);
    return false;
  }

  return true;
};
