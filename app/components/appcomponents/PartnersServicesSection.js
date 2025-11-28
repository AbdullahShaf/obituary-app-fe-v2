import React from "react";
import PartnersSelectionList from "./PartnersSelectionList";
const PartnersServicesSection = () => {
  const defaultItems = [
    {
      name: "cvetličarne",
      link: "cvetličarne",
    },
    {
      name: "KAMNOSEŠTVO",
      link: "kamnoseštvo",
    },
    {
      name: "svečarstvo",
      link: "svečarstvo",
    },
  ];
  const items = [
    {
      name: "cvetličarne",
      link: "cvetličarne",
    },
    {
      name: "KAMNOSEŠTVO",
      link: "kamnoseštvo",
    },
    {
      name: "svečarstvo",
      link: "svečarstvo",
    },
    {
      name: "VSE DEJAVNOSTI",
      link: "VSE-DEJAVNOSTI",
    },
  ];
  return (
    <div className="w-full max-w-5xl mx-auto mb-28">
      <h1 className="flex font-normal text-[40px] leading-[48px] tracking-normal text-black mb-9">
        Storitve
      </h1>
      <PartnersSelectionList
        defaultItems={defaultItems}
        items={items}
        title="storitve"
      />
    </div>
  );
};

export default PartnersServicesSection;
