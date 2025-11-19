import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const TopBar = ({
  setIsModalVisible,
  setIsMessageModalVisible,
  setIsLocalQuickModalVisible,
  setIsLocalQuickReviewModalVisible,
}) => {
  const popuButtonRef = React.useRef();

  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const isDesktop = () => window.innerWidth >= 758;

  const handleNavigation = () => {
    if (!user) {
      router.push("/registracija");
      return;
    }

    const isUser = user.role === "User";
    const isFuneral = user.role === "Funeral";
    const isFlorist = user.role === "Florist";
    const isAdmin = user.role === "SUPERADMIN"
    const desktop = isDesktop();
    const slugKey = user.slugKey;

    if (isUser && desktop) {
      router.push(`/u/${user.slugKey}/moj-racun`);
    } else if (isUser && !desktop) {
      router.push(`/u/${user.slugKey}/moj-racun`   );
    } else if (isFuneral && desktop) {
      router.push(`/p/${slugKey}/nasi_podatki`);
    } else if (isFuneral && !desktop) {
      router.push(`/p/${slugKey}/menu`);
    } else if (isFlorist && desktop) {
      router.push(`/c/${slugKey}/nasi_podatki`);
    } else if (isFlorist && !desktop) {
      router.push(`/c/${slugKey}/menu`);
    } else if (isAdmin && isDesktop) {
      router.push('/admin/Obituaries')
    } 
  };

  return (
    <div className="flex w-full h-[45px] flex-col items-center justify-between bg-[#414141] ">
      <div className=" w-full desktop:w-[1200px] mobile:px-[20px] my-auto flex flex-row justify-between">
        <div className=" w-full z-0  flex  flex-row items-center mobile:justify-between ">
          <div className="flex desktop:pl-[23px] tablet:pl-[23px] flex-row items-center">
            {/* 24 October 2024 /keeperpromo */}
            <button onClick={handleNavigation}>
              <img
                src="ico_user_top.png"
                alt="user"
                className="w-[24px] h-[24px] "
              />
            </button>
            <div className="ml-[10px] tablet:ml-[36px] desktop:ml-[16px] flex items-center text-white text-[14px] tablet:text-[16px] tracking-[0.12em] uppercase">
              <Link
                href="/registracija?view=login"
                className="hover:text-[#0A85C2] transition-colors duration-200"
              >
                PRIJAVA
              </Link>
              <span className="mx-2 text-white">|</span>
              <Link
                href="/registracija?view=register"
                className="hover:text-[#0A85C2] transition-colors duration-200"
              >
                REGISTRACIJA
              </Link>
            </div>
            <button
              className="ml-[50px]  tablet:ml-[95px] desktop:ml-[80px] hidden"
              aria-hidden="true"
              // onClick={() => {
              //   setIsMessageModalVisible(true);
              //   setIsModalVisible(false);
              //   setIsLocalQuickModalVisible(false);
              //   setIsLocalQuickReviewModalVisible(false);
              // }}
            >
              <img
                src="ico_email_top.png"
                alt="mail"
                className="w-[28px] h-[28px]"
              />
            </button>
            <button
              className="ml-[50px] tablet:ml-[95px] desktop:ml-[80px] hidden"
              aria-hidden="true"
              // onClick={() => {
              //   setIsModalVisible(true);
              //   setIsMessageModalVisible(false);
              //   setIsLocalQuickModalVisible(false);
              //   setIsLocalQuickReviewModalVisible(false);
              // }}
            >
              <img
                src="ico_bell_top.png"
                alt="user"
                className="w-[28px] h-[28px]"
              />
            </button>
          </div>
          {(!isAuthenticated || !user?.city) && (
            <div
              className="flex -z-10  tablet:w-[100%] tablet:justify-center  tablet:absolute 
                    desktop:absolute desktop:w-[1200px] desktop:justify-center items-center "
            >
              <button
                onClick={() => {
                  setIsModalVisible(false);
                  setIsMessageModalVisible(false);
                  setIsLocalQuickReviewModalVisible(false);
                  setIsLocalQuickModalVisible(true);
                }}
              >
                <img
                  src="ico_location_top.png"
                  alt="location"
                  className="w-[28px] h-[28px]"
                />
              </button>
            </div>
          )}
          {(isAuthenticated && user?.city) && (
            <div
              className="flex -z-10  tablet:w-[100%] tablet:justify-center  tablet:absolute 
                    desktop:absolute desktop:w-[1200px] desktop:justify-center items-center "
            >
              <button
                onClick={() => {
                  setIsModalVisible(false);
                  setIsMessageModalVisible(false);
                  setIsLocalQuickReviewModalVisible(true);
                  setIsLocalQuickModalVisible(false);
                }}
              >
                <img
                  src="ico_location_top.png"
                  alt="location"
                  className="w-[28px] h-[28px]"
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[3px] bg-[#0A85C260] " />
    </div>
  );
};

export default TopBar;
