import React from "react";

const PartnersContactSection = () => {
  return (
    <div className="w-full bg-white pt-[124px] pb-[130px] flex flex-col items-center gap-12">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-[2px] items-center">
        <h2 className="text-[#3C3E41] font-normal text-[28px] md:text-[40px] leading-[48px] mb-6">
          Sodelujmo!
        </h2>
        <p className="text-[#4E4E4E] font-normal text-base leading-4 mb-4">
          Imate ideje, vprašanja, predloge?
        </p>
        <p className="text-[#4E4E4E] font-normal text-base leading-4">
          Kontaktirajte nas! V teku so številne promocije!
        </p>
      </div>
      <a href="mailto:info@osmrtnica.com">
        <button className="bg-gradient-to-b from-[#0D94E8] to-[#1860A3] shadow-md shadow-lg border border-[#0A85C2] w-[250px] h-[52px] rounded-[50px] text-white text-lg">
          Pišite nam
        </button>
      </a>
    </div>
  );
};

export default PartnersContactSection;
