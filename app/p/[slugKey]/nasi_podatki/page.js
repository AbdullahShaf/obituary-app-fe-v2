"use client";
import CompanyAccountLayout from "@/app/components/appcomponents/CompanyAccountLayout";
import companyService from "@/services/company-service";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ChangePasswordModal from "@/app/components/appcomponents/ChangePasswordModal";
import regionsAndCities from "@/utils/regionAndCities";
import DropdownWithSearch from "@/app/components/appcomponents/DropdownWithSearch";
import userService from "@/services/user-service";
import toast from "react-hot-toast";
import ModalNew3 from "@/app/components/appcomponents/ModalNew3";
import { useAuth } from "@/hooks/useAuth";
import Modal from "../../../components/ui/model";

const citiesArr = [
  "secondaryCity",
  "thirdCity",
  "fourthCity",
  "fifthCity",
  "sixthCity",
  "seventhCity",
  "eightCity",
];

export default function AccountSettings() {
  const { refreshUserSession } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPrivilegijiExpanded, setIsPrivilegijiExpanded] = useState(false);

  useEffect(() => {
    getCompleteCompanyData();
  }, []);
  const [data, setData] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);
  const [isShowModal1, setIsShowModal1] = useState(false);
  const [select_id, setSelect_Id] = useState("");
  const [isPopUP7, setIsPopUP7] = useState(false);
  const [isPopUP8, setIsPopUP8] = useState(false);

  const getCompleteCompanyData = async () => {
    try {
      const queryParams = {};
      queryParams.type = "FUNERAL";
      const response = await companyService.getCompleteCompany(queryParams);
      console.log(response);
      setData(response.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalVisibility = () => {
    setIsModalVisible(true);
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

  const handleCitySelect = async (item, columnName) => {
    let payload = {};
    const getColumnKey = citiesArr.find((key) => !data[key]) || null;
    if (item) {
      payload = { [getColumnKey]: item };
    } else {
      payload = { [columnName]: null };
    }

    try {
      const response = await userService.updateMyUser(payload);
      if (response) {
        await refreshUserSession();
        toast.success("Občina je bila posodobljena");
        setSelectedCity(item);
        const updated = columnName
          ? { [columnName]: null }
          : { [getColumnKey]: item };

        setData((prevData) => ({
          ...prevData,
          ...updated,
        }));
      } else {
        // toast.error("Prišlo je do napake pri posodabljanju občine.");
      }
    } catch (error) {
      console.log(error);
      // toast.error("Prišlo je do napake pri posodabljanju občine.");
    }
  };

  return (
    <CompanyAccountLayout isMobileViewChange={true}>
      <div className="w-full mobile:min-w-full max-w-[1000px] min-w-[720px]">
        <div
          style={{
            fontVariationSettings: "'wdth' 50,'wght' 500,'opsz' 32",
          }}
          className={`pt-[10px] mobile:block hidden flex text-[20px] text-[#0A85C2]`}
        >
          Naš uporabniški račun
        </div>
        <div className="grid grid-cols-2 tabletUserAcc:grid-cols-1 mobileUserAcc:grid-cols-1 gap-4 text-[#6D778E] mobile:mt-[30px] mt-[60px] text-[14px]">
          <div className="space-y-[18px]">
            <div className="flex items-center gap-[12px]">
              <span className="uppercase">Podjetje:</span>
              <span className="text-[#3C3E41]">{data?.company}</span>
            </div>
            <div className="flex items-center gap-[12px]">
              <span className="uppercase">Enote:</span>
              <span className="text-[#3C3E41]">{data?.name}</span>
            </div>
            <div className="flex items-center gap-[12px]">
              <span className="uppercase">NASLOV:</span>
              <span className="text-[#3C3E41]">
                {data?.CompanyPage?.address}
              </span>
            </div>

            <div className="flex items-center gap-[12px]">
              <span className="uppercase">Email:</span>
              <span className="text-[#3C3E41]">{data?.email}</span>
            </div>

            <div className="flex items-center gap-[12px]">
              <span className="uppercase">spletna stran:</span>
              <span className="text-[#3C3E41]">
                {data?.CompanyPage?.website}
              </span>
            </div>
            <button
              onClick={() => {
                setIsShowModal1(true);
              }}
              className="inline-flex items-center gap-3"
            >
              <span className="text-[#2c7ba3] text-[14px]   ">
                DOPOLNI PODATKE
              </span>
            </button>
          </div>
          <div className="space-y-[18px]">
            <div className="flex items-center gap-[12px]">
              <span className="uppercase">geslo:</span>
              <span className="text-[#3C3E41]">**************</span>
            </div>
            {/* <div className="flex items-center gap-[12px]">
              <button
                onClick={handleModalVisibility}
                className="inline-flex items-center gap-3"
              >
                <img
                  src="/plus_icon_blue.png"
                  alt="add icon"
                  className="size-6"
                />
                <span className="text-[#2c7ba3] text-[14px] uppercase underline">
                  izberi novo geslo:
                </span>
              </button>

              <span className="text-[#3C3E41]"></span>
            </div> */}
          </div>
        </div>
        <hr className="my-[28px]" />

        <div className="space-y-4 text-[#6D778E] text-[14px]">
          <div className="space-y-1">
            <span className="uppercase">OBČINA:</span>
            <div className="grid mobile:grid-cols-1 grid-cols-2 gap-[12px] mobile:px-0 px-6 pb-[10px]">
              <div className="flex items-center gap-[12px] ">
                <span className="uppercase">Primarno:</span>
                <span className="text-[#3C3E41]">{data?.city}</span>
              </div>
              <div className="flex items-center mobile:hidden gap-[38px]">
                <div>
                  <DropdownWithSearch
                    onSelectCity={handleCitySelect}
                    selectedCity={selectedCity}
                    placeholder={"Dodaj še drugo mesto"}
                  />
                </div>
                {/* <Link
                  href=""
                  className="inline-flex items-center gap-3 tabletUserAcc:hidden mobileUserAcc:hidden"
                >
                  <img
                    src="/question_icon_blue.png"
                    alt="add icon"
                    className="size-6"
                  />
                  <span className="text-[#2c7ba3] text-[14px] uppercase underline">
                    Preveri, kako gre
                  </span>
                </Link> */}
              </div>
            </div>
            {citiesArr?.map(
              (el, index) =>
                data?.[el] && (
                  <div
                    className="flex items-center gap-[12px] px-6"
                    key={`${el}_${index}`}
                  >
                    <span className="uppercase">Dodatno:</span>
                    <span className="text-[#3C3E41]">
                      {data?.[el]}
                      <span
                        className="text-[red]"
                        onClick={() => handleCitySelect(null, el)}
                      >
                        (Zbriši)
                      </span>
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
        <hr className="mt-[24px]" />

        {/* PRIVILEGES SECTION */}
        <div className="space-y-4 text-[#6D778E] mt-[60px] text-[14px]">
          <div className="grid grid-cols-2 tabletUserAcc:grid-cols-1 mobileUserAcc:grid-cols-1 gap-4">
            <div className="flex items-center gap-[20px]">
              <h4
                className="text-[#2c7ba3] text-[20px] font-medium pb-2 flex items-center cursor-pointer hover:text-[#1d5a78] transition-colors"
                style={{
                  fontVariationSettings: "'wdth' 50,'opsz' 26",
                }}
                onClick={() => setIsPrivilegijiExpanded(!isPrivilegijiExpanded)}
              >
                Privilegiji
                <svg
                  className={`ml-2 w-5 h-5 transition-transform ${
                    isPrivilegijiExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </h4>
              <button
                onClick={() => setIsPopUP7(true)}
                className="text-[#EB1D1D] outline-none"
                title="Help"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 55 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_8894_2304)">
                    <path
                      d="M27.5 3.91667C38.2983 3.91667 47.0833 12.7018 47.0833 23.5C47.0833 34.2983 38.2983 43.0833 27.5 43.0833C16.7018 43.0833 7.91667 34.2983 7.91667 23.5C7.91667 12.7018 16.7018 3.91667 27.5 3.91667ZM27.5 0C14.5221 0 4 10.5221 4 23.5C4 36.4779 14.5221 47 27.5 47C40.4779 47 51 36.4779 51 23.5C51 10.5221 40.4779 0 27.5 0ZM29.9479 33.2917C29.9479 34.6429 28.8532 35.7396 27.5 35.7396C26.1507 35.7396 25.0521 34.6429 25.0521 33.2917C25.0521 31.9404 26.1507 30.8438 27.5 30.8438C28.8532 30.8438 29.9479 31.9404 29.9479 33.2917ZM32.6759 13.7122C31.4852 12.5059 29.709 11.842 27.6802 11.842C23.411 11.842 20.6497 14.8775 20.6497 19.5775H24.588C24.588 16.6674 26.2114 15.6353 27.5999 15.6353C28.8415 15.6353 30.1594 16.4598 30.271 18.0363C30.3925 19.695 29.5073 20.537 28.3871 21.6024C25.622 24.2324 25.571 25.5053 25.5828 28.3939H29.5093C29.4838 27.0935 29.568 26.038 31.3403 24.1286C32.6661 22.699 34.315 20.9209 34.3483 18.2105C34.3698 16.401 33.7921 14.8442 32.6759 13.7122Z"
                      fill="#EB1D1D"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_8894_2304"
                      x="0"
                      y="0"
                      width="55"
                      height="55"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_8894_2304"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_8894_2304"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`space-y-3 overflow-hidden transition-all duration-300 ${
              isPrivilegijiExpanded
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {/* Funeral Company List Publication */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={data?.createObituaryPermission}
                disabled
                readOnly
                className="w-4 h-4 text-[#0A85C2] bg-gray-100 border-gray-300 rounded focus:ring-[#0A85C2] focus:ring-2 cursor-not-allowed disabled:opacity-100 disabled:bg-[#0A85C2] disabled:checked:bg-[#0A85C2]"
              />
              <span className="text-[#3C3E41]">
                Objava na seznamu pogrebnih podjetij
              </span>
            </div>

            {/* Website */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={false}
                disabled
                readOnly
                className="w-4 h-4 text-[#0A85C2] bg-gray-100 border-gray-300 rounded focus:ring-[#0A85C2] focus:ring-2 cursor-not-allowed disabled:opacity-100 disabled:bg-[#0A85C2] disabled:checked:bg-[#0A85C2]"
              />
              <span className="text-[#3C3E41]">Spletna stran</span>
            </div>

            {/* Obituary Publication */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={data?.createObituaryPermission}
                disabled
                readOnly
                className="w-4 h-4 text-[#0A85C2] bg-gray-100 border-gray-300 rounded focus:ring-[#0A85C2] focus:ring-2 cursor-not-allowed disabled:opacity-100 disabled:bg-[#0A85C2] disabled:checked:bg-[#0A85C2]"
              />
              <span className="text-[#3C3E41]">Objava osmrtnic</span>
            </div>

            {/* Monthly Administrators */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={data?.assignKeeperPermission}
                disabled
                readOnly
                className="w-4 h-4 text-[#0A85C2] bg-gray-100 border-gray-300 rounded focus:ring-[#0A85C2] focus:ring-2 cursor-not-allowed disabled:opacity-100 disabled:bg-[#0A85C2] disabled:checked:bg-[#0A85C2]"
              />
              <span className="text-[#3C3E41]">Mesečni skrbniki</span>
            </div>

            {/* Digital Mobile Cards */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={data?.sendMobilePermission}
                disabled
                readOnly
                className="w-4 h-4 text-[#0A85C2] bg-gray-100 border-gray-300 rounded focus:ring-[#0A85C2] focus:ring-2 cursor-not-allowed disabled:opacity-100 disabled:bg-[#0A85C2] disabled:checked:bg-[#0A85C2]"
              />
              <span className="text-[#3C3E41]">Digitalne mobi kartice</span>
            </div>

            {/* Additional Municipality */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!data?.secondaryCity}
                disabled
                readOnly
                className="w-4 h-4 text-[#0A85C2] bg-gray-100 border-gray-300 rounded focus:ring-[#0A85C2] focus:ring-2 cursor-not-allowed disabled:opacity-100 disabled:bg-[#0A85C2] disabled:checked:bg-[#0A85C2]"
              />
              <span className="text-[#3C3E41]">Dodatna občina</span>
            </div>

            {/* Memorial Page Participation */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked
                disabled
                readOnly
                className="w-4 h-4 text-[#0A85C2] bg-gray-100 border-gray-300 rounded focus:ring-[#0A85C2] focus:ring-2 cursor-not-allowed disabled:opacity-100 disabled:bg-[#0A85C2] disabled:checked:bg-[#0A85C2]"
              />
              <span className="text-[#3C3E41]">
                Sodelovanje na spominskih straneh
              </span>
            </div>

            {/* Risk-Free Promotion */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={true}
                disabled
                readOnly
                className="w-4 h-4 text-[#0A85C2] bg-gray-100 border-gray-300 rounded focus:ring-[#0A85C2] focus:ring-2 cursor-not-allowed disabled:opacity-100 disabled:bg-[#0A85C2] disabled:checked:bg-[#0A85C2]"
              />
              <span className="text-[#3C3E41]">Promocija BREZ RIZIKA</span>
              <span className="text-[#6D778E] text-[12px]">(odpri)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 tabletUserAcc:grid-cols-3 mobileUserAcc:grid-cols-1 gap-4 text-[#6D778E] mt-[60px] text-[14px]">
          <div className="flex items-center gap-[12px] tabletUserAcc:col-span-2 mobileUserAcc:col-span-2">
            <span className="uppercase">stran na osmrtnica.com:</span>
            {/* <Link
              href={`/funeralcompany/${data?.CompanyPage?.id}`}
              className="text-[#3C3E41]"
            >
              {`/funeralcompany/${data?.CompanyPage?.id}`}
            </Link> */}
          </div>
          <div className="flex items-center gap-[12px]">
            <span className="uppercase">izdelana:</span>
            {/* <span className="text-[#3C3E41]">
              {(() => {
                const date = new Date(data?.CompanyPage?.createdTimestamp);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                return `${day}.${month}.${year}`;
              })()}
            </span> */}
          </div>
        </div>
      </div>
      {isModalVisible && (
        <ChangePasswordModal setModalVisible={setIsModalVisible} />
      )}
      <ModalNew3
        isShowModal={isShowModal1}
        setIsShowModal={setIsShowModal1}
        select_id={select_id}
        set_Id={setSelect_Id}
        data={data?.CompanyPage?.id}
        onChange={(updatedShops) => {
          getCompleteCompanyData();
          console.log(updatedShops, "====");
        }}
      />
      <Modal
        index={7}
        open={isPopUP7}
        onClose={() => setIsPopUP7(false)}
        onFooterClick={() => {
          setIsPopUP7(false);
          setIsPopUP8(true);
        }}
      />
      <Modal index={8} open={isPopUP8} onClose={() => setIsPopUP8(false)} />
    </CompanyAccountLayout>
  );
}
