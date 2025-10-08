import Image from "next/image";
import React, { useEffect, useState } from "react";
import packageService from "@/services/pacakge-service";
import Link from "next/link";
// const FlowerShops = ({ set_Id, setModal }) => {
//   return (
//     <div className="desktop:h-[426px] mx-auto tablet:h-[450px] mobile:h-[430px] w-full flex flex-col mobile:justify-center desktop:justify-center items-center  bg-[#F8EDE3]"
//     style={{
//       boxShadow: '2.5px 2.5px 5px 0px #A6ABBD inset, -1.5px -1.5px 5px 0px #A6ABBDBF inset'
//     }}>
//       <div className="mx-auto h-[230px] mobile:flex-col mobile:items-center desktop:w-[800px] tablet:mt-[110px] tablet:w-[600px] mobile:max-w-[560.17px] mobile:w-full mobile:h-[286px] ">
//         <div
//           onClick={() => {
//             set_Id("16");
//             setModal(true);
//           }}
//           className="leading-[46.88px] cursor-pointer text-[28px] desktop:text-[40px] mobile:flex mobile:justify-center font-variation-customOpt40 text-[#1E2125]"
//         >
//           Cvetličarne
//         </div>

//         <div className="w-[600px] mt-[16px] mobile:max-w-[560.17px] mobile:w-full mobile:px-[30px]  text-[#414141] text-[16px] leading-[24px] font-variation-customOpt16">
//           <div>
//           Pregled lokalnih cvetličarn in dela njihove ponudbe. Pri njih lahko prevzamete brezplačna digitalna obvestila o pogrebu, sožalja, zahvale, enomesečnega Skrbnika.
//           </div>
//         </div>

//         <div
//           className="w-[97px] h-[47px] mt-[48px] mobile:mt-[32px] mobile:mx-auto mobile:w-[180px] text-[20px] rounded-lg text-[#1E2125] flex justify-center items-center
//                  shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF] font-variation-customOpt20 leading-[23.44px]"
//         >
//           Odpri
//         </div>
//       </div>
//     </div>
//   );
// };

