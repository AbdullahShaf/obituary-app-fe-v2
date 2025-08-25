"use client";

import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import cancle_icon from "@/public/cancle_icon.png";
import Image from "next/image";
import shopService from "@/services/shop-service";
import DropdownWithSearch from "./DropdownWithSearch";
import toast from "react-hot-toast";

export default function ModalNew6({
  isShowModal,
  setIsShowModal,
  data,
  onChange
}) {
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const inputFileRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleRegionSelect = (item) => {
    setSelectedRegion(item);
  };

  const handleCitySelect = (item) => {
    setSelectedCity(item);
  };

  const resetForm = () => {
    setSelectedCity('');
    setSelectedRegion('');
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    try {
      const isEmpty =
        !selectedRegion?.trim() &&
        !selectedCity?.trim() &&
        !selectedFile
      if (isEmpty) {
        return;
      }

      // Prepare form data
      const formData = new FormData();
      const fields = { ...data, shops: JSON.stringify(data.shops), city: selectedCity };

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (selectedFile) {
        formData.append("picture", selectedFile);
      }

      await shopService.createShop(formData);
      toast.success("Trgovine so ustvarjene, podjetje je poslano za odobritev");
      setIsShowModal(false);
      onChange(null);
      resetForm();
    } catch (error) {
      toast.error("Napaka pri shranjevanju podatkov");
    }
  }

  return (
    <Modal
      isOpen={isShowModal}
      onOpenChange={(open) => {
        setIsShowModal(open);
        resetForm();
      }}
      scrollBehavior={scrollBehavior}
      classNames={{ backdrop: "bg-[#344054B2] bg-opacity-70" }}
    >
      <ModalContent className="flex items-center justify-center w-full mt-32">
        <div className="flex flex-col w-full items-center justify-center desktop:w-[600px]">
          <div className="flex flex-col bg-[#E8F0F6]  rounded-2xl ">
            <div
              onClick={() => {
                setIsShowModal(false);
                resetForm();
              }}
              className="self-end "
            >
              <Image
                src={cancle_icon}
                alt="imgCall"
                className="w-[46px] h-[46px] mobile:w-[33px] mobile:h-[33px] cursor-pointer relative top-4 right-4"
              />
            </div>

            <div className="flex w-[600px] mobile:w-[344px] z-50 mobile:px-[2px] px-7 mobile:pb-[80px] pb-[100px] mobile:mt-11 mt-12 items-center justify-center">
              <div className="mobile:w-[314px] w-[511px] bg-[#E0E9F3] rounded-2xl border-[#6D778E] border pt-12 mobile:px-6 px-8 pb-12 flex flex-col">
                <h1 className="text-[#1E2125] text-2xl mobile:text-xl font-medium mb-4">
                  Vpis v seznam cvetličarn
                </h1>

                <p className="text-[#3C3E41] mobile:hidden text-[14px] mb-2">
                  Ti podatki bodo prikazovani na seznamu lokalnih cvetličarn.
                </p>

                {/* Drag & Drop Image Upload */}
                <label className="flex text-[#3C3E41] flex-col mb-4 mt-4">
                  LOGOTIP
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={inputFileRef}
                    onChange={handleFileChange}
                  />
                  <div
                    className="mt-2 px-4 py-6 w-full mobile:w-auto rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white flex flex-col items-center justify-center cursor-pointer  border-[#ACAAAA]"
                    onClick={(e) => {
                      // Prevent any automatic trigger or bubbling
                      e.preventDefault();
                      inputFileRef.current?.click();
                    }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    {!selectedFile ? (
                      <>
                        <p className="w-[214px] flex justify-center items-center mobile:w-[150px] mobile:h-8 h-[40px] rounded-[4px] bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] text-white leading-6 text-md">
                          Dodaj logo
                        </p>
                        <span className="text-sm text-[#939393] mt-1">
                          Format: jpg, png, webp
                        </span>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="preview"
                          className="w-32 h-32 object-contain rounded mb-2"
                        />
                        <p className="text-[#414141] text-xs truncate w-full text-center">
                          Izbrana datoteka: {selectedFile.name}
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                <label className="flex flex-row text-[#3C3E41] items-center mb-4 mt-4 gap-2">
                  OBČINA
                  <span className="text-[#6D778E]">(kjer bo objavljano)</span>
                </label>
                {/* Your existing dropdown and button */}
                <div className="text-[#6D778E] text-[16px] leading-[20px] font-[400] w-full h-[40px] flex flex-col justify-start items-start mb-4">
                  <div className="relative px-[10px] mobile:pl-4 pl-6 h-[40px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full flex items-center">
                    <DropdownWithSearch
                      onSelectRegion={handleRegionSelect}
                      onSelectCity={handleCitySelect}
                      selectedRegion={selectedRegion}
                      selectedCity={selectedCity}
                      defaultStyles={{
                        backgroundColor: "transparent",
                        border: "transparent"
                      }}
                    />
                    {/* Down arrow */}
                    <svg
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="black"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </div>
                </div>

                <button
                  style={{
                    boxShadow: "5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF",
                  }}
                  className="mt-10 mb-2 bg-[#09C1A3] w-full h-[50px] rounded-[10px] text-white flex items-center justify-center gap-x-[5px]"
                  onClick={handleSubmit}
                >
                  Objavi cvetličarno
                </button>

                <p className="text-[#6D778E] text-[14px] text-center leading-6">
                  Vnos bomo pregledali in ga še danes objavili
                </p>
              </div>
            </div>
          </div>

          <div className="flex h-[20px]"></div>
        </div>
      </ModalContent>
    </Modal>
  );
}
