"use client";

import Link from "next/link";

const linksToRender = [
    { label: "Splošni pogoji", path: "/splosni-pogoji", active: false },
    { label: "Politika zasebnosti", path: "/politika-zasebnosti", active: false },
    { label: "Piškotki", path: "/piskotki", active: false }
];

export default function Mobile() {
    return (
        <div>
            <ul className="flex items-center justify-center mb-6 mt-[-15px] mb-[2.7rem]">
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

            <h1 className="font-medium text-[24px] leading-[21px] tracking-[0] mb-[25px]  mobile:text-[20px]">Politika piškotkov</h1>
            <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">Nazadnje posodobljeno: 12. septembra 2025</p>
            <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">Na spletni strani osmrtnica.com uporabljamo piškotke in podobne tehnologije, da zagotovimo pravilno delovanje strani, izboljšamo uporabniško izkušnjo ter analiziramo obisk. Ta politika pojasnjuje, kaj so piškotki, katere vrste uporabljamo in kako lahko sami upravljate svoje nastavitve piškotkov.</p>

            <div>
                <p className="font-medium text-[14px] leading-[21px] tracking-[0] mb-[5px]">Kaj so piškotki?</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">
                    Piškotki so majhne besedilne datoteke, ki se uporabljajo za shranjevanje majhnih delov informacij. Na vašo napravo so shranjeni, ko se spletno mesto naloži v vaš brskalnik. Ti piškotki pomagajo zagotoviti pravilno delovanje spletne strani, izboljšajo varnost, zagotavljajo boljšo uporabniško izkušnjo in analizirajo delovanje, da ugotovijo, kaj deluje in kje so potrebne izboljšave. Omogočajo, da si stran zapomni določene informacije in vas prepozna ob naslednjem obisku.
                </p>
            </div>
            <div>
                <p className="font-medium text-[14px] leading-[21px] tracking-[0] mb-[5px]">Kako uporabljamo piškotke?</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">
                    Tako kot večina spletnih storitev naše spletno mesto uporablja lastne  (first-party) in piškotke tretjih oseb (third-party) za različne namene. Lastni piškotki so nujno potrebni za pravilno delovanje spletnega mesta in ne zbirajo nobenih osebno identificirajočih podatkov.</p>

                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">Morebitni občasni piškotki tretjih oseb, ki se uporabljajo na našem spletnem mestu, nam predvsem pomagajo razumeti, kako spletno mesto deluje, slediti vaši interakciji z njim, ohranjati naše storitve varne, prikazovati ustrezne oglase ter izboljšati vašo splošno uporabniško izkušnjo in hkrati povečati hitrost vaših prihodnjih interakcij z našim spletnim mestom.</p>
            </div>
            <div>
                <p className="font-medium text-[14px] leading-[21px] tracking-[0] mb-[5px]">Vrste piškotkov, ki jih uporabljamo</p>
                <ul className="list-disc marker:text-gray-400 pl-5  text-[14px] font-light mb-6">
                    <li>Nujni piškotki so potrebni za omogočanje osnovnih funkcij tega spletnega  mesta, kot so zagotavljanje varnih prijav ali prilagajanje vaših  nastavitev soglasja. Ti piškotki ne shranjujejo nobenih osebno  identificirajočih podatkov.</li>
                    <li>Funkcionalni – shranijo vaše nastavitve in preference (npr. izbira lokalnega kraja). ̰</li>
                    <li>Analitični – zbirajo podatke o uporabi strani za izboljševanje naših vsebin in storitev.</li>
                    <li>Marketinški – omogočajo prikazovanje ustreznih vsebin in oglasov.</li>
                </ul>
            </div>

            <div>
                <p className="font-medium text-[14px] leading-[21px] tracking-[0]">Piškotki na osmrtnica.com</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">Nujno potrebni piškotki za delovanje spletnega mesta</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">__Host-next-auth.csrf-token |  Varnostni piškotek za zaščito prijave (CSRF zaščita)  | Trajanje: Seja (dokler je brskalnik odprt) | osmrtnica.com |</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">__Secure-next-auth.callback-url  | Shrani naslov, kamor se uporabnik preusmeri po prijavi ali odjavi. | Trajanje: Seja | osmrtnica.com |</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">nextauth.message | Začasno shrani sporočila o prijavi/napakah avtentikacije  | Trajanje: Seja | osmrtnica.com |</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">cookieyes-consent | Shranjuje uporabnikove nastavitve glede soglasja za piškotke. Piškotek ne zbira in ne shranjuje nobenih osebnih podatkov obiskovalcev spletnega mesta.  | Trajanje: 1 leto                           | osmrtnica.com |</p>

            </div>

            <div>
                <p className="font-medium text-[14px] leading-[21px] tracking-[0] mb-[5px]">Upravljanje piškotkov</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0]">Piškotke lahko kadarkoli upravljate prek pasice za soglasje CookieYes, kjer lahko sprejmete ali zavrnete posamezne kategorije piškotkov. Piškotke lahko upravljate tudi neposredno v nastavitvah vašega spletnega brskalnika.</p>
                <ul className="list-disc marker:text-gray-400 pl-5 font-light mb-6">
                    <li>Nujno potrebnih piškotkov ni mogoče onemogočiti, saj so ključni za delovanje strani.</li>
                    <li>Za vse ostale kategorije piškotkov se zanašamo na vaše izrecno soglasje.</li>
                </ul>
                <p className="font-light text-[14px] leading-[21px] tracking-[0]">Različni brskalniki ponujajo različne načine za blokiranje in brisanje  piškotkov, ki jih uporabljajo spletna mesta. Nastavitve brskalnika lahko prilagodite tako, da blokirate ali izbrišete piškotke. Spodaj so  povezave do podpornih dokumentov o upravljanju in brisanju piškotkov v  glavnih spletnih brskalnikih.</p>
                <ul className="list-disc marker:text-gray-400 pl-5 text-[14px] font-light flex flex-col gap-1">
                    <li>Chrome: <a className="underline underline-offset-[4px]" href="https://support.google.com/accounts/answer/32050">https://support.google.com/accounts/<br />answer/32050</a></li>
                    <li>Safari: <a className="underline underline-offset-[4px]" href="https://support.apple.com/en-in/guide/safari/sfri11471/mac">https://support.apple.com/en-in/guide/safari/<br />sfri11471/mac</a></li>
                    <li>Firefox: <a className="underline underline-offset-[4px]" href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox?redirectslug=delete-cookies-remove-info-websites-stored&redirectlocale=en-US">https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox?redirectslug=delete-cookies-remove-info-websites-stored&redirectlocale=en-US</a></li>
                    <li>Internet Explorer: <a className="underline underline-offset-[4px]" href="https://support.microsoft.com/en-us/topic/how-to-delete-cookie-files-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc">https://support.microsoft.com/en-us/topic/how-to-delete-cookie-files-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc</a></li>
                </ul>
                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">Če uporabljate drug spletni brskalnik, se obrnite na njegovo uradno dokumentacijo za podporo.</p>
            </div>

            <div>
                <p className="font-medium text-[14px] leading-[21px] tracking-[0] mb-[5px]">Vaše pravice</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0]">V skladu z zakonodajo (GDPR, ZVOP-2) imate pravico do:</p>
                <ul className="list-disc marker:text-gray-400 text-[14px] pl-5 font-light">
                    <li>dostopa do podatkov,</li>
                    <li>popravka ali izbrisa,</li>
                    <li>omejitve obdelave,</li>
                    <li>prenosljivosti podatkov,</li>
                    <li>ugovora,</li>
                    <li>pritožbe pri nadzornem organu za varstvo osebnih podatkov.</li>
                </ul>
                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">Za uveljavljanje pravic nas lahko kontaktirate preko spodaj navedenih podatkov.</p>
            </div>


            <div>
                <p className="font-medium text-[14px] leading-[21px] tracking-[0]">Kontakt</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0]">Spletna stran: osmrtnica.com</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0] mb-6">E-naslov: info@osmrtnica.com</p>
            </div>
            <div>
                <p className="font-medium text-[14px] leading-[21px] tracking-[0]">Spremembe politike</p>
                <p className="font-light text-[14px] leading-[21px] tracking-[0]">To politiko lahko občasno posodobimo. Datum zadnje posodobitve je vedno naveden na vrhu strani.</p>
            </div>

        </div>
    );
}