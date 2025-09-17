"use client";

import Image from "next/image";
import OpenableBlock from "../components/OpenAbleBlock";
import BackgroundSelector from "../components/BackgroundSelector";
import ImageSelector from "../components/ImageSelector";
import { useState, useEffect } from "react";
import cemetryService from "@/services/cemetry-service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import FuneralCompanyPreview from "../components/funeral-company-preview";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import { useApi } from "@/hooks/useApi";
import { Loader } from "@/utils/Loader";
import companyService from "@/services/company-service";
import { RenderImage } from "@/utils/ImageViewerModal";

export default function Step3({ data, onChange, handleStepChange }) {
  const [cemetries, setCemetries] = useState([
    {
      index: 1,
      name: "",
      address: "",
      image: null,
    },
  ]);
  const [companyId, setCompanyId] = useState(null);
  const { user } = useAuth();
  const { data: session } = useSession();
  const { isLoading, trigger: createCemetry } = useApi(cemetryService.createCemetry);

  const companyAndCity = `${session?.user?.me?.company && session?.user?.me?.city ? `${session?.user?.me?.company}, ${session?.user?.me?.city}` : ""}`;
  useEffect(() => {
    if (data && data !== null) {
      setCompanyId(data.id);

      // if (data.cemeteries && data.cemeteries.length > 0) {
      //   const updatedCemetries = data.cemeteries.map((cemetry, index) => ({
      //     ...cemetry,
      //     index: index + 1,
      //   }));
      //   setCemetries(updatedCemetries);
      // }
    }
  }, [data]);

  // Refactor--------
  const fetchCemeteries = async () => {
    try {
      const response = await companyService.companyAdditionalData({ companyId, table: "cementry" });
      if (response && response.length > 0) {
        const updatedCemetries = response.map((cemetry, index) => ({
          ...cemetry,
          index: index + 1,
        }));
        setCemetries(updatedCemetries);
      }
      console.log('response', response);
    } catch (error) {
      console.error('Failed to fetch packages data:', error);
    }
  }

  useEffect(() => {
    if (companyId) {
      fetchCemeteries();
    }
  }, [companyId])
  // ----------

  const addSliderBlock = () => {
    setCemetries([
      ...cemetries,
      {
        index: cemetries.length + 1,
        name: "",
        address: "",
        image: null,
      },
    ]);
  };
  const handleCemeteryChange = (index, updatedCemetery) => {
    const updatedCemeteries = [...cemetries];
    updatedCemeteries[index] = updatedCemetery;
    setCemetries(updatedCemeteries);
  };

  const handleSubmit = async () => {
    try {
      // const incompleteCemetries = cemetries.find(
      //   (cemetery) =>
      //     !cemetery.name.trim() || !cemetery.address.trim() || !cemetery.image
      // );

      // if (incompleteCemetries) {
      //   toast.error("Each CEmetery must have an name,address and image");
      //   return false;
      // }
      const formData = new FormData();
      formData.append("companyId", companyId);
      const nonEmptyCemeteries = cemetries.filter(
        (cemetery) =>
          cemetery.name.trim() !== "" &&
          // currently address is hidden in UI so not validating it
          // cemetery.address.trim() !== "" &&
          cemetery.image !== null
      );

      nonEmptyCemeteries.forEach((cemetery, index) => {
        const originalCemetery = data.cemeteries?.find(
          (c) => c.id === cemetery.id
        );

        // Append default fields
        formData.append(`cemeteries[${index}][name]`, cemetery.name);
        formData.append(`cemeteries[${index}][address]`, cemetery.address);
        formData.append(`cemeteries[${index}][city]`, user?.city ?? "");
        formData.append(`cemeteries[${index}][updated]`, true);

        // If image is selected, append it
        if (cemetery.image) {
          formData.append(`cemeteries[${index}][image]`, cemetery.image);
        }

        // Check if this cemetery already exists
        if (cemetery.id) {
          const nameChanged =
            originalCemetery && cemetery.name !== originalCemetery.name;
          const addressChanged =
            originalCemetery && cemetery.address !== originalCemetery.address;
          const imageChanged = cemetery.image instanceof File;

          if (nameChanged || addressChanged || imageChanged) {
            formData.append(`cemeteries[${index}][updated]`, true);
          }
          formData.append(`cemeteries[${index}][id]`, cemetery.id); // Always include ID for updates
        }
      });

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      if (nonEmptyCemeteries.length > 0) {
        const response = await createCemetry(formData);
        const updateCompany = {
          ...data,
          cemeteries: response.cemeteries,
        };
        onChange(updateCompany);
        setCemetries(response.cemeteries);
        toast.success("Cemetries Updated Successfully");
      }
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Some Error Occured");
      return false;
    }
  };

  const handleDeleteCemtery = async (cemetery) => {
    if (!cemetery?.id) {
      toast.error("Cemetery is not saved yet.");
      return;
    }
    console.log("Deleting cemetery with ID:", cemetery?.id);
    try {
      const { cemeteries } = await cemetryService.deleteCemetery(cemetery.id);
      setCemetries(cemeteries);
      const updateCompany = {
        ...data,
        cemeteries: cemeteries,
      };
      onChange(updateCompany);
      toast.success("Cemetery deleted successfully");
    } catch (err) {
      console.error("Failed to delete Cemetery", err);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="absolute top-[-24px] z-10 right-[30px] text-[14px] leading-[24px] text-[#6D778E]">
        {companyAndCity}
      </div>
      <div className="min-h-full flex flex-col justify-between gap-[16px]">
        <div className="space-y-[22px]">
          <div className="flex justify-between items-center">
            <div className="inline-flex gap-[17px] items-center">
              <div className="w-[48px] h-[48px] rounded-full bg-[#D4DCF0] border border-[#0A85C2] flex items-center justify-center text-[20px] leading-[100%] text-[#0A85C2]">
                3
              </div>
              <div className="space-y-0">
                <div className="text-[14px] text-[#6D778E] leading-[24px] font-normal">
                  KORAK 3
                </div>
                <div className="text-[20px] text-[#1E2125] leading-[100%] font-semibold">
                  Naša pokopališča
                </div>
              </div>
            </div>
            {companyId && <FuneralCompanyPreview company={data} />}
          </div>
          <div className="space-y-[8px]">
            <p className="text-[14px] text-[#6D778E] font-normal leading-[20px] pb-[18px]">
              Če za nekatera manjša pokopališča nimate pri roki najboljših slik,
              lahko izberete naše univerzalne in dodate svoje naknadno. <br />{" "}
            </p>
            {cemetries.map((block) => (
              <SliderBlock
                key={block.index}
                index={block.index}
                cemetery={block}
                onChange={handleCemeteryChange}
                title={`Pokopališče ${block.index}`}
                handleDelete={handleDeleteCemtery}
              />
            ))}
            <div className="flex items-center justify-end pt-[8px] pb-[16px]">
              <div
                className="inline-flex items-center gap-[8px] cursor-pointer"
                onClick={addSliderBlock}
              >
                <img
                  src="/florist_plus.png"
                  alt="Dodaj sliko"
                  className="w-[16px] h-[16px]"
                />
                <span className="text-[14px] text-[#3C3E41] font-normal leading-[100%]">
                  DODAJ ŠE ENO POKOPALIŠČE
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-[8px]">
          <p className="text-[14px] text-[#6D778E] font-normal leading-[20px] mb-[18px]">
            Dodajte vsa, tudi tista, kjer se morda danes pokopi ne opravljajo
            več. Uporabniki bodo vpisovali tudi svoje najdražje, ki so umrli
            pred 20 leti in torej tudi kje so pokopani, ne samo tekoče
            osmrtnice.
          </p>
          <div className="flex items-center gap-[8px] justify-between w-full">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#3DA34D] text-[#FFFFFF] font-normal leading-[24px] text-[16px] py-[12px] px-[25px] rounded-[8px]"
            >
              Shrani
            </button>
            <div className="flex items-center gap-[8px]">
              <button
                className="bg-gradient-to-r from-[#E3E8EC] to-[#FFFFFF] text-[#1E2125] font-normal leading-[24px] text-[16px] py-[12px] px-[25px] rounded-[8px] shadow-[5px_5px_10px_0px_rgba(194,194,194,0.5)]"
                onClick={() => handleStepChange(2)}
              >
                Nazaj
              </button>
              <button
                className="bg-gradient-to-r from-[#E3E8EC] to-[#FFFFFF] text-[#1E2125] font-normal leading-[24px] text-[16px] py-[12px] px-[25px] rounded-[8px] shadow-[5px_5px_10px_0px_rgba(194,194,194,0.5)]"
                onClick={async () => {
                  const success = await handleSubmit();
                  if (success) {
                    handleStepChange(4);
                  }
                }}
              >
                Naslednji korak
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <img
          src="/funeral/4.png"
          alt="Spletna stran"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full text-[16px] text-[#6D778E] leading-[24px] mt-[29px] italic col-span-2">
        Op. Shranjevanje lahko včasih traja tudi pol minute. Počakajte prosim.
      </div>
    </>
  );
}

function SliderBlock({ index, title, cemetery, onChange, handleDelete }) {
  const [isDefaultOpen, setIsDefaultOpen] = useState(index === 1);
  const [savedImage, setSavedImage] = useState("");
  useEffect(()=>{
    if(typeof cemetery?.image ==="string" && cemetery?.image){
      setSavedImage(cemetery?.image)
    }
  },[cemetery])
  const handleChange = (e) => {
    onChange(index - 1, { ...cemetery, [e.target.name]: e.target.value });
  };
  return (
    <OpenableBlock
      isDefaultOpen={isDefaultOpen}
      title={title}
      index={index}
      hasDeleteButton={index !== 1 && true}
      onDelete={() => handleDelete(cemetery)}
      className=""
    >
      <div className="space-y-[16px]">
        <div className="space-y-[8px]">
          <div className="text-[16px] text-[#3C3E41] font-normal leading-[24px]">
            Dodaj sliko
          </div>
          <ImageSelector
            setFile={(file) => {
              const updated = { ...cemetery, image: file };
              onChange(index - 1, updated);
            }}
            inputId={`cemetery-${index}-upload`}
          />
        </div>
        <div className="space-y-[8px]">
          <label className="text-[16px] text-[#3C3E41] font-normal leading-[24px]">
            ...ali izberi eno izmed naših nevtralnih
          </label>
          <BackgroundSelector
            setFile={(file) => {
              const updated = { ...cemetery, image: file.image };
              onChange(index - 1, updated);
            }}
          />
          <RenderImage src={savedImage} alt={"img"} label={""} />

        </div>
        <div className="space-y-[8px] pt-[22px]">
          <label className="text-[16px] text-[#3C3E41] font-normal leading-[24px]">
            Ime pokopališča {index}
          </label>
          <input
            type="text"
            name="name"
            value={cemetery.name}
            onChange={handleChange}
            className="w-full border border-[#6D778E] bg-[#FFFFFF] outline-none rounded-[8px] py-[12px] px-[20px] text-[16px] text-[#3C3E41] placeholder:text-[#ACAAAA] leading-[24px]"
            placeholder="Pokopališče v Gabrskem"
          />
        </div>
        <div className="space-y-[8px] hidden">
          <label className="text-[16px] text-[#3C3E41] font-normal leading-[24px]">
            Naslov pokopališča {index}
          </label>
          <input
            type="text"
            name="address"
            value={cemetery.address}
            onChange={handleChange}
            className="w-full border border-[#6D778E] bg-[#FFFFFF] outline-none rounded-[8px] py-[12px] px-[20px] text-[16px] text-[#3C3E41] placeholder:text-[#ACAAAA] leading-[24px]"
            placeholder="Gabrsko 59, Trbovlje"
          />
        </div>
      </div>
    </OpenableBlock>
  );
}
