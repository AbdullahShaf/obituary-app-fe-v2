"use client";

import {
    Modal,
    ModalContent
} from "@nextui-org/react";
import cancle_icon from "@/public/cancle_icon.png";
import Image from "next/image";
import giftIcon from "@/public/gift-icon.png";
import userService from "@/services/user-service";

export default function ModalKeeperNotification({
    isShowModal,
    setIsShowModal,
    keeperNotification
}) {
    const updateStatus = async () => {
        await userService.updateKeeperStatus(keeperNotification?.id);
    };

    return (
        <Modal
            isOpen={isShowModal}
            onOpenChange={(open) => {
                setIsShowModal(open)
                if (!open) {
                    updateStatus();
                }
            }}
            scrollBehavior={'outside'}
            classNames={{
                backdrop: "bg-[#344054B2] bg-opacity-70",
            }}
        >
            <ModalContent className="flex items-center justify-center w-full mt-32">
                <div className="flex flex-col w-full items-center justify-center desktop:w-[300px]">
                    <div className="flex  " />
                    <div className="flex flex-col bg-[#E8F0F6]  rounded-2xl ">
                        <div
                            onClick={() => {
                                updateStatus();
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
                        <div className="flex w-[500px] mobile:w-[344px] z-50 mobile:px-[2px] px-7 pb-11 mobile:mt-11 mt-12  items-center justify-center">
                            <div className="mobile:w-[314px] w-[910px] bg-[#E1E6EC]  rounded-2xl border-[#6D778E] border pt-12 mobile:px-6 px-8 pb-7 flex flex-col">
                                <div>
                                    {/* <Image src={giftIcon} alt="imgPrevious" className=" w-[24px] h-[24px]" /> */}
                                    <p className="text-[#1E2125] text-2xl mobile:text-xl font-medium mb-2.5 text-center">
                                        <span>{keeperNotification?.Sender?.company}</span>{" "}
                                        <span>ti podarja status Skrbnika za cel mesec</span>{" "}
                                        <span>{keeperNotification?.Obituary?.name} {keeperNotification?.Obituary?.sirName}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-[20px]"></div>
                </div>
            </ModalContent>
        </Modal>
    );
}
