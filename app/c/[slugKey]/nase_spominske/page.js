"use client";
import CompanyAccountLayout from "@/app/components/appcomponents/CompanyAccountLayout";
import obituaryService from "@/services/obituary-service";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Spominske() {
  const [obituaries, setObituaries] = useState([]);
  const [monthData, setMonthData] = useState({
    currentMonthCount: 0,
    lastMonthCount: 0,
  });
  const [totalObitWithKeeper, setTotalObitWithKeeper] = useState(0);
  const [monthlyTotalData, setMonthlyTotalData] = useState({});
  const [currentMonthData, setCurrentMonthlData] = useState(null);

  const getMonthlyData = async () => {
    try {
      const response = await obituaryService.getMonthlyCompanyData();
      if (response) {
        setMonthlyTotalData(response.obituaries);
        setTotalObitWithKeeper(response.totalObituariesWithKeeper);
        const now = new Date();
        const formatted = now.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });
        if (typeof response.obituaries[formatted] !== undefined) {
          setCurrentMonthlData(response.obituaries[formatted]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getObituaries();
      getMonthlyData();
    }, 500);
  }, []);

  const getObituaries = async () => {
    try {
      const response = await obituaryService.getCompanyObituaries();
      setObituaries(response.obituaries);
      setMonthData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (timestamp) => {
    const funeralDate = new Date(timestamp);
    if (isNaN(funeralDate.getTime())) return "";

    const day = funeralDate.getDate().toString().padStart(2, "0");
    const month = (funeralDate.getMonth() + 1).toString().padStart(2, "0");
    const year = funeralDate.getFullYear();

    return `${day}.${month}.${year}`;
  };
  return (
    <CompanyAccountLayout isMobileViewChange={true}>
      <div className="w-full mobile:max-w-full max-w-[940px]">
        <div className="mt-[62px] mobile:hidden flex justify-between">
          <div className="flex gap-[15px]">
            <div className="border-gradient-rounded  flex flex-col h-[90px] w-[310px] py-[13px] px-[15px] border-[2px] border-[#0A85C2] rounded-[10px] bg-[#fff] shadow-md">
              <div className="flex justify-between items-start mb-[2px]">
                <h2 className="text-[32px] text-[#CCCCCC] font-light leading-none flex items-end gap-[10px]">
                  <span className="font-bold text-[#6D778E] text-[40px]">
                    {obituaries?.length ?? 0}
                  </span>
                  I <span>{currentMonthData?.obituaries?.length ?? 0}</span>
                </h2>
                <img
                  src="/ico_pregled.png"
                  alt="pregled"
                  className="w-[26px] h-[20px]"
                />
              </div>
              <p className="text-[16px] text-[#CCCCCC] font-light">
                <span className="text-[#1E2125] font-medium">
                  Objavljenih osmrtnic{" "}
                </span>{" "}
                I Ta mesec
              </p>
            </div>

            <div className="border-gradient-rounded  flex flex-col h-[90px] w-[310px] py-[13px] px-[15px] border-[2px] border-[#0A85C2] rounded-[10px] bg-[#fff] shadow-md">
              <div className="flex justify-between items-start mb-[2px]">
                <h2 className="text-[32px] text-[#CCCCCC] font-light leading-none flex items-end gap-[10px]">
                  <span className="font-bold text-[#6D778E] text-[40px]">
                    {totalObitWithKeeper}
                  </span>{" "}
                  I <span>{currentMonthData?.stats?.keeperCount ?? 0}</span>
                </h2>
                <img
                  src="/spominske.png"
                  alt="pregled"
                  className="w-[26px] h-[20px]"
                />
              </div>
              <p className="text-[16px] text-[#CCCCCC] font-light">
                <span className="text-[#1E2125] font-medium">
                  Podarjenih Skrbnikov{" "}
                </span>{" "}
                I Ta mesec
              </p>
            </div>
          </div>
          <div className="space-y-[5px] tabletUserAcc:hidden mobileUserAcc:hidden">
            <div className="flex gap-3">
              <div className="w-[30px] shrink-0 inline-flex items-center justify-end">
                <img
                  src="/ico_pregled.png"
                  alt="spominske"
                  className="h-[10px]"
                />
              </div>
              <span className="text-[#717B8C] text-[12px]">
                Dodana osmrtnica
              </span>
            </div>
            <div className="flex gap-3">
              <div className="w-[30px] shrink-0 inline-flex items-center justify-end">
                <img
                  src="/spominske.png"
                  alt="spominske"
                  className="h-[10px]"
                />
              </div>
              <span className="text-[#717B8C] text-[12px]">Dodan Skrbnik</span>
            </div>
            <div className="flex gap-3">
              <div className="w-[30px] shrink-0 inline-flex items-center justify-end">
                <img src="/dodana.png" alt="spominske" className="h-[10px]" />
              </div>
              <span className="text-[#717B8C] text-[12px]">
                Dodana osmrtnica IN Skrbnik
              </span>
            </div>
            <div className="flex gap-3">
              <div className="w-[30px] shrink-0 inline-flex items-center justify-end">
                <img src="/obarvano.png" alt="spominske" className="h-[10px]" />
              </div>
              <span className="text-[#717B8C] text-[12px]">
                (obarvano) Aktivni Skrbnik
              </span>
            </div>
          </div>
        </div>
        <div className="mobileUserAcc:my-[16px] mt-[76px] mobile:min-w-full min-w-[720px]">
          <div className="flex justify-between">
            <div className="flex mobile:hidden items-end gap-2">
              <h4
                className="text-[24px] text-[#0A85C2] leading-none"
                style={{
                  fontVariationSettings: "'wdth' 50,'wght' 600,'opsz' 26",
                }}
              >
                Vse osmrtnice in spominske
              </h4>
              <span className="text-[#717B8C] text-[12px] leading-none mb-[2px]">
                ,{"   "}ki ste jih podarili
              </span>
            </div>

            <div className="mobileUserAcc:justify-between mobileUserAcc:w-full mobileUserAcc:max-w-[500px] mobileUserAcc:items-center mobile:space-y-0 space-y-[5px] tabletUserAcc:block mobileUserAcc:flex hidden">
              <div className="flex mobile:gap-2.5 gap-3">
                <div className="w-[30px] shrink-0 inline-flex items-center justify-end">
                  <img
                    src="/ico_pregled.png"
                    alt="spominske"
                    className="h-[10px]"
                  />
                </div>
                <span className="mobile:hidden block text-[#717B8C] text-[12px]">
                  Dodana osmrtnica
                </span>
                <span className="mobile:block hidden text-[#717B8C] text-[12px]">
                  Osmrtnica
                </span>
              </div>
              <div className="flex mobile:gap-2.5 gap-3">
                <div className="w-[30px] shrink-0 inline-flex items-center justify-end">
                  <img
                    src="/spominske.png"
                    alt="spominske"
                    className="h-[10px]"
                  />
                </div>
                <span className="mobile:hidden block text-[#717B8C] text-[12px]">
                  Dodan Skrbnik
                </span>
                <span className="mobile:block hidden text-[#717B8C] text-[12px]">
                  Skrbnik
                </span>
              </div>
              <div className="flex gap-3 mobile:hidden">
                <div className="w-[30px] shrink-0 inline-flex items-center justify-end">
                  <img src="/dodana.png" alt="spominske" className="h-[10px]" />
                </div>
                <span className="text-[#717B8C] text-[12px]">
                  Dodana osmrtnica IN Skrbnik
                </span>
              </div>
              <div className="flex gap-3">
                <div className="w-[30px] shrink-0 inline-flex items-center justify-end">
                  <img
                    src="/obarvano.png"
                    alt="spominske"
                    className="h-[10px]"
                  />
                </div>
                <span className="text-[#717B8C] text-[12px]">
                  (obarvano)
                  <br className="mobile:block hidden" />
                  Aktivni Skrbnik
                </span>
              </div>
            </div>
          </div>
          <div className="mt-[36px] grid grid-cols-4 tabletUserAcc:grid-cols-3 mobileUserAcc:grid-cols-1 mobileUserAcc:w-[215px] gap-[18px]">
            {obituaries && obituaries.length > 0
              ? obituaries.map((obituary, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-b from-[#0D94E8] to-[#1860A3] rounded-[8px] p-[2px] h-[72px]"
                  >
                    <div className="bg-[#E9F1E8] rounded-[7px] w-full h-full">
                      <div className="w-full flex flex-col items-center justify-center pt-[9px] pb-0 cursor-pointer">
                        <Link
                          href={`/m/${obituary.slugKey}`}
                          className="text-[14px] text-[#6D778E] w-full flex flex-col items-center justify-center"
                        >
                          <p className="text-[16px] text-[#1E2125]">
                            {obituary.name} {obituary.sirName}
                          </p>
                          <p className="text-[14px] text-[#6D778E]">
                            {obituary.city}
                          </p>
                        </Link>
                      </div>
                      <div className="flex justify-between items-center px-[6px] pb-[6px]">
                        {obituary.hasKeeper === true ? (
                          <img src="/dodana.png" alt="" className="h-[10px]" />
                        ) : (
                          <img
                            src="/ico_pregled.png"
                            alt=""
                            className="h-[10px]"
                          />
                        )}
                        <span className="text-[#6D778E99] text-[10px] leading-none">
                          {formatDate(obituary.createdTimestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </CompanyAccountLayout>
  );
}
