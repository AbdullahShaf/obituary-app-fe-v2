"use client";
import CompanyAccountLayout from "@/app/components/appcomponents/CompanyAccountLayout";
import companyService from "@/services/company-service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ChangePasswordModal from "../../../components/appcomponents/ChangePasswordModal";
import regionsAndCities from "@/utils/regionAndCities";
import DropdownWithSearch from "@/app/components/appcomponents/DropdownWithSearch";
import userService from "@/services/user-service";
import toast from "react-hot-toast";
import ModalNew from "../../../components/appcomponents/ModalNew";
import shopService from "@/services/shop-service";
import ModalNew6 from "../../../components/appcomponents/ModalNew6";
import { useAuth } from "@/hooks/useAuth";
import Modal from "../../../components/ui/model";

export default function AccountSettings() {
  const { user, isLoading, isAuthenticated, refreshUserSession } =
    useAuth();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPrivilegijiExpanded, setIsPrivilegijiExpanded] = useState(false);

  useEffect(() => {
    getCompleteCompanyData();
  }, [user, isLoading, isAuthenticated]);

  const [data, setData] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);
  const [isShowModal1, setIsShowModal1] = useState(false);
  const [isShowModal6, setIsShowModal6] = useState(false);
  const [select_id, setSelect_Id] = useState("");
  const [firstPayload, setFirstPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPopUP3, setIsPopUP3] = useState(false);
  const [isPopUP4, setIsPopUP4] = useState(false);
  const [isPopUP5, setIsPopUP5] = useState(false);
  const [isPopUP6, setIsPopUP6] = useState(false);

  const toggleModal6 = () => {
    setIsShowModal1(false);
    setIsShowModal6(!isShowModal6);
  };

  const getCompleteCompanyData = async () => {
    try {
      if (!user) {
        console.log("user not found");
        return;
      }
      const queryParams = {};
      queryParams.type = "FLORIST";
      const response = await companyService.getCompleteCompany(queryParams);

      const userId = user?.id;

      const shopData = await shopService.getFloristShops({
        companyId: data?.CompanyPage?.id,
        userId: userId,
      });

      setData({
        ...response.user,
        CompanyPage: {
          ...response.user.CompanyPage,
          FloristShops: shopData?.shops,
        },
      });
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

  const handleCitySelect = async (item, deleted = "") => {
    try {
      let cityPayload = data?.secondaryCity
        ? { thirdCity: item }
        : { secondaryCity: item };
      if (deleted === "secondary") {
        cityPayload = { secondaryCity: item };
      } else if (deleted === "third") {
        cityPayload = { thirdCity: item };
      }
      setLoading(true);
      try {
        const response = await userService.updateMyUser(cityPayload);

        if (response) {
          await refreshUserSession();

        // const result = await updateUserAndRefreshSession({ city: newCity });
        // if (result.success) {
          toast.success("City updated and session refreshed!");
          setSelectedCity(item);
        } else {
          toast.error("Failed to update city");
        }
      } catch (error) {
        toast.error("Error updating city");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Updating City");
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Check if there are any florist shops
  const hasFloristShops =
    data?.CompanyPage?.FloristShops &&
    data?.CompanyPage?.FloristShops?.length > 0;

  const deleteShop = async (id) => {
    setLoading(true);
    try {
      const response = await shopService.deleteShop(id);
      if (response.staus === 200) {
        toast.success("Florist shop deleted successfully.");
      }
      getCompleteCompanyData();
    } catch (error) {
      toast.error("Error deleting florist shop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyAccountLayout>
      <div className="w-full max-w-[1000px] min-w-[720px]">
        <div className="grid grid-cols-2 tabletUserAcc:grid-cols-1 mobileUserAcc:grid-cols-1 gap-4 text-[#6D778E] mt-[60px] text-[14px]">
          <div className="space-y-[18px]">
            <div className="flex items-center gap-[12px]">
              <span className="uppercase">Podjetje:</span>
              <span className="text-[#3C3E41]">{data?.company}</span>
            </div>
            <div className="flex items-center gap-[12px]">
              <span className="uppercase">CVETLIČARNA:</span>
              <span className="text-[#3C3E41]">{data?.name}</span>
            </div>

            <div className="flex items-center gap-[12px]">
              <span className="uppercase">email:</span>
              <span className="text-[#3C3E41]">{data?.email}</span>
            </div>
            <div className="flex items-center gap-[12px]">
              <span className="uppercase">spletna stran:</span>
              <span className="text-[#3C3E41]">
                {data?.CompanyPage?.website}
              </span>
            </div>
            {/* Show "Add" button only when no florist shops exist */}
            {!hasFloristShops && (
              <button
                onClick={() => setIsShowModal1(true)}
                className="inline-flex items-center gap-3"
              >
                <span className="text-[#2c7ba3] text-[14px]">
                  DODAJ CVETLIČARNO
                </span>
              </button>
            )}
          </div>
          <div className="space-y-[18px]">
            <div className="flex items-center gap-[12px]">
              <span className="uppercase">geslo:</span>
              <span className="text-[#3C3E41]">**************</span>
            </div>
            <div className="flex items-center gap-[12px]">
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
            </div>
          </div>
        </div>
        <hr className="my-[28px]" />

        {/* FLORIST SHOPS SECTION - Only show when there are shops */}
        {hasFloristShops && (
          <div className="space-y-4 text-[#6D778E] text-[14px]">
            <div className="flex items-center gap-[12px]">
              <div className="space-y-[18px] mb-12 w-full">
                <div className="grid grid-cols-2 gap-3">
                  <h4
                    className="text-[#2c7ba3] text-[20px] font-medium pb-2"
                    style={{
                      fontVariationSettings: "'wdth' 50,'opsz' 26",
                    }}
                  >
                    Cvetličarna
                  </h4>
                  <button
                    onClick={() => setIsShowModal1(true)}
                    className="inline-flex items-center gap-3"
                  >
                    <img
                      src="/plus_icon_blue.png"
                      alt="add icon"
                      className="size-6"
                    />
                    <span className="text-[#2c7ba3] text-[14px] uppercase underline">
                      dodaj cvetličarno
                    </span>
                  </button>
                </div>

                {data?.CompanyPage?.FloristShops?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 text-[#3C3E41]"
                  >
                    <div className="mt-5 flex flex-col space-y-2">
                      <span className="text-[#3C3E41]">{item.shopName}</span>
                      <span className="text-[#3C3E41]">{item.address}</span>
                      <span className="text-[#3C3E41]">{item.telephone}</span>
                      <span className="text-[#3C3E41]">{item.email}</span>
                      {item?.website ? (
                        <span className="text-[#3C3E41]">{item?.website}</span>
                      ) : null}
                    </div>
                    <span
                      className={`text-[#a4a4a4] table w-[50px] transition-opacity duration-200 mt-[-5px] ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed pointer-events-none"
                          : "cursor-pointer"
                      }`}
                      onClick={!loading ? () => deleteShop(item?.id) : null}
                    >
                      (Zbriši)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 text-[#6D778E] text-[14px]">
          <div className="space-y-1">
            <span className="uppercase">OBČINA:</span>
            <div className="grid grid-cols-2 gap-[12px] px-6 pb-[10px]">
              <div className="flex items-center gap-[12px] ">
                <span className="uppercase">Primarno:</span>
                <span className="text-[#3C3E41]">{data?.city}</span>
              </div>
              <div className="flex items-center gap-[38px]">
                <div>
                  <DropdownWithSearch
                    onSelectCity={handleCitySelect}
                    selectedCity={selectedCity}
                    placeholder={"Dodaj še drugo mesto"}
                  />
                </div>
              </div>
            </div>
            {data?.secondaryCity && (
              <div className="flex items-center gap-[12px] px-6">
                <span className="uppercase">Dodatno:</span>
                <span className="text-[#3C3E41]">
                  {data?.secondaryCity}
                  <span
                    className="text-[red]"
                    onClick={() => handleCitySelect(null, "secondary")}
                  >
                    (Zbriši)
                  </span>
                </span>
              </div>
            )}
            {data?.thirdCity && (
              <div className="flex items-center gap-[12px] px-6">
                <span className="uppercase">Dodatno:</span>
                <span className="text-[#3C3E41]">
                  {data?.thirdCity}
                  <span
                    className="text-[red]"
                    onClick={() => handleCitySelect(null, "third")}
                  >
                    (Zbriši)
                  </span>
                </span>
              </div>
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
                onClick={() => setIsPopUP3(true)}
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

            <div className="flex items-center gap-[12px]">
              <button
                onClick={() => setIsPopUP5(true)}
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
              <p className="text-[#3C3E41] text-xs">
                naročnina kasneje in priložnost za prve
              </p>
            </div>
          </div>

          <div
            className={`space-y-3 overflow-hidden transition-all duration-300 ${
              isPrivilegijiExpanded
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {/* Florist List Publication */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={data?.createObituaryPermission}
                disabled
                readOnly
                className="w-4 h-4 text-[#0A85C2] bg-gray-100 border-gray-300 rounded focus:ring-[#0A85C2] focus:ring-2 cursor-not-allowed disabled:opacity-100 disabled:bg-[#0A85C2] disabled:checked:bg-[#0A85C2]"
              />
              <span className="text-[#3C3E41]">
                Objava na seznamu cvetličarn
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
                checked={true}
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
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 tabletUserAcc:grid-cols-3 mobileUserAcc:grid-cols-3 gap-4 text-[#6D778E] mt-[60px] text-[14px]">
          <div className="flex items-center gap-[12px] tabletUserAcc:col-span-2 mobileUserAcc:col-span-2">
            <span className="uppercase">stran na osmrtnica.com:</span>
            {/* <Link
              href={`/floristdetails/${data?.CompanyPage?.id}`}
              className="text-[#3C3E41]"
            >
              {`/floristdetails/${data?.CompanyPage?.id}`}
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
          <div className="flex items-center gap-10 tabletUserAcc:col-span-2 mobileUserAcc:col-span-2">
            <div className="flex items-center gap-[12px]">
              <span className="uppercase">naročnina:</span>
              <span className="text-[#3C3E41]">Gratis</span>
            </div>
            <div className="flex items-center gap-[12px]">
              <span className="uppercase">do:</span>
              <span className="text-[#3C3E41]">10.10.2025</span>
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <ChangePasswordModal setModalVisible={setIsModalVisible} />
      )}

      <ModalNew
        isShowModal={isShowModal1}
        setIsShowModal={setIsShowModal1}
        select_id={select_id}
        set_Id={setSelect_Id}
        data={data?.CompanyPage}
        onChange={(updatedPayload) => {
          setFirstPayload(updatedPayload);
        }}
        toggleModal6={toggleModal6}
      />

      <ModalNew6
        isShowModal={isShowModal6}
        setIsShowModal={setIsShowModal6}
        data={firstPayload}
        onChange={(updatedPayload) => {
          setFirstPayload(updatedPayload);
          getCompleteCompanyData();
        }}
      />
      <Modal
        index={3}
        open={isPopUP3}
        onClose={() => setIsPopUP3(false)}
        onFooterClick={() => {
          setIsPopUP3(false);
          setIsPopUP4(true);
        }}
      />
      <Modal index={4} open={isPopUP4} onClose={() => setIsPopUP4(false)} />
      <Modal
        index={5}
        open={isPopUP5}
        onClose={() => setIsPopUP5(false)}
        onFooterClick={() => {
          setIsPopUP5(false);
          setIsPopUP6(true);
        }}
      />
      <Modal index={6} open={isPopUP6} onClose={() => setIsPopUP6(false)} />
    </CompanyAccountLayout>
  );
}
