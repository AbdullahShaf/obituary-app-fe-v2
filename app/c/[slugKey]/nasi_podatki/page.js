"use client";
import CompanyAccountLayout from "@/app/components/appcomponents/CompanyAccountLayout";
import companyService from "@/services/company-service";
import API_BASE_URL from "@/config/apiConfig";
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

export default function AccountSettings() {
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPrivilegijiExpanded, setIsPrivilegijiExpanded] = useState(false);

  useEffect(() => {
    getCompleteCompanyData();
  }, []);

  const [data, setData] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);
  const [isShowModal1, setIsShowModal1] = useState(false);
  const [isShowModal6, setIsShowModal6] = useState(false);
  const [select_id, setSelect_Id] = useState("");
  const [firstPayload, setFirstPayload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal6 = () => {
    setIsShowModal1(false);
    setIsShowModal6(!isShowModal6);
  };

  const getCompleteCompanyData = async () => {
    try {
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
      const response = await userService.updateMyUser(cityPayload);
      toast.success("City Updated Successfully");
      setSelectedCity(item);
      setData((prevData) => ({
        ...prevData,
        ...cityPayload,
      }));
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
    setIsLoading(true);
    try {
      const response = await shopService.deleteShop(id);
      if (response.staus === 200) {
        getCompleteCompanyData();
        toast.success("Florist shop deleted successfully.");
      }
    } catch (error) {
      toast.error("Error deleting florist shop.");
    } finally {
      setIsLoading(false);
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
                    <div className="my-5 flex flex-col space-y-2">
                      <span className="text-[#3C3E41]">{item.shopName}</span>
                      <span className="text-[#3C3E41]">{item.address}</span>
                      <span className="text-[#3C3E41]">{item.telephone}</span>
                      <span className="text-[#3C3E41]">{item.email}</span>
                      {item?.website ? (
                        <span className="text-[#3C3E41]">{item?.website}</span>
                      ) : null}
                    </div>
                    <span
                      className={`text-[#a4a4a4] table w-[50px] transition-opacity duration-200 ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed pointer-events-none"
                          : "cursor-pointer"
                      }`}
                      onClick={!isLoading ? () => deleteShop(item?.id) : null}
                    >
                      Zbriši
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
              <span className="text-[#6D778E] text-[12px]">
                (po objavi svoje spletne strani)
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
              <span className="text-[#6D778E] text-[12px]">(kmalu)</span>
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
              <span className="text-[#6D778E] text-[12px]">
                (po objavi svoje spletne strani)
              </span>
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
              <span className="text-[#6D778E] text-[12px]">
                (po objavi svoje spletne strani)
              </span>
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
              <span className="text-[#6D778E] text-[12px]">(kmalu)</span>
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
              <span className="text-[#6D778E] text-[12px]">
                (po objavi svoje spletne strani)
              </span>
            </div>

            {/* Memorial Page Participation */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={data?.sendGiftsPermission}
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

        <div className="grid grid-cols-2 tabletUserAcc:grid-cols-3 mobileUserAcc:grid-cols-3 gap-4 text-[#6D778E] mt-[60px] text-[14px]">
          <div className="flex items-center gap-[12px] tabletUserAcc:col-span-2 mobileUserAcc:col-span-2">
            <span className="uppercase">stran na osmrtnica.com:</span>
            <Link
              href={`/floristdetails/${data?.CompanyPage?.id}`}
              className="text-[#3C3E41]"
            >
              {`/floristdetails/${data?.CompanyPage?.id}`}
            </Link>
          </div>
          <div className="flex items-center gap-[12px]">
            <span className="uppercase">izdelana:</span>
            <span className="text-[#3C3E41]">
              {(() => {
                const date = new Date(data?.CompanyPage?.createdTimestamp);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                return `${day}.${month}.${year}`;
              })()}
            </span>
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
    </CompanyAccountLayout>
  );
}
