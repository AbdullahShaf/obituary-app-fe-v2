"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Modal,
    ModalContent,
} from "@nextui-org/react";
import cancle_icon from "@/public/cancle_icon.png";
import Image from "next/image";
import Select from "react-select";
import DatePicker from "react-datepicker";
import ModalDropBox from "./ModalDropBox";
import { sl } from "date-fns/locale";
import regionsAndCities from "@/utils/regionAndCities";
import adminService from "../../../services/admin-service";
import { toast } from "react-hot-toast";

const pageData = ['osmrtnice', 'pogrebi', 'cvetlicarne', 'pogrebna podjetja'].map((item) => ({
    value: item,
    label: item,
}));

const regionOptions = Object.keys(regionsAndCities).map((region) => ({
    value: region,
    label: region,
}));

export default function FormModal({ isShowModal, setIsShowModal, editId, refetch }) {
    const inputFileRef = useRef(null);
    const [scrollBehavior, setScrollBehavior] = useState("outside");
    const [selectedPage, setSelectedPage] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [openPicker, setOpenPicker] = useState(null);
    const [endOpenPicker, setEndOpenPicker] = useState(null);
    const [price, setPrice] = useState('');
    const [company, setCompany] = useState('');
    const [cpa, setCPA] = useState('');
    const [who, setWHO] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (timestamp) => {
        const funeralDate = new Date(timestamp);
        if (isNaN(funeralDate.getTime())) return "";

        const day = funeralDate.getDate().toString().padStart(2, "0");
        const month = (funeralDate.getMonth() + 1).toString().padStart(2, "0");
        const year = funeralDate.getFullYear();

        return `${day}.${month}.${year}`;
    };

    // 🆕 Multiple regions and cities
    const [selectedRegions, setSelectedRegions] = useState([{ value: "", inputValue: "" }]);
    const [selectedCities, setSelectedCities] = useState([{ value: "", inputValue: "" }]);

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

    const flattenedOptions = Object.keys(regionsAndCities)
        .flatMap((region) =>
            regionsAndCities[region].map((city) => ({
                label: city,
                value: city,
                region,
            }))
        )
        .sort((a, b) => a.label.localeCompare(b.label, "sl"));

    const togglePicker = (type) => {
        setOpenPicker(openPicker === type ? null : type);
    };

    const toggleEndPicker = (type) => {
        setEndOpenPicker(endOpenPicker === type ? null : type);
    };

    const handlePageChange = (selectedOption) => {
        setSelectedPage(selectedOption.value);
    };

    // 🆕 REGION handlers
    const handleRegionChange = (index, selectedOption) => {
        const newRegions = [...selectedRegions];
        newRegions[index].value = selectedOption?.value || "";
        setSelectedRegions(newRegions);
    };

    const handleRegionInputChange = (index, inputValue) => {
        const newRegions = [...selectedRegions];
        newRegions[index].inputValue = inputValue;
        setSelectedRegions(newRegions);
    };

    const addRegionField = () => {
        setSelectedRegions([...selectedRegions, { value: "", inputValue: "" }]);
    };

    const removeRegionField = (index) => {
        const newRegions = selectedRegions.filter((_, i) => i !== index);
        setSelectedRegions(newRegions.length ? newRegions : [{ value: "", inputValue: "" }]);
    };

    // 🆕 CITY handlers
    const handleCityChange = (index, selectedOption) => {
        const newCities = [...selectedCities];
        newCities[index].value = selectedOption?.value || "";
        setSelectedCities(newCities);
    };

    const handleCityInputChange = (index, inputValue) => {
        const newCities = [...selectedCities];
        newCities[index].inputValue = inputValue;
        setSelectedCities(newCities);
    };

    const addCityField = () => {
        setSelectedCities([...selectedCities, { value: "", inputValue: "" }]);
    };

    const removeCityField = (index) => {
        const newCities = selectedCities.filter((_, i) => i !== index);
        setSelectedCities(newCities.length ? newCities : [{ value: "", inputValue: "" }]);
    };

    const isButtonDisabled = () => {
        let flag = false;

        if (!selectedPage) {
            flag = true
        }

        if (!selectedCities.length && !selectedRegions.length) {
            flag = true;
        }

        if (!startDate) {
            flag = true;
        }

        if (!endDate) {
            flag = true;
        }

        return flag;
    }

    const handlePublish = async () => {
        setIsLoading(true);
        const allCities = [];
        const allRegions = [];
        selectedCities?.length && selectedCities.map((item) => allCities.push(item.value));
        selectedRegions?.length && selectedRegions.filter((item) => allRegions.push(item.value));

        const formData = new FormData();
        if (selectedFile) {
            formData.append(`logo`, selectedFile);
        }
        formData.append(`page`, selectedPage);
        formData.append(`cities`, allCities.join(','));
        formData.append(`regions`, allRegions.join(','));
        formData.append(`startDate`, startDate);
        formData.append(`endDate`, endDate);
        formData.append(`company`, company);
        formData.append(`cpa`, cpa);
        formData.append(`who`, who);
        formData.append(`notes`, notes);
        formData.append(`price`, price);

        if (editId) {
            await adminService.editSponosor(formData, editId?.id);
            toast.success('Sponsor updated');
        } else {
            await adminService.createSponosor(formData);
            toast.success('Sponsor created');
        }
        setIsShowModal(false);

        setSelectedPage('');
        setPrice('');
        setCompany('');
        setCPA('');
        setWHO('');
        setNotes('');
        setStartDate(null);
        setEndDate(null);
        setSelectedFile(null);
        setIsLoading(false);
        refetch();
    }

    useEffect(() => {
        if (editId) {
            setSelectedPage(editId?.page);
            setPrice(editId?.price);
            setCompany(editId?.company);
            setCPA(editId?.cpa);
            setWHO(editId?.who);
            setNotes(editId?.notes);
            setStartDate(editId.startDate);
            setEndDate(editId.endDate);
            if (editId?.cities) {
                let arr1 = editId?.cities?.split(",")?.map((item) => {
                    return {
                        value: item,
                        label: item
                    }
                })
                console.log('>>>>>> arr1', arr1);
                setSelectedCities(arr1);
            }
            if (editId?.regions) {
                let arr2 = editId?.regions?.split(",")?.map((item) => {
                    return {
                        value: item,
                        label: item
                    }
                })
                setSelectedRegions(arr2);
            }
        }
    }, [editId])

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
                                {/* Page Select */}
                                <div className="mb-4">
                                    <Select
                                        options={pageData}
                                        onChange={handlePageChange}
                                        placeholder="WHAT PAGE"
                                        value={pageData.find((option) => option.value === selectedPage)}
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

                                {/* Multiple Cities */}
                                {selectedCities.map((city, index) => (
                                    <div key={index} className="mb-2 flex items-center gap-2">
                                        <Select
                                            options={flattenedOptions}
                                            placeholder="CITY"
                                            value={
                                                city.value
                                                    ? flattenedOptions.find((opt) => opt.value === city.value)
                                                    : null
                                            }
                                            onChange={(selectedOption) => handleCityChange(index, selectedOption)}
                                            onInputChange={(input) => handleCityInputChange(index, input)}
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
                                <span
                                    className="text-[#0D94E8] cursor-pointer underline mb-4"
                                    onClick={addCityField}
                                >
                                    + Add more
                                </span>

                                {/* 🆕 Multiple Regions */}
                                {selectedRegions.map((region, index) => (
                                    <div key={index} className="mb-2 flex items-center gap-2">
                                        <Select
                                            options={regionOptions}
                                            placeholder="REGION"
                                            value={
                                                region.value
                                                    ? regionOptions.find((opt) => opt.value === region.value)
                                                    : null
                                            }
                                            onChange={(selectedOption) => handleRegionChange(index, selectedOption)}
                                            onInputChange={(input) => handleRegionInputChange(index, input)}
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
                                            className="flex-1"
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
                                <span
                                    className="text-[#0D94E8] cursor-pointer underline mb-4"
                                    onClick={addRegionField}
                                >
                                    + Add more
                                </span>

                                {/* Start & End Dates */}
                                <div className="flex justify-between">
                                    <div className="mb-4 flex flex-col w-[48%]">
                                        <div className="relative">
                                            <ModalDropBox
                                                placeholder="START"
                                                onClick={() => togglePicker("start")}
                                                isSelectText={startDate ? formatDate(startDate) : ""}
                                            />
                                            {openPicker === "start" && (
                                                <div className="absolute mt-12 bg-white border rounded shadow-lg z-10">
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => {
                                                            setStartDate(date);
                                                            setOpenPicker(null);
                                                        }}
                                                        dateFormat="d"
                                                        inline
                                                        minDate={new Date()}
                                                        onClickOutside={() => setOpenPicker(null)}
                                                        locale={sl}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-4 flex flex-col w-[48%]">
                                        <div className="relative">
                                            <ModalDropBox
                                                placeholder="END"
                                                onClick={() => toggleEndPicker("end")}
                                                isSelectText={endDate ? formatDate(endDate) : ""}
                                            />
                                            {endOpenPicker === "end" && (
                                                <div className="absolute mt-12 bg-white border rounded shadow-lg z-10">
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => {
                                                            setEndDate(date);
                                                            setEndOpenPicker(null);
                                                        }}
                                                        dateFormat="d"
                                                        inline
                                                        minDate={new Date()}
                                                        onClickOutside={() => setEndOpenPicker(null)}
                                                        locale={sl}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Price Input */}
                                <div className="px-[10px] pl-6 mt-[4px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                                    <input
                                        type="text"
                                        value={price}
                                        placeholder="PRICE"
                                        className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA]"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="w-[48%] bg-[#E1E6EC] rounded-2xl border-[#6D778E] border pt-12 mobile:px-6 px-8 pb-7 flex flex-col">
                                <div className="text-[#6D778E] leading-[20px] font-[400px] w-full flex flex-col justify-start items-start mb-2.5">
                                    <div className="w-full">
                                        <div className="px-[10px] pl-6 mt-[4px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full mb-3">
                                            <input
                                                type="text"
                                                value={company}
                                                placeholder="COMPANY"
                                                className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA]"
                                                onChange={(e) => setCompany(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="w-[30%]">
                                            <div className="px-[10px] pl-6 mt-[4px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                                                <input
                                                    type="text"
                                                    value={cpa}
                                                    placeholder="C / P / A"
                                                    className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA]"
                                                    onChange={(e) => setCPA(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-[68%]">
                                            <div className="px-[10px] pl-6 mt-[4px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                                                <input
                                                    type="text"
                                                    value={who}
                                                    placeholder="WHO"
                                                    className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA]"
                                                    onChange={(e) => setWHO(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label className="flex text-[#3C3E41] flex-col mb-4 mt-4">
                                            LOGO
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
                                                        {editId && editId?.logo ? (
                                                            <>
                                                                <img
                                                                    src={editId?.logo}
                                                                    alt="preview"
                                                                    className="w-32 h-32 object-contain rounded mb-2"
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="w-[214px] flex justify-center items-center mobile:w-[150px] mobile:h-8 h-[40px] rounded-[4px] bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] text-white leading-6 text-md">
                                                                    Logo
                                                                </p>
                                                                <span className="text-sm text-[#939393] mt-1">
                                                                    Format: jpg, png, webp
                                                                </span>
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
                                        <div className="px-[10px] pl-6 mt-[4px] min-h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                                            <textarea
                                                type="text"
                                                value={notes}
                                                placeholder="NOTES"
                                                className="w-full h-full bg-transparent focus:outline-none text-[#ACAAAA] pt-3"
                                                onChange={(e) => setNotes(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <button
                                        style={{ boxShadow: '5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF', opacity: '0.4' }}
                                        className="my-8 bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] w-[180px] h-[50px] rounded-[10px] text-white flex items-center justify-center gap-x-[5px] mx-auto"
                                        disabled={true}
                                    >
                                        Publishing...
                                    </button>
                                ) : (
                                    <button
                                        style={{ boxShadow: '5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF', opacity: isButtonDisabled() ? '0.4' : '1' }}
                                        className="my-8 bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] w-[180px] h-[50px] rounded-[10px] text-white flex items-center justify-center gap-x-[5px] mx-auto"
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
