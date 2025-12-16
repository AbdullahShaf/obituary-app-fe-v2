import Link from "next/link";
import React from "react";
import Image from "next/image";

const RegisterComp = () => {
  return (
    <div className="relative max-w-[1920px] bg-[#eef2f5] py-[65px] desktop:py-[105px] tablet:py-[75px] w-full overflow-hidden flex mx-auto justify-center items-center">
      {/*Main contianer*/}
      <div className="flex w-[1086px] h-[312px]  tablet:w-[619px] tablet:h-[521px] mobile:h-[747px] mobile:w-[100%] mobile:max-w-[480px] flex-col">
        {/*Main contianer*/}
        <div className="flex w-[1014.25px] tablet:w-[619px] mobile:w-[100%] mobile:max-w-[480px] mx-auto mobile:flex-col tablet:flex-col">
          {/*Main contianer for tablet*/}
          <div className="w-[619px] h-[424px] flex-col hidden tablet:flex">
            <h2 className="sr-only">Funkcionalnosti registracije</h2>
            {/*1st coloum container*/}
            <div className="flex h-[200px]">
              <div className="w-[295.42px] h-[200px] flex-col items-center ">
                <Image
                  src="/image_registration_desktop.png"
                  width={64}
                  height={64}
                  className="w-[64px] h-[64px] mx-auto"
                  alt="Ikona registracije"
                />
                <h3 className="text-[20px] text-[#1E2125] font-variation-customOpt20wght400 text-center font-semibold mt-3">
                  Registrirajte se
                </h3>
                <div className="text-[16px] text-[#3C3E41] font-variation-customOpt16 text-center mt-[13px] leading-[27px]">
                  Poslali vam bomo dodatna pojasnila in z vnašanjem svojih
                  testov in slik lahko pričnete takoj.
                </div>
              </div>

              <div className="w-[295.42px] h-[200px] flex-col items-center ml-6">
                <Image
                  src="/image_posting.png"
                  width={64}
                  height={64}
                  className="w-[64px] h-[64px] mx-auto"
                  alt="Ikona objave"
                />
                <h3 className="text-[20px] text-[#1E2125] font-variation-customOpt20wght400 text-center font-semibold mt-3">
                  Objava v 48 urah
                </h3>
                <div className="text-[16px] text-[#3C3E41] font-variation-customOpt16 text-center mt-[13px] leading-[27px]">
                  Ko potrdite vnos vseh podatkov, bomo vašo stran pripravili in
                  najkasneje v dveh dneh tudi objavili.
                </div>
              </div>
            </div>

            {/*2nd coloum container*/}
            <div className="flex h-[200px] mt-6">
              <div className="w-[295.42px] h-[200px] flex-col items-center ">
                <Image
                  src="/image_tablet_flexibility.png"
                  width={64}
                  height={64}
                  className="w-[64px] h-[64px] mx-auto"
                  alt="Ikona fleksibilnosti"
                />
                <h3 className="text-[20px] text-[#1E2125] font-variation-customOpt20wght400 text-center font-semibold mt-3">
                  Fleksibilnost
                </h3>
                <div className="text-[16px] text-[#3C3E41] font-variation-customOpt16 text-center mt-[13px] leading-[27px]">
                  Vsebino lahko kadarkoli spreminjate glede na potrebe,
                  praznike, posebne promocije. Naj vaša stran živi!
                </div>
              </div>

              <div className="flex w-[295.42px] h-[200px] flex-col items-center ml-6">
                <Image
                  src="/image_all_devices.png"
                  width={64}
                  height={64}
                  className="w-[64px] h-[64px]"
                  alt="Ikona prilagojenosti vsem napravam"
                />
                <h3 className="text-[20px] text-[#1E2125] font-variation-customOpt20wght400 text-center font-semibold mt-3">
                  Prilagojeno vsem napravam
                </h3>
                <div className="text-[18px] text-[#3C3E41] font-variation-customOpt18 text-center mt-[13px] leading-[27px] ">
                  Vaša spletna stran bo profesionalnega videza na računalniku,
                  tablici in telefonu.
                </div>
              </div>
            </div>
          </div>

          {/*C1 container for desktop*/}
          <div className="w-[295.42px] h-[200px] flex-col items-center flex tablet:hidden mobile:w-full mobile:max-w-[480px] mobile:px-2">
            <h2 className="sr-only">Funkcionalnosti registracije</h2>
            <Image
              src="/image_registration_desktop.png"
              width={64}
              height={64}
              className="w-[64px] h-[64px]"
              alt="Ikona registracije"
            />
            <h3 className="text-[20px] text-[#1E2125] font-variation-customOpt20wght400 font-semibold mt-[13px]">
              Registrirajte se
            </h3>
            <div className="text-[16px] text-[#3C3E41] font-variation-customOpt16 text-center mt-[13px] leading-[27px]">
              Poslali vam bomo dodatna pojasnila in z vnašanjem svojih testov in
              slik lahko pričnete takoj.
            </div>
          </div>

          {/*C2 container for desktop*/}
          <div className="w-[295.42px] h-[200px] flex-col items-center flex desktop:ml-16 tablet:hidden mobile:mt-6 mobile:w-full mobile:max-w-[480px] mobile:px-2">
            <Image src="/image_posting.png" width={64} height={64} className="w-[64px] h-[64px]" alt="Ikona objave"/>
            <h3 className="text-[20px] text-[#1E2125] font-variation-customOpt20wght400 font-semibold mt-[13px]">
              Objava v 48 urah
            </h3>
            <div className="text-[16px] text-[#3C3E41] font-variation-customOpt16 text-center mt-[13px] leading-[27px]">
              Ko potrdite vnos vseh podatkov, bomo vašo stran pripravili in
              najkasneje v dveh dneh tudi objavili.
            </div>
          </div>

          {/*C3 container for desktop*/}
          <div className="w-[295.42px] h-[200px] flex-col items-center flex desktop:ml-16 tablet:hidden mobile:mt-6 mobile:w-full mobile:max-w-[480px] mobile:px-2">
            <Image
              src="/image_flexibility.png"
              width={64}
              height={64}
              className="w-[64px] h-[64px] hidden desktop:flex"
              alt="Ikona fleksibilnosti"
            />
            <Image
              src="/image_tablet_flexibility.png"
              width={64}
              height={64}
              className="w-[64px] h-[64px] mx-auto hidden mobile:flex"
              alt="Ikona fleksibilnosti"
            />
            <h3 className="text-[20px] text-[#1E2125] font-variation-customOpt20wght400 font-semibold mt-[13px]">
              Fleksibilnost
            </h3>
            <div className="text-[16px] text-[#3C3E41] font-variation-customOpt16 text-center mt-[13px] leading-[27px]">
              Vsebino lahko kadarkoli spreminjate glede na potrebe, praznike,
              posebne promocije. Naj vaša stran živi!
            </div>
          </div>

          {/*Bottom contianer for mobile*/}
          <Link
            href={"/podjetja"}
            className="self-center hidden mobile:flex w-full mt-[51px] mobile:max-w-[150px]"
          >
            {/* <Link href={"/registracija"} className='self-center hidden mobile:flex w-full mt-[51px]'> */}
            <div className="w-full h-12 rounded-lg text-black flex justify-center items-center shadow-custom-light-dark bg-gradient-to-r from-[#E3E8EC] to-[#FFFFFF]">
              {/* <div className="w-full h-12 rounded-lg text-black flex justify-center items-center shadow-custom-light-dark bg-[#BCD7F4]"> */}
              Registriraj se
              {/* Registracija */}
            </div>
          </Link>

          {/*Bottom contianer for tablet*/}
          <Link href={"/podjetja"} className="self-center hidden tablet:flex">
            <div className="w-full tablet:w-[295px] h-[48px] rounded-lg text-black justify-center items-center self-center mt-[51px] shadow-custom-light-dark bg-[#BCD7F4] hidden tablet:flex">
              Registracija
            </div>
          </Link>
        </div>

        {/*Bottom contianer for desktop*/}
        {/* <Link href={"/podjetja"} className='self-center hidden desktop:flex'> */}
        <Link
          href={"/podjetja"}
          className="self-center hidden desktop:flex"
        >
          {/* <div className="w-[141px] h-[48px] rounded-lg text-[#1E2125] justify-center items-center hidden desktop:flex mt-16 shadow-custom-light-dark bg-gradient-to-r from-[#E3E8EC] to-[#FFFFFF]  text-[16px] font-variation-customOpt16"> */}
          <div className="w-[141px] h-[48px] rounded-lg text-[#1E2125] justify-center items-center hidden desktop:flex mt-16 shadow-custom-light-dark bg-[#BCD7F4] text-[16px] font-variation-customOpt16">
            Registracija
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RegisterComp;
