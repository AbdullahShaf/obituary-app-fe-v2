import React from "react";

export default function Tabs({
  tabs,
  tabContent,
  setActive,
  active,
  text,
  innerTab,
}) {
  return (
    <div className="w-full">
      {/* Tabs Container */}
      <div
        className={`flex mobile:mb-5 mb-8  items-center mx-auto  ${
          !innerTab
            ? "mobile:bg-[#36556C] mobile:h-[35px] scrollbar-hide gap-6 justify-center mobile:justify-between"
            : "flex mobile:flex-wrap gap-x-6 gap-y-2"
        }  bg-transparent mobile:px-2 px-4`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`mobile:text-[16px] ${
              tab.id === "pogrebna-podjetja" && "mobile:hidden"
            } text-[20px] text-nowrap mobile:uppercase mobile:w-[33.33%] transition-all duration-200  
                ${
                  active === tab.id
                    ? `text-[#0A85C2] ${
                        innerTab
                          ? "bg-[#ffffff] border-b-2 border-[#0077CC] px-2 py-2"
                          : "mobile:px-0 mobile:border-0 px-2 mobile:py-0 py-2"
                      }  border-b-2 border-[#0077CC]`
                    : `${
                        !innerTab && "mobile:text-[#ffffff]"
                      } mobile:border-0 mobile:py-0 py-2 border-b-2 border-[#D4D4D4] text-[#6D778E]`
                }`}
          >
            {tab.label}
          </button>
        ))}
        {text && (
          <p className="text-[#034F75] flex gap-1 ml-2 w-full desktop:w-[744px] mobile:text-[14px] text-[14px] mobile:mb-3">
            {text}
          </p>
        )}
      </div>
      <div className={`mobile:flex hidden justify-end w-[95%] ${active == tabs[3]?.id ? 'mobile:hidden tablet:hidden' : ''}`}>
        <button
          onClick={() => setActive(tabs[3]?.id)}
          className="text-[#414141] underline mobile:text-[14px] text-[16px]"
        >
          {tabs[3]?.label}
        </button>
      </div>
      {/* Active Tab Content (optional demo) */}
      {tabContent}
    </div>
  );
}
