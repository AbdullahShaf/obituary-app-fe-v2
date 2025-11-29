"use client"

import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalContent,
} from "@nextui-org/react";
import cancle_icon from "@/public/cancle_icon.png";
import Image from "next/image";
import Select from "react-select";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import adminService from "../../../services/admin-service";
import { toast } from "react-hot-toast";
import regionsAndCities from "@/utils/regionAndCities";

const flattenedOptions = Object.keys(regionsAndCities)
    .flatMap((region) =>
        regionsAndCities[region].map((city) => ({
            label: city,
            value: city,
            region,
        }))
    )
    .sort((a, b) => a.label.localeCompare(b.label, "sl"));

export default function ModalCemetery({
  isShowModal,
  setIsShowModal,
  editId,
  refetch,
}) {
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputFileRef = useRef(null);

  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (editId) {
      setName(editId?.name || '');
      setAddress(editId?.address || '');
      if (editId?.city) {
        const cityOption = flattenedOptions.find(opt => opt.value === editId.city);
        setCity(cityOption || null);
      } else {
        setCity(null);
      }
      setSelectedFile(null);
    } else {
      setName('');
      setAddress('');
      setCity(null);
      setSelectedFile(null);
    }
  }, [editId, isShowModal]);

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

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption);
  };

  const handleSubmit = async () => {
    if (!name || !city) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    if (selectedFile) {
      formData.append(`pic`, selectedFile);
    }
    formData.append(`name`, name);
    formData.append(`address`, address);
    formData.append(`city`, city.value);

    try {
      if (editId) {
        await adminService.editCemetery(formData, editId?.id);
        toast.success('Cemetery updated');
      } else {
        await adminService.createCemetery(formData);
        toast.success('Cemetery created');
      }
      setIsShowModal(false);
      setName('');
      setAddress('');
      setCity(null);
      setSelectedFile(null);
      setIsLoading(false);
      if (refetch) refetch();
    } catch (error) {
      toast.error('Error saving cemetery');
      setIsLoading(false);
    }
  };

  if (breakpoint === "desktop" || breakpoint === "tablet"){
    return (
        <Modal
          isOpen={isShowModal}
          onOpenChange={(open) => setIsShowModal(open)}
          scrollBehavior={scrollBehavior}
          classNames={{
            backdrop: "bg-[#344054B2] bg-opacity-70", 
          }}
        >
          <ModalContent className="flex items-center justify-center w-full mt-32 ">
            <div className="flex flex-col w-full items-center justify-center desktop:w-[600px]">
              <div className="flex  " />
              {/* {/ <div className="flex flex-col tablet:w-[600px] desktop:w-[600px] w-full mobile:w-[95%] bg-[#E8F0F6]  rounded-2xl  p-4  "> /} */}
              <div className="flex flex-col bg-[#E8F0F6]  rounded-2xl ">
                <div
                  onClick={() => {
                    setIsShowModal(false);
                  }}
                  className="self-end "
                >
                  <Image
                    src={cancle_icon}
                    alt="imgCall"
                    className="w-[46px] h-[46px] mobile:w-[33px] mobile:h-[33px] cursor-pointer relative top-4 right-4"
                  />
                </div>
                <div className="flex flex-col w-[587px] mobile:w-[344px] z-50 mobile:px-[2px] px-7 pb-11 mobile:mt-11 mt-12  items-center justify-center">
                    
                    <div className="w-[496px] tracking-normal">
                      <h1 className="text-[#1E2125] text-2xl mobile:text-xl block mobile:hidden font-medium mb-2.5">
                        {editId ? "Uredi pokopališče" : "Dodaj pokopališče"}
                      </h1>
                     
                      <p className="text-[#3C3E41] mobile:hidden text-md h-[104px] mb-2.5">
                        Omogočilo bo pravilen prikaz pri pogrebih, prikaz poti na zemljevidu, slika pa bo prikazana na vaši strani.  
                        <br />
                        Vnesite vsa, tudi tista, kjer se pokopi ne opravljajo več, so pa še v uporabi.   
                      </p>
                    
                    </div>

                    <div className="mobile:w-[314px] w-[500px] bg-[#E1E6EC]  rounded-2xl border-[#6D778E] border pt-12 mobile:px-6 px-8 pb-12 flex flex-col">
                      
                      <div className="w-full rounded-[4px]   border border-[#6D778E] bg-white flex flex-row items-center h-12 justify-between pl-5 py-[5px] pr-3">
                        <div className=" inline-flex gap-x-2">
                            <img src="/modal_gallery.png" className="object-contain"/>
                            <p className="text-[#3C3E41] text-[16px]">Dodaj sliko pokopališča</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          ref={inputFileRef}
                          onChange={handleFileChange}
                        />
                        <button 
                          onClick={() => inputFileRef.current?.click()}
                          className="bg-[#6D778E] w-[150px] h-[38px] rounded-[4px] text-white flex items-center justify-center gap-x-[5px]"
                        >
                            <img src="/modal_add.png" className="object-contain"/>
                              Dodaj
                        </button>
                      </div>

                      <div className="flex flex-col items-end gap-2 mt-3 mb-4">
                        <p className="text-[#6D778E]">
                          ...ali izberi eno izmed naših nevtralnih
                        </p>

                        <div className="flex flex-row items-center w-full justify-end gap-x-2">
                            <img src="/modal_img_1.png" className="object-contain"/>
                            <img src="/modal_img_2.png" className="object-contain"/>
                            <img src="/modal_img_3.png" className="object-contain"/>
                            <img src="/modal_img_4.png" className="object-contain"/>
                        </div>
                      </div>

                      <div className=" text-[#6D778E] leading-[20px] font-[400px] w-full mt-[10px] h-[46px] flex flex-col justify-start items-start mb-2.5">
                        <div className="px-[10px] mobile:pl-4 pl-6 mt-[4px] h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                          <input
                            type="text"
                            value={name}
                            placeholder="Pokopališče    (npr. Pokopališče v Gabrskem)"
                            className="w-full h-full bg-transparent focus:outline-none text-[#6D778E]"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className=" text-[#6D778E] leading-[20px] font-[400px] w-full mt-[10px] h-[46px] flex flex-col justify-start items-start mb-2.5">
                        <div className="px-[10px] mobile:pl-4 pl-6 mt-[4px] h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                          <input
                            type="text"
                            value={address}
                            placeholder="Naslov       (npr. Gabrsko 59, Trbovlje)"
                            className="w-full h-full bg-transparent focus:outline-none text-[#6D778E]"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="text-[#6D778E]  leading-[20px] font-[400px] w-full mt-[10px] h-[46px] flex flex-col justify-start items-start mb-2.5">
                        <div className="px-[10px] mobile:pl-4 pl-6 mt-[4px] h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                          <Select
                            options={flattenedOptions}
                            placeholder="Občina"
                            value={city}
                            onChange={handleCityChange}
                            isSearchable
                            styles={{
                              control: (base) => ({
                                ...base,
                                backgroundColor: "transparent",
                                border: "none",
                                boxShadow: "none",
                                minHeight: "48px",
                              }),
                              placeholder: (base) => ({
                                ...base,
                                color: "#6D778E",
                              }),
                              singleValue: (base) => ({
                                ...base,
                                color: "#6D778E",
                              }),
                              input: (base) => ({
                                ...base,
                                color: "#6D778E",
                              }),
                            }}
                          />
                        </div>
                      </div>

                      <div className=" text-[#6D778E] hidden  leading-[20px] font-[400px] w-full mt-[10px] h-[142px] mobile:flex flex-col justify-start items-start mb-[30px]">
                        <div className="mb-2.5 text-[#414141]">FOTOGRAFIJA <br className="hidden mobile:block"/> <span className="text-[#6D778E]"> (glavne stavbe ali dela pokopališča)</span></div>
                        <div 
                          className="px-[10px] pl-6 mobile:pl-4 mt-[4px] mobile:h-[85px] h-[100px] rounded-[6px] 
                        bg-[#F2F8FF66] shadow-custom-dark-to-white w-full flex flex-col items-center pt-[22px] cursor-pointer"
                          onClick={() => inputFileRef.current?.click()}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                        >
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              ref={inputFileRef}
                              onChange={handleFileChange}
                            />
                            <button
                              style={{ boxShadow: '5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF' }}
                              className="w-[214px] mobile:w-[150px] mobile:h-8 h-[40px] rounded-[4px] bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] text-white leading-6 text-md "
                            >
                                Dodaj sliko
                              </button>

                              <p className="text-[#939393] text-[11px] mt-2">Format: jpg, png, webp </p>
                        </div>
                      </div>

                      <button 
                        onClick={handleSubmit}
                        disabled={isLoading || !name || !city}
                        className="w-[250px] h-[60px] disabled:opacity-50"
                      >
                        <img  src="/modal_button.png" className="w-full relative left-[-12px]"/>
                      </button>
                    </div>
                </div>
              </div>
              <div className="flex h-[20px]"></div>
            </div>
          </ModalContent>
        </Modal>
      );
  }

  if (breakpoint === "mobile"){
     return (
        <Modal
          isOpen={isShowModal}
          onOpenChange={(open) => setIsShowModal(open)}
          scrollBehavior={scrollBehavior}
          classNames={{
            backdrop: "bg-[#344054B2] bg-opacity-70", 
          }}
        >
          <ModalContent className="flex items-center justify-center w-full mt-32 ">
            <div className="flex flex-col w-full items-center justify-center desktop:w-[600px]">
              <div className="flex  " />
              {/* {/ <div className="flex flex-col tablet:w-[600px] desktop:w-[600px] w-full mobile:w-[95%] bg-[#E8F0F6]  rounded-2xl  p-4  "> /} */}
              <div className="flex flex-col bg-[#E8F0F6]  rounded-2xl ">
                <div
                  onClick={() => {
                    setIsShowModal(false);
                  }}
                  className="self-end "
                >
                  <Image
                    src={cancle_icon}
                    alt="imgCall"
                    className="w-[46px] h-[46px] mobile:w-[33px] mobile:h-[33px] cursor-pointer relative top-3 right-3"
                  />
                </div>
                <div className="flex flex-col  w-[587px] mobile:w-[344px] z-50 mobile:px-[2px] px-7 pb-11 mobile:mt-10 mt-12  items-center justify-center">

                    <div className="w-[314px]  text-[16px]">
                        <h1 className="text-[#1E2125] text-[24px] mobile:block hidden font-medium mb-2.5">
                        {editId ? "Uredi pokopališče" : "Dodaj pokopališče"}
                      </h1>

                      <p className="text-[#3C3E41] tracking-wide desktop:hidden tablet:hidden  text-[14px] h-[139px] mb-2.5">
                      Omogočilo bo pravilen prikaz pri pogrebih, prikaz poti na zemljevidu, slika pa bo prikazana na vaši strani.   
                        <br /><br />
                        Vnesite vsa, tudi tista, kjer se pokopi ne opravljajo več, so pa še v uporabi.                      
                      </p>
                    </div>
                   
                   
                  <div className="mobile:w-[314px] w-[500px] bg-[#E1E6EC]  rounded-2xl border-[#6D778E] border pt-10 mobile:px-6 px-8 pb-12 flex flex-col">
                    <div className=" text-[#6D778E]  leading-[20px] font-[400px] w-full mt-[10px] h-[142px] flex flex-col justify-start items-start mb-[10px]">
                        <div className="mb-2.5 text-[#414141]">DODAJ SLIKO POKOPALIŠČA </div>
                        <div 
                          className="px-[10px] pl-6 mobile:pl-4 mt-[4px] mobile:h-[85px] h-[100px] rounded-[6px] 
                        bg-[#F2F8FF66] shadow-custom-dark-to-white w-full flex flex-col items-center pt-[22px] cursor-pointer"
                          onClick={() => inputFileRef.current?.click()}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                        >
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              ref={inputFileRef}
                              onChange={handleFileChange}
                            />
                            <button
                              style={{ boxShadow: '5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF' }}
                              className="w-[214px] mobile:w-[150px] mobile:h-8 h-[40px] rounded-[4px] bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] text-white leading-6 text-md "
                            >
                                Dodaj sliko
                              </button>

                              <p className="text-[#939393] text-[11px] mt-2">Format: jpg, png, webp </p>
                        </div>
                    </div>

                      <div className="flex flex-col items-end gap-2  mb-4">
                        <p className="text-[#6D778E] text-[14px]">
                          ...ali izberi eno izmed naših nevtralnih
                        </p>

                        <div className="flex flex-row items-center w-full justify-end gap-x-2">
                            <img src="/modal_img_1.png" className="object-contain"/>
                            <img src="/modal_img_2.png" className="object-contain"/>
                            <img src="/modal_img_3.png" className="object-contain"/>
                        </div>
                      </div>

                      
                      <div className=" text-[#6D778E]  leading-[20px] font-[400px] w-full mt-[10px] h-[82px] flex flex-col justify-start items-start mb-2.5">
                        <div className="mb-2.5 text-[#414141]">POKOPALIŠČE</div>
                        <div className="px-[10px] pl-6 m mobile:pl-4t-[4px] h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                          <input
                            type="text"
                            value={name}
                            placeholder="npr. Pokopališče v Gabrskem"
                            className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA]"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      
                      <div className=" text-[#6D778E]  leading-[20px] font-[400px] w-full mt-[10px] h-[82px] flex flex-col justify-start items-start mb-2.5">
                        <div className="mb-2.5 text-[#414141]">NASLOV</div>
                        <div className="px-[10px] pl-6 m mobile:pl-4t-[4px] h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                          <input
                            type="text"
                            value={address}
                            placeholder="npr. Gabrsko 59, Trbovlje"
                            className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA]"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      
                      <div className=" text-[#6D778E]  leading-[20px] font-[400px] w-full mt-[10px] h-[82px] flex flex-col justify-start items-start mb-2.5">
                        <div className="mb-2.5 text-[#414141]">OBČINA</div>
                        <div className="px-[10px] pl-6 m mobile:pl-4t-[4px] h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                          <Select
                            options={flattenedOptions}
                            placeholder="Izberi občino"
                            value={city}
                            onChange={handleCityChange}
                            isSearchable
                            styles={{
                              control: (base) => ({
                                ...base,
                                backgroundColor: "transparent",
                                border: "none",
                                boxShadow: "none",
                                minHeight: "48px",
                              }),
                              placeholder: (base) => ({
                                ...base,
                                color: "#ACAAAA",
                              }),
                              singleValue: (base) => ({
                                ...base,
                                color: "#ACAAAA",
                              }),
                              input: (base) => ({
                                ...base,
                                color: "#ACAAAA",
                              }),
                            }}
                          />
                        </div>
                      </div>


                      <button 
                        onClick={handleSubmit}
                        disabled={isLoading || !name || !city}
                        className="w-full h-[60px] disabled:opacity-50"
                      >
                        <img  src="/modal_button_sm.png" className="w-full relative left-[-12px] object-contain"/>
                      </button>
                    </div>
                </div>
              </div>
              <div className="flex h-[20px]"></div>
            </div>
          </ModalContent>
        </Modal>
      );
  
  }
 
}

