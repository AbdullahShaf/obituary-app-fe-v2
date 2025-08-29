"use client";

import {
    Modal,
    ModalContent
} from "@nextui-org/react";
import cancle_icon from "@/public/cancle_icon.png";
import Image from "next/image";
import API_BASE_URL from "@/config/apiConfig";
import { toast } from "react-hot-toast";

export default function ModalDigiCards({
    isShowModal,
    setIsShowModal,
    data
}) {
    const downloadCard = (id) => {
        const downloadURL = `${API_BASE_URL}/user/me/download/${id}`;

        const popup = window.open(downloadURL, '_blank', 'noopener,noreferrer');
        if (!popup) {
            alert('Popup blocked. Please allow popups for this site.');
            return;
        }
        toast.success("Kartica je bila uspešno prenesena");
    };


    return (
        <Modal
            isOpen={isShowModal}
            onOpenChange={(open) => setIsShowModal(open)}
            scrollBehavior={'outside'}
            classNames={{
                backdrop: "bg-[#344054B2] bg-opacity-70",
            }}
        >
            <ModalContent className="flex items-center justify-center w-full mt-32">
                <div className="flex flex-col w-full items-center justify-center desktop:w-[70%]">
                    <div className="flex  " />
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
                        <div className="flex w-[100%] mobile:w-[344px] z-50 mobile:px-[2px] px-7 pb-11 mobile:mt-11 mt-12  items-center justify-center">
                            <div className="mobile:w-[314px] w-[910px] bg-[#E1E6EC]  rounded-2xl border-[#6D778E] border pt-12 mobile:px-6 px-8 pb-7 flex flex-col">
                                <h1 className="text-[#1E2125] text-2xl mobile:text-xl font-medium mb-2.5 text-center">
                                    Moje darilne kartice
                                </h1>

                                {data && data?.length ? (
                                    <div className="flex justify-center mt-5">
                                        {data?.map((item) => {
                                            return (
                                                <div key={item.id} className="w-[23%]">
                                                    <Image
                                                        src={`${API_BASE_URL}/${item?.cardImage}`}
                                                        alt={`Digi card`}
                                                        loading="lazy"
                                                        width={500}
                                                        height={500}
                                                        className="w-[100%]"
                                                    />
                                                    <button
                                                        onClick={() => downloadCard(item?.id)}
                                                        style={{
                                                            boxShadow: "5px 5px 10px #A6ABBD, -5px -5px 10px #FAFBFF",
                                                        }}
                                                        className="w-full h-[60px] rounded-[10px] bg-[#09C1A3] text-white font-semibold text-xl mt-4"
                                                    >
                                                        Prenesi
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="flex h-[20px]"></div>
                </div>
            </ModalContent>
        </Modal>
    );
}
