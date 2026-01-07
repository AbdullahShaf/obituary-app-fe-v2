import React from "react";

const MemorialWithAdmin = () => {

    return (
        <div className="relative bg-[#D4E6F9] min-h-[485px] mobile:min-h-[500px] py-[30px] mobile:py-[20px]">
            <div className="relative max-w-[1200px] w-full flex mx-auto justify-center items-center">
                <div className="relative max-w-[1400px] px-[30px] mobile:px-[15px] w-full mx-auto flex flex-col items-center">

                    <div className="relative w-full flex flex-row items-start gap-[30px] mobile:flex-col mobile:items-center mobile:gap-[20px]">

                        <div className="text-left w-[600px] flex-shrink-0 mt-[98.84px] flex flex-col px-0 mobile:w-full mobile:mx-auto mobile:mt-[50px] mobile:items-center mobile:px-[15px]">
                            <h1 className="text-[#3C3E41] text-[40px] whitespace-nowrap leading-[48px] font-variation-customOpt40 mobile:text-[28px] mobile:text-center mobile:leading-[34px] mobile:font-variation-customOpt28">
                                Spominska stran s <span className="text-[#0A85C2] font-semibold">Skrbnikom</span>
                            </h1>

                            <h2 className="text-[24px] text-left text-[#3C3E41] font-bold leading-[48px] mt-[5px] mobile:text-[20px] mobile:leading-[28px] mobile:mt-[12px] mobile:text-center">
                                Nadgradnja v pravo spominsko stran
                            </h2>


                            <p className="mt-[16px] text-[#3C3E41] text-[18px] leading-[27px] font-variation-customOpt18 mobile:mt-[12px] mobile:text-center mobile:text-[16px] mobile:leading-[24px]">
                                Skrbnik (običajno nekdo, ki je bil pokojnemu blizu) omogoči številne dodatne
                                možnosti personalizacije spominske strani in jo naredi stran bolj osebno, bolj toplo, bolj življenjsko.
                            </p>

                            <p className="mt-[28px] text-[#3C3E41] text-[18px] leading-[27px] font-variation-customOpt18 mb-[20px] mobile:mt-[16px] mobile:text-center mobile:text-[16px] mobile:leading-[24px] mobile:mb-[15px]">
                                Hkrati skrbnik omogoči tudi več brezplačnih možnosti družini, prijateljem in
                                nasploh vsem obiskovalcem na strani, ker sam kontrolira, kaj bo objavljeno in kaj ne.
                            </p>
                        </div>

                        <div className="flex-1 flex justify-center items-start mt-[70px] mobile:w-full">
                            <img src="spominska_laptop.png" alt="Prikaz spominske strani na računalniku - Osmrtnica.com" className="max-w-[900px] w-full h-auto object-contain mobile:max-w-[280px] mobile:h-auto" />
                        </div>
                    </div>

                </div>
            </div>
            <div className="h-[30px] mobile:hidden bg-transparent w-full" />
        </div>
    );

}

export default MemorialWithAdmin;