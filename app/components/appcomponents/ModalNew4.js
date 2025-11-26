"use client"

import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import cancle_icon from "@/public/cancle_icon.png";
import imgUp from "@/public/ico_up.png";
import Image from "next/image";
import Modals from "./Modals";
import Dropdown from "./Dropdown";
import DropdownWithSearch from "./DropdownWithSearch";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import { useAuth } from "@/hooks/useAuth";
import cemetryService from "@/services/cemetry-service";
import { toast } from "react-hot-toast";
import companyService from "@/services/company-service";

export default function ModalNew4({
  isShowModal,
  setIsShowModal,
  select_id,
  set_Id,
  selectedImage,
  data,
  updateObituary,
  defaultCity = "",
  onSaved,
  cemeteryToEdit = null,
}) {
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(defaultCity || "");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);
  const inputFileRefMobile = useRef(null);

  const breakpoint = useBreakpoint()

  useEffect(() => {
    if (isShowModal && user?.id) {
      const fetchCompany = async () => {
        try {
          const response = await companyService.getFuneralCompany({
            userId: user.id,
          });
          if (response?.company?.id) {
            setCompanyId(response.company.id);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchCompany();
    }
  }, [isShowModal, user]);

  useEffect(() => {
    if (cemeteryToEdit) {
      setName(cemeteryToEdit.name || "");
      setAddress(cemeteryToEdit.address || "");
      setCity(cemeteryToEdit.city || defaultCity || "");
      setImagePreview(cemeteryToEdit.image || "");
      setSelectedImageFile(null);
    } else {
      setName("");
      setAddress("");
      setCity(defaultCity || "");
      setImagePreview("");
      setSelectedImageFile(null);
    }
  }, [cemeteryToEdit, defaultCity, isShowModal]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Vnesite ime pokopališča");
      return;
    }
    if (!city.trim()) {
      toast.error("Izberite mesto");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("companyId", companyId || "");
      formData.append(`cemeteries[0][name]`, name.trim());
      formData.append(`cemeteries[0][address]`, address.trim());
      formData.append(`cemeteries[0][city]`, city.trim());
      formData.append(`cemeteries[0][updated]`, true);

      if (cemeteryToEdit?.id) {
        formData.append(`cemeteries[0][id]`, cemeteryToEdit.id);
      }

      if (selectedImageFile) {
        formData.append(`cemeteries[0][image]`, selectedImageFile);
      } else if (cemeteryToEdit?.image) {
        formData.append(`cemeteries[0][image]`, cemeteryToEdit.image);
      }

      await cemetryService.createCemetry(formData);
      toast.success(
        cemeteryToEdit?.id ? "Pokopališče je bilo posodobljeno" : "Pokopališče je bilo dodano"
      );
      
      // Reset form
      setName("");
      if (!cemeteryToEdit?.id) {
        setAddress("");
        setCity(defaultCity || "");
        setSelectedImageFile(null);
        setImagePreview("");
      }
      
      setIsShowModal(false);
      if (onSaved) {
        onSaved();
      }
    } catch (error) {
      console.error("Error saving cemetery:", error);
      toast.error("Napaka pri shranjevanju pokopališča");
    } finally {
      setLoading(false);
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
                        Dodaj pokopališče
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
                            <p className="text-[#3C3E41] text-[16px]">
                              {selectedImageFile ? selectedImageFile.name : "Dodaj sliko pokopališča"}
                            </p>
                        </div>
                        <button 
                          onClick={() => inputFileRef.current?.click()}
                          className="bg-[#6D778E] w-[150px] h-[38px] rounded-[4px] text-white flex items-center justify-center gap-x-[5px]"
                        >
                            <img src="/modal_add.png" className="object-contain"/>
                              Dodaj
                        </button>
                        <input
                          ref={inputFileRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
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
                            placeholder="Pokopališče    (npr. Pokopališče v Gabrskem)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-full bg-transparent focus:outline-none text-[#6D778E]"
                          />
                        </div>
                      </div>

                      <div className=" text-[#6D778E] leading-[20px] font-[400px] w-full mt-[10px] h-[46px] flex flex-col justify-start items-start mb-2.5">
                        <div className="px-[10px] mobile:pl-4 pl-6 mt-[4px] h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                          <input
                            type="text"
                            placeholder="Naslov       (npr. Gabrsko 59, Trbovlje)"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full h-full bg-transparent focus:outline-none text-[#6D778E]"
                          />
                        </div>
                      </div>

                      <div className="text-[#6D778E]  leading-[20px] font-[400px] w-full mt-[10px] h-[46px] flex flex-col justify-start items-start mb-2.5">
                        <div className="px-[10px] mobile:pl-4 pl-6 mt-[4px] h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                          <DropdownWithSearch
                            placeholder="Mesto"
                            selectedCity={city}
                            onSelectCity={setCity}
                            variant="ghost"
                          />
                        </div>
                      </div>

                      <div className=" text-[#6D778E] hidden  leading-[20px] font-[400px] w-full mt-[10px] h-[142px] mobile:flex flex-col justify-start items-start mb-[30px]">
                        <div className="mb-2.5 text-[#414141]">FOTOGRAFIJA <br className="hidden mobile:block"/> <span className="text-[#6D778E]"> (glavne stavbe ali dela pokopališča)</span></div>
                        <div className="px-[10px] pl-6 mobile:pl-4 mt-[4px] mobile:h-[85px] h-[100px] rounded-[6px] 
                        bg-[#F2F8FF66] shadow-custom-dark-to-white w-full flex flex-col items-center pt-[22px]">
                            <button
                              style={{ boxShadow: '5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF' }}
                              className="w-[214px] mobile:w-[150px] mobile:h-8 h-[40px] rounded-[4px] bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] text-white leading-6 text-md ">
                                Dodaj sliko
                              </button>

                              <p className="text-[#939393] text-[11px] mt-2">Format: jpg, png, webp </p>
                        </div>
                      </div>

                      <button 
                        onClick={handleSave}
                        disabled={loading || !name.trim() || !city.trim()}
                        className="w-[250px] h-[60px] disabled:opacity-50 disabled:cursor-not-allowed"
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
                        Dodaj pokopališče
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
                        <div className="px-[10px] pl-6 mobile:pl-4 mt-[4px] mobile:h-[85px] h-[100px] rounded-[6px] 
                        bg-[#F2F8FF66] shadow-custom-dark-to-white w-full flex flex-col items-center pt-[22px]">
                            <button
                              onClick={() => inputFileRefMobile.current?.click()}
                              style={{ boxShadow: '5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF' }}
                              className="w-[214px] mobile:w-[150px] mobile:h-8 h-[40px] rounded-[4px] bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] text-white leading-6 text-md "
                            >
                                Dodaj sliko
                              </button>
                            <input
                              ref={inputFileRefMobile}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
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
                            placeholder="npr. Pokopališče v Gabrskem"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA]"
                          />
                        </div>
                      </div>

                      
                      <div className=" text-[#6D778E]  leading-[20px] font-[400px] w-full mt-[10px] h-[82px] flex flex-col justify-start items-start mb-2.5">
                        <div className="mb-2.5 text-[#414141]">NASLOV</div>
                        <div className="px-[10px] pl-6 m mobile:pl-4t-[4px] h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                          <input
                            type="text"
                            placeholder="npr. Gabrsko 59, Trbovlje"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA]"
                          />
                        </div>
                      </div>

                      
                      <div className=" text-[#6D778E]  leading-[20px] font-[400px] w-full mt-[10px] h-[82px] flex flex-col justify-start items-start mb-2.5">
                        <div className="mb-2.5 text-[#414141]">MESTO</div>
                        <div className="px-[10px] pl-6 m mobile:pl-4t-[4px] h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                          <DropdownWithSearch
                            placeholder="Mesto"
                            selectedCity={city}
                            onSelectCity={setCity}
                            variant="ghost"
                          />
                        </div>
                      </div>


                      <button 
                        onClick={handleSave}
                        disabled={loading || !name.trim() || !city.trim()}
                        className="w-full h-[60px] disabled:opacity-50 disabled:cursor-not-allowed"
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
