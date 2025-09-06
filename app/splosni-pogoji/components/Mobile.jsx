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
            <h1 className="font-medium text-[24px] leading-[27px] tracking-[0] mb-[25px] mobile:text-[16px]">Splošni pogoji poslovanja</h1>

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

            {/* Section 2 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">2. Definicije pojmov</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px]">
                    V teh Pogojih imajo izrazi naslednji pomen:
                </p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px]">– »Uporabnik« je vsaka oseba, ki uporablja Spletno stran, bodisi registrirana bodisi neregistrirana.</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px]">– »Registrirani uporabnik« je uporabnik, ki je ustvaril uporabniški račun in ima dostop do dodatnih funkcionalnosti.</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px]">– »Ponudnik« je upravljavec Spletne strani.</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px]">– »Oglaševalec« je pravna ali fizična oseba, ki na Spletni strani objavlja oglase.</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px]">– »Cvetličarna« ali »pogrebno podjetje« je pravna ali fizična oseba, ki ima možnost ustvariti predstavitveno stran na Spletni strani.</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px]  mb-6">– »Spominska stran« je individualna stran, posvečena pokojni osebi, ki jo ustvarijo uporabniki.</p>
            </div>

            {/* Section 3 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">3. Dostopnost in javna narava vsebin</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Ogled osmrtnic, spominskih strani, žalnih knjig, sožalij, slik, seznamov pogrebnih podjetij in cvetličarn je javno dostopen brez registracije. Vsak obiskovalec Spletne strani lahko te vsebine prosto pregleduje. Uporabniki se morajo zavedati, da so vsi podatki, ki jih vnesejo, vključno s sporočili sožalja, zapisi v spominskih knjigah, zgodbe in slike, javno vidni in dostopni širši javnosti.</p>
            </div>

            {/* Section 4 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">4. Namen Spletne strani</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px]  mb-6">Namen Spletne strani je zagotavljanje platforme za objavo osmrtnic, ustvarjanje spominskih strani v spomin na pokojne, predstavitev ponudbe cvetličarn in pogrebnih podjetij ter omogočanje oglaševanja tretjim osebam preko oddaje oglasnega prostora.</p>
            </div>

            {/* Section 5 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">5. Registracija uporabniškega računa</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Za uporabo dodatnih funkcionalnosti (objava sožalij, vpis v žalno knjigo, deljenje zgodb, prilaganje fotografij in videov) je potrebna registracija. Za fizične osebe je potrebna navedba elektronskega naslova in gesla. Za podjetja so potrebni podatki podjetja (ime podjetja, ime cvetličarne ali pogrebne enote, občina, elektronski naslov in geslo).</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Uporabniki morajo zagotoviti resnične podatke. Registrirani uporabniki so odgovorni za varovanje gesel in vseh aktivnosti v okviru svojega računa. Ponudnik ne odgovarja za škodo, ki nastane zaradi nepooblaščene uporabe uporabniškega računa. V primeru kršitev si ponudnik pridržuje pravico do začasne omejitve ali trajnega izbrisa računa.
                    <br /> Uporabniki imajo pravico kadarkoli zahtevati izbris uporabniškega računa, ponudnik pa se zavezuje k izbrisu v razumnem roku.</p>
            </div>

            {/* Section 6 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">6. Objavljanje vsebin s strani uporabnikov</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px]">Uporabniki lahko objavljajo osmrtnice, sožalja, zapise v žalnih knjigah, fotografije, prižgejo virtualne svečke in dodajajo druge spominske vsebine. Uporabnik je v celoti odgovoren za vsebino, ki jo vnese. Vsebina mora biti resnična, spoštljiva in ne sme posegati v pravice tretjih oseb, vključno z osebnimi, avtorskimi in osebnostnimi pravicami. Prepovedano je objavljanje vsebin komercialne, politične ali žaljive narave.</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Ponudnik si pridržuje pravico, da odstrani vsebine, ki so neresnične, žaljive, neprimerne ali v nasprotju z zakonodajo ali neprimerne glede na naravo Spletne strani.</p>
            </div>

            {/* Section 7 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">7. Spominske strani</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Spominske strani so javno dostopne strani, posvečene pokojnim. Njihov namen je izražanje spoštljivega odnosa in ohranjanje spomina. Ponudnik lahko odstrani vsebino spominske strani, če ugotovi, da krši Pogoje ali zakonodajo.</p>
            </div>

            {/* Section 8 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">8. Ponudba cvetličarn in oglaševanje</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Cvetličarne in pogrebna podjetja imajo možnost ustvariti lastno predstavitveno stran in objavljati svojo ponudbo. Za resničnost in zakonitost vsebin odgovarjajo izključno podjetja sama.
                    Cvetličarska podjetja pridobijo tudi možnost objavljanja svoje cvetličarne v seznamih cvetličarn na posebni strani in so hkrati objavljane na žalnih/spominskih straneh. Skrbnik (administrator spominske strani) ima pod posebnimi pogoji možnost odstraniti sektor cvetličarn s spominske strani s katero upravlja.  </p>

            </div>

            {/* Section 9 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">9. Pravila oglaševanja in odgovornost oglaševalcev</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Oglaševalci lahko zakupijo prostor na Spletni strani. Oglasi morajo biti skladni z zakonodajo in naravo Spletne strani. Prepovedani so oglasi, ki promovirajo tobak, alkohol, nedovoljene snovi, nasilje, zavajajoče ali neprimerne vsebine.</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Oglaševalci so v celoti odgovorni za resničnost vsebine oglasov in za morebitne zahtevke tretjih oseb, ki izvirajo iz objave. Upravljavec lahko zavrne, odstrani ali spremeni oglas, ki ni primeren glede na naravo Spletne strani, ne da bi za to potreboval soglasje oglaševalca.
                    Prepovedano je tudi prikrito oglaševanje v obliki komentarjev, sožalij ali zapisov.</p>
            </div>

            {/* Section 10 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">10. Moderiranje uporabniških vsebin</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6"> Upravljavec si pridržuje pravico, da po lastni presoji kadarkoli pregleda, spremeni, zakrije ali odstrani katerokoli vsebino, ki jo uporabniki objavijo na Spletni strani, če meni, da je ta vsebina žaljiva, neprimerna, politično obarvana, komercialna, v nasprotju z namenom Spletne strani, v nasprotju z javnim redom ali zakonodajo. Posebej se nadzirajo vsebine na spominskih straneh, ki morajo odražati pieteto in spoštljiv odnos do pokojnika. Na zahtevo upravičenih oseb (npr. svojcev pokojnika) lahko ponudnik odstrani osmrtnico, spominsko stran ali posamezne zapise.
                    Upravljavec ima pravico uporabnikom začasno ali trajno onemogočiti objavljanje ali dostop do spominske strani, če oceni, da njegove objave kršijo ta pravila.</p>
            </div>

            {/* Section 11 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">11. Avtorske in osebnostne pravice</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Uporabniki, ki na Spletni strani objavljajo fotografije, besedila ali druge vsebine, s tem potrjujejo, da imajo ustrezne pravice za njihovo uporabo in objavo. V primeru, da tretja oseba uveljavlja kršitve avtorskih ali osebnostnih pravic, je za škodo v celoti odgovoren uporabnik, ki je vsebino objavil. Ponudnik ima pravico odstraniti sporno vsebino in ukrepati skladno z zakonodajo.</p>
            </div>

            {/* Section 12 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">12. Varnost in preprečevanje zlorab</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Uporabniki se obvezujejo, da Spletne strani ne bodo uporabljali na način, ki bi lahko škodoval njenemu delovanju, posegal v tehnično infrastrukturo ali ogrožal druge uporabnike.
                    Prepovedano je kakršno koli zbiranje podatkov brez soglasja ponudnika. Ponudnik uporablja ustrezne tehnične in organizacijske ukrepe za zaščito osebnih podatkov in preprečevanje zlorab, vendar ne more zagotoviti absolutne varnosti pred vsemi možnimi tveganji  </p>
            </div>

            {/* Section 13 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">13. Povezave na zunanje strani</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Spletna stran lahko vsebuje povezave na zunanje spletne strani, za katerih vsebine ponudnik ne odgovarja.</p>
            </div>

            {/* Section 14 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">14. Omejitev odgovornosti</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Ponudnik se zavezuje k zagotavljanju varne, dostopne in pravilno delujoče Spletne strani, vendar ne odgovarja za tehnične napake, motnje v dostopu, izgubo podatkov ali za posledice neprimerne uporabe strani. Ponudnik prav tako ne prevzema odgovornosti za resničnost, točnost in spoštljivost vsebin, ki jih objavljajo uporabniki, cvetličarne ali oglaševalci.</p>
            </div>

            {/* Section 15 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">15. Spremembe storitev</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Ponudnik si pridržuje pravico, da spremeni, omeji ali ukine posamezne funkcionalnosti Spletne strani brez predhodnega obvestila. Uporabniki bodo o bistvenih spremembah obveščeni na Spletni strani. Nadaljnja uporaba pomeni sprejem sprememb.</p>
            </div>

            {/* Section 16 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">16. Pravo in pristojnost</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Za razlago in uporabo teh Pogojev velja pravo Republike Slovenije. Za vse spore, ki bi izhajali iz uporabe Spletne strani, je pristojno stvarno pristojno sodišče v kraju sedeža ponudnika.</p>
            </div>

            {/* Section 17 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">17. Identifikacijski podatki podjetja</p>
                <ul className="list-disc marker:text-gray-400 pl-5 mobile:text-[13px] font-light">
                    <li>Podjetje: Aleja8, Saša Dolinšek s.p.</li>
                    <li>Sedež: Trg svobode 32, Trbovlje</li>
                    <li>Matična številka: 9971254000</li>
                    <li>Davčna številka: SI 38439174 (davčni zavezanec NE)</li>
                    <li>TRR: SI56 0284 3026 6608 366 (NLB)</li>
                    <li className=" mb-6">Kontakt: info@osmrtnica.com</li>
                </ul>
            </div>

            {/* Section 18 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">18. Končne določbe</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Ponudnik si pridržuje pravico, da lahko v vsakem trenutku brez predhodnega obvestila spremeni splošne pogoje poslovanja. O vsaki spremembi splošnih pogojev poslovanja bo ponudnik na primeren način obvestil uporabnike. Za primeren način se šteje objava splošnih  pogojev poslovanja na spletni strani www.osmrtnica.com. Šteje se, da se  uporabnik strinja s spremembo splošnih pogojev poslovanja, če še naprej  uporablja predmetni portal. </p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Ponudnik se po svojih najboljših močeh trudi zagotoviti ažurnost in  pravilnost podatkov, ki so objavljeni na strani osmrtnica.com. Ugovore, pripombe, zahtevke, izjave in reklamacije lahko uporabnik pošlje po elektronski pošti na e-naslov info@osmrtnica.com ali pisno na naslov: Aleja8, Trg svobode 32, 1420 Trbovlje. </p>
            </div>

            {/* Section 19 */}
            <div>
                <p className="font-medium text-[16px] leading-[27px] tracking-[0] mobile:text-[13px] mb-[5px]">19. Pravo in pristojnost</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Za razlago in uporabo teh Pogojev velja pravo Republike Slovenije. Za vse spore, ki bi izhajali iz uporabe Spletne strani, je pristojno stvarno pristojno sodišče v kraju sedeža ponudnika.</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px]">Ti pogoji začnejo veljati z dnem 05.09.2025.</p>
                <p className="font-light text-[16px] leading-[27px] tracking-[0] mobile:leading-[21px] mobile:text-[13px] mb-6">Trbovlje, 05.09.2025, osmrtnica.com</p>
            </div>

        </div>
    );
}