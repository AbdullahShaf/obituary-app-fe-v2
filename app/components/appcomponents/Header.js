"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import iconMenu from "@/public/icon_menu_black.png";
import omr from "@/public/omr.png";
import Link from "next/link";
import SideMenu from "../ui/sideMenu";
import { useRouter } from "next/navigation";
//test
function Header({ onMenuCLick, from, isMegaMenuVisible }) {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="flex flex-col fixed top-[45px] left-0 right-0 shadow-md z-50 pt-[1px] bg-[#FFFFFF]">
      <div className=" flex w-full justify-center">
        <div
          className={`
        desktop:h-[92.02px] mobile:h-[72px] tablet:h-[79px]
        w-full  desktop:w-[1200px]
        desktop:pl-[23px] ${isMegaMenuVisible && from === "1"
              ? "tablet:max-w-[700px] tablet:w-full mobile:max-w-[400px] mobile:w-full"
              : ""
            } desktop:pr-[27px] tablet:pl-[23px]  tablet:pr-[27px] mobile:px-[20px]
        `}
        >
          <div className="mobile:h-[72px] tablet:h-[79px] desktop:h-[92.02px] w-full desktop:w-[1150px] flex justify-between items-center ">
            <Link href={"/"} className="flex justify-start items-center">
              <Image
                src={omr}
                alt="App Logo"
                width={500}
                height={500}
                className="box-border h-[22px] w-[182.76px] desktop:w-[255.31px] desktop:h-[32px]"
              />
            </Link>
            <SideMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export function FAQHeader() {
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="flex flex-col fixed h-[92px] mobile:h-[55px] tablet:h-[80px] left-0 right-0 shadow-md z-50 bg-[#FFFFFF] px-5">
        <div className="desktop:w-[1200px] w-full tablet:max-w-[744px] tablet:w-full flex justify-between h-full items-center mx-auto">
          <Link href={"/"} className="flex">
            <Image
              src={omr}
              alt="App Logo"
              width={500}
              height={500}
              className="box-border h-[22px] w-[182.76px] desktop:w-[255.31px] desktop:h-[32px]"
            />
          </Link>
          <div className="flex gap-[24px] items-center mobile:hidden">
            <Link
              href={"/vodic"}
              className="mobile:w-[72px] flex text-[18px] leading-[24px] font-[400] text-white bg-[#083545]  tablet:w-[72px] w-[149px] rounded-[2px] py-[5px] text-center items-center justify-center"
            >
              VODIČ
            </Link>
            <Link
              href={"/cenik"}
              className="flex text-[18px] leading-[24px] font-[400] text-[#1E2125] mobile:hidden"
            >
              CENIK
            </Link>
            <Link
              href={"/c-faq"}
              className="flex text-[18px] leading-[24px] font-[400] text-[#1E2125] mobile:hidden"
            >
              KAKO ZAČNEM
            </Link>
            <Link
              href={"/c-priloznost"}
              className="flex text-[18px] leading-[24px] font-[400] text-[#1E2125] mobile:hidden"
            >
              <Image
                src={"/proiloznoot.svg"}
                alt="User"
                width={150}
                height={35}
              />
            </Link>
          </div>
          {/* {windowWidth > 0 && windowWidth < 600 && ( */}
          <div className="desktop:hidden tablet:hidden flex mobile:items-center">
            <Link
              href={"/vodic"}
              className="mobile:w-[72px] mobile:mr-[20px] flex text-[18px] leading-[24px] font-[400] text-white bg-[#083545]  tablet:w-[72px] w-[149px] rounded-[2px] py-[5px] text-center items-center justify-center"
            >
              VODIČ
            </Link>
            <Link
              href={"/resitve-za-cvetlicarne"}
            >
              <div className="flex space-x-6 items-center">
                {/* <Link
                  href={"/vodic"}
                  className="flex text-[18px] leading-[24px] font-[400] text-white bg-[#083545]  mobile:w-[72px] rounded-[2px] py-[5px] text-center items-center justify-center"
                >
                  VODIČ
                </Link> */}
                <Image
                  src={"/ico_arrow.png"}
                  alt="Menu"
                  width={26}
                  height={28}
                />
              </div>
            </Link>
          </div>
          {/* )} */}
        </div>
      </header>
    </>
  );
}

