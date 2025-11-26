"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Modal,
    ModalContent,
} from "@nextui-org/react";
import cancle_icon from "@/public/cancle_icon.png";
import Image from "next/image";
import DropdownWithSearch from "../../components/appcomponents/DropdownWithSearch";
import adminService from "../../../services/admin-service";
import cemetryService from "../../../services/cemetry-service";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

export default function FormModal({ isShowModal, setIsShowModal, editId, refetch }) {
    const inputFileRef = useRef(null);
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (editId) {
            setName(editId?.name || "");
            setAddress(editId?.address || "");
            setCity(editId?.city || "");
            setImagePreview(editId?.image || "");
        } else {
            setName("");
            setAddress("");
            setCity("");
            setSelectedImageFile(null);
            setImagePreview("");
        }
    }, [editId, isShowModal]);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (!name.trim() || !city.trim()) {
            toast.error("Name and City are required");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            const companyId = user?.companyId || null;
            
            formData.append("companyId", companyId || "");
            
            if (editId) {
                // Update existing cemetery
                formData.append(`cemeteries[0][id]`, editId.id);
                formData.append(`cemeteries[0][updated]`, true);
                formData.append(`cemeteries[0][name]`, name.trim());
                formData.append(`cemeteries[0][address]`, address.trim());
                formData.append(`cemeteries[0][city]`, city.trim());
                if (editId.image && !selectedImageFile) {
                    formData.append(`cemeteries[0][image]`, editId.image);
                }
            } else {
                // Create new cemetery
                formData.append(`cemeteries[0][name]`, name.trim());
                formData.append(`cemeteries[0][address]`, address.trim());
                formData.append(`cemeteries[0][city]`, city.trim());
                formData.append(`cemeteries[0][updated]`, true);
            }
            
            if (selectedImageFile) {
                formData.append(`cemeteries[0][image]`, selectedImageFile);
            }

            await cemetryService.createCemetry(formData);
            toast.success(editId ? "Cemetery updated successfully" : "Cemetery created successfully");
            setIsShowModal(false);
            refetch();
        } catch (error) {
            console.error("Error saving cemetery:", error);
            toast.error("Failed to save cemetery");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isShowModal}
            onClose={() => setIsShowModal(false)}
            size="2xl"
            scrollBehavior="outside"
            classNames={{
                base: "bg-white rounded-[20px]",
                body: "py-6",
            }}
        >
            <ModalContent>
                <div className="w-full flex flex-col items-center px-[50px] py-[40px]">
                    <div className="w-full flex justify-end mb-4">
                        <button onClick={() => setIsShowModal(false)}>
                            <Image src={cancle_icon} alt="Close" width={24} height={24} />
                        </button>
                    </div>

                    <div className="w-full max-w-[500px] space-y-6">
                        <div className="w-full h-[60px] border-b-[1px] border-[#D4D4D4] flex items-center">
                            <input
                                type="text"
                                placeholder="Name of cemetery"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-full bg-transparent focus:outline-none text-[#6D778E]"
                            />
                        </div>

                        <div className="w-full h-[60px] border-b-[1px] border-[#D4D4D4] flex items-center">
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full h-full bg-transparent focus:outline-none text-[#6D778E]"
                            />
                        </div>

                        <div className="w-full h-[60px] border-b-[1px] border-[#D4D4D4] flex items-center">
                            <DropdownWithSearch
                                placeholder="City"
                                selectedCity={city}
                                onSelectCity={setCity}
                                variant="ghost"
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-[14px] text-[#6D778E] mb-2 block">Image (optional)</label>
                            <div className="w-full border-[1px] border-[#D4D4D4] rounded-lg p-4">
                                {imagePreview ? (
                                    <div className="relative">
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            width={200}
                                            height={150}
                                            className="object-cover rounded"
                                        />
                                        <button
                                            onClick={() => {
                                                setSelectedImageFile(null);
                                                setImagePreview("");
                                            }}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <input
                                            ref={inputFileRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() => inputFileRef.current?.click()}
                                            className="px-4 py-2 bg-[#0A85C2] text-white rounded-lg"
                                        >
                                            Upload Image
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full flex justify-center mt-8">
                            <button
                                onClick={handleSave}
                                disabled={isLoading || !name.trim() || !city.trim()}
                                className="w-[250px] h-[60px] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <img src="/modal_button.png" className="w-full relative left-[-12px]" alt="Save" />
                            </button>
                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}

