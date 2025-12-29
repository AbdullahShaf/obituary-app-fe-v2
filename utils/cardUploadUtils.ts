import React from "react";
import { toast } from "react-hot-toast";

import { getCardsImageAndPdfsFiles } from "./downloadCards";

export const getValidRefs = (cardRefs: React.MutableRefObject<any[]>) => {
  return cardRefs.current.filter(ref => {
    if (ref === null || ref === undefined) return false;
    if (ref && typeof ref === 'object' && 'current' in ref) {
      return ref.current !== null && ref.current !== undefined;
    }
    return true;
  });
};

export const waitForRefsReady = async (cardRefs: React.MutableRefObject<any[]>) => {
  let attempts = 0;
  const maxAttempts = 50;
  let allRefsReady = false;

  while (attempts < maxAttempts && !allRefsReady) {
    if (cardRefs.current && Array.isArray(cardRefs.current) && cardRefs.current.length >= 5) {
      const validRefs = getValidRefs(cardRefs);
      if (validRefs.length >= 5) {
        allRefsReady = true;
        break;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
    attempts++;
  }

  return allRefsReady;
};

export const validateObituaryResponse = (obituaryResponse: any, setLoading: (loading: boolean) => void) => {
  if (!obituaryResponse || !obituaryResponse.id) {
    console.error("Obituary response not available");
    toast.error("Napaka pri generiranju digitalnih kartic. Poskusite znova.");
    setLoading(false);
    return false;
  }
  return true;
};

export const validateRefsAfterWaiting = (allRefsReady: boolean, cardRefs: React.MutableRefObject<any[]>, setLoading: (loading: boolean) => void) => {
  if (!allRefsReady || !cardRefs.current || !Array.isArray(cardRefs.current) || cardRefs.current.length < 5) {
    console.error("Card refs not populated after waiting");
    toast.error("Napaka pri generiranju digitalnih kartic. Poskusite znova.");
    setLoading(false);
    return false;
  }
  return true;
};

export const validateRefsCount = (validRefs: any[], setLoading: (loading: boolean) => void) => {
  if (validRefs.length < 5) {
    console.error(`Only ${validRefs.length} card refs available, expected 5`);
    toast.error("Napaka pri generiranju digitalnih kartic. Poskusite znova.");
    setLoading(false);
    return false;
  }
  return true;
};

export const generateAndValidateCards = async (validRefs: any[], setLoading: (loading: boolean) => void) => {
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

export const uploadCardsToServer = async (formData: FormData, obituaryResponse: any, obituaryService: any, setLoading: (loading: boolean) => void) => {
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