export function FAQHeader2() {
  return (
    <header className="flex flex-col fixed h-[92px] mobile:h-[55px] tablet:h-[80px] left-0 right-0 shadow-md z-50 bg-[#FFFFFF] px-4">
      <div className="desktop:w-[1200px] w-full tablet:max-w-[744px] tablet:w-full flex justify-between h-full items-center mx-auto">
        <Link href={"/"} className="flex">
          <Image
            src={omr}
            alt="App Logo"
            width={500}
            height={500}
            className="box-border h-[22px] w-[182.76px] desktop:w-[255.31px] desktop:h-[32px]"
          />
        </Link>
        <div className="flex gap-[24px] items-center mobile:hidden">
          <Link
            href={"/p-info"}
            className="flex text-[18px] leading-[24px] font-[400] text-[#1E2125]"
          >
            CENIK
          </Link>
          <Link
            href={"/p-faq"}
            className="flex text-[18px] leading-[24px] font-[400] text-[#1E2125]"
          >
            KAKO ZAČNEM
          </Link>
          <Link
            href={"/p-priloznost "}
            className="flex text-[18px] leading-[24px] font-[400] text-[#1E2125]"
          >
            <Image
              src={"/proiloznoot.svg"}
              alt="User"
              width={150}
              height={35}
            />
          </Link>
        </div>
        <Link
          href={"/resitve-za-pogrebna-podjetja"}
          className="hidden mobile:flex"
        >
          <Image
            src={"/faq_header_top.png"}
            alt="Menu"
            width={26}
            height={28}
          />
        </Link>
      </div>
    </header>
  );
}

export function FAQHeader3() {
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="flex flex-col fixed h-[92px] mobile:h-[55px] tablet:h-[80px] left-0 right-0 shadow-md z-50 bg-[#FFFFFF] px-5">
        <div className="desktop:w-[1200px] w-full tablet:max-w-[744px] tablet:w-full flex justify-between h-full items-center mx-auto">
          <Link href={"/resitve-za-pogrebna-podjetja"} className="flex">
            <Image
              src={omr}
              alt="App Logo"
              width={500}
              height={500}
              className="box-border h-[22px] w-[182.76px] desktop:w-[255.31px] desktop:h-[32px]"
            />
          </Link>
          <div className="flex gap-[24px] items-center mobile:hidden">
            {/* <Link
              href={"/vodic"}
              className="flex text-[18px] leading-[24px] font-[400] text-white bg-[#083545]  tablet:w-[72px] w-[149px] rounded-[2px] py-[5px] text-center items-center justify-center"
            >
              VODIČ
            </Link> */}
            <span
              className="flex text-[18px] leading-[24px] font-[400] text-[#D4D4D4]"
            >
              POGREBNA PODJETJA
            </span>
            <Link
              href={"/cvetlicarne"}
              className="flex text-[18px] leading-[24px] font-[400] text-[#1E2125]"
            >
              CVETLIČARNE
            </Link>
            <Link
              href={"/oglasevalci"}
              className="flex text-[18px] leading-[24px] font-[400] text-[#1E2125]"
            >
              OGLAŠEVALCI
            </Link>
            {/* <Link
              href={"/c-priloznost"}
              className="flex text-[18px] leading-[24px] font-[400] text-[#1E2125]"
            >
              <Image
                src={"/proiloznoot.svg"}
                alt="User"
                width={150}
                height={35}
              />
            </Link> */}
          </div>
          {/* {windowWidth > 0 && windowWidth < 600 && ( */}
          <div className="desktop:hidden tablet:hidden flex">
            <Link
              href={"/resitve-za-cvetlicarne"}
            >
              <div className="flex space-x-6 items-center">
                {/* <Link
                  href={"/vodic"}
                  className="flex text-[18px] leading-[24px] font-[400] text-white bg-[#083545]  mobile:w-[72px] rounded-[2px] py-[5px] text-center items-center justify-center"
                >
                  VODIČ
                </Link> */}
                <Image
                  src={"/ico_arrow.png"}
                  alt="Menu"
                  width={26}
                  height={28}
                />
              </div>
            </Link>
          </div>
          {/* )} */}
        </div>
      </header>
    </>
  );
}

export function OglasevalciHeader({ arrowOnly = false }) {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="flex flex-col fixed h-[92px] mobile:h-[55px] tablet:h-[80px] left-0 right-0 shadow-md z-50 bg-[#FFFFFF] px-5">
        <div className="desktop:w-[1200px] w-full tablet:max-w-[744px] tablet:w-full flex justify-between h-full items-center mx-auto">
          <Link href={"/"} className="flex">
            <Image
              src={omr}
              alt="App Logo"
              width={500}
              height={500}
              className="box-border h-[22px] w-[182.76px] desktop:w-[255.31px] desktop:h-[32px]"
            />
          </Link>
          <div className="flex gap-[24px] items-center">
            {!arrowOnly ? (
              <Link
                href={"/cenik"}
                className="flex text-[18px] leading-[24px] font-[400] text-[#1E2125]"
              >
                CENIK
              </Link>
            ) : null}
            <div className="flex">
              <span
                onClick={() => router.back()}
              >
                <div className="flex space-x-6 items-center">
                  <Image
                    src={"/ico_arrow.png"}
                    alt="Menu"
                    width={26}
                    height={28}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
