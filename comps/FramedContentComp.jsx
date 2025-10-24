"use client";
import FrameLayout from "@/app/components/appcomponents/FrameLayout";
import ObituaryCard from "@/app/components/appcomponents/ObituaryCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import obituaryService from "@/services/obituary-service";
import regionsAndCities from "@/utils/regionAndCities";
import { SelectDropdown } from "@/app/components/appcomponents/SelectDropdown";

export default function FramedContentComp() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const regionParam1 = searchParams.get("region");
    const [obituaries, setObituaries] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(regionParam1 ?? null);
    const [name, setName] = useState(null);

    useEffect(() => {
        const cityParam = searchParams.get("city");
        const regionParam = searchParams.get("region");

        if (cityParam) {
            setSelectedCity(cityParam);
        }
        // if (regionParam) {
        //     setSelectedRegion(regionParam);
        // }
    }, [searchParams]);

    const regionOptions = [
        { place: "- Pokaži vse regije -", id: "allRegions" },
        ...Object.keys(regionsAndCities).map((region) => ({
            place: region,
            id: region,
        })),
    ];
    regionOptions.map((item) => {
        console.log('>>>>>>>', item?.id)
    })
    console.log('>>>>>>>> regionOptions', regionOptions);

    const allCitiesOption = { place: "- Pokaži vse občine -", id: "allCities" };
    const cityOptions =
        selectedRegion && selectedRegion !== "allRegions" && selectedRegion !== "- Pokaži vse regije -"
            ? [
                allCitiesOption,
                ...regionsAndCities[selectedRegion].map((city) => ({
                    place: city,
                    id: city,
                })),
            ]
            : [
                allCitiesOption,
                ...Object.values(regionsAndCities)
                    .flat()
                    .map((city) => ({
                        place: city,
                        id: city,
                    }))
                    .sort((a, b) => a.place.localeCompare(b.place, "sl")),
            ];

    const handleRegionSelect = (item) => {
        if (item.id === "allRegions" || item.id === "- Pokaži vse regije -") {
            setSelectedRegion(null);
            setSelectedCity(null);
            updateURL(selectedCity, null, name);
        } else {
            setSelectedRegion(item.place);
            setSelectedCity(null);
            updateURL('', item.place, name);
        }
    };

    const handleNameChange = (name) => {
        setName(name);
        updateParams(selectedCity, selectedRegion, name);
    };

    const updateURL = (city, region, search) => {
        const params = new URLSearchParams(window.location.search);
        if (city && city !== "allCities" && city !== "- Pokaži vse občine -") {
            params.set("city", city);
        } else {
            params.delete("city");
        }
        if (!city) {
            setSelectedCity("");
            params.delete("city");
        }
        if (
            region &&
            region !== "allRegions" &&
            region !== "- Pokaži vse regije -"
        ) {
            params.set("region", region);
        } else {
            params.delete("region");
        }
        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }
        const queryString = params.toString();
        const newURL = queryString ? `?${queryString}` : window.location.pathname;
        router.replace(newURL, { scroll: false });
    };

    const handleCitySelect = (item) => {
        if (item.id === "allCities" || item.place === "- Pokaži vse občine -") {
            setSelectedCity(null);
            updateURL(null, selectedRegion, name);
        } else {
            setSelectedCity(item.place);
            updateURL(item.place, selectedRegion, name);
        }
    };

    const updateParams = (city, region, name = "") => {
        const params = new URLSearchParams();
        const currentFloristCity = searchParams.get("floristCity");
        if (currentFloristCity) {
            params.set("floristCity", currentFloristCity);
        }
        if (city) params.set("city", city);
        if (region) params.set("region", region);
        if (name && name.length > 0) params.set("search", name);

        const queryString = params.toString();
        router.replace(queryString ? `/iframed?${queryString}` : "/iframed", { scroll: false });
    };

    useEffect(() => {
        fetchObituary();
    }, [selectedCity, selectedRegion, name]);

    const fetchObituary = async () => {
        try {
            const queryParams = {};

            if (selectedCity && selectedCity != '- Pokaži vse občine -') queryParams.city = selectedCity;
            if (selectedRegion && selectedRegion != '- Pokaži vse regije -') queryParams.region = selectedRegion;
            if (name) queryParams.name = name;

            const response = await obituaryService.getObituary(queryParams);

            if (response.error) {
                return;
            }
            let tempObituaries = response.obituaries;

            if (name) {
                const temp = tempObituaries;
                const rawName = decodeURIComponent(name).trim().toLowerCase();
                console.log("Raw name for filtering:", rawName);
                if (temp && temp.length > 0) {
                    tempObituaries = temp.filter((obituaries) => {
                        const fullName = `${obituaries.name} ${obituaries.sirName}`;
                        return (
                            fullName.toLowerCase().startsWith(rawName) ||
                            obituaries.sirName.toLowerCase().startsWith(rawName)
                        );
                    });
                }
            }
            let sortedObituaries = tempObituaries;
            setObituaries(sortedObituaries);
        } catch (err) {
        }
    };

    const funcMegaMenu = () => { };

    return (
        <FrameLayout
            isMegaMenuVisible={false}
            from={"1"}
            forFooter={""}
            megaMenu={funcMegaMenu}
        >
            <div className="flex flex-col items-center desktop:w-[1280px] tablet:w-[680px] mobile:w-[100%] mobile:max-w-[500px] mx-auto mobile:px-3">
                <div
                    className="flex items-center 
        desktop:mt-[60.73px] tablet:mt-[67.73px] mobile:mt-[22px]
        desktop:h-[47px] tablet:h-[47px] mobile:h-[33px]"
                >
                    <Link
                        href={"/moj-racun"}
                        className="mobile:font-variation-customOpt28 tablet:font-variation-customOpt40 desktop:font-variation-customOpt40 desktop:text-[40px] tablet:text-[40px] mobile:text-[28px]  text-[#1E2125] leading-[46.88px] "
                    >
                        Zadnje osmrtnice
                    </Link>
                </div>
                <div
                    className="flex flex-col desktop:flex-row 
        desktop:mt-[70px] tablet:mt-[48px] mobile:mt-[29px]
        desktop:w-[777px] tablet:w-[600px] mobile:w-[296px]
          items-center justify-center space-x-[16px]"
                >
                    <div className="flex flex-col w-full items-center tablet:flex-row desktop:flex-row desktop:space-x-[16px] tablet:justify-between mobile:h-[112px] tablet:h-[48px] desktop:h-[48px]">
                        <div className="hidden desktop:flex h-[48px]">
                            <input
                                type="text"
                                placeholder="Išči po imenu / priimku"
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    width: "227px",
                                    height: "100%",
                                    fontWeight: 400,
                                    borderWidth: "1px",
                                    borderColor: "#7C7C7C",
                                    borderRadius: "8px",
                                    paddingLeft: "15.8px",
                                    paddingRight: "15.8px",
                                    color: "#7C7C7C",
                                    backgroundColor: "white",
                                    fontVariationSettings: "'opsz' 16",
                                }}
                                onChange={(e) => handleNameChange(e.target.value)}
                            />
                        </div>
                        <SelectDropdown
                            label={"Išči po regiji"}
                            isFromNotification={false}
                            isFromFlower={false}
                            data={regionOptions}
                            selectedValue={selectedRegion}
                            onSelect={handleRegionSelect}
                        />
                        <div className="flex h-[16px] w-[360px] tablet:hidden desktop:hidden" />
                        <SelectDropdown
                            data={cityOptions}
                            label={"Išči po kraju"}
                            isFromNotification={false}
                            isFromFlower={false}
                            selectedValue={selectedCity}
                            onSelect={handleCitySelect}
                        />
                    </div>
                    <div
                        onClick={() => fetchObituary()}
                        className="hidden desktop:flex justify-center  w-12 items-center h-full desktop:aspect-square rounded-lg bg-[#414141]"
                    >
                        <MagnifyingGlassIcon className="w-5 h-5 text-white hidden desktop:block" />
                    </div>
                </div>

                <div className="flex desktop:hidden h-[48px] mt-4 w-[296px] tablet:w-[292px] bg-[#414141] rounded-[8px] justify-center items-center ">
                    <div
                        style={{
                            fontSize: "16px",
                            lineHeight: "24px",
                            fontWeight: 400,
                            color: "#F6F6F6",
                            fontVariationSettings: "'opsz' 16",
                        }}
                    >
                        Prikaži
                    </div>
                </div>

                <div className="mx-auto hidden tablet:hidden desktop:grid desktop:grid-cols-2 grid-cols-1 tablet:gap-6 desktop:gap-6 mt-[43px] tablet:mt-[64px] desktop:mt-[47.93px] justify-between">
                    {obituaries.slice(0, 8).map((obituary, index) => (
                        <ObituaryCard
                            data={obituary}
                            index={index}
                            key={index}
                            mob={false}
                            selectedCity={selectedCity}
                            selectedRegion={selectedRegion}
                            iframed={true}
                        />
                    ))}
                </div>
                <div className="mx-auto hidden tablet:grid grid-cols-1 desktop:hidden desktop:grid-cols-2 tablet:gap-6 desktop:gap-6 mt-[43px] tablet:mt-[64px] desktop:mt-[47.93px] justify-between">
                    {obituaries.slice(0, 8).map((obituary, index) => (
                        <ObituaryCard
                            data={obituary}
                            index={index}
                            key={index}
                            mob={false}
                            selectedCity={selectedCity}
                            selectedRegion={selectedRegion}
                            iframed={true}
                        />
                    ))}
                </div>
                <div className="mx-auto mobile:w-full grid grid-cols-1 tablet:hidden desktop:hidden gap-[22px] tablet:gap-6 mt-[43px] tablet:mt-[64px] mobile:place-items-center">
                    {obituaries.slice(0, 8).map((obituary, index) => (
                        <ObituaryCard
                            data={obituary}
                            index={index}
                            key={index}
                            mob={true}
                            selectedCity={selectedCity}
                            selectedRegion={selectedRegion}
                            iframed={true}
                        />
                    ))}
                </div>

                <div
                    className="flex flex-col items-center justify-center 
        mobile:pt-[22.09px] mobile:pb-[49px]
        tablet:pt-[43px] tablet:pb-[46px]
        desktop:pt-[45px] desktop:pb-[62px]  "
                >
                    <Link
                        href={`/osmrtnice?region=${selectedRegion}`}
                        target="_blank"
                        className="flex items-center rounded-lg justify-center shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]
          mobile:h-[43px] mobile:w-[103px]
          tablet:h-[43px] tablet:w-[97px]
          desktop:h-12 desktop:w-[125px]"
                    >
                        <div className="flex font-variation-customOpt16 text-[16px] text-[#1E2125] text-center">
                            Naprej
                        </div>
                    </Link>

                    <div>
                        <Link href={`/osmrtnice?region=${selectedRegion}`} target="_blank" className="text-center mt-4 text-[14px] text-[#1E2125] flex items-center justify-center">
                            odpre stran
                            <img src={'/omr.png'} className="ml-2 w-[105px]" />
                        </Link>
                    </div>
                </div>
            </div>
        </FrameLayout>
    );
}
