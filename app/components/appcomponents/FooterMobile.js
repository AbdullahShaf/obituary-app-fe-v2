"use client";
import React, { useEffect, useState } from "react";
import { IconView } from "./Commonfunction";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import obituaryService from "@/services/obituary-service";

function FooterMobile({ handleGoToTop, setIsMobilSideBarOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isIconChange, setIsIconChange] = useState(false);
  const { user } = useAuth();
  const [memories, setMemories] = useState([]);

  const getKeeperMemory = async () => {
    try {
      const response = await obituaryService.getKeeperMemories();

      setMemories(response.obituaries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKeeperMemory();
  }, []);

  const parsedUser = user;

  const { logout } = useAuth();
  return (
    <div className=" hidden mobileUserAcc:flex tabletUserAcc:flex self-end bottom-0 rounded-t-[12px] fixed z-[999] w-full h-[85px] bg-[#FFFFFF] shadow-lg justify-center items-center">
      <div
        className="justify-between items-center w-full max-w-[745px] flex mr-[55px] ml-[55px]
       mobileUserAcc:mx-[25px] my-0 mobileUserAcc:flex-row mobileUserAcc:max-w-[360px] mobileUserAcc:justify-between mobileUserAcc:items-center
      "
      >
        <div className=" hidden tabletUserAcc:flex ">
          <Link href={`/`} className="w-full h-[52px] ">
            <IconView
              iconPath={"/icon_sidebar_arrow.png"}
              name={"Na spletno stran"}
            />
          </Link>
        </div>

        <div className="flex mobileUserAcc:w-full justify-between tabletUserAcc:gap-[60px]">
          <div
            onClick={() => {
              // setIsMobilSideBarOpen(true);
              router.replace(`/u/${parsedUser?.slugKey}/menu`);
            }}
          >
            <IconView iconPath={"/icon_home.png"} name={"Domov"} />
          </div>

          <Link href={`/u/${parsedUser?.slugKey}/pregled`}>
            <div>
              <IconView
                iconPath={"/icon_inactive_heart.png"}
                name={"Moji bližnji"}
              />
            </div>
          </Link>

          <Link href={`/u/${parsedUser?.slugKey}/obletnice`}>
            <div>
              <IconView iconPath={"/icon_search.png"} name={"Obletnice"} />
            </div>
          </Link>

          {isIconChange ? (
            <div className="w-[68.77px] mobileUserAcc:w-[58.33px]">
              <IconView iconPath={"/gototop.png"} name={"Na vrh"} />
            </div>
          ) : (
            <Link href={`${memories && memories?.length ? `/u/${parsedUser?.slugKey}/pregled2` : "#"}`}>
              <div>
                <IconView
                  iconPath={"/icon_active_heart.png"}
                  name={"Moji skrbniki"}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
export default FooterMobile;
