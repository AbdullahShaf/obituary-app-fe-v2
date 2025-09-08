"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import iconDropDown from "@/public/ico_dropdown_red.png";
import DropdownWithSearch from "./DropdownWithSearch";

import regionsAndCities from "@/utils/regionAndCities";
import ModalLibrary from "../appcomponents/ModalLibrary";
import ModalDigiCards from "../appcomponents/ModalDigiCards";
import ModalKeeperNotification from "../appcomponents/ModalKeeperNotification";
import Dropdown from "@/app/components/appcomponents/Dropdown";
import userService from "@/services/user-service";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import InfoModal from "./InfoModal";
import MemoryModal from "../appcomponents/MemoryModal";

const MyAccount = () => {
  const { user, isLoading, isAuthenticated, updateUserAndRefreshSession } =
    useAuth();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowCards, setIsShowCards] = useState(false);
  const [shownCard, setShownCard] = useState(0);
  const [select_id, setSelect_Id] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [digiCards, setDigiCards] = useState([]);
  const [showKeeperModal, setShowKeeperModal] = useState(false);
  const [keeperId, setKeeperId] = useState(null);
  const [keeperNotifications, setKeeperNotifications] = useState([]);
  const [keeperNotification, setKeeperNotification] = useState([]);
  const [memoryPopupOpen, setMemoryPopupOpen] = useState(false);
  const [notifyCard, setNotifyCard] = useState(null);
  const [showNotifyCard, setShowNotifyCard] = useState(false);

  // const [showImageView, setShowImageView] = useState(false)

  const CustomDropdown = ({
    label,
    data = [
      {
        place: "item 1",
        id: 1,
        url: "",
      },
      {
        place: "item 2",
        id: 2,
        url: "",
      },
      {
        place: "item 3",
        id: 3,
        url: "",
      },
    ],
  }) => {
    return (
      <div className={"dropdown w-[292px] desktopUserAcc:w-full h-[48px] "}>
        <div
          tabIndex={0}
          role="button"
          className={
            // 23 October 2024 desktopUserAcc:pl-[0px] tabletUserAcc:pl-[5px]
            "relative flex flex-1 items-center justify-between mobileUserAcc:justify-end h-full desktopUserAcc:pl-[0px] tabletUserAcc:pl-[0px] tabletUserAcc:pr-[0px] pl-[15.8px] pr-[10.5px] mobileUserAcc:pl-0 mobileUserAcc:pr-0 desktopUserAcc:pr-[15.5px] cursor-pointer"
          }
        >
          <span
            style={{
              fontSize: "13px",
              lineHeight: "20px",
              fontWeight: 400,
              color: "#ACACAC",
              fontVariationSettings: "'opsz' 16",
              marginRight: "10px",
            }}
          >
            {label}
          </span>
          <Image src={iconDropDown} className=" w-[11px] h-[7px]" />
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content z-[1] mobileUserAcc:w-[120px] menu p-3 shadow-box-shadow bg-base-100 rounded-box desktopUserAcc:w-52 tabletUserAcc:w-52"
        >
          {data.map((item, index) => (
            <li key={item.id}>
              <p>{item.place}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("sl-SI", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const cityOptions = [
    ...Object.values(regionsAndCities)
      .flat()
      .map((city) => ({
        place: city,
        id: city,
      }))
      .sort((a, b) => a.place.localeCompare(b.place, "sl")),
  ];

  const getAllCards = async () => {
    try {
      const response = await userService.getMyCards();
      if (response?.userCards?.length) {
        const myCards = response?.userCards?.filter(
          (item) => item?.cardPdf && item?.cardImage
        );
        setDigiCards(myCards);
        const foundCard = response?.userCards?.filter(
          (item) => !item?.isNotified
        );
        if (foundCard && foundCard?.length) {
          setNotifyCard(foundCard[0]);
          setShowNotifyCard(true);
        }
        console.log(">>>>>>>>>>>>>>>> foundCard", foundCard[0]);
      } else {
        setDigiCards([]);
      }

      const resp = await userService.getMyKeeperNotifications();
      if (resp) {
        setKeeperNotifications(resp?.notifications ?? []);
        if (resp?.notifications?.length) {
          const notifiedNotification = resp?.notifications?.filter(
            (item) => !item?.isNotified
          );
          if (notifiedNotification?.length) {
            setShowKeeperModal(true);
            setKeeperNotification(notifiedNotification[0]);
          }
        }
      }
    } catch (e) {
      toast.error("Napaka pri pridobivanju kartic.");
      console.error("getAllCards failed:", e);
    }
  };

  useEffect(() => {
    getAllCards();
  }, []);

  const handleCitySelect = async (item) => {
    try {
      const response = await updateUserAndRefreshSession({ city: item });
      if (response.success === true) {
        toast.success("City Updated Successfully");
      }
      setSelectedCity(item);
    } catch (error) {
      console.log(error);
      toast.error("Error Updating City");
    }
  };

  const updateStatus = async () => {
    await userService.updateKeeperStatus(keeperNotification?.id);
  };

  const updateCardStatus = async () => {
    await userService.updateCardStatus(notifyCard?.id);
  };

  return (
    <div className="flex flex-col mx-auto w-full tabletUserAcc:max-w-[744px] mobileUserAcc:max-w-[360px]">
      <ModalLibrary
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        select_id={select_id}
        set_Id={setSelect_Id}
        selectedImage={selectedImage}
      />
      <div
        className="flex mt-[75px] tabletUserAcc:mt-[46px] gap-y-5 mobileUserAcc:gap-y-3 flex-col desktopUserAcc:pr-[170px] pr-0
                mobileUserAcc:mt-[27px]"
      >
        {digiCards?.length ? (
          <>
            {digiCards.map((digiCard) => {
              return (
                <span
                  key={digiCard}
                  className="inline-flex items-center text-[14px] text-[#4B5563] font-variation-customOpt14 mobileUserAcc:text-[#9CA3AF] mobileUserAcc:text-[13px] mobileUserAcc:font-variation-customOpt13 font-semibold mb-1 space-x-3 transition-colors duration-300 hover:text-[#2563EB]"
                >
                  {/* Stylish Gift Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-[#4B5563] mobileUserAcc:text-[#9CA3AF] transition-colors duration-300 group-hover:text-[#2563EB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 12h20"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 12V7a4 4 0 10-4 4h8a4 4 0 10-4-4v5"
                    />
                  </svg>
                  {/* Text */}
                  <span
                    className="relative cursor-pointer"
                    onClick={() => {
                      setMemoryPopupOpen(true);
                      setShownCard(digiCard);
                    }}
                  >
                    {digiCard.user.company} ti pošilja digitalno kartico{" "}
                    {digiCard.obit.name} {digiCard.obit.sirName} (
                    {formatDate(digiCard.createdTimestamp).replace(/\s/g, "")})
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </span>
                </span>
              );
            })}
          </>
        ) : null}

        {keeperNotifications?.length ? (
          <>
            {keeperNotifications?.map((item) => {
              return (
                <span
                  key={item.id}
                  className="inline-flex items-center text-[14px] text-[#4B5563] font-variation-customOpt14 mobileUserAcc:text-[#9CA3AF] mobileUserAcc:text-[13px] mobileUserAcc:font-variation-customOpt13 font-semibold mb-1 space-x-3 transition-colors duration-300 hover:text-[#2563EB]"
                >
                  {/* Stylish Gift Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-[#4B5563] mobileUserAcc:text-[#9CA3AF] transition-colors duration-300 group-hover:text-[#2563EB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 12h20"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 12V7a4 4 0 10-4 4h8a4 4 0 10-4-4v5"
                    />
                  </svg>
                  {/* Text */}
                  <span
                    className="relative cursor-pointer"
                    onClick={() => {
                      setShowKeeperModal(true);
                      setKeeperNotification(item);
                    }}
                  >
                    {item.Sender.company} ti podarja status Skrbnika za cel
                    mesec {item.Obituary.name} {item.Obituary.sirName} (
                    {formatDate(item.createdTimestamp).replace(/\s/g, "")})
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </span>
                </span>
              );
            })}
          </>
        ) : null}

        <div className="flex gap-[26px] mobileUserAcc:gap-3 mobileUserAcc:flex-col tabletUserAcc:justify-between">
          <div className="flex desktopUserAcc:w-[403px] flex-col w-full">
            <label className="text-[14px] text-[#6D778E] font-variation-customOpt14 mobileUserAcc:text-[#ACACAC] mobileUserAcc:text-[13px] mobileUserAcc:font-variation-customOpt13 font-normal mb-1">
              E-NASLOV
            </label>
            <div className="border-b-2 mobileUserAcc:border-b-0 w-full border-[#A1B1D425]  focus:border-blue-300 text-[#3C3E41] py-1 text-[16px] bg-transparent">
              {user?.email}
            </div>
          </div>
          <div className="flex desktopUserAcc:w-[282px] flex-col w-full mobileUserAcc:hidden ">
            <label className="text-[14px] text-[#6D778E] font-variation-customOpt14 mobileUserAcc:text-[#ACACAC] mobileUserAcc:text-[13px] mobileUserAcc:font-variation-customOpt13 font-normal mb-1">
              REGISTRIRAN
            </label>
            <div className="border-b-2 mobileUserAcc:border-b-0 border-[#A1B1D425] focus:outline-none focus:border-blue-300 w-full text-[#3C3E41] py-1 text-[16px] bg-transparent">
              {formatDate(user?.createdTimestamp)}
            </div>
          </div>
        </div>

        <div className="flex gap-[26px]">
          <div className="flex desktopUserAcc:w-[403px] w-full flex-col">
            <div className="flex-row flex  justify-between ">
              <label className="text-[14px] text-[#6D778E] font-variation-customOpt14 mobileUserAcc:text-[#ACACAC] mobileUserAcc:text-[13px] mobileUserAcc:font-variation-customOpt13 font-normal mb-1">
                GESlO
              </label>
              {/* 17 October 2024 */}
              <div
                onClick={() => {
                  setSelect_Id("2");
                  setIsShowModal(true);
                }}
                className="text-[13px] hidden mobileUserAcc:flex justify-center items-center text-[#ACACAC] ml-1 text-center  font-variation-customOpt13 font-normal mb-1"
              >
                Spremeni geslo
              </div>
            </div>
            <div className="flex">
              <div className="border-b-2 mobileUserAcc:border-b-0 w-full border-[#A1B1D425] focus:outline-none focus:border-blue-300 text-[#3C3E41] py-1 text-[16px] bg-transparent">
                ************
              </div>
            </div>

            <div className="hidden mobileUserAcc:flex flex-col w-full mt-[12px]  ">
              <label className="text-[14px] text-[#6D778E] font-variation-customOpt14 mobileUserAcc:text-[#ACACAC] mobileUserAcc:text-[13px] mobileUserAcc:font-variation-customOpt13 font-normal mb-1">
                REGISTRIRAN
              </label>
              <div className="border-b-2 mobileUserAcc:border-b-0 border-[#A1B1D425] focus:outline-none focus:border-blue-300 w-full text-[#3C3E41] py-1 text-[16px] bg-transparent">
                {formatDate(user?.createdTimestamp)}
              </div>
            </div>
          </div>
          <div className="flex desktopUserAcc:w-[282px] w-full flex-col mobileUserAcc:hidden">
            {/* 17 October 2024 */}
            <label
              onClick={() => {
                console.log("working");
                setSelect_Id("2");
                setIsShowModal(true);
              }}
              className="text-[14px] text-[#0A85C2] font-variation-customOpt14 font-normal mb-1"
            >
              SPREMENI GESLO
            </label>
            <div className="border-b-2 border-[#A1B1D425] focus:outline-none focus:border-blue-300 w-full text-[#3C3E41] py-1 text-[16px] bg-transparent mt-6"></div>
          </div>
        </div>

        {/* <div className="flex desktopUserAcc:w-[403px] flex-col w-full">
            <div
              style={{
                color: "#0A85C2",
                fontSize: "24px",
                fontWeight: 500,
                // fontVariationSettings: "'wdth' 50,'wght' 500,'opsz' 24",
                fontVariationSettings: "'wdth' 50,'wght' 600,'opsz' 32",
              }}
              className="flex"
            >
              Lokalno:
              <div
                style={{
                  color: "#EB1D1D",
                  fontSize: "24px",
                  fontWeight: 500,
                  fontVariationSettings: "'wdth' 50,'wght' 500,'opsz' 20",
                  marginLeft: "10px",
                }}
              >
                Maribor
              </div>
            </div>
            <div className="text-[13px] font-normal text-[#6D778E] -mt-1 ">
              (omogoči hitri lokalni pregled na prvi strani)
            </div>
          </div>
          <div className="flex h-10 w-[270px] mobileUserAcc:w-8 border-b-[1px] mobileUserAcc:border-b-0 border-[#A1B1D440] justify-between pl-3 pr-8 mobileUserAcc:pl-0 mobileUserAcc:pr-0 items-center  mobileUserAcc:hidden">
            <div className="text-[#6D778E] font-normal text-[16px] flex mobileUserAcc:hidden ">
              Izberi lokalni kraj
            </div>
            <Image
              src="/icon_red_down_arrow.png"
              className="w-3 h-2  "
              width={12}
              height={8}
            />
          </div> */}
        <div className="flex gap-[26px] mt-[50px] mobileUserAcc:mt-[24px] mobileUserAcc:gap-0 tabletUserAcc:justify-between mobileUserAcc:flex-col-reverse">
          <div className="flex desktopUserAcc:w-[403px] flex-col w-full">
            <div
              className="text-[24px] text-[#0A85C2] font-variation-customOpt14 flex justify-between font-medium mb-1 mobile:flex-wrap"
              style={{
                fontVariationSettings: "'wdth' 50,'wght' 600,'opsz' 32",
              }}
            >
              <div>
                Lokalno:
                <span
                  style={{
                    color: "#EB1D1D",
                    fontSize: "20px",
                    fontWeight: 500,
                    fontVariationSettings: "'wdth' 50,'wght' 500,'opsz' 20",
                    marginLeft: "10px",
                  }}
                >
                  {user?.city
                    ? user.city
                    : selectedCity
                    ? selectedCity
                    : "Izberi občino"}
                </span>
              </div>
              <div className="hidden  h-5 w-24   justify-between pl-0 pr-0 items-center mobileUserAcc:flex mobile:w-[100%] mobile:block mobile:relative mobile:top-8 mobile:text-sm">
                <DropdownWithSearch
                  onSelectCity={handleCitySelect}
                  selectedCity={selectedCity}
                />
              </div>
            </div>
            <div className="text-[13px] font-normal text-[#6D778E] -mt-1 mobile:-mt-6">
              (omogoči hitri lokalni pregled na prvi strani)
            </div>
          </div>
          <div className="flex w-full mobileUserAcc:w-auto desktopUserAcc:w-[282px] h-10   mobileUserAcc:border-b-0  justify-between mobileUserAcc:justify-end desktopUserAcc:pl-0 desktopUserAcc:pr-0 tabletUserAcc:pl-0 tabletUserAcc:pr-0 pl-3 pr-8 mobileUserAcc:pl-0 mobileUserAcc:pr-0 items-center">
            <div className="flex h-10 w-[270px] tabletUserAcc:w-full mobileUserAcc:w-8  mobileUserAcc:border-b-0  justify-between desktopUserAcc:pl-0 tabletUserAcc:pl-0 pl-3 desktopUserAcc:pr-0 tabletUserAcc:pr-0 pr-8 mobileUserAcc:pl-0 mobileUserAcc:pr-0 items-center  mobileUserAcc:hidden">
              <DropdownWithSearch
                onSelectCity={handleCitySelect}
                selectedCity={selectedCity}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-[66px] mobileUserAcc:mt-[58px] tabletUserAcc:mt-[80px]">
        <div
          className="text-[24px] text-[#0A85C2] font-variation-customOpt24wght50"
          style={{
            fontVariationSettings: "'wdth' 50,'wght' 500,'opsz' 24",
          }}
        >
          Nastavitve sporočil <span className="text-[20px]">(kmalu)</span>
        </div>
        <div className="flex w-full mt-7 mobileUserAcc:mt-4 flex-col">
          <div className="flex  tabletUserAcc:items-center desktopUserAcc:items-center mobileUserAcc:flex-col">
            <div className="flex  items-center ">
              {/* 17 October 2024 */}
              <label className="text-[16px] tabletUserAcc:text-[15px] text-[#3C3E41] font-variation-customOpt16">
                DA
              </label>

              <Image
                src="/img_toggle.png"
                className="w-8 h-8 mobileUserAcc:h-4 object-cover mx-3"
                width={32}
                height={32}
              />

              {/* 17 October 2024 */}
              <label className="text-[16px] tabletUserAcc:text-[15px] text-[#3C3E41] font-variation-customOpt16">
                NE
              </label>
            </div>

            {/* 17 October 2024 */}
            <div className="text-[16px] tabletUserAcc:text-[15px] mobileUserAcc:mt-2 mobileUserAcc:text-[14px] text-[#3C3E41] font-variation-customOpt16 mobileUserAcc:text-[#6D778E] mobileUserAcc:font-variation-customOpt14 ml-[27px] mobileUserAcc:ml-0">
              Lokalne osmrtnice (Dnevno)
            </div>
          </div>

          {/* 17 October 2024 */}
          <div className="flex  tabletUserAcc:items-center desktopUserAcc:items-center mobileUserAcc:flex-col mobileUserAcc:mt-5">
            <div className="flex items-center">
              <label className="text-[16px] tabletUserAcc:text-[15px] text-[#3C3E41] font-variation-customOpt16">
                DA
              </label>

              <Image
                src="/img_toggle.png"
                className="w-8 h-8 mobileUserAcc:h-4 object-cover mx-3"
                width={32}
                height={32}
              />

              {/* 17 October 2024 */}
              <label className="text-[16px] tabletUserAcc:text-[15px] text-[#3C3E41] font-variation-customOpt16">
                NE
              </label>
            </div>

            {/* 17 October 2024 */}
            <div className="text-[16px] tabletUserAcc:text-[15px] mobileUserAcc:mt-2 mobileUserAcc:text-[14px] text-[#3C3E41] mobileUserAcc:text-[#6D778E] mobileUserAcc:font-variation-customOpt14 font-variation-customOpt16 ml-[27px] mobileUserAcc:ml-0">
              Ko je potrebna potrditev objave, ko nekdo doda vsebino na strani,
              kjer si Skrbnik{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-[113px] tabletUserAcc:mt-[100px] gap-1 w-[190px] items-center mobileUserAcc:hidden">
        <div
          className="text-[24px] text-[#0A85C2] font-variation-customOpt24wght50"
          style={{
            fontVariationSettings: "'wdth' 50,'wght' 500,'opsz' 24",
          }}
        >
          Moja naročila
        </div>
        <Image
          src="/img_left_arrow.png"
          className="w-8 h-8 object-cover"
          width={32}
          height={32}
        />
      </div>

      <ModalDigiCards
        isShowModal={isShowCards}
        setIsShowModal={setIsShowCards}
        data={digiCards}
        setShownCard={setShownCard}
        shownCard={shownCard}
      />

      <InfoModal
        icon={"/giftbox.svg"}
        heading={keeperNotification?.Sender?.company}
        text={"ti podarja status Skrbnika za cel mesec"}
        name={`${keeperNotification?.Obituary?.name} ${keeperNotification?.Obituary?.sirName}`}
        isOpen={showKeeperModal}
        onClose={() => {
          setShowKeeperModal(false);
          if (keeperNotification?.id) {
            updateStatus();
          }
        }}
      />

      <InfoModal
        icon={"/giftbox.svg"}
        heading={notifyCard?.senderUser?.company}
        text={"ti podarja digitalno kartico"}
        name={`${notifyCard?.obit?.name} ${notifyCard?.obit?.sirName}`}
        isOpen={showNotifyCard}
        onClose={() => {
          setShowNotifyCard(false);
          if (notifyCard?.id) {
            updateCardStatus();
          }
        }}
      />

      <MemoryModal
        isOpen={memoryPopupOpen}
        onClose={() => setMemoryPopupOpen(false)}
        shownCard={shownCard}
      />
    </div>
  );
};

export default MyAccount;
