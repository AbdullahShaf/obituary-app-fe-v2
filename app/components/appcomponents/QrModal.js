"use client";

import React, { useEffect, useState } from "react";
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
import shopService from "@/services/shop-service";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

export function QrModal({
    isShowModal,
    setIsShowModal,
    select_id,
    set_Id,
    selectedImage,
    data,
    onChange,
    updateObituary,
    toggleModal6 = () => { }
}) {
    const { user } = useAuth();

    const [scrollBehavior, setScrollBehavior] = React.useState("outside");
    const [shops, setShops] = useState([{}]);

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
                        <div className="flex w-[600px] mobile:w-[344px] z-50 mobile:px-[2px] px-7 pb-11 mobile:mt-11 mt-12  items-center justify-center">
                            <div className="mobile:w-[314px] w-[511px] bg-[#E1E6EC]  rounded-2xl border-[#6D778E] border pt-12 mobile:px-6 px-8 pb-7 flex flex-col">
                                <h1 className="text-[#1E2125] text-center text-xl mobile:text-xl font-medium">
                                    QR koda do spominske strani
                                </h1>

                                <p className="text-[#338ac4] text-center text-2xl font-semibold  text-md h-[50px] mb-2.5">
                                    {data?.name} {data?.sirName}
                                </p>
                                <div className="flex justify-center items-center mb-12">
                                    <img
                                        className="mobile:size-[12rem] size-[17rem]"
                                        src={isShowModal}
                                        alt={"qr_code"}
                                    />
                                </div>


                                <a
                                    onClick={async () => {
                                        if (!data?.qr_code && !isShowModal) return;

                                        try {
                                            const response = await fetch(data.qr_code, { mode: "cors" });
                                            const blob = await response.blob();

                                            const url = window.URL.createObjectURL(blob);
                                            const a = document.createElement("a");
                                            a.href = url;
                                            a.download = `qr_koda_${data?.name}_${data?.sirName}.png`;
                                            document.body.appendChild(a);
                                            a.click();
                                            a.remove();
                                            window.URL.revokeObjectURL(url);
                                        } catch (error) {
                                            console.error("Failed to download QR code:", error);
                                            toast.error("Prenos slike ni uspel.");
                                        }
                                    }}
                                    className="mobile:w-[100%] mobile:text-xs bg-[#3597e6] w-[75%] m-[auto] h-[50px] rounded-[10px] flex justify-center items-center gap-3 bg-[#09C1A3] text-white font-normal text-md"
                                >
                                    <span>SHRANI KODO NA SVOJO NAPRAVO</span> <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.2969 3.125V16.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15.9219 11.25L10.2969 16.875L4.67188 11.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-[20px]"></div>
                </div>
            </ModalContent>
        </Modal>
    );
}
