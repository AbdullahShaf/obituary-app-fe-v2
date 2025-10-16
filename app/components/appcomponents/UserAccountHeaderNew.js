"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import omr from "@/public/omr.png";
import { FiMenu } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ButtonWhiteBG from "./buttonwhitebg";
import ButtonLightGreen from "./buttonLightGreen";
import FooterMobile from "../appcomponents/FooterMobile";
import CompanyFooterMobile from "./CompanyFooterMobile";
import backIcon from "@/public/memory_header_left.png";
import { useSession } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

function UserAccountHeaderNew({
  onMenuClick,
  isMobilSideBarOpen,
  pendingConfirmations,
  setIsMobilSideBarOpen,
  isKeeper,
  memories,
  company,
  noFooterOnMobile,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const { user, logout } = useAuth();
  const isGhost = session?.user?.me?.isGhost;
  const adminId = session?.user?.me?.adminId;
  const pathname = usePathname();
  const [isButtonHide, setIsButtonHide] = useState(false);
  const parsedUser = user;

  return (
    <React.Fragment>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 ">
        <div className=" flex w-full justify-center">
          {/* 17 October 2024 */}
          <div className="flex w-full h-[68px] tablet:w-[744px] mobile:px-5 mx-auto tablet:h-[80px] px-4 tablet:px-6 desktop:w-[1200px] desktop:h-[92.02px] desktop:px-[18px]">
            <div className="flex items-center gap-3 justify-between w-full mx-5">
              <Link href="/" className="flex">
                <Image
                  src={omr}
                  alt="App Logo"
                  width={500}
                  height={500}
                  className="box-border relative bottom-[2px] h-[22px] w-[182.76px] desktop:w-[255.31px] desktop:h-[32px]"
                />
              </Link>

              <div
                className=" hidden flex-col tabletUserAcc:hidden mobileUserAcc:hidden items-center cursor-pointer "
                onClick={onMenuClick}
              >
                <Image
                  src={"/icon_menu_black.png"}
                  width={32}
                  height={25}
                  className="w-[32px] h-[25px]"
                />
              </div>

              {
                (isGhost && adminId) ? <>
                  <div>Ghost Login</div>
                  <button>Back to admin</button>
                </> :
                  <div className="flex items-center gap-[35px]">
                    <div className="flex hidden tabletUserAcc:hidden mobileUserAcc:hidden items-center gap-2">
                      <img
                        src="/bell_icon.png"
                        alt="back"
                        className="w-[20px] h-[20px] mb-[15px]"
                      />
                      <span className="text-[34px] font-bold text-[#EB1D1D] mt-[15px]">
                        2
                      </span>
                    </div>
                    {typeof window != 'undefined' && window.innerWidth >= 1200 ? (
                      <button
                        onClick={() => router.back()}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        title="Nazaj"
                      >
                        <Image
                          src={backIcon}
                          alt="Back"
                          className="h-8 w-8 mobile:h-7 mobile:w-7"
                        />
                      </button>
                    ) : (
                      <span
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        title="Nazaj"
                      >
                        <Link href={`/u/${parsedUser?.slugKey}/menu`}>
                          <FiMenu size={32} color="black" />
                        </Link>
                      </span>
                    )}
                  </div>
              }


            </div>
          </div>
        </div>
      </header>

      <div className="flex desktopUserAcc:hidden ">
        {isMobilSideBarOpen && (
          // 17 October 2024 - tabletUserAcc:min-h-[1010px]
          // <div className="absolute inset-0 z-10 flex-1 pt-[100px] tabletUserAcc:min-h-[1350px] bg-[#F1F5F8] mobileUserAcc:pt-[27px]">
          <div className="fixed inset-0 z-10 flex-1  bg-[#F1F5F8] mobileUserAcc:pt-[27px]">
            <div className="h-full w-full relative">
              <div className="flex w-full ">
                <Image
                  src={"/reg_user_tablica.avif"}
                  layout="fill"
                  objectFit="cover"
                  className="w-full !h-[100%] object-cover tabletUserAcc:hidden"
                />
              </div>
              <div className="absolute h-full overflow-auto  z-20 mobileUserAcc:bg-[#F1F5F8] flex flex-row justify-center gap-x-[30px] left-[0px] right-[0px]  "
                style={{
                  backgroundImage: 'url("/reg_user_tablica.avif")',
                  backgroundSize: 'cover'
                }}>
                <div className="flex flex-col tabletUserAcc:mt-[100px] h-full">
                  <div
                    className="text-[#0A85C2] text-[26px] leading-[38px] font-[500px] mobileUserAcc:mt-[56px]"
                    style={{
                      fontVariationSettings: "'wdth' 50,'wght' 500,'opsz' 26",
                    }}
                  >
                    Uporabniški kotiček
                  </div>
                  <div className="mt-[27px]">
                    <ButtonWhiteBG
                      placeholderImg={""}
                      placeholderText={"OBVESTILA"}
                      pendingConfirmations={pendingConfirmations}
                    />
                  </div>
                  <div className="mt-[10px]">
                    <Link href={`/u/${parsedUser?.slugKey}/moj-racun`}>
                      <ButtonWhiteBG
                        placeholderImg={"/ico_setting.png"}
                        placeholderText={"MOJI PODATKI"}
                      />
                    </Link>
                  </div>
                  <div className="text-[#2198D3] mt-[50px] text-[14px] leading-[24px] font-variation-customOpt14 font-semibold">
                    MOJI BLIŽNJI
                  </div>
                  <Link href={`/u/${parsedUser?.slugKey}/pregled`}>
                    <div className="mt-[10px]">
                      <ButtonWhiteBG
                        placeholderImg={"/ico_pregled.png"}
                        placeholderText={"PREGLED"}
                      />
                    </div>
                  </Link>

                  <Link href={`/u/${parsedUser?.slugKey}/obletnice`}>
                    <div className="mt-[10px]">
                      <ButtonWhiteBG
                        placeholderImg={"/ico_obletnice.png"}
                        placeholderText={"OBLETNICE"}
                      />
                    </div>
                  </Link>
                  <Link href={`/u/${parsedUser?.slugKey}/moji-prispevki`}>
                    <div className="mt-[10px]">
                      <ButtonWhiteBG
                        placeholderImg={"/ico_obletnice.png"}
                        placeholderText={"Moji prispevki"}
                      />
                    </div>
                  </Link>
                  <div
                    onClick={() => {
                      setIsButtonHide(!isButtonHide);
                    }}
                    className="hidden mobileUserAcc:block cursor-pointer text-[#2198D3] mt-[50px] text-[14px] leading-[24px] font-variation-customOpt14 font-semibold"
                  >
                    MOJI SKRBNIKI
                  </div>
                  {!isKeeper ? (
                    <div className="hidden mobileUserAcc:block">
                      <div className="w-[314] h-[58px] mt-[10px] py-[2px] px-[2px] rounded-[10px] shadow-custom-light-dark-box-image  bg-transparent"></div>
                    </div>
                  ) : (
                    <div className="hidden mobileUserAcc:block ">
                      <div className="mt-[10px]">
                        <Link href={`/u/${parsedUser?.slugKey}/pregled`}><ButtonWhiteBG
                          placeholderImg={"/ico_pregled_black.png"}
                          placeholderText={"PREGLED"}
                        /></Link>
                      </div>

                      <Link href={`/u/${parsedUser?.slugKey}/potrditev-objave`}>
                        <div className="mt-[10px]">
                          <ButtonWhiteBG
                            placeholderImg={""}
                            placeholderText={"POTRDITEV OBJAVE"}
                            pendingConfirmations={pendingConfirmations}
                          />
                        </div>
                      </Link>

                      {memories && memories.length > 0
                        ? memories.map((item, index) => (
                          <Link
                            href={`/m/${item?.slugKey}`}
                            className="my-5"
                            key={index}
                          >
                            <ButtonLightGreen
                              isMobile={true}
                              placeholderText={`${item.name} ${item.sirName}`}
                            />
                          </Link>
                        ))
                        : null}
                    </div>
                  )}

                  <div className="w-[322px] mt-[50px] rounded-[10px]">
                    {/* <h1 className="uppercase text-[#2198D3] pb-[3px] text-[14px] leading-[24px] font-variation-customOpt14 font-semibold">
                      POSTANI SKRBNIK
                    </h1> */}

                    <div className="h-[62px] bg-gradient-to-b from-[#0D94E8] to-[#1860A3] border-2 custom-border-gradient flex flex-row items-center rounded-[8px]">
                      <div className="ml-[15px]">
                        <Image
                          src={"/ico_plus_round_white.png"}
                          alt=""
                          width={24}
                          height={24}
                          className="w-8 h-6"
                        />
                      </div>

                      <div
                        className="w-full ml-[20px] h-full my-[2px] text-[16px] text-[#FFFFFF]
                        font-variation-customOpt16 font-normal leading-[24px] flex items-center "
                        onClick={() => toast.error("Skrbnika za spominsko stran vam brezplačno podarijo v cvetličarni (ki je prikazana med lokalnimi na naši strani).")}
                      >
                        POSTANI SKRBNIK
                      </div>

                      <div className="flex-1 flex justify-end">
                        <Image
                          src={"/ico_right_white.png"}
                          alt=""
                          width={32}
                          height={32}
                          className="mr-[20px] w-6 h-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="hidden mobileUserAcc:flex flex-col mt-[10px]">
                    {/* <div>
                      <ButtonWhiteBG
                        placeholderImg={"/ico_obletnice.png"}
                        placeholderText={"POGOSTA VPRAŠANJA"}
                      />
                    </div> */}
                    <Link href={"/"}>
                      <ButtonWhiteBG
                        placeholderImg={"/ico_obletnice.png"}
                        placeholderText={"NAZAJ NA SPLETNO STRAN"}
                      />
                    </Link>
                  </div>
                  <div className="mt-[70px] mobileUserAcc:mt-[15px] w-[184px] border-2 border-[#1860A335] rounded-[10px] mb-[90px]" onClick={logout}>
                    <div className=" rounded-lg w-[180px] h-[55px] flex justify-center items-center bg-gradient-to-b from-[#FFFFFF40] via-[rgba(12,104,244,0.15)] to-[#FFFFFF40]">
                      <div className="text-[16px] leading-[24px] font-variation-customOpt16 text-[#6D778E] ">
                        ODJAVA IZ RAČUNA
                      </div>
                    </div>
                  </div>
                  <button className="mt-[70px] mobileUserAcc:mt-[15px]">
                    {". "}
                  </button>
                </div>

                {/* 21 October 2024 */}
                <div className="w-[314px] flex flex-col  mt-[165px] mobileUserAcc:hidden ">
                  <div>
                    <Link href={"/"}>
                      <ButtonWhiteBG
                        placeholderImg={"/ico_obletnice.png"}
                        placeholderText={"NAZAJ NA SPLETNO STRAN"}
                      />
                    </Link>
                  </div>
                  <div className="mt-[10px]">
                    <ButtonWhiteBG
                      placeholderImg={"/ico_obletnice.png"}
                      placeholderText={"POGOSTA VPRAŠANJA"}
                    />
                  </div>

                  {/* {/ 21/10 changeeeee /} */}
                  <div
                    onClick={() => {
                      setIsButtonHide(!isButtonHide);
                    }}
                    className="cursor-pointer text-[#2198D3] mt-[50px] text-[14px] leading-[24px] font-variation-customOpt14 font-semibold"
                  >
                    MOJI SKRBNIKI
                  </div>
                  {!isKeeper ? (
                    <React.Fragment>
                      <div className="w-[314] h-[58px] mt-[10px] py-[2px] px-[2px] rounded-[10px] shadow-custom-light-dark-box-image  bg-transparent"></div>

                      <div className="w-[314] h-[58px] mt-[10px] py-[2px] px-[2px] rounded-[10px] shadow-custom-light-dark-box-image bg-transparent"></div>

                      <div className="w-[314] h-[58px] mt-[10px] py-[2px] px-[2px] rounded-[10px] shadow-custom-light-dark-box-image bg-transparent"></div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div className="mt-[10px]">
                        <ButtonWhiteBG
                          placeholderImg={"/ico_pregled_black.png"}
                          placeholderText={"PREGLED"}
                        />
                      </div>

                      <Link href={"/potrditev-objave"}>
                        <div className="mt-[10px]">
                          <ButtonWhiteBG
                            placeholderImg={""}
                            placeholderText={"POTRDITEV OBJAVE"}
                            pendingConfirmations={pendingConfirmations}
                          />
                        </div>
                      </Link>

                      {memories && memories.length > 0
                        ? memories.map((item, index) => (
                          <Link
                            href={`/m/${item?.slugKey}`}
                            className="mt-[10px]"
                            key={index}
                          >
                            <ButtonLightGreen
                              placeholderText={`${item.name} ${item.sirName}`}
                            />
                          </Link>
                        ))
                        : null}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {
        company ? (
          <div className={`${noFooterOnMobile ? "mobileUserAcc:hidden" : ""} ${pathname?.startsWith("/c/") ? "tabletUserAcc:hidden" : ""}`}>
            <CompanyFooterMobile setIsMobilSideBarOpen={setIsMobilSideBarOpen} />
          </div>
        ) : (
          <>
            {/* <FooterMobile setIsMobilSideBarOpen={setIsMobilSideBarOpen} /> */}
          </>
        )
      }
    </React.Fragment >
  );
}

export default UserAccountHeaderNew;
