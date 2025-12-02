"use client";

import React, { useState, useRef, useEffect } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import cancle_icon from "@/public/cancle_icon.png";
import Image from "next/image";
import Select from "react-select";
import regionsAndCities from "@/utils/regionAndCities";
import { toast } from "react-hot-toast";
import categoryService from "@/services/category-service";
import partnerService from "@/services/partner-service";

const regionOptions = Object.keys(regionsAndCities).map((region) => ({
  value: region,
  label: region,
}));

// Flatten all cities into one array
const ALL_CITIES = Object.values(regionsAndCities).flat();

export default function FormModal({
  isShowModal,
  setIsShowModal,
  editId,
  refetch,
}) {
  const inputFileRef = useRef(null);
  const inputFileRef2 = useRef(null);
  const [scrollBehavior, setScrollBehavior] = useState("outside");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categories, setCategories] = useState([]);

  const [isCategoryAdding, setIsCategoryAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [mainImageDescription, setMainImageDescription] = useState("");
  const [secondaryImageDescription, setSecondaryImageDescription] =
    useState("");
  const [companyName, setCompanyName] = useState("");
  const [mainImageLink, setMainImageLink] = useState("");
  const [secondaryImageLink, setSecondaryImageLink] = useState("");
  const [notes, setNotes] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocalNews, setIsLocalNews] = useState(false);

  const getCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();

      setCategories([...response]);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async () => {
    if (newCategoryName.trim() === "") return;

    try {
      const response = await categoryService.createCategory({
        name: newCategoryName,
      });
      setCategories([
        ...categories,
        { value: response.id, label: response.name },
      ]);
      getCategories();
      toast.success("Category added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add category");
    }
    setNewCategoryName("");
    setIsCategoryAdding(false);
  };

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (isShowModal && !editId) {
      resetStates();
    }
  }, [isShowModal, editId]);
  const formatDate = (timestamp) => {
    const funeralDate = new Date(timestamp);
    if (isNaN(funeralDate.getTime())) return "";

    const day = funeralDate.getDate().toString().padStart(2, "0");
    const month = (funeralDate.getMonth() + 1).toString().padStart(2, "0");
    const year = funeralDate.getFullYear();

    return `${day}.${month}.${year}`;
  };

  // 🆕 Multiple regions and cities
  const [selectedRegions, setSelectedRegions] = useState([
    { value: "", inputValue: "" },
  ]);
  const [selectedCities, setSelectedCities] = useState([
    { value: "", inputValue: "" },
  ]);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile2(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const handleDrop2 = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile2(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const flattenedOptions = Object.keys(regionsAndCities)
    .flatMap((region) =>
      regionsAndCities[region].map((city) => ({
        label: city,
        value: city,
        region,
      }))
    )
    .sort((a, b) => a.label.localeCompare(b.label, "sl"));

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const handleCategoryChange = (option) => {
    setSelectedCategory(option);
  };

  // 🆕 REGION handlers
  const handleRegionChange = (index, selectedOption) => {
    // update region
    const newRegions = [...selectedRegions];
    newRegions[index].value = selectedOption?.value || "";
    newRegions[index].inputValue = "";
    setSelectedRegions(newRegions);

    // reset city for the same row
    const updatedCities = [...selectedCities];
    updatedCities[index] = { value: "", inputValue: "" };
    setSelectedCities(updatedCities);
  };

  const handleRegionInputChange = (index, inputValue) => {
    const newRegions = [...selectedRegions];
    newRegions[index].inputValue = inputValue;
    setSelectedRegions(newRegions);
  };

  const removeRegionField = (index) => {
    const newRegions = selectedRegions.filter((_, i) => i !== index);
    setSelectedRegions(
      newRegions.length ? newRegions : [{ value: "", inputValue: "" }]
    );
  };

  // 🆕 CITY handlers
  const handleCityChange = (index, selectedOption) => {
    const newCities = [...selectedCities];
    newCities[index].value = selectedOption?.value || "";
    setSelectedCities(newCities);

    // ---- AUTO SELECT REGION LOGIC ----
    if (selectedOption?.value) {
      const cityName = selectedOption.value;

      // Find region from regionsAndCities
      const foundRegion = Object.keys(regionsAndCities).find((region) =>
        regionsAndCities[region].includes(cityName)
      );

      if (foundRegion) {
        const newRegions = [...selectedRegions];
        newRegions[index] = { value: foundRegion, inputValue: "" };
        setSelectedRegions(newRegions);
      }
    }
  };

  const handleCityInputChange = (index, inputValue) => {
    const newCities = [...selectedCities];
    newCities[index].inputValue = inputValue;
    setSelectedCities(newCities);
  };

  const removeCityField = (index) => {
    const newCities = selectedCities.filter((_, i) => i !== index);
    setSelectedCities(
      newCities.length ? newCities : [{ value: "", inputValue: "" }]
    );
  };

  const isButtonDisabled = () => {
    const hasLocation =
      selectedRegions.some((r) => r.value) ||
      selectedCities.some((c) => c.value);

    if (editId) {
      return !hasLocation || !companyName || !selectedCategory?.value;
    }

    const hasImage = selectedFile && mainImageDescription;

    return (
      !hasLocation || !companyName || !selectedCategory?.value || !hasImage
    );
  };

  const handlePublish = async () => {
    setIsLoading(true);

    try {
      const allCities = selectedCities?.map((c) => c.value) || [];
      const allRegions = selectedRegions?.map((r) => r.value) || [];

      const formData = new FormData();

      if (selectedFile) formData.append("mainImage", selectedFile);
      if (selectedFile2) formData.append("secondaryImage", selectedFile2);

      formData.append("category", selectedCategory?.value); // FIXED
      formData.append("city", allCities.join(",")); // FIXED
      formData.append("region", allRegions.join(",")); // FIXED
      formData.append("name", companyName);
      formData.append("notes", notes);
      formData.append("website", websiteLink);
      formData.append("mainImageDescription", mainImageDescription);
      formData.append("secondaryImageDescription", secondaryImageDescription);
      formData.append("isLocalNews", isLocalNews);

      await partnerService.createPartner(formData);
      toast.success("Partner created");

      setIsLoading(false);
      resetStates();
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Partner creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    const allCities = selectedCities?.map((c) => c.value) || [];
    const allRegions = selectedRegions?.map((r) => r.value) || [];

    const formData = new FormData();

    try {
      if (selectedFile) {
        formData.append("mainImage", selectedFile);
      } else if (editId.mainImage) {
        formData.append("mainImage", editId.mainImage);
      }

      if (selectedFile2) {
        formData.append("secondaryImage", selectedFile2);
      } else if (editId.secondaryImage) {
        formData.append("secondaryImage", editId.secondaryImage);
      }

      formData.append("category", selectedCategory?.value ?? editId.category);
      formData.append("city", allCities.join(",") || editId.city); // FIXED
      formData.append("region", allRegions.join(",") || editId.region); // FIXED
      formData.append("name", companyName || editId.name);
      formData.append("notes", notes || editId.notes);
      formData.append("website", websiteLink || editId.website);
      formData.append(
        "mainImageDescription",
        mainImageDescription || editId.mainImageDescription
      );
      formData.append(
        "secondaryImageDescription",
        secondaryImageDescription || editId.secondaryImageDescription
      );
      formData.append(
        "isLocalNews",
        String(isLocalNews ?? editId?.isLocalNews)
      );

      await partnerService.updatePartner(editId.id, formData);
      toast.success("Partner updated");
      resetStates();
      refetch();
    } catch (error) {
      console.error("Failed to update partner:", error);
      toast.error("Failed to update partner");
    } finally {
      setIsLoading(false);
    }
  };

  const resetStates = () => {
    setSelectedCategory("");
    setCompanyName("");
    setNotes("");
    setWebsiteLink("");
    setMainImageDescription("");
    setSecondaryImageDescription("");
    setIsLocalNews(false);
    setMainImageLink("");
    setSecondaryImageLink("");
    setSelectedFile(null);
    setSelectedFile2(null);
    setSelectedRegions([{ value: "", inputValue: "" }]);
    setSelectedCities([{ value: "", inputValue: "" }]);
  };

  useEffect(() => {
    if (editId) {
      if (editId?.category) {
        const matched = categoryOptions.find(
          (opt) => opt.value === editId.category
        );
        setSelectedCategory(matched || null);
      }
      setCompanyName(editId?.name);
      setNotes(editId?.notes);
      setWebsiteLink(editId?.website);
      setMainImageDescription(editId?.mainImageDescription);
      setSecondaryImageDescription(editId?.secondaryImageDescription);
      setIsLocalNews(editId?.isLocalNews);
      setMainImageLink(editId?.mainImageLink);
      setSecondaryImageLink(editId?.secondaryImageLink);
      if (editId?.city) {
        let arr1 = editId?.city?.split(",")?.map((item) => {
          return {
            value: item,
            label: item,
          };
        });
        setSelectedCities(arr1);
      }
      if (editId?.region) {
        let arr2 = editId?.region?.split(",")?.map((item) => {
          return {
            value: item,
            label: item,
          };
        });
        setSelectedRegions(arr2);
      }
    }
  }, [editId, categories]);

  return (
    <Modal
      isOpen={isShowModal}
      onOpenChange={(open) => setIsShowModal(open)}
      scrollBehavior={scrollBehavior}
      classNames={{
        backdrop: "bg-[#344054B2] bg-opacity-70",
      }}
    >
      <ModalContent className="flex items-center justify-center w-full mt-32">
        <div className="flex flex-col w-full items-center justify-center desktop:w-[600px]">
          <div className="flex flex-col bg-[#E8F0F6] rounded-2xl">
            <div
              onClick={() => setIsShowModal(false)}
              className="self-end cursor-pointer"
            >
              <Image
                src={cancle_icon}
                alt="cancel"
                className="w-[46px] h-[46px] mobile:w-[33px] mobile:h-[33px] relative top-4 right-4"
              />
            </div>

            <div className="flex w-[1000px] z-50 mobile:px-[2px] px-7 pb-11 mobile:mt-11 mt-12 justify-between">
              {/* Left Section */}
              <div className="w-[48%] bg-[#E1E6EC] rounded-2xl border-[#6D778E] border pt-12 mobile:px-6 px-8 pb-7 flex flex-col">
                {/* Add category button */}
                <div className="mb-4 w-full flex justify-end">
                  <button
                    onClick={() => setIsCategoryAdding(!isCategoryAdding)}
                    className="bg-gradient-to-r from-white/10 to-white/40
                                        bg-gradient-to-r from-black/40 to-white/40 border border-white/10
                                        shadow-[inset_2.5px_2.5px_5px_rgba(166,171,189,1)] shadow-[inset_-2.5px_-2.5px_5px_rgba(250,251,255,1)]
                                        w-[228px] h-10 rounded-md
                                        uppercase text-left pl-4 py-2 text-[#6D778E]
                                        text-base leading-6 font-normal
                                        "
                  >
                    Add New Category
                  </button>
                </div>

                {isCategoryAdding && (
                  <div className="px-[10px]  mt-[4px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full flex flex-row items-center justify-between gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="CATEGORY NAME"
                      className="w-full h-full bg-transparent focus:outline-none text-[#6D778E] placeholder-[#6D778E]  text-base leading-6 font-normal"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <button
                      onClick={addCategory}
                      className="bg-gradient-to-r from-white/10 to-white/40
                                                bg-gradient-to-r from-black/40 to-white/40 border border-white/10
                                                shadow-[inset_2.5px_2.5px_5px_rgba(166,171,189,1)] shadow-[inset_-2.5px_-2.5px_5px_rgba(250,251,255,1)]
                                                w-fit h-10 rounded-md
                                                uppercase text-left pl-4 py-2 text-[#6D778E]
                                                text-base leading-6 font-normal
                                                "
                    >
                      Add
                    </button>
                  </div>
                )}

                {/* Page Select */}

                <div className="mb-8">
                  <Select
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    placeholder="CATEGORY"
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#F2F8FF66",
                        border: "1px solid #d4d4d4",
                        borderRadius: "6px",
                        boxShadow:
                          "inset 3px 3px 5px rgba(166, 171, 189, 1), inset -3px -3px 3px rgba(250, 251, 255, 0.46)",
                        "&:hover": { borderColor: "#105ccf" },
                        minHeight: "36px",
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        color: "#7d7d7d",
                        "&:hover": { color: "#808080" },
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                      menu: (base) => ({
                        ...base,
                        borderRadius: "4px",
                        marginTop: "2px",
                        zIndex: 10,
                      }),
                      option: (base, { isFocused }) => ({
                        ...base,
                        backgroundColor: isFocused ? "#e8f5f4" : "#fff",
                        color: "#333",
                        cursor: "pointer",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "#105CCF",
                        fontSize: "18px",
                      }),
                    }}
                  />
                </div>

                {/* 🆕 Multiple Regions */}
                {selectedRegions.map((region, index) => (
                  <div
                    key={index}
                    className="mb-2 flex items-center justify-end gap-2"
                  >
                    <Select
                      options={regionOptions}
                      placeholder="REGION"
                      value={
                        region.value
                          ? regionOptions.find(
                              (opt) => opt.value === region.value
                            )
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleRegionChange(index, selectedOption)
                      }
                      onInputChange={(input) =>
                        handleRegionInputChange(index, input)
                      }
                      inputValue={region.inputValue}
                      isSearchable
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#F2F8FF66",
                          border: "1px solid #d4d4d4",
                          borderRadius: "6px",
                          boxShadow:
                            "inset 3px 3px 5px rgba(166, 171, 189, 1), inset -3px -3px 3px rgba(250, 251, 255, 0.46)",
                          "&:hover": { borderColor: "#105ccf" },
                          minHeight: "36px",
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#7d7d7d",
                          "&:hover": { color: "#808080" },
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        menu: (base) => ({
                          ...base,
                          borderRadius: "4px",
                          marginTop: "2px",
                          zIndex: 10,
                        }),
                        option: (base, { isFocused }) => ({
                          ...base,
                          backgroundColor: isFocused ? "#e8f5f4" : "#fff",
                          color: "#333",
                          cursor: "pointer",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "#105CCF",
                          fontSize: "18px",
                        }),
                      }}
                      className="flex-1 max-w-[228px] place-self-end"
                    />
                    {selectedRegions.length > 1 && (
                      <button
                        onClick={() => removeRegionField(index)}
                        className="text-[#E63946] text-sm underline hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                {/* Multiple Cities */}
                {selectedCities.map((city, index) => (
                  <div key={index} className="mb-2 flex items-center gap-2">
                    <Select
                      options={
                        selectedRegions[index]?.value &&
                        regionsAndCities[selectedRegions[index]?.value]
                          ? regionsAndCities[selectedRegions[index].value].map(
                              (city) => ({
                                value: city,
                                label: city,
                              })
                            )
                          : ALL_CITIES.map((city) => ({
                              value: city,
                              label: city,
                            }))
                      }
                      placeholder="CITY"
                      value={
                        city.value
                          ? {
                              label: city.value,
                              value: city.value,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleCityChange(index, selectedOption)
                      }
                      onInputChange={(input) =>
                        handleCityInputChange(index, input)
                      }
                      inputValue={city.inputValue}
                      isSearchable
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#F2F8FF66",
                          border: "1px solid #d4d4d4",
                          borderRadius: "6px",
                          boxShadow:
                            "inset 3px 3px 5px rgba(166, 171, 189, 1), inset -3px -3px 3px rgba(250, 251, 255, 0.46)",
                          "&:hover": { borderColor: "#105ccf" },
                          minHeight: "36px",
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#7d7d7d",
                          "&:hover": { color: "#808080" },
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        menu: (base) => ({
                          ...base,
                          borderRadius: "4px",
                          marginTop: "2px",
                          zIndex: 10,
                        }),
                        option: (base, { isFocused }) => ({
                          ...base,
                          backgroundColor: isFocused ? "#e8f5f4" : "#fff",
                          color: "#333",
                          cursor: "pointer",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "#105CCF",
                          fontSize: "18px",
                        }),
                      }}
                      className="flex-1"
                    />
                    {selectedCities.length > 1 && (
                      <button
                        onClick={() => removeCityField(index)}
                        className="text-[#E63946] text-sm underline hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                {/* Local News Check */}
                <div className="mt-[4px]  w-full mb-[72px] flex justify-end items-center">
                  <div
                    className="flex items-center justify-between w-[228px]
                                     rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white h-[38px]
                                     px-[10px]
                                    "
                  >
                    <label
                      htmlFor="localNews"
                      className="text-[#6D778E] text-base leading-6 font-normal uppercase text-base leading-6 font-normal"
                    >
                      Local News
                    </label>

                    <input
                      className="w-[18px] h-[18px] rounded-[6px] accent-[#6D778E]"
                      type="checkbox"
                      checked={isLocalNews}
                      onChange={(e) => setIsLocalNews(e.target.checked)}
                    />
                  </div>
                </div>

                {/* Company Input */}
                <div className="px-[10px] mt-[4px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full mb-[10px]">
                  <input
                    type="text"
                    value={companyName}
                    placeholder="COMPANY"
                    className="w-full h-full
                                        bg-transparent focus:outline-none text-[#6D778E] placeholder-[#6D778E]  text-base leading-6 font-normal"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                {/* Website link Input */}
                <div className="px-[10px]  mt-[4px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                  <input
                    type="text"
                    value={websiteLink}
                    placeholder="LINK TO THEIR WEBSITE"
                    className="w-full h-full bg-transparent focus:outline-none w-full h-full
                                        bg-transparent focus:outline-none text-[#6D778E] placeholder-[#6D778E]  text-base leading-6 font-normal"
                    onChange={(e) => setWebsiteLink(e.target.value)}
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="w-[48%] bg-[#E1E6EC] rounded-2xl border-[#6D778E] border pt-12 mobile:px-6 px-8 pb-7 flex flex-col">
                <div className="text-[#6D778E] leading-[20px] font-[400px] w-full flex flex-col justify-start items-start mb-2.5">
                  <div className="w-full">
                    <label className="flex text-[#3C3E41] flex-col mb-[10px]">
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={inputFileRef}
                        onChange={handleFileChange}
                      />
                      <div
                        className=" px-4 py-11 w-full mobile:w-auto rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white flex flex-col items-center justify-center cursor-pointer  border-[#ACAAAA]"
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
                            {editId && editId?.mainImage ? (
                              <>
                                <img
                                  src={editId?.mainImage}
                                  alt="preview"
                                  className="w-32 h-32 object-contain rounded mb-2"
                                />
                              </>
                            ) : (
                              <>
                                <p
                                  className="w-[134px] flex justify-center items-center mobile:w-[150px] mobile:h-8 h-[40px] rounded-[4px] 
                                                                bg-gradient-to-b from-[rgba(231,235,240,1)] to-[rgba(231,235,240,1)] bg-[linear-gradient(180deg,rgb(0 0 0 / 0) 60.83%,rgb(24 96 163 / 10%))]
                                                                border-[2px]
                                                                border-[#0A85C2]
                                                                shadow-[5px_5px_10px_0_rgba(166,171,189,1)] shadow-[-5px_-5px_10px_0_rgba(250,251,255,1)]
                                                                text-[#6D778E] leading-6 text-md uppercase"
                                >
                                  Add pic
                                </p>
                              </>
                            )}
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
                  </div>

                  <div className="w-full">
                    <div className="px-[10px] pl-3 mt-[4px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full mb-3">
                      <input
                        type="text"
                        value={mainImageDescription}
                        placeholder="WHAT THEY DO"
                        className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA] placeholder-[#6D778E]"
                        onChange={(e) =>
                          setMainImageDescription(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Second picture set */}
                  <div className="w-full flex justify-end mb-[30px]">
                    <div className="flex flex-col gap-[10px] w-[228px]">
                      <div className="w-full">
                        <label className="flex text-[#3C3E41] flex-col">
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={inputFileRef2}
                            onChange={handleFileChange2}
                          />
                          <div
                            className=" px-4 py-11 w-full mobile:w-auto rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white flex flex-col items-center justify-center cursor-pointer  border-[#ACAAAA]"
                            onClick={(e) => {
                              // Prevent any automatic trigger or bubbling
                              e.preventDefault();
                              inputFileRef2.current?.click();
                            }}
                            onDrop={handleDrop2}
                            onDragOver={handleDragOver}
                          >
                            {!selectedFile2 ? (
                              <>
                                {editId && editId?.secondaryImage ? (
                                  <>
                                    <img
                                      src={editId?.secondaryImage}
                                      alt="preview"
                                      className="w-32 h-32 object-contain rounded mb-2"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <p
                                      className="w-[134px] flex justify-center items-center mobile:w-[150px] mobile:h-8 h-[40px] rounded-[4px] 
                                                                bg-gradient-to-b from-[rgba(231,235,240,1)] to-[rgba(231,235,240,1)] bg-[linear-gradient(180deg,rgb(0 0 0 / 0) 60.83%,rgb(24 96 163 / 10%))]
                                                                border-[2px]
                                                                border-[#0A85C2]
                                                                shadow-[5px_5px_10px_0_rgba(166,171,189,1)] shadow-[-5px_-5px_10px_0_rgba(250,251,255,1)]
                                                                text-[#6D778E] leading-6 text-md uppercase"
                                    >
                                      Add pic 2
                                    </p>
                                  </>
                                )}
                              </>
                            ) : (
                              <div className="flex flex-col items-center">
                                <img
                                  src={URL.createObjectURL(selectedFile2)}
                                  alt="preview"
                                  className="w-32 h-32 object-contain rounded mb-2"
                                />
                                <p className="text-[#414141] text-xs truncate w-full text-center text-ellipsis overflow-hidden text-wrap">
                                  Izbrana datoteka: {selectedFile2.name}
                                </p>
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                      <div className="px-[10px] pl-3 mt-[4px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full mb-3">
                        <input
                          type="text"
                          value={secondaryImageDescription}
                          placeholder="WHAT THEY DO"
                          className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA] placeholder-[#6D778E]"
                          onChange={(e) =>
                            setSecondaryImageDescription(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="px-[10px] pl-3 min-h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                      <input
                        type="text"
                        value={notes}
                        placeholder="NOTES"
                        className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA] pt-3 placeholder-[#6D778E]"
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <button
                    style={{
                      boxShadow: "5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF",
                      opacity: "0.4",
                    }}
                    className="my-8 bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] w-[180px] h-[50px] rounded-[10px] text-white flex items-center justify-center gap-x-[5px] mx-auto"
                    disabled={true}
                  >
                    Publishing...
                  </button>
                ) : editId ? (
                  <button
                    style={{
                      boxShadow: "5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF",
                      opacity: isButtonDisabled() ? "0.4" : "1",
                    }}
                    className="my-[10px] bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] w-[180px] h-[50px] rounded-[10px] text-white flex items-center justify-center gap-x-[5px] mx-auto"
                    disabled={isButtonDisabled()}
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    style={{
                      boxShadow: "5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF",
                      opacity: isButtonDisabled() ? "0.4" : "1",
                    }}
                    className="my-[10px] bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] w-[180px] h-[50px] rounded-[10px] text-white flex items-center justify-center gap-x-[5px] mx-auto"
                    disabled={isButtonDisabled()}
                    onClick={handlePublish}
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex h-[20px]"></div>
        </div>
      </ModalContent>
    </Modal>
  );
}
