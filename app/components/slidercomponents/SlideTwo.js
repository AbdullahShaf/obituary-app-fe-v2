"use client";
import Link from "next/link";
import Image from "next/image";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const SlideTwo = () => {
  const breakpoint = useBreakpoint();

  if (breakpoint === null) {
    return (
      <div className="bg-[#F5F0E8] text-[#22281C] w-full h-[891px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-64 bg-[#D4D4D4] rounded"></div>
          <div className="h-4 w-96 bg-[#D4D4D4] rounded"></div>
        </div>
      </div>
    );
  }

  // === Desktop Layout ===
  if (breakpoint === "desktop") {
    return (
      <div className="bg-[#F5F0E8] text-[#22281C] w-full h-[891px]">
        <div className="flex justify-center p-[179px]">
          <div className="text-container w-[560px]">
            <h2 className="text-[40px] leading-[100%] h-[73px]">
              Spominska stran{" "}
              <span className="text-[#de222e] font-medium">s skrbnikom</span>
            </h2>
            <p className="text-[#414141] text-[16px] mt-[16px]">
              Nadgradnja osnovne žalne strani, kjer pokojnemu bližnji prevzame
              skrb nad objavljenimi vsebinami vseh ostalih (podobno kot ena
              oseba, ki skrbi za grob in odloča). Upravljanje je zelo enostavno;
              vsak je lahko Skrbnik.{" "}
            </p>
            <p className="text-[#414141] text-[16px] mt-[16px]">
              Skrbnik, ki je pokojnega dobro poznal, s tem omogoči objavo
              številnih dodatnih vsebin celotni družini, prijateljem in znancem
              ter na ta način omogoči izdelavo prave spominske strani, na katero
              se bodo bližnji radi vračali in jo dopolnjevali.{" "}
            </p>
            <div className="inner-div mt-[77px]">
              <div className="text-[#22281C] text-[24px] font-medium">
                Spomini niso večni
              </div>
              <p className="text-[#414141] text-[16px] mt-[8px]">
                Prehitro nam uidejo, čarobni trenutki se pozabijo, slike
                zbledijo. Povežimo spomine na naše najdražje v celoto v
                digitalni obliki in jih ohranimo za vedno.{" "}
              </p>
            </div>
            <div className="btn-container ">
              <Link href={"/spominska"}>
                <button className="px-[25px] py-[12px] w-[155px] rounded-[8px] mt-[47px] shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]">
                  Več o Skrbniku
                </button>
              </Link>
            </div>
          </div>
          <div className="img-container">
            <Image
              className="mx-[111px] object-cover h-full"
              src="/mobile-cards/slider-mobile.png"
              alt="Prikaz spominske strani na mobilni napravi - Osmrtnica.com"
              width={300}
              height={600}
            />
          </div>
        </div>
      </div>
    );
  }

  if (breakpoint === "laptop") {
    return (
      <div className="bg-[#F5F0E8] text-[#22281C] w-[1280px]">
        <div className="flex justify-center p-[179px]">
          <div className="text-container w-[560px]">
            <h2 className="text-[40px] leading-[100%] h-[73px]">
              Spominska stran{" "}
              <span className="text-[#de222e] font-medium">s skrbnikom</span>
            </h2>
            <p className="text-[#414141] text-[16px] mt-[16px]">
              Nadgradnja osnovne žalne strani, kjer pokojnemu bližnji prevzame
              skrb nad objavljenimi vsebinami vseh ostalih (podobno kot ena
              oseba, ki skrbi za grob in odloča). Upravljanje je zelo enostavno;
              vsak je lahko Skrbnik.{" "}
            </p>
            <p className="text-[#414141] text-[16px] mt-[16px]">
              Skrbnik, ki je pokojnega dobro poznal, s tem omogoči objavo
              številnih dodatnih vsebin celotni družini, prijateljem in znancem
              ter na ta način omogoči izdelavo prave spominske strani, na katero
              se bodo bližnji radi vračali in jo dopolnjevali.{" "}
            </p>
            <div className="inner-div mt-[77px]">
              <div className="text-[#22281C] text-[24px] font-medium">
                Spomini niso večni
              </div>
              <p className="text-[#414141] text-[16px] mt-[8px]">
                Prehitro nam uidejo, čarobni trenutki se pozabijo, slike
                zbledijo. Povežimo spomine na naše najdražje v celoto v
                digitalni obliki in jih ohranimo za vedno.{" "}
              </p>
            </div>
            <div className="btn-container px-[89px]">
              <Link href={"/spominska"}>
                <button className="px-[25px] py-[12px] w-[155px] rounded-[8px] mt-[47px] shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]">
                  Več o Skrbniku
                </button>
              </Link>
            </div>
          </div>
          <div className="img-container">
            <Image
              className="mx-[111px]"
              src="/mobile-cards/slider-mobile.png"
              alt="Prikaz spominske strani na mobilni napravi - Osmrtnica.com"
              width={300}
              height={600}
            />
          </div>
        </div>
      </div>
    );
  }

  // === Tablet Layout ===
  if (breakpoint === "tablet") {
    return (
      <div className="bg-[#F5F0E8] h-full text-[#22281C] p-[64px] flex justify-center">
        <div className="image-container w-[560px]">
          <h2 className="text-center text-[40px] mt-[16px]">
            Spominska stran{" "}
            <span className="text-[#de222e] font-medium">s skrbnikom</span>
          </h2>
          <p className="text-[#414141] text-[16px] mt-[30px]">
            Nadgradnja osnovne žalne strani, kjer pokojnemu bližnji prevzame
            skrb nad objavljenimi vsebinami vseh ostalih (podobno kot ena oseba,
            ki skrbi za grob in odloča). Upravljanje je zelo enostavno; vsak je
            lahko Skrbnik.{" "}
          </p>
          <p className="text-[#414141] text-[16px] mt-[16px]">
            Skrbnik, ki je pokojnega dobro poznal, s tem omogoči objavo
            številnih dodatnih vsebin celotni družini, prijateljem in znancem
            ter na ta način omogoči izdelavo prave spominske strani, na katero
            se bodo bližnji radi vračali in jo dopolnjevali.{" "}
          </p>
          <div className="inner-div mt-[79px]">
            <div className="text-[#22281C] text-[24px] font-medium]">
              Spomini niso večni
            </div>
            <p className="mt-[16px]">
              Prehitro nam uidejo, čarobni trenutki se pozabijo, slike zbledijo.
              Povežimo spomine na naše najdražje v celoto v digitalni obliki in
              jih ohranimo za vedno.{" "}
            </p>
          </div>

          <Image
            className="mt-[33px] mx-auto"
            src="/mobile-cards/slider-mobile.png"
            alt="Prikaz spominske strani na mobilni napravi - Osmrtnica.com"
            width={200}
            height={400}
          />

          <div className="btn-container text-center">
            <Link href={"/spominska"}>
              <button className="px-[25px] py-[12px] rounded-[8px] mt-[44px] shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]">
                Več o Skrbniku
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // === Mobile Layout ===
  if (breakpoint === "mobile") {
    return (
      <div className="bg-[#F5F0E8] h-auto text-[#22281C] py-[69px] flex justify-center text-center mobile:w-full mobile:px-3">
        <div className="image-container mobile:w-full w-[352px] mobile:max-w-[500px]">
          <h2 className="text-center mobile:text-left text-[28px] mobile:text-center">
            {/* Spominska stran{" "}
            <br />
            <span className="text-[#de222e] font-medium">s skrbnikom</span> */}
            Spominska s{" "}
            <span className="text-[#de222e] font-medium">Skrbnikom</span>
          </h2>
          <p className="text-[#414141] text-[16px] mt-[16px] leading-6 mobile:text-left">
            {/* Nadgradnja osnovne žalne strani, kjer pokojnemu bližnji prevzame skrb nad objavljenimi vsebinami vseh ostalih in s tem omogoči izdelavo prave spominske strani, na katero se bodo bližnji radi vračali in jo dopolnjevali tudi kasneje.
            Upravljanje je enostavno; vsak je lahko Skrbnik. */}
            Nadgradnja osnovne žalne strani, kjer bližnji pokojnemu prevzame skrb nad objavljenimi vsebinami vseh ostalih in s tem omogoči izdelavo prave spominske strani, na katero se bodo bližnji radi vračali in jo dopolnjevali tudi kasneje. Upravljanje je enostavno; vsak je lahko Skrbnik.  
          </p>

          <Image
            className="mt-[33px] mx-auto w-[150px] h-[300px]"
            src="/mobile-cards/slider-mobile.png"
            alt="Prikaz spominske strani na mobilni napravi - Osmrtnica.com"
            width={150}
            height={300}
          />

          <div className="btn-container text-center mt-[22px]">
            <Link href={"/spominska"}>
              <button className="px-[25px] py-[12px] rounded-[8px] shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]">
                Več o Skrbniku
              </button>
            </Link>
          </div>

          <div className="inner-div mt-[54px] pb-[69px] w-[313px] mobile:w-full">
            <div className="text-[#22281C] text-[24px] font-medium mt-[16px] mobile:text-left">
              Spomini niso večni
            </div>
            <p className="mt-[16px] mobile:text-left">
              Prehitro nam uidejo, čarobni trenutki se pozabijo, slike zbledijo.{" "}
              <br /> Povežimo spomine na naše najdražje v celoto v digitalni
              obliki in jih ohranimo za vedno.{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default SlideTwo;
