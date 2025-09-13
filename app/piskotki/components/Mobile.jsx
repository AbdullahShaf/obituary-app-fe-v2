"use client";

import Link from "next/link";

const linksToRender = [
    { label: "Splošni pogoji", path: "/splosni-pogoji", active: false },
    { label: "Politika zasebnosti", path: "/politika-zasebnosti", active: false },
    { label: "Piškotki", path: "/", active: false }
];

export default function Mobile() {
    return (
        <div>
            <ul className="flex items-center justify-center mb-6 mt-[-15px]">
                {linksToRender.map((link, index) => (
                    <li key={index} className="flex items-center">
                        <Link
                            href={link.path}
                            className="font-normal text-[14px] leading-[24px] tracking-[0] text-right align-middle underline decoration-solid decoration-0 underline-offset-0 text-[#6D778E]"
                        >
                            {link.label}
                        </Link>
                        {index !== linksToRender.length - 1 && (
                            <span className="mx-2 inline-block w-[5px] h-[5px] rounded-full bg-[#919191]"></span>
                        )}
                    </li>
                ))}
            </ul>
            <h1 className="font-medium text-[24px] leading-[27px] tracking-[0] mb-[25px] mobile:text-[16px]">Piškotki</h1>

            {/* Section 1 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">1. Uvodne določbe</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">
                    Ti splošni pogoji poslovanja (v nadaljevanju: »Pogoji«) urejajo uporabo
                    spletne strani www.osmrtnica.com (v nadaljevanju: »Spletna stran«) in
                    vseh njenih podstrani. Lastnik in administrator Spletne strani je
                    družba Aleja8, Saša Dolinšek s.p., Trg svobode 32, 1420 Trbovlje.
                    Dostop in uporaba Spletne strani sta dopustna pod pogoji, ki jih
                    določajo veljavna zakonodaja in ti Pogoji.
                </p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">
                    Pogoji določajo pravice in obveznosti uporabnikov Spletne strani ter
                    urejajo pravna razmerja med ponudnikom in uporabniki. Z uporabo
                    Spletne strani uporabnik potrjuje, da je seznanjen s temi Pogoji, jih
                    razume in jih v celoti sprejema. Če se z njimi ne strinja, uporaba
                    Spletne strani ni dovoljena. Ponudnik storitev si pridržuje pravico do
                    spremembe teh Pogojev kadarkoli, pri čemer se spremenjena verzija
                    šteje za veljavno z dnem objave na Spletni strani.
                </p>
            </div>

          
        </div>
    );
}