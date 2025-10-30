import Link from "next/link";

const AdditionalPromotion = ({ mbZero = false }) => {
  return (
    <div className="w-full bg-[#FFFFFF]">
      <div
        className={
          mbZero
            ? "relative max-w-[1920px]  pt-[65px] desktop:pt-[105px] tablet:pt-[75px] w-full overflow-hidden flex mx-auto justify-center items-center"
            : "relative max-w-[1920px]  py-[65px] desktop:py-[105px] tablet:py-[75px] w-full overflow-hidden flex mx-auto justify-center items-center"
        }
      >
        {/*Main container */}
        <div className="w-[669px] tablet:w-[637px] mobile:w-[337px] flex flex-col">
          {/*header container*/}
          <div className="flex mobile:w-[304px] mx-auto flex-col">
            <div className="text-[40px] text-[#3C3E41] mobile:text-[28px] mobile:font-variation-customOpt28 text-center font-variation-customOpt40  tablet:mt-[1px] tablet:truncate mobile:mt-[1px] leading-[48px] mobile:leading-10">
              Produkti za vašo dodatno promocijo
            </div>

            {/*text for desktop*/}
            <div className="text-[24px] text-[#3C3E41] w-full text-center self-center font-variation-customOpt24 font-bold mt-[12px] mobile:mt-[15px] flex">
              Brezplačna darila za vaše stranke
            </div>

            <p className="text-[18px] text-[#3C3E41] text-center font-variation-customOpt18 mt-[22px] mobile:mt-[29px] leading-[27px] tablet:mx-6">
              ki bodo pripomogla k povečanemu obisku v vašo cvetličarno in
              zaradi česar bodo iskali in poiskali prav vas.
            </p>
          </div>
          <div className="flex mt-[40px] w-full justify-center items-center gap-7 flex-col desktop:flex-row">
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-[#0A85C2] text-center">BREZPLAČNA</p>
              <div
                className="flex w-[250px] h-[53px] rounded-full bg-transparent"
                style={{
                  boxShadow: "5px 5px 10px 0px #A6ABBD",
                  border: "0.5px solid #6D778E66",
                }}
              >
                <Link
                  href={"/c-faq"}
                  className={`w-[250px] h-[53px] shrink-0 rounded-full text-[#3C3E41] justify-center items-center self-center shadow-custom-light-dark flex font-semibold text-[20px]`}
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(231, 235, 240, 0.3), rgba(231, 235, 240, 0.3)), linear-gradient(180deg, rgba(0, 0, 0, 0) 60.83%, rgba(24, 96, 163, 0.1) 100%)",
                    boxShadow: "inset -5px -5px 10px 0px #A6ABBD",
                  }}
                >
                  Spominska (Skrbnik)
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-[#0A85C2] text-center">BREZPLAČNA</p>
              <div
                className="flex w-[250px] h-[53px] rounded-full bg-transparent"
                style={{
                  boxShadow: "5px 5px 10px 0px #A6ABBD",
                  border: "0.5px solid #6D778E66",
                }}
              >
                <Link
                  href={"/c-faq"}
                  className={`w-[250px] h-[53px] shrink-0 rounded-full text-[#3C3E41] justify-center items-center self-center shadow-custom-light-dark flex font-semibold text-[20px]`}
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(231, 235, 240, 0.3), rgba(231, 235, 240, 0.3)), linear-gradient(180deg, rgba(0, 0, 0, 0) 60.83%, rgba(24, 96, 163, 0.1) 100%)",
                    boxShadow: "inset -5px -5px 10px 0px #A6ABBD",
                  }}
                >
                  Digitalne kartice
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-[#0A85C2] text-center">BREZPLAČNA</p>
              <div
                className="flex w-[250px] h-[53px] rounded-full bg-transparent"
                style={{
                  boxShadow: "5px 5px 10px 0px #A6ABBD",
                  border: "0.5px solid #6D778E66",
                }}
              >
                <Link
                  href={"/c-faq"}
                  className={`w-[250px] h-[53px] shrink-0 rounded-full text-[#3C3E41] justify-center items-center self-center shadow-custom-light-dark flex font-semibold text-[20px]`}
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(231, 235, 240, 0.3), rgba(231, 235, 240, 0.3)), linear-gradient(180deg, rgba(0, 0, 0, 0) 60.83%, rgba(24, 96, 163, 0.1) 100%)",
                    boxShadow: "inset -5px -5px 10px 0px #A6ABBD",
                  }}
                >
                  Objava osmrtnic
                </Link>
              </div>
            </div>
          </div>
          <Link
            href={"/podjetja"}
            className="self-center flex"
          >
            <div className="w-[150px] h-[48px] rounded-lg text-[#1E2125] justify-center items-center flex mt-16 shadow-custom-light-dark bg-[#BCD7F4] text-[16px] font-variation-customOpt16">
              Več informacij
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdditionalPromotion;
