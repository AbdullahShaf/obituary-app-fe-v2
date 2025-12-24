"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import imgNext from "@/public/next_img.png";
import { SelectDropdown } from "./SelectDropdown";
import imgPrevious from "@/public/previous_img.png";
import regionsAndCities from "@/utils/regionAndCities";
import obituaryService from "@/services/obituary-service";
import { cityToSlug, findCityFromSlug } from "@/utils/citySlug";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ObituaryCard from "@/app/components/appcomponents/ObituaryCard";

const ObituaryListComponent = ({ city, initialObituaries = [] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const regionParam1 = searchParams.get("region");
  const languages = [
    "Ljubljana",
    "Maribor",
    "Celje",
    "Kranj",
    "Koper",
    "Novo Mesto",
    "Domžale",
    "Velenje",
    "Nova Gorica",
  ];
  const [obituaries, setObituaries] = useState(initialObituaries);
  const [obitLoading, setObitLoading] = useState(false);
  const allRegionsOption = {
    place: "- Pokaži vse regije -",
    id: "allRegions",
  };
  const allCitiesOption = { place: "- Pokaži vse občine -", id: "allCities" };
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(regionParam1 ?? null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // default to mobile
  const [selectedName, setSelectedName] = useState("");
  const [name, setName] = useState(null);

  const regionOptions = [
    allRegionsOption,
    ...Object.keys(regionsAndCities).map((region) => ({
      place: region,
      id: region,
    })),
  ];

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

  useEffect(() => {
    if (pathname?.startsWith('/osmrtnice/') && pathname !== '/osmrtnice') {
      const citySlug = pathname.split('/osmrtnice/')[1];
      if (citySlug) {
        const isShowAllSlug = citySlug.includes('pokazi-vse') || citySlug === 'allCities';
        if (isShowAllSlug) {
          setSelectedCity("- Pokaži vse občine -");
          setSelectedRegion("- Pokaži vse regije -");
          router.push("/osmrtnice");
          return;
        }
        
        const cityFromRoute = findCityFromSlug(citySlug);

        if (cityFromRoute && !cityFromRoute.includes('pokazi-vse')) {
          if (selectedCity !== cityFromRoute) {
            setSelectedCity(cityFromRoute);
          }
          setSelectedRegion(null);
        } else {
          setSelectedCity(null);
          setSelectedRegion(null);
        }
      }
    } else if (pathname === '/osmrtnice') {
      const cityFromQuery = searchParams.get("city");
      const regionFromQuery = searchParams.get("region");
      
      if (regionFromQuery) {
        if (regionFromQuery === '- Pokaži vse regije -' || regionFromQuery === 'allRegions') {
          setSelectedRegion("- Pokaži vse regije -");
          setSelectedCity("- Pokaži vse občine -");
        } else {
          setSelectedRegion(regionFromQuery);
          setSelectedCity(null);
        }
      } else if (cityFromQuery || city) {
        const cityValue = cityFromQuery || city;
        const isShowAll = !cityValue || cityValue === '- Pokaži vse občine -' || cityValue === 'allCities' || cityValue.includes('pokazi-vse');
        if (isShowAll) {
          setSelectedCity('- Pokaži vse občine -');
        } else {
          setSelectedCity(cityValue);
        }
        setSelectedRegion(null);
      } else if (!cityFromQuery && !city && !regionFromQuery) {
        setSelectedCity(null);
        setSelectedRegion(null);
      }
    }
  }, [pathname, searchParams]);

  const hasInitialData = React.useRef(initialObituaries.length > 0);
  const initialCity = React.useRef(city);
  const initialRegion = React.useRef(regionParam1);
  
  useEffect(() => {
    if (pathname?.startsWith('/osmrtnice/') && pathname !== '/osmrtnice' && !selectedCity) {
      console.log('[selectedCity-effect] Skipping fetch - on dynamic route but selectedCity is null (will be set by pathname effect)');
      return;
    }

    if (pathname?.startsWith('/osmrtnice/') && pathname !== '/osmrtnice') {
      const citySlug = pathname.split('/osmrtnice/')[1];
      const cityFromPath = findCityFromSlug(citySlug);
      if (cityFromPath && cityFromPath !== selectedCity) {
        console.log('[selectedCity-effect] Skipping fetch - pathname city (', cityFromPath, ') does not match selectedCity (', selectedCity, ') - navigation in progress');
        return;
      }
      if (cityFromPath && cityFromPath === selectedCity) {
        console.log('[selectedCity-effect] City matches pathname, fetching data');
      }
    }

    if (hasInitialData.current && !selectedName && selectedCity === initialCity.current && selectedRegion === initialRegion.current) {
      hasInitialData.current = false;
      return;
    }

    fetchObituary();
  }, [selectedCity, selectedRegion, pathname]);

  useEffect(() => {
    console.log('[selectedCity-tracker] selectedCity value:', selectedCity, 'type:', typeof selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity) {
      document.title = `Osmrtnice v občini ${selectedCity} | Osmrtnica.com`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", `Osmrtnice v občini ${selectedCity}. Celovit pregled osmrtnic z datumi pogrebov, pokopališči ter možnostjo iskanja po imenu, kraju ali regiji.`);
      }
    } else if (selectedRegion) {
      document.title = `Osmrtnice v regiji ${selectedRegion} | Osmrtnica.com`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", `Pregled osmrtnic v regiji ${selectedRegion}. Celovit pregled osmrtnic z datumi pogrebov, pokopališči ter možnostjo iskanja po imenu, kraju ali regiji.`);
      }
    } else {
      document.title = "Zadnje osmrtnice po Sloveniji | Osmrtnica.com";
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", "Pregled vseh osmrtnic s povezavo do njihove žalne/spominske strani. Osmrtnice na Gorenjskem, Dolenjskem, Pomurju, Goriškem, Zasavju, Primorskem, Notranjskem");
      }
    }
  }, [selectedCity, selectedRegion]);

  const handleRegionSelect = (item) => {
    if (item.id === "allRegions") {
      setSelectedRegion("- Pokaži vse regije -");
      setSelectedCity("- Pokaži vse občine -");
      router.push("/osmrtnice");
      return;
    }
    setSelectedRegion(item.place);
    setSelectedCity(null);
    const params = new URLSearchParams();
    params.set("region", item.place);
    router.push(`/osmrtnice?${params.toString()}`);
  };

  const updateURL = (city, region, search) => {
    console.log('[updateURL] Called with city:', city, 'region:', region);
    const params = new URLSearchParams(window.location.search);
    if (city && city !== "allCities" && city !== "- Pokaži vse občine -") {
      params.set("city", city);
    } else {
      params.delete("city");
    }
    if (!city) {
      console.log('[updateURL] Clearing selectedCity because city is falsy');
      setSelectedCity('');
      params.delete("city");
    }
    if (region && region !== "allRegions" && region !== "- Pokaži vse regije -") {
      params.set("region", region);
    } else {
      params.delete("region");
    }

    const queryString = params.toString();
    const newURL = queryString ? `?${queryString}` : window.location.pathname;
    console.log('[updateURL] Navigating to:', newURL);
    router.replace(newURL, { scroll: false });
  };

  const handleCitySelect = (item) => {
    if (item.id === "allCities" || item.place === "- Pokaži vse občine -") {
      setSelectedCity("- Pokaži vse občine -");
      setSelectedRegion(null);
      router.push("/osmrtnice");
      return;
    }

    setSelectedRegion(null);
    const citySlug = cityToSlug(item.place);
    if (citySlug) {
      router.push(`/osmrtnice/${citySlug}`);
    }
  };

  const handleCitySelectQuickLinks = (city) => {
    const citySlug = cityToSlug(city);
    if (citySlug) {
      router.push(`/osmrtnice/${citySlug}`);
    }
  };

  useEffect(() => {
    if (!selectedName) {
      console.log('[selectedName-effect] Skipping fetch - selectedName is empty');
      return;
    }

    console.log('[selectedName-effect] Fetching with selectedName:', selectedName);
    fetchObituary();
  }, [selectedName]);

  const fetchObituary = async () => {
    try {
      const queryParams = {};

      const isShowAllCities = !selectedCity || 
        selectedCity === '- Pokaži vse občine -' || 
        selectedCity === 'allCities' ||
        (selectedCity && selectedCity.includes && selectedCity.includes('pokazi-vse')) ||
        selectedCity === '';
      
      if (selectedCity && !isShowAllCities) queryParams.city = selectedCity;

      const isShowAllRegions = !selectedRegion || 
        selectedRegion === '- Pokaži vse regije -' || 
        selectedRegion === 'allRegions';
      
      if (selectedRegion && !isShowAllRegions) queryParams.region = selectedRegion;
      if (selectedName) queryParams.name = selectedName;

      console.log('[fetchObituary] Calling API with params:', queryParams, 'pathname:', pathname);
      setObitLoading(true);
      const response = await obituaryService.getObituary(queryParams);
      setObitLoading(false);

      if (response.error) {
        // toast.error(
        //   response.error || "Prišlo je do napake."
        // );
        return;
      }

      // const sortedObituaries = response.obituaries.sort(
      //   (a, b) =>
      //     new Date(b.deathDate).getTime() - new Date(a.deathDate).getTime()
      // );

      let sortedObituaries = response.obituaries;

      if (selectedName && selectedName.length > 0) {
        const temp = sortedObituaries;
        const rawName = decodeURIComponent(selectedName).trim().toLowerCase();
        if (sortedObituaries && sortedObituaries.length > 0) {
          sortedObituaries = temp.filter(
            (obituaries) => {
              const fullName = `${obituaries.name} ${obituaries.sirName}`;
              return (
                fullName.toLowerCase().startsWith(rawName) ||
                obituaries.sirName.toLowerCase().startsWith(rawName)
              );
            }
            // obituaries.name.toLowerCase().startsWith(selectedName.toLowerCase()) ||
            // obituaries.sirName.toLowerCase().startsWith(selectedName.toLowerCase())
          );
        }
      }

      setObituaries(sortedObituaries);
    } catch (err) {
      setObitLoading(false);
      console.error("Error fetching obituary:", err);
      toast.error(err.message || "Failed to fetch obituary.");
    }
  };

  const totalPages = Math.ceil(obituaries.length / itemsPerPage);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        // Desktop
        setItemsPerPage(12); // 6+6
      } else if (width >= 768) {
        // Tablet
        setItemsPerPage(8); // 5+5
      } else {
        // Mobile
        setItemsPerPage(8); // Single column
      }
    };

    updateItemsPerPage(); // Initial check
    window.addEventListener("resize", updateItemsPerPage); // On resize

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const cardTopRef = React.useRef(null);
  const firstRender = React.useRef(true);

  useEffect(() => {
    // skip scroll on initial load
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (cardTopRef.current) {
      cardTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const generateJsonLd = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.osmrtnica.com';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : baseUrl;
    
    const itemListElement = obituaries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((obituary, index) => ({
      "@type": "ListItem",
      "position": (currentPage - 1) * itemsPerPage + index + 1,
      "item": {
        "@type": "Person",
        "name": `${obituary.name} ${obituary.sirName}`,
        "deathDate": obituary.deathDate ? new Date(obituary.deathDate).toISOString().split('T')[0] : undefined,
        "birthDate": obituary.birthDate && !obituary.birthDate.includes('1025') ? new Date(obituary.birthDate).toISOString().split('T')[0] : undefined,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": obituary.location || obituary.city || "",
        },
        "url": `${baseUrl}/m/${obituary.slugKey}`,
      }
    }));

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": selectedCity 
        ? `Osmrtnice v ${selectedCity}`
        : selectedRegion
        ? `Osmrtnice v regiji ${selectedRegion}`
        : "Osmrtnice po Sloveniji",
      "description": selectedCity
        ? `Pregled osmrtnic v ${selectedCity}`
        : selectedRegion
        ? `Pregled osmrtnic v regiji ${selectedRegion}`
        : "Pregled osmrtnic po Sloveniji",
      "url": currentUrl,
      "numberOfItems": obituaries.length,
      "itemListElement": itemListElement,
    };

    return jsonLd;
  };

  return (
    <div className="max-w-[1920px] w-full tablet:w-full mobile:w-full mx-auto flex flex-col items-center desktop:bg-[#F5F7F9] mobile:bg-white tablet:bg-white">
      {obituaries.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
        />
      )}
      {/* Main Container */}
      <div className=" flex flex-col items-center w-full tablet:w-full mobile:w-full">
        {/* Main container for inputs main container */}
        <div className="w-full tablet:w-full mobile:w-full flex flex-col items-center">
          {/* Inputs main Container */}
          <div
            className="w-[777px] tablet:w-[600px] h-[48px] tablet:h-[112px] tablet:columns-2 mobile:w-[296px] mobile:h-[240px] mobile:flex-wrap 
            flex tablet:flex-wrap flex-row gap-4 mt-[69.07px] tablet:mt-[63px] mobile:mt-[40px] mobile:mb-[42px] tablet:mb-[53px] mb-[23.93px] relative"
          >
            {obitLoading ? (
              <div className="absolute top-0 left-0 h-full w-full z-50"></div>
            ) : null}
            {/* Input field for  Išči po imenu / priimku*/}
            <div className="flex w-[227px] tablet:w-[292px] h-[48px] mobile:w-[296px] justify-center items-center">
              <input
                type="text"
                placeholder="Išči po imenu / priimku"
                className="bg-white border-[#7C7C7C] placeholder-[#7C7C7C] text-[16px] font-[400] leading-[24px] border rounded-lg shadow-sm flex flex-1 items-center justify-between h-full px-4 text-[#7C7C7C] focus:outline-none"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
              />
            </div>
            {/* Dropdown for Išči po regiji*/}
            <SelectDropdown
              label={"Išči po regiji"}
              isFromNotification={false}
              isFromFlower={false}
              data={regionOptions}
              selectedValue={selectedRegion}
              onSelect={handleRegionSelect}
            />
            {/* Dropdown for Išči po kraju*/}
            <SelectDropdown
              data={cityOptions}
              label={"Išči po kraju"}
              isFromNotification={false}
              isFromFlower={false}
              selectedValue={selectedCity}
              onSelect={handleCitySelect}
            />
            {/* Search container and magnifying glass image */}
            <div
              onClick={() => fetchObituary()}
              className="hidden desktop:flex justify-center items-center w-12 h-full desktop:aspect-square rounded-lg bg-[#414141]"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-white hidden desktop:block" />
            </div>
            <div className="tablet:w-[292px] mobile:w-[296px] h-[48px] mobile:text-[16px] mobile:text-[#F6F6F6] rounded-lg tablet:leading-6 tablet:text-[16px] tablet:text-[#F6F6F6] bg-[#414141] tablet:font-[400px] hidden tablet:flex mobile:flex justify-center items-center">
              Prikaži
            </div>
          </div>
        </div>

        {/* Hitri izbor heading and list for tablet and mobile*/}
        <div
          className="flex desktop:ml-[0px] desktop:h-[78px] tablet:w-[650px] tablet:h-[70px] tablet:justify-center mobile:w-[330px] mobile:flex-col desktop:flex-col"
          ref={cardTopRef}
        >
          <h2 className="flex items-center text-[32px] mobile:text-[24px] tablet:text-[24px] font-[400px] leading-[28.13px] text-[#1E2125] whitespace-nowrap mobile:h-7 tablet:h-7 desktop:h-auto">
            Hitri izbor
            <span className="hidden tablet:inline desktop:hidden text-[24px] text-[#1E2125] ml-0">:</span>
          </h2>
          <div className="flex desktop:hidden items-center mr-[24px] tablet:mr-[18px] whitespace-nowrap h-7">
          </div>
          <div className="flex mobile:w-[330px] tablet:w-[480px] desktop:mt-4">
            <ul className="flex flex-row list-none flex-wrap mobile:ml-[0px]">
              {languages.map((language, index) => (
                <li
                  key={language}
                  className="flex items-center mobile:w-[104px]"
                >
                  <button
                    onClick={() => {
                      handleCitySelectQuickLinks(language);
                    }}
                    className={`border border-[#C3C6C8] rounded-sm text-[#3C3E41] mobile:mt-[16px] hover:bg-gray-100 transition-colors cursor-pointer ${index == languages.length - 1
                      ? "ml-[0px]"
                      : index == 5
                        ? "mobile:ml-[0px] tablet:mx-[6px] desktop:mr-[17px]"
                        : "mobile:ml-[0px] tablet:mx-[6px] desktop:mr-[17px]"
                      } ${index < 6 ? "tablet:mb-[18px]" : "tablet:mb-[18px]"} ${selectedCity === language
                        ? "bg-[#414141] text-white"
                        : "bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]"
                      } text-[14px] mobile:text-[13px] font-extrabold tablet:font-bold mobile:font-bold italic leading-[16.41px] mobile:px-[6px] px-[7.5px] py-[4px]`}
                  >
                    {language}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Grid Contaner */}
        <div className="mx-auto mobile:hidden tablet:hidden desktop:grid desktop:grid-cols-2 grid-cols-1 mobile:gap-[22px] tablet:gap-6 desktop:gap-6 mt-[48px] tablet:mt-[4rem] mobile:mt-[86px] justify-between">
          {obituaries
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((obituary, index) => (
              <ObituaryCard
                data={obituary}
                index={index}
                key={index}
                mob={false}
              />
            ))}
        </div>
        <div className="mx-auto hidden tablet:grid desktop:hidden grid-cols-1 mobile:gap-[22px] tablet:gap-6 desktop:gap-6 mt-[48px] tablet:mt-[4rem] mobile:mt-[86px] justify-between">
          {obituaries
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((obituary, index) => (
              <ObituaryCard
                data={obituary}
                index={index}
                key={index}
                mob={false}
              />
            ))}
        </div>

        <div className="mx-auto grid tablet:hidden desktop:hidden  grid-cols-1 mobile:gap-[22px] mobile:w-full mobile:max-w-[400px] mobile:px-3 tablet:gap-6 desktop:gap-6 mt-[24.58px] tablet:mt-[69px] mobile:mt-[43px] justify-between">
          {obituaries
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((obituary, index) => (
              <ObituaryCard
                data={obituary}
                index={index}
                key={index}
                mob={true}
              />
            ))}
        </div>

        <div className="w-[272px] h-[48px] mt-[47.27px] gap-2 flex flex-row justify-center mobile:mt-[30px] mobile:mb-[66px] mb-[87.81px]">
          <div
            className="w-[48px] h-[48px] rounded-lg text-black flex justify-center items-center shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF] hover:border-black hover:border-2 cursor-pointer"
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
          >
            <Image
              src={imgPrevious}
              alt="imgPrevious"
              className="w-[5.66px] h-[8.49px]"
            />
          </div>

          {/* Page Numbers (max 4 visible at a time) */}
          {(() => {
            const maxVisiblePages = 4;
            const startPage = Math.max(
              1,
              currentPage - Math.floor(maxVisiblePages / 2)
            );
            const endPage = Math.min(
              totalPages,
              startPage + maxVisiblePages - 1
            );
            const adjustedStartPage = Math.max(
              1,
              endPage - maxVisiblePages + 1
            );

            return Array.from(
              { length: endPage - adjustedStartPage + 1 },
              (_, i) => adjustedStartPage + i
            ).map((pageNumber) => (
              <div
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`hover:border-black hover:border-2 w-[48px] h-[48px] rounded-lg text-black flex justify-center items-center cursor-pointer shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF] ${currentPage === pageNumber ? "bg-gray-300 font-bold" : ""
                  }`}
              >
                {pageNumber}
              </div>
            ));
          })()}

          <div
            className="w-[48px] h-[48px] rounded-lg text-black flex justify-center items-center shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF] hover:border-black hover:border-2 cursor-pointer transition-colors duration-200"
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
          >
            <Image
              src={imgNext}
              alt="imgNext"
              className="w-[5.66px] h-[8.49px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObituaryListComponent;
