"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import screenSizes from "@/app/lokalni/constant";
import { robotoFlex } from "@/utils/customFonts";

const RegionSelectionList = ({ title, defaultItems, items, screen }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const paramValue = searchParams.get(title); // read ?title=value from URL
  const [selectedItem, setSelectedItem] = React.useState(paramValue || "");

  // Sync state when query param changes externally
  React.useEffect(() => {
    if (paramValue && paramValue !== selectedItem) {
      setSelectedItem(paramValue);
    }
  }, [paramValue]);

  // Helper: update query parameter
  const updateQuery = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(title, value);
    setSelectedItem(value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className="flex flex-row gap-[14px] justify-between items-center"
      style={{
        fontFamily: robotoFlex.style.fontFamily,
      }}
    >
      <div className="flex flex-row gap-[14px] items-center w-full">
        {screen === screenSizes.MOBILE ? null : (
          <DefaultItemsList
            title={title}
            defaultItems={defaultItems}
            selected={selectedItem}
            onSelect={updateQuery}
          />
        )}

        <ItemsList
          title={title}
          items={items}
          defaultItems={defaultItems}
          selected={selectedItem}
          onSelect={updateQuery}
        />
      </div>
    </div>
  );
};

// Default buttons
const DefaultItemsList = ({ defaultItems, selected, onSelect }) => {
  return (
    <div className="flex flex-row gap-[14px]">
      {defaultItems.map((item, index) => {
        const isActive = selected === item.name;
        return (
          <button
            key={index}
            onClick={() => onSelect(item.name)}
            className={`rounded-[3px] py-1 px-3 uppercase text-base leading-6 h-12 flex items-center border-2
              ${
                isActive
                  ? "bg-[#1860A3] border-[#1860A3] text-white"
                  : "bg-[#F9EBD466] border-[#1860A3] text-[#1860A3]"
              }`}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

// Dropdown
const ItemsList = ({ items, defaultItems, selected, onSelect, title }) => {
  const isDefault = defaultItems.some((d) => d.link === selected);
  const isActive = selected && !isDefault;

  return (
    <div>
      <select
        name={title}
        id={title}
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className={`rounded-[3px] py-1 pl-3 pr-8 capitalize text-base leading-6 h-12 w-60 flex items-center border-2
          ${
            isActive
              ? "bg-[#1860A3] border-[#1860A3] text-white"
              : "bg-white border-[#1860A3] text-[#1860A3]"
          }`}
      >
        <option value="">Izberite..</option>
        {items.map((item, index) => (
          <option
            key={index}
            value={item.link}
            className=" overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelectionList;