const FlowerShops = ({ setIsOpen, data, showShop }) => {
  console.log(">>>>>>>>>> data", data);
  useEffect(() => {
    if (data && data.floristShops && data?.floristShops?.length > 0) {
      const firstShop = data.floristShops[0];
      setSelectedFloristShop(firstShop);
      getPackages(firstShop.companyId);
    }
  }, [data]);

  const [packages, setPackages] = useState([]);
  const [company, setCompany] = useState(null);
  const [selectedFloristShop, setSelectedFloristShop] = useState(null);

  const getPackages = async (companyId) => {
    try {
      const response = await packageService.getPackages(companyId);
      setPackages(response.packages);
      setCompany(response.company);
    } catch (error) {
      console.log(error);
    }
  };

  const changeSelectedFlorist = (shop) => {
    setSelectedFloristShop(shop);
    getPackages(shop.companyId);
  };

  return showShop ? (
    <div
      className="w-full flex flex-col  justify-center  items-center  bg-[#F8EDE3] relative py-20 desktop:py-28"
      style={{
        boxShadow:
          "2.5px 2.5px 5px 0px #A6ABBD inset, -1.5px -1.5px 5px 0px #A6ABBDBF inset",
      }}
    >
      <div className="mx-auto jdmobile:flex-col jdmobile:items-center jdmobile:w-[370px] jdmobile:px-[30px] jdtablet:w-[650px] jddesktop:w-[900px]">
        {" "}
        <div className="flex justify-between jdmobile:gap-[12px]">
          <div className="leading-[46.88px] cursor-pointer text-[28px] desktop:text-[40px] font-variation-customOpt40 text-[#1E2125]  ">
            Cvetličarne
          </div>
          <img
            src="/memory_page_cross.png"
            alt="trbovlje"
            className="w-[50px] h-[50px]"
            onClick={() => setIsOpen(false)}
          />  
        </div>
        <div className="text-[#0A85C2] text-[32px] jdmobile:text-[24px] leading-[24px] font-variation-customOpt16 mt-[18px] jdmobile:mt-[8px] jdtablet:mb-[40px] jddesktop:mb-[40px] jdmobile:w-full jdmobile:mb-[50px]">
          {" "}
          {data?.city}
        </div>
      </div>
      <div className="w-full bg-[#F8EDE3]">
        {data && data.floristShops && data?.floristShops?.length > 0 && (
          <div className="mx-auto jdmobile:w-[370px] jdtablet:w-[700px] jddesktop:w-[1280px] w-[400px] grid grid-cols-2 jdtablet:grid-cols-3 jddesktop:grid-cols-6 jdmobile:justify-center place-items-center items-end">
            {/* Sponsor Card */}
            {data?.Company &&
              typeof data.Company.type === "string" &&
              data.Company.type.toLowerCase() === "florist" && (
                <div
                  className="bg-[#36556C] jddesktop:h-[230px] jddesktop:w-[182px] jdtablet:h-[230px] jdtablet:w-[182px] jdmobile:h-[184px] jdmobile:w-[150px] rounded-[8px] jdmobile:rounded-[2px] overflow-hidden relative flex flex-col items-center justify-center px-[12px] jdmobile:mb-5 jdtablet:mb-5 jddesktop:mb-5"
                  style={{
                    boxShadow: "0px 50px 40px -40px rgba(60, 62, 65, 1)",
                  }}
                >
                  <div className="text-[#FF984E] mobile:text-[16px] text-[24px]  font-semibold  mobile:font-normal text-center">
                    {data?.User.name}
                  </div>
                  <div className="text-[#E9EAF5] text-[14px] mt-[30px] text-center">
                    {data?.city}
                  </div>
                  <div className="absolute bottom-[12px] right-[12px]">
                    <img
                      src="/memory_demo/info.png"
                      alt="info"
                      className="w-[24px] h-[24px]"
                    />
                  </div>
                </div>
              )}

            {/* Cards (from cardImages) */}
            {data.floristShops.map((item, index) => (
              <Link
                // href={`/floristdetails/${item.id}`}
                href={`#`}
                onClick={(e) => e.preventDefault()} //NOTE: remove this which adding proper 'href'
                key={index}
                className=" bg-white jddesktop:w-[180px] jddesktop:h-[160px] jdtablet:w-[195px] jdtablet:h-[160px] jdmobile:w-[150px] jdmobile:h-[130px] jddesktop:rounded-[8px] jdtablet:rounded-[8px] jdmobile:border jdmobile:border-[rgba(54,85,108,0.6)] flex flex-col items-center justify-center relative overflow-hidden jdmobile:justify-end jdmobile:my-5 jdtablet:my-5 jddesktop:my-5 my-6 jddesktop:mx-2"
                style={{
                  boxShadow: "0px 50px 40px -40px rgba(60, 62, 65, 1)",
                }}
              >
                <div className="h-[80px] flex items-center">
                  <Image
                    src={item?.logo}
                    alt={`${item?.shopName || "Cvetličarna"} logo`}
                    width={120}
                    height={70}
                    className="w-[120px] h-[70px] object-contain mobile:w-[97px] mobile:h-[55px]"
                  />
                </div>
                <div className="text-[#9FA6B7] text-[13px] mt-[5px] mobile:bg-[#36556C] mobile:w-full mobile:text-white text-center mobile:py-2">
                  {item?.shopName || item?.CompanyPage?.name || "Cvetličarna"}
                </div>
              </Link>
            ))}
          </div>
        )}
        {!data?.floristShops?.length && (
          <div className="w-full">
            <div className="flex flex-col items-center justify-center w-full text-gray-500">
              <p>Še ni vnešenih&nbsp;cvetličarn.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export const FlowerShops2 = ({ setIsOpen, showShop }) => {
  return !showShop ? (
    <div
      className="h-[393px] mobile:h-[407px] w-full flex flex-col mobile:justify-center desktop:justify-center items-center  bg-[#F8EDE3] relative"
      style={{
        boxShadow:
          "2.5px 2.5px 5px 0px #A6ABBD inset, -1.5px -1.5px 5px 0px #A6ABBDBF inset",
      }}
    >
      <div className="mx-auto mobile:flex-col mobile:items-center desktop:w-[800px] tablet:mt-[110px] tablet:w-[600px] mobile:max-w-[560.17px] mobile:px-[30px] mobile:w-full">
        <div className="flex justify-between mobile:flex-col-reverse mobile:items-end mobile:gap-[12px]">
          <div className="leading-[46.88px] cursor-pointer text-[28px] desktop:text-[40px] mobile:flex mobile:justify-center font-variation-customOpt40 text-[#1E2125] mobile:w-full">
            Cvetličarne
          </div>
        </div>

        <div className="text-[#3C3E41] text-[16px] leading-[24px] mt-[16px] mobile:w-full mobile:text-center">
          Pregled lokalnih cvetličarn in dela njihove ponudbe. Pri njih lahko
          prevzamete brezplačna digitalna obvestila o pogrebu, sožalja, zahvale,
          enomesečnega Skrbnika.
        </div>

        <button
          className="text-[#1E2125] text-[20px] leading-[100%] font-[400] mt-[48px] py-[12px] px-[25px] rounded-[8px]"
          style={{
            background: "linear-gradient(113.63deg, #E3E8EC 0%, #FFFFFF 100%)",
            boxShadow: "-3px -3px 7px 0px #FFFFFFB2, 3px 3px 3px 0px #C2C2C299",
          }}
          onClick={() => setIsOpen(true)}
        >
          Odpri
        </button>
      </div>
    </div>
  ) : null;
};

export default FlowerShops;
