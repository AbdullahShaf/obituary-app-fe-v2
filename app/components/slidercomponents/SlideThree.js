"use client";
import Link from "next/link";
import Image from "next/image";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const SlideThree = () => {
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
            <div className="bg-[#FBE9E8] text-[#22281C] w-full h-[891px]">
                <div className="flex justify-center items-center p-[179px]">
                    <div className="text-container w-[560px]">
                        <h2 className="text-[40px] leading-[100%] h-[73px]">
                            QR kode za nagrobnike
                        </h2>
                        <p className="text-[#414141] text-[16px] mt-[16px]">
                            Namesto zgolj črk vklesanih v hladni kamen, lahko obiskovalci vidijo pokojnikov nasmeh, slišijo njegov glas ali spremljajo trenutke iz njegovega življenja preko zapisov, zvočnih posnetkov ali albumov slik. Morda že zbledele zgodbe in spomini znova oživijo, zgodbe pa ostanejo dostopne še prihodnjim rodovom.{" "}
                        </p>
                        <p className="text-[#414141] text-[16px] mt-[16px]">
                            Obiskovalci ne le berejo življenje pokojnika, ampak lahko aktivno sodelujejo, dodajo svoje zgodbe, delijo prigode ali dragocene spomine. Ali pa samo prižgejo virtualno svečko in se vpišejo v Žalno knjigo.{" "}
                        </p>
                        <div className="inner-div mt-[77px]">
                            <div className="text-[#22281C] text-[24px] font-medium">
                                QR koda odpre svet spominov
                            </div>
                            <p className="text-[#414141] text-[16px] mt-[8px]">
                                Tišina nagrobnika se spremeni v pripoved življenja. QR koda odpre vrata spominom, ki živijo naprej in vsak obisk postane osebno srečanje. Ne predstavlja več konec poti, ampak postane prostor povezanosti, poln topline in živih vezi – s QR kodo obiskovalec vstopi v zgodbo.  {" "}
                            </p>
                        </div>
                    </div>
                    <div className="img-container">
                        <Image
                            className="mx-[111px]"
                            src="/mobile-cards/memorial.png"
                            alt="Prikaz spominske strani na mobilni napravi - Osmrtnica.com"
                            width={273}
                            height={212}
                        />
                        <div className="btn-container flex w-full justify-center ">
                            <Link href={"https://www.osmrtnica.com/qr-kode"}>
                                <button className="px-[15px] py-[12px] w-[155px] rounded-[8px] mt-[47px] shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]">
                                    Več o QR kodah
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (breakpoint === "laptop") {
        return (
            <div className="bg-[#FBE9E8] text-[#22281C] w-[1280px]">
                <div className="flex justify-center p-[179px]">
                    <div className="text-container w-[560px]">
                        <h2 className="text-[40px] leading-[100%] h-[73px]">
                            QR kode za nagrobnike
                        </h2>
                        <p className="text-[#414141] text-[16px] mt-[16px]">
                            Namesto zgolj črk vklesanih v hladni kamen, lahko obiskovalci vidijo pokojnikov nasmeh, slišijo njegov glas ali spremljajo trenutke iz njegovega življenja preko zapisov, zvočnih posnetkov ali albumov slik. Morda že zbledele zgodbe in spomini znova oživijo, zgodbe pa ostanejo dostopne še prihodnjim rodovom.{" "}
                        </p>
                        <p className="text-[#414141] text-[16px] mt-[16px]">
                            Obiskovalci ne le berejo življenje pokojnika, ampak lahko aktivno sodelujejo, dodajo svoje zgodbe, delijo prigode ali dragocene spomine. Ali pa samo prižgejo virtualno svečko in se vpišejo v Žalno knjigo.{" "}
                        </p>
                        <div className="inner-div mt-[77px]">
                            <div className="text-[#22281C] text-[24px] font-medium">
                                QR koda odpre svet spominov
                            </div>
                            <p className="text-[#414141] text-[16px] mt-[8px]">
                                Tišina nagrobnika se spremeni v pripoved življenja. QR koda odpre vrata spominom, ki živijo naprej in vsak obisk postane osebno srečanje. Ne predstavlja več konec poti, ampak postane prostor povezanosti, poln topline in živih vezi – s QR kodo obiskovalec vstopi v zgodbo.  {" "}
                            </p>
                        </div>
                        {/* <div className="btn-container px-[89px]">
                            <Link href={"/spominska"}>
                                <button className="px-[25px] py-[12px] w-[155px] rounded-[8px] mt-[47px] shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]">
                                    Več o QR kodah
                                </button>
                            </Link>
                        </div> */}
                    </div>
                    <div className="img-container">
                        <Image
                            className="mx-[111px]"
                            src="/mobile-cards/memorial.png"
                            alt="Prikaz spominske strani na mobilni napravi - Osmrtnica.com"
                            width={273}
                            height={212}
                        />
                        <div className="btn-container flex w-full justify-center ">
                            <Link href={"https://www.osmrtnica.com/qr-kode"}>
                                <button className="px-[15px] py-[12px] w-[155px] rounded-[8px] mt-[47px] shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]">
                                    Več o QR kodah
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // === Tablet Layout ===
    if (breakpoint === "tablet") {
        return (
            <div className="bg-[#FBE9E8] h-full text-[#22281C] p-[64px] flex justify-center">
                <div className="image-container w-[560px]">
                    <h2 className="text-center text-[40px] mt-[16px]">
                        QR kode za nagrobnike
                    </h2>
                    <p className="text-[#414141] text-[16px] mt-[30px]">
                        Namesto zgolj črk vklesanih v hladni kamen, lahko obiskovalci vidijo pokojnikov nasmeh, slišijo njegov glas ali spremljajo trenutke iz njegovega življenja preko zapisov, zvočnih posnetkov ali albumov slik. Morda že zbledele zgodbe in spomini znova oživijo, zgodbe pa ostanejo dostopne še prihodnjim rodovom.{" "}
                    </p>
                    <Image
                        className="mt-[79px] mx-auto"
                        // className="mt-[140px] mx-auto"
                        src="/mobile-cards/memorial.png"
                        alt="Prikaz spominske strani na mobilni napravi - Osmrtnica.com"
                        width={273}
                        height={212}
                    />
                    <p className="text-[#414141] text-[16px] mt-[79px]">
                        Obiskovalci ne le berejo življenje pokojnika, ampak lahko aktivno sodelujejo, dodajo svoje zgodbe, delijo prigode ali dragocene spomine. Ali pa samo prižgejo virtualno svečko in se vpišejo v Žalno knjigo.{" "}
                    </p>
                    <div className="inner-div mt-[89px]">
                        <div className="text-[#22281C] text-[24px] font-medium">
                            QR koda odpre svet spominov
                        </div>
                        <p className="mt-[16px]">
                            Tišina nagrobnika se spremeni v pripoved življenja. QR koda odpre vrata spominom, ki živijo naprej in vsak obisk postane osebno srečanje. Ne predstavlja več konec poti, ampak postane prostor povezanosti, poln topline in živih vezi – s QR kodo obiskovalec vstopi v zgodbo.  {" "}
                        </p>
                    </div>

                    {/* <Image
                        className="mt-[140px] mx-auto"
                        src="/mobile-cards/memorial.png"
                        alt="Prikaz spominske strani na mobilni napravi - Osmrtnica.com"
                        width={273}
                        height={212}
                    /> */}

                    <div className="btn-container text-center">
                        <Link href={"https://www.osmrtnica.com/qr-kode"}>
                            <button className="px-[25px] py-[12px] rounded-[8px] mt-[79px] shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]">
                                Več o QR kodah
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
            <div className="bg-[#FBE9E8] h-auto text-[#22281C] py-[69px] flex justify-center text-center mobile:w-full mobile:px-3">
                <div className="image-container mobile:w-full w-[352px] mobile:max-w-[500px]">
                    <h2 className="text-center mobile:text-left text-[28px] mobile:text-center">
                        QR kode{" "}
                        {/* <br /> */}
                        <span className="text-[#22281C]">za nagrobnike</span>
                    </h2>
                    <p className="text-[#414141] text-[16px] mt-[16px] leading-6 mobile:text-left">
                        Namesto zgolj črk vklesanih v hladni kamen, lahko obiskovalci vidijo pokojnikov nasmeh, slišijo njegov glas ali spremljajo trenutke iz njegovega življenja preko zapisov, zvočnih posnetkov ali albumov slik. Morda že zbledele zgodbe in spomini znova oživijo, zgodbe pa ostanejo dostopne še prihodnjim rodovom.
                    </p>

                    <Image
                        className="mt-[53px] mx-auto"
                        src="/mobile-cards/memorial.png"
                        alt="Prikaz spominske strani na mobilni napravi - Osmrtnica.com"
                        width={273}
                        height={212}
                    />

                    <div className="btn-container text-center mt-[22px]">
                        <Link href={"https://www.osmrtnica.com/qr-kode"}>
                            <button className="px-[25px] py-[12px] rounded-[8px] shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]">
                                Več o QR kodah
                            </button>
                        </Link>
                    </div>

                    <div className="inner-div mt-[65px] pb-[79px] w-[313px] mobile:w-full">
                        <div className="text-[#22281C] text-[24px] font-medium mt-[16px] mobile:text-left">
                            QR koda odpre svet spominov
                        </div>
                        <p className="mt-[18px] mobile:text-left">
                            Tišina nagrobnika se spremeni v pripoved življenja. QR koda odpre vrata spominom, ki živijo naprej in vsak obisk postane osebno srečanje. Ne predstavlja več konec poti, ampak postane prostor povezanosti, poln topline in živih vezi – s QR kodo obiskovalec vstopi v zgodbo.  {" "}{" "}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default SlideThree;
