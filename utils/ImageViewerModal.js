import React, { useState } from 'react';

export const ImageViewerModal = ({ src, alt, label = 'View Image' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className='text-[16px] text-[#3C3E41] font-normal' onClick={openModal} >{label}</button>
      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full rounded-lg shadow-lg"
            />
            <button
              className="absolute top-[-10px] right-[-10px] bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-200"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};


export const RenderImage = ({ src, alt, label, className }) => {

  if(!src) return;
  return (
    <>
      <div className={`${className ? className : ""}`}>
        <p className='text-[16px] text-[#3C3E41] font-normal text-xs'>Trenutni {label} :</p>
        <img
          src={src}
          alt={alt}
          className="max-w-full rounded-lg shadow-lg"
          style={{maxHeight: "120px"}}
        />
      </div>
    </>
  );
};