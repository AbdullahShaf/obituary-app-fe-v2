"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "@/public/app_logo.png";
import iconMenu from "@/public/icon_menu_black.png";
import backIcon from "@/public/memory_header_left.png";
import { useRouter } from "next/navigation";
import omr from "@/public/omr.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import {
  LocalQuickReview,
  LocalQuickReviewModal,
} from "@/app/components/appcomponents/LocalQuickReview";
import SideMenu from "../ui/sideMenu";
import { shouldShowBack } from "@/utils/navigationUtils";
const headerLinkSets = {
  "/osmrtnice": [
    { label: "Osmrtnice", path: "/osmrtnice", active: false },
    { label: "Pogrebi", path: "/pogrebi?city=Celje", active: false },
  ],
  "/pogrebi": [
    { label: "Osmrtnice", path: "/osmrtnice", active: false },
    { label: "Pogrebi", path: "/pogrebi?city=Celje", active: false },
  ],

  "/pogrebna-p": [
    { label: "Cvetličarne", path: "/cvetlicarne", active: false },
    { label: "Pogrebna podjetja", path: "/pogrebna-p", active: false },
    { label: "Lokalni", path: "/lokalni", active: false },
  ],
  "/cvetlicarne": [
    { label: "Cvetličarne", path: "/cvetlicarne", active: false },
    { label: "Pogrebna podjetja", path: "/pogrebna-p", active: false },
    { label: "Lokalni", path: "/lokalni", active: false },
  ],
  "/zalna-stran": [
    { label: "QR kode", path: "/qr-kode", active: false },
    { label: "Žalna stran", path: "/zalna-stran", active: false },
    { label: " Spominska", path: "/spominska", active: false },
  ],
  "/qr-kode": [
    { label: "QR kode", path: "/qr-kode", active: false },
    { label: "Žalna stran", path: "/zalna-stran", active: false },
    { label: " Spominska", path: "/spominska", active: false },
  ],
  "/lokalni": [
    { label: "Cvetličarne", path: "/cvetlicarne", active: false },
    { label: "Pogrebna podjetja", path: "/pogrebna-p", active: false },
    { label: "Lokalni", path: "/lokalni", active: false },
  ],
  "/spominska": [
    { label: "QR kode", path: "/qr-kode", active: false },
    { label: "Žalna stran", path: "/zalna-stran", active: false },
    { label: " Spominska", path: "/spominska", active: false },
  ],
  "/resitve-za-cvetlicarne": [
    { label: "Cvetličarne", path: "/resitve-za-cvetlicarne", active: false },
    // { label: " PRILOŽNOST", path: "/c-priloznost", active: true },
    {
      label: "Pogrebna podjetja",
      // path: "/resitve-za-pogrebna-podjetja",
      path: "",
      active: false,
    },
  ],
  "/resitve-za-pogrebna-podjetja": [
    { label: "Cvetličarne", path: "/resitve-za-cvetlicarne", active: false },
    {
      label: "Pogrebna podjetja",
      path: "/resitve-za-pogrebna-podjetja",
      active: false,
    },
    { label: " PRILOŽNOST", path: "/p-priloznost", active: true },
  ],
  "/splosni-pogoji": [
    { label: "Splošni pogoji", path: "/splosni-pogoji", active: false },
    {
      label: "Politika zasebnosti",
      path: "/politika-zasebnosti",
      active: false,
    },
    { label: "Piškotki", path: "/piskotki", active: false },
  ],
  "/politika-zasebnosti": [
    { label: "Splošni pogoji", path: "/splosni-pogoji", active: false },
    {
      label: "Politika zasebnosti",
      path: "/politika-zasebnosti",
      active: false,
    },
    { label: "Piškotki", path: "/piskotki", active: false },
  ],
  "/vodic": [
    { label: "Cvetličarne", path: "/cvetlicarne", active: false },
    { label: "Preprosti vodič", path: "/vodic", active: true },
    { label: "Pogrebna podjetja", path: "/pogrebna-p", active: false },
  ],
};

function CommonHeader({ currentPage }) {
  const pathname = usePathname();
  const router = useRouter();
  const linksToRender = headerLinkSets[`/${currentPage}`] || [];

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [isLocalQuickModalVisible, setIsLocalQuickModalVisible] =
    useState(false);
  const [isLocalQuickReviewModalVisible, setIsLocalQuickReviewModalVisible] =
    useState(false);

  // User state
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const canShowBack = shouldShowBack(pathname);

  // Check user authentication on component mount
  useEffect(() => {
    const checkUser = () => {
      if (user !== undefined && user !== null) {
        setIsUserLoaded(true);
        return;
      } else {
        console.error("User not loaded");
      }
    };

    checkUser();
  }, []);

  // Handle local quick review click
  const handleLocalQuickReviewClick = () => {
    if (!isUserLoaded) return; // Wait for user check to complete

    if (user) {
      setIsLocalQuickReviewModalVisible(true);
    } else {
      setIsLocalQuickModalVisible(true);
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    const isAnyModalOpen =
      isModalVisible ||
      isMessageModalVisible ||
      isLocalQuickModalVisible ||
      isLocalQuickReviewModalVisible;

    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [
    isModalVisible,
    isMessageModalVisible,
    isLocalQuickModalVisible,
    isLocalQuickReviewModalVisible,
  ]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        {/* TODO: Temporarily disabled pending TopBar redesign - restore by 2026-01-31
        {(currentPage === "pogrebi" || currentPage === "osmrtnice") && (
          <TopBar
            setIsModalVisible={setIsModalVisible}
            setIsMessageModalVisible={setIsMessageModalVisible}
            setIsLocalQuickModalVisible={setIsLocalQuickModalVisible}
            setIsLocalQuickReviewModalVisible={
              setIsLocalQuickReviewModalVisible
            }
            onLocalQuickReviewClick={handleLocalQuickReviewClick}
          />
        )} */}

        <div className="flex w-full justify-between">
          <div className="flex w-full h-[68px] tablet:w-[744px] mx-auto tablet:h-[80px] px-5 tablet:px-6 desktop:w-[1200px] desktop:h-[92.02px] desktop:px-[12px]">
            <div className="flex justify-between items-center w-full h-full">
              {/* Logo */}
              <Link href="/" className="flex">
                <Image
                  src={omr}
                  alt="App Logo"
                  width={500}
                  height={500}
                  className="box-border relative bottom-[2px] h-[22px] w-[182.76px] desktop:w-[255.31px] desktop:h-[32px]"
                />
              </Link>

              {/* Navigation and Actions */}
              <div className="flex items-center">
                {/* Navigation Links */}
                <div className="hidden tablet:flex desktop:flex tablet:mr-[30px] desktop:mr-[38px]">
                  <ul className="flex items-center gap-[32px] tablet:gap-[16px]">
                    {linksToRender.map((link, index) =>
                      link.label === "Pogrebna podjetja" && link.path === "" ? (
                        <li
                          key={index}
                          className="flex mobile:h-[16px] tablet:h-[24px] desktop:h-[24px] items-center"
                        >
                          <Link
                            href={link.path}
                            className={`font-normal hover:text-blue-500 transition duration-200 tablet:text-[18px] desktop:text-[20px] cursor-default ${
                              link.active ? "!text-[#0A85C2]" : "text-[#1E2125]"
                            }`}
                          >
                            {link.active && (
                              <span className="text-[#EB1D1D]">{">>"}</span>
                            )}
                            <div className="relative">
                              <p className="absolute text-[10px] text-[#EB1D1D] right-0 top-[-10px]">
                                KMALU
                              </p>
                              <p className="relative text-[#1E21254D]">
                                {link.label}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ) : (
                        <li
                          key={index}
                          className="flex mobile:h-[16px] tablet:h-[24px] desktop:h-[24px] items-center"
                        >
                          <Link
                            href={link.path}
                            className={`font-normal hover:text-blue-500 transition duration-200 tablet:text-[18px] desktop:text-[20px] ${
                              link.active ? "!text-[#0A85C2]" : "text-[#1E2125]"
                            }`}
                          >
                            {link.active && (
                              <span className="text-[#EB1D1D]">{">>"}</span>
                            )}
                            {link.label}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Local Quick Review Button - Show for all pages */}
                {/* <button
                  onClick={handleLocalQuickReviewClick}
                  className="mr-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  title="Lokalni hitri pregled"
                  disabled={!isUserLoaded}
                >
                  <Image
                    src="/quick_review_icon.png" // You'll need to add this icon
                    alt="Quick Review"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </button> */}

                {/* Back Button */}
                {canShowBack && (
                  <button
                    onClick={() => router.push("/")}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200 "
                    title="Nazaj"
                  >
                    <Image src="/back.svg" alt="Back" height={28} width={28} />
                  </button>
                )}
                <SideMenu />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      {isLocalQuickModalVisible && !user && (
        <LocalQuickReview
          setIsLocalQuickModalVisible={setIsLocalQuickModalVisible}
        />
      )}

      {isLocalQuickReviewModalVisible && user && (
        <LocalQuickReviewModal
          setIsLocalQuickReviewModalVisible={setIsLocalQuickReviewModalVisible}
        />
      )}
    </>
  );
}

export default CommonHeader;
