"use client";

import { useEffect } from "react";

export default function ClientAccordionBehavior() {
  useEffect(() => {
    // Generic accordion (multiple items)
    const genericHeaders = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".accordion .accordion_item .accordion_header"
      )
    );

    const handleGenericClick = (e: Event) => {
      const header = e.currentTarget as HTMLElement;
      const item = header?.closest(".accordion_item");
      if (!item) return;
      item.classList.toggle("active");
    };

    genericHeaders.forEach((el) => el.addEventListener("click", handleGenericClick));

    // QR code custom accordion (single item blocks in getQRcode section)
    const qrHeaders = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".getQRcode_accordian_wrapper .qr_code_accordion_item .accordion_header"
      )
    );

    const handleQrClick = (e: Event) => {
      const header = e.currentTarget as HTMLElement;
      const item = header?.closest(".qr_code_accordion_item");
      if (!item) return;
      item.classList.toggle("active");
    };

    qrHeaders.forEach((el) => el.addEventListener("click", handleQrClick));

    return () => {
      genericHeaders.forEach((el) =>
        el.removeEventListener("click", handleGenericClick)
      );
      qrHeaders.forEach((el) => el.removeEventListener("click", handleQrClick));
    };
  }, []);

  // This component only attaches behavior; it does not render anything visible.
  return null;
}
