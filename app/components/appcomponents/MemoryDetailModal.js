"use client"

import React, { useEffect } from "react";
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

const heading = { condolence: "Sožalje", dedication: "Posvetilo", photo: "Slika" }


export function MemoryDetailModal({
    isShowModal,
    setIsShowModal,
    data
}) {
    const [scrollBehavior, setScrollBehavior] = React.useState("outside");
    console.log('LLLLLLLLLLL', data);
    const interaction = data?.interaction;
    return (
        <Modal
            isOpen={!!isShowModal}
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
                                setIsShowModal(null);
                            }}
                            className="self-end "
                        >
                            <Image
                                src={cancle_icon}
                                alt="imgCall"
                                className="w-[46px] h-[46px] mobile:w-[33px] mobile:h-[33px] cursor-pointer relative top-4 right-4"
                            />
                        </div>
                        <div className="flex w-[600px] mobile:w-[344px] z-50 mobile:px-[2px] px-7 mobile:pb-[80px] pb-[100px] mobile:mt-11 mt-12  items-center justify-center">
                            <div className="mobile:w-[314px] w-[511px] bg-[#E1E6EC]  rounded-2xl border-[#6D778E] border pt-12 mobile:px-6 px-8 pb-12 flex flex-col">
                                <h1 className="text-[#1E2125] text-2xl mobile:text-xl font-medium mb-8">
                                    {heading[data?.type]}
                                </h1>

                                {interaction?.fileUrl ?
                                    <div className="flex items-center justify-center"><img
                                        src={interaction?.fileUrl}
                                        alt="img"
                                        className="w-[auto] h-[auto]"
                                    /></div>
                                    : <p className="text-[#3C3E41] mobile:hidden text-[14px] mb-2">
                                        {interaction?.message}
                                    </p>}

                            </div>
                        </div>
                    </div>
                    <div className="flex h-[20px]"></div>
                </div>
            </ModalContent>
        </Modal>
    );
}
