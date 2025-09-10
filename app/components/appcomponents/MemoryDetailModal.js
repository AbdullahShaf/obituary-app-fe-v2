"use client"

import React, { useState, useEffect, useRef } from "react";
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
import { isSafeUrl, normalizeUrl } from "@/utils/UrlSafetyCheck";

const heading = { condolence: "Sožalje", dedication: "Posvetilo", photo: "Slika" }
const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("sl-SI", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};
const characterLimit = 300;
const maxHeight = 198;

export function MemoryDetailModal({
    isShowModal,
    setIsShowModal,
    data
}) {
    const [scrollBehavior, setScrollBehavior] = React.useState("outside");
    const interaction = data?.interaction;
    const [shouldTruncate, setShouldTruncate] = useState(false);
    const [showFullDedicationText, setShowFullDedicationText] = useState(false);
    const toggleDedicationText = () => {
        setShowFullDedicationText((prev) => !prev);
    };
    const messageRef = useRef(null);

    useEffect(() => {
        if (messageRef.current && interaction?.message.length > characterLimit) {
            const height = messageRef.current.scrollHeight;
            if (height > maxHeight) {
                setShouldTruncate(true);
            } else {
                setShouldTruncate(false); // reset if height is OK
            }
        } else {
            setShouldTruncate(false); // reset if under char limit
        }
    }, [data]);
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
                <div className="flex flex-col w-full items-center justify-center desktop:min-w-[600px]  desktop:max-w-[max-content]">
                    <div className="flex  " />
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
                        <div className="flex min-w-[600px] max-w-[max-content] mobile:w-[344px] z-50 mobile:px-[2px] px-7 mobile:pb-[80px] pb-12 mobile:mt-11 mt-10  items-center justify-center">
                            <div className="mobile:w-[314px] min-w-[511px] max-w-[max-content] bg-[#E1E6EC]  rounded-2xl border-[#6D778E] border pt-4 mobile:px-6 px-8 pb-12 flex flex-col">
                                <h1 className="text-[#1E2125] text-2xl mobile:text-xl font-medium">
                                    {heading[data?.type]}
                                </h1>

                                {interaction?.fileUrl ?
                                    <div className="flex flex-col items-center justify-center gap-5">
                                        <div className=" w-full flex flex-col items-end justify-end gap-[7px] ">
                                            <p className="text-[14px] leading-[14px] font-variation-customOpt16 font-normal text-[#36556CE5]">
                                                {data?.userName}
                                            </p>
                                            <p className="text-[12px] leading-[12px] font-variation-customOpt16 font-normal text-[#36556CE5]">
                                                {formatDate(interaction?.createdTimestamp)}
                                            </p>
                                        </div>
                                        <img
                                            src={interaction?.fileUrl}
                                            alt="img"
                                            className="w-[auto] h-[auto]"
                                        />
                                    </div> :
                                    data?.type === 'dedication' ?
                                        (<div className="flex flex-col gap-[10px] w-[720px] mobile:w-[321px] min-h-[370px] h-auto mobile:h-auto overflow-hidden rounded-[3px] relative pt-[38px] mobile:py-[40px] mobile:px-[35px] mt-6">
                                            <Image
                                                src={"/memory_paper_slider.jpg"}
                                                alt="Background"
                                                width={720}
                                                height={370}
                                                className="absolute top-0 left-0 object-cover w-full h-full"
                                            />
                                            <div className="w-[522px] h-auto mobile:w-[255px] relative mx-auto">
                                                <div className="flex justify-between items-center gap-[10px]">
                                                    <h3
                                                        className="text-[40px] mobile:text-[24px] font-greatVibes font-normal text-[#1E2125]"
                                                        style={{
                                                            textShadow: "0px 1px 1px #000000, 0px 4px 4px #00000040",
                                                        }}
                                                    >
                                                        {interaction?.title}
                                                    </h3>
                                                    <div className="flex flex-col items-end justify-end gap-[7px] ">
                                                        <p className="text-[14px] leading-[14px] font-variation-customOpt16 font-normal text-[#36556CE5]">
                                                            {data?.userName}
                                                        </p>
                                                        <p className="text-[12px] leading-[12px] font-variation-customOpt16 font-normal text-[#36556CE5]">
                                                            {formatDate(interaction?.createdTimestamp)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p
                                                    ref={messageRef}
                                                    className="text-[16px] leading-[24px] font-normal text-[#1E2125] mt-[19px]"
                                                    style={{
                                                        background:
                                                            "linear-gradient(180deg, #414141 76.56%, rgba(166, 166, 167, 0.1) 96.35%)",
                                                        WebkitBackgroundClip: "text",
                                                        backgroundClip: "text",
                                                        maxHeight:
                                                            !showFullDedicationText && shouldTruncate
                                                                ? `${maxHeight}px`
                                                                : "none",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {interaction?.message.split("\n").map((line, index) => (
                                                        <React.Fragment key={index}>
                                                            {line}
                                                            <br />
                                                        </React.Fragment>
                                                    ))}
                                                </p>

                                                {shouldTruncate && !showFullDedicationText && (
                                                    <p
                                                        onClick={toggleDedicationText}
                                                        className="text-end text-[12px] leading-[100%] font-regular text-[#36556CB2]  mt-[26px]"
                                                    >
                                                        Odpri več
                                                    </p>
                                                )}

                                                {shouldTruncate && showFullDedicationText && (
                                                    <p
                                                        onClick={toggleDedicationText}
                                                        className="text-end text-[12px] leading-[100%] font-regular text-[#36556CB2]  mt-[26px]"
                                                    >
                                                        Zapri
                                                    </p>
                                                )}
                                            </div>
                                        </div>)
                                        :
                                        <p className="text-[#3C3E41] text-[14px] mb-2 whitespace-pre-line break-words">
                                            <div className="flex flex-col items-end justify-end gap-[7px] mb-4 ">
                                                <p className="text-[14px] leading-[14px] font-variation-customOpt16 font-normal text-[#36556CE5]">
                                                    {data?.userName}
                                                </p>
                                                <p className="text-[12px] leading-[12px] font-variation-customOpt16 font-normal text-[#36556CE5]">
                                                    {formatDate(interaction?.createdTimestamp)}
                                                </p>
                                            </div>
                                            <p>{interaction?.message}</p>
                                            {(interaction?.relation && isSafeUrl(interaction?.relation)) ?
                                                <p className="flex items-center justify-start gap-2 mt-4">
                                                    <span>Link: </span>
                                                    <a
                                                        href={normalizeUrl(interaction.relation)}
                                                        target="_blank"
                                                        rel="noopener noreferrer nofollow ugc"
                                                        className="text-blue-400 hover:text-blue-600 hover:underline hover:underline-offset-[5px]">{interaction?.relation}
                                                    </a>
                                                </p>
                                                : null}

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
