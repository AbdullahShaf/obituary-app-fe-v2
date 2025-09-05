"use client";
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";

const Newobituary = ({ focusRef, setFile, setName, setRelation, onSubmit }) => {
  const [inputValuePic, setInputValuePic] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [relationValue, setRelationValue] = useState("");
  const [confirmationCheck, setConfirmationCheck] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
    if (file) setFile(file);
    setInputValuePic(e.target.value);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file); 
      setFile(file); 
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleEmailInput = (event) => {
    setInputValuePic(event.target.value);
    setFile(event.target.files[0]);
  };

  const handleNameInput = (event) => {
    setNameValue(event.target.value);
    setName(event.target.value);
  };

  const handleRelationInput = (e) => {
    setRelationValue(e.target.value);
    setRelation(event.target.value);
  };

  return (
    <div
      ref={focusRef}
      className="gap-11 mobile:gap-6 pt-[50px] pb-[70px] mobile:pb-[40px] mobile:pt-[40px] relative max-w-[1920px] h-auto desktop:bg-[url('/backBgabotuiry.avif')] bg-[url('/backBgabotuiry.avif')] 
      tablet:bg-cover bg-cover w-full mx-auto  flex justify-center items-center flex-col"
    >
      <div
        className="desktop:w-[650px] pb-[60px] pt-[60px] tablet:pb-[35px] tablet:pt-[35px] tablet:w-[550px] mobile:max-w-[336px] mobile:w-full mobile:mx-2 flex flex-col justify-center
        bg-gradient-to-r from-white to-[#5d657900]  backdrop-blur rounded-2xl border-[2px] border-[#FFFFFF] shadow-lg mb-[20px] + mobile:pt-4 mobile:pb-4"
      >
        <div
          className="text-[28px] font-variation-customOpt32  mx-auto text-[#1E2125] font-semibold mobile:text-[28px] 
        mobile:font-variation-customOpt28 mobile:font-[600px]"
        >
          POZOR
        </div>
        <div className="mt-[24px] text-[16px] leading-[24px] mx-auto text-left text-[#414141] font-normal mobile:text-[14px] w-full desktop:px-[90px] tablet:px-[50px] mobile:px-[15px]">
          <p className="mb-4">
            Žalujoči je praviloma dolžan priložiti Potrdilo o smrti, ki ga izda
            mrliški oglednik in ki ga svojci morajo priložiti pogrebni službi.
          </p>
          <p className="mb-4">
            Na ta način se potrdi, da je bodoči Skrbnik spominske strani v
            najbližjem sorodstvu s preminulim.
          </p>
          <p className="mb-4">
            To je potrebno, da se preprečijo zlorabe in nepravilnosti, ker gre
            za občutljive podatke, ki bi lahko prizadejali bolečino žalujočim
            (če bi lahko kdorkoli odprl spominsko knjigo in pisal karkoli).
          </p>
        </div>

        <div className="w-[470px] mobile:w-[297px] mobile:h-auto desktop:mt-[50px] mobile:mt-[20px] mx-auto flex flex-col">
          <div className="relative w-full">
            <label className="flex text-[#3C3E41] flex-col mb-4 mt-4">
              Priloži Potrdilo o smrti
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
                    <p className="w-[214px] flex justify-center items-center mobile:w-[150px] mobile:h-8 h-[40px] rounded-[4px] bg-gradient-to-b from-[#7D88A2] to-[#5E677B] text-white leading-6 text-md">
                      {/* Izberi sliko <span className="hidden md:inline">in jo prenesi</span> */}
                      Izberi sliko {window.innerWidth > 744 && "in jo prenesi"}
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


            {/* <input
              type="file"
              onChange={handleEmailInput}
              className="w-full h-[48px] pt-[7px] bg-transparent focus:outline-none text-[16px] text-[#848484] font-normal placeholder:text-[#ACAAAA] border border-[#6D778E] rounded-[8px] px-12"
              placeholder="Poišči sliko"
              style={{
                backgroundImage: "url('/emailbox.png')",
                backgroundPosition: "20px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "20px 20px",
              }}
            /> */}
          </div>
        </div>

        {/* <div className="w-[470px] mobile:w-[297px] h-[48px] desktop:mt-[40px] tablet:mt-[40px] mobile:mt-[10px] mx-auto">
          <Link
            href={"#"}
            className="flex w-full h-full bg-white items-center justify-center text-[16px] leading-[24px] font-variation-customOpt16 text-[#FFFFFF] bg-gradient-to-b from-[#6D778E] to-[#5D6579] rounded-lg"
          >
            <Image
              src="/buttonArrow.png"
              width={24}
              height={24}
              alt="Icon"
              className="mr-2"
            />
            NALOŽI
          </Link>
        </div> */}

        <div className="w-[470px] mobile:w-[297px] h-[48px] mt-[10px] mx-auto">
          <button
            onClick={onSubmit}
            className="flex w-full h-full bg-white items-center justify-center text-[16px] leading-[24px] font-variation-customOpt16 text-[#FFFFFF] bg-gradient-to-b from-[#0D94E8] to-[#1860A3] rounded-lg"
          >
            POŠLJI
          </button>
        </div>
      </div>

      <div
        className="desktop:w-[650px] pb-[60px] pt-[50px] tablet:pb-[35px] tablet:pt-[35px] mobile:pb-[20px] mobile:pt-[20px] tablet:w-[550px] mobile:max-w-[340px] mobile:w-full mobile:mx-2 flex flex-col
        bg-[#E0E9F3] backdrop-blur rounded-2xl border-[2px] border-[#FFFFFF] shadow-lg px-[20px]"
      >
        <div
          className="text-[28px] font-variation-customOpt32  mx-auto text-[#1E2125] font-semibold mobile:text-[28px] 
        mobile:font-variation-customOpt28 mobile:font-[600px]"
        >
          Samo izjemoma
        </div>
        <div className="mt-[24px] text-[16px] leading-[24px] mx-auto text-left text-[#414141] font-normal mobile:text-[14px] w-full desktop:px-[70px] tablet:px-[20px] mobile:px-[10px]">
          <p className="mb-4">
            Cvetličarna lahko izjemoma dodeli Skrbnika tudi brez Potrdila o
            smrti, vendar samo v primeru, če svojca in pokojnega tudi osebno
            pozna (da ne pride do zlorab). V tem skrajnem primeru vpišite ime
            svojca in sorodstveno vez med njima.
          </p>
          <p className="mb-4">Pozor: morebitne napake so tukaj nedopustne!!</p>
        </div>

        <div className="w-[470px] mobile:w-[297px] mobile:h-auto mt-[20px] mx-auto flex flex-col">
          <div>
            <input
              type="text"
              value={nameValue}
              onChange={handleNameInput}
              className=" h-[48px] text-[16px] bg-transparent focus:outline-none text-[#848484]"
              placeholder="Vpiši ime in priimek svojca"
            />
            <div className="w-full h-[1px] bg-gradient-to-r from-[#D4D4D4] to-[#D4D4D4]"></div>
          </div>

          <div>
            <input
              type="text"
              value={relationValue}
              onChange={handleRelationInput}
              className="text-[16px] h-[48px] bg-transparent focus:outline-none text-[#848484]"
              placeholder="Sorodstvena vez s pokojnim (npr. sin)"
            />
            <div className="w-full h-[1px] bg-gradient-to-r from-[#D4D4D4] to-[#D4D4D4]"></div>
          </div>
        </div>

        <div>
          <label className="desktop:px-[72px] tablet:px-[17px] flex justify-start mt-[20px] mx-auto font-custom400 text-[14px] mobile:text-[12px] pt-[0px 7px] text-[#333333]">
            <Checkbox
              checked={confirmationCheck}
              onChange={setConfirmationCheck}
              className="mr-[12px] mobile:mr-[10px] mobile:ml-[6px] mobile:mt-[6px] justify-center items-center group w-[18px] h-[18px] rounded-[2px] border-[2px] border-[#111111] bg-white/10 ring-white/15 ring-inset data-[checked]:bg-[#111111]"
            >
              <CheckIcon className="hidden ml-[-1px] size-4 rotate-6 fill-white group-data-[checked]:block" />
            </Checkbox>
            Potrjujemo, da svojca in pokojnega osebno poznamo.
          </label>
        </div>

        <div className="w-[470px] mobile:w-[297px] h-[48px] mt-[35px] mx-auto">
          <button
            onClick={onSubmit}
            className="flex w-full h-full bg-white items-center justify-center text-[16px] leading-[24px] font-variation-customOpt16 text-[#FFFFFF] bg-gradient-to-b from-[#0D94E8] to-[#1860A3] rounded-lg"
          >
            POŠLJI
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newobituary;
