"use client";

import { toast } from "react-hot-toast";
import React, { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SelectDropdown } from "./SelectDropdown";
import regionsAndCities from "@/utils/regionAndCities";
import obituaryService from "@/services/obituary-service";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { cityToSlug, findCityFromSlug } from "@/utils/citySlug";

const ObituaryListComponent = ({ city }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("region") ? null : (searchParams.get("city") || city || null)
  );
  const [selectedRegion, setSelectedRegion] = useState(
    searchParams.get("region") || null
  );

  useEffect(() => {
    if (pathname?.startsWith('/pogrebi/') && pathname !== '/pogrebi') {
      const citySlug = pathname.split('/pogrebi/')[1];
      if (citySlug) {
        const isShowAllSlug = citySlug.includes('pokazi-vse') || citySlug === 'allCities';
        if (isShowAllSlug) {
          setSelectedCity("- Pokaži vse občine -");
          setSelectedRegion("- Pokaži vse regije -");
          router.push("/pogrebi");
          return;
        }

        const cityFromRoute = findCityFromSlug(citySlug);
        if (cityFromRoute && !cityFromRoute.includes('pokazi-vse')) {
          setSelectedCity(cityFromRoute);
          setSelectedRegion(null);
        } else {
          setSelectedCity(null);
          setSelectedRegion(null);
        }
      }
    } else if (pathname === '/pogrebi') {
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
      } else if (cityFromQuery) {
        const cityValue = cityFromQuery;
        const isShowAll = !cityValue || cityValue === '- Pokaži vse občine -' || cityValue === 'allCities' || (cityValue.includes && cityValue.includes('pokazi-vse'));
        if (isShowAll) {
          setSelectedCity('- Pokaži vse občine -');
        } else {
          setSelectedCity(cityValue);
        }
        setSelectedRegion(null);
      } else if (city && !regionFromQuery) {
        const cityValue = city;
        const isShowAll = !cityValue || cityValue === '- Pokaži vse občine -' || cityValue === 'allCities' || (cityValue.includes && cityValue.includes('pokazi-vse'));
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
  }, [pathname, searchParams, city]);

  const [searchTerm, setSearchTerm] = useState("");
  const [obituaries, setObituaries] = useState([]);
  const defaultCities = Object.values(regionsAndCities)
    .flat()
    .sort((a, b) => a.localeCompare(b, "sl"));
  const [allCities, setAllCities] = useState(defaultCities);
  const [suggestion, setSuggestion] = useState([]);
  const suggestionComponentRef = React.useRef(null);

  const quickSelectCities = [
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

  const allRegionsOption = {
    place: "- Pokaži vse regije -",
    id: "allRegions",
  };

  const allCitiesOption = {
    place: "- Pokaži vse občine -",
    id: "allCities",
  };

  const regionOptions = [
    allRegionsOption,
    ...Object.keys(regionsAndCities).map((region) => ({
      place: region,
      id: region,
    })),
  ];

  useEffect(() => {
    document.addEventListener("click", function (event) {
      if (
        suggestionComponentRef.current &&
        !suggestionComponentRef.current.contains(event.target)
      ) {
        setSuggestion([]);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedRegion || selectedRegion === "- Pokaži vse regije -") {
      return setAllCities(defaultCities);
    }
    const filteredCities = Object.values(regionsAndCities[selectedRegion]).sort(
      (a, b) => a.localeCompare(b, "sl")
    );
    setAllCities(filteredCities);
  }, [selectedRegion]);

  const cityOptions = [
    allCitiesOption,
    ...allCities.map((city) => ({
      place: city,
      id: city,
    })),
  ];

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

  const handleRegionSelect = (item) => {
    if (item.id === "allRegions" || item.place === "- Pokaži vse regije -") {
      setSelectedRegion("- Pokaži vse regije -");
      setSelectedCity("- Pokaži vse občine -");
      router.push("/pogrebi");
      return;
    }
    setSelectedRegion(item.place);
    setSelectedCity(null);
    const params = new URLSearchParams();
    params.set("region", item.place);
    router.push(`/pogrebi?${params.toString()}`);
  };

  const handleCitySelect = (item) => {
    if (item.id === "allCities" || item.place === "- Pokaži vse občine -") {
      setSelectedCity("- Pokaži vse občine -");
      setSelectedRegion(null);
      router.push("/pogrebi");
      return;
    }
    setSelectedCity(item.place);
    setSelectedRegion(null);
    const citySlug = cityToSlug(item.place);
    if (citySlug) {
      router.push(`/pogrebi/${citySlug}`);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value && value.length > 0) {
      if (obituaries && obituaries.length > 0) {
        const temp = obituaries.filter((obit) => {
          const raw =
            obit.name.toLowerCase().trim() +
            " " +
            obit.sirName.toLowerCase().trim();
          if (
            (obit.name &&
              obit.name.toLowerCase().startsWith(value.toLowerCase().trim())) ||
            (obit.sirName &&
              obit.sirName
                .toLowerCase()
                .startsWith(value.toLowerCase().trim())) ||
            (raw && raw.toLowerCase().startsWith(value.toLowerCase().trim()))
          ) {
            return obit;
          }
        });
        setSuggestion(temp);
      }
    } else {
      setSuggestion([]);
    }
    setSearchTerm(value);
  };

  const handleQuickSelect = (cityName) => {
    const citySlug = cityToSlug(cityName);
    if (citySlug) {
      setSelectedCity(cityName);
      setSelectedRegion(null);
      router.push(`/pogrebi/${citySlug}`);
    }
  };

  const handleSearch = () => {
    if (selectedCity && selectedCity.length > 0) {
      updateURL(selectedCity, selectedRegion, searchTerm);
    } else {
      updateURL(selectedCity, selectedRegion, searchTerm);
    }

    fetchObituary();
  };

  // Removed: Set default city in URL if none is specified
  // This is now handled in the pathname useEffect above to use path parameters instead of query parameters
  // useEffect(() => {
  //   if (!searchParams.get("city") && !city && !selectedRegion) {
  //     updateURL("Celje", selectedRegion, searchTerm);
  //   }
  // }, [selectedRegion]);

  // Fetch obituaries when filters change
  useEffect(() => {
    fetchObituary();
  }, [selectedCity, selectedRegion, searchTerm]);

  const fetchObituary = async () => {
    try {
      const queryParams = {};

      const isShowAllCities = !selectedCity ||
        selectedCity === '- Pokaži vse občine -' ||
        selectedCity === 'allCities' ||
        (selectedCity && selectedCity.includes && selectedCity.includes('pokazi-vse')) ||
        selectedCity === '';

      if (selectedCity && !isShowAllCities && !pathname?.includes('/u/')) {
        queryParams.city = selectedCity;
      }

      const isShowAllRegions = !selectedRegion ||
        selectedRegion === '- Pokaži vse regije -' ||
        selectedRegion === 'allRegions';

      if (selectedRegion && !isShowAllRegions && !pathname?.includes('/u/')) {
        queryParams.region = selectedRegion;
      }

      if (searchTerm) queryParams.search = searchTerm;

      console.log("Fetching with params:", queryParams);

      const response = await obituaryService.getObituary(queryParams);

      if (response.error) {
        // toast.error(
        //   response.error || "Prišlo je do napake."
        // );
        return;
      }

      const sortedObituaries = response.obituaries.sort(
        (a, b) =>
          new Date(b.deathDate).getTime() - new Date(a.deathDate).getTime()
      );

      setObituaries(sortedObituaries);
    } catch (err) {
      console.error("Error fetching obituary:", err);
      toast.error(err.message || "Failed to fetch obituary.");
    }
  };

  const hideDropdowns = pathname?.includes('/u/') ? true : false;

  return (
    <div className={`max-w-[1920px] w-full tablet:w-full mobile:w-full mx-auto flex flex-col items-center ${pathname?.includes('/u/') ? '' : 'desktop:bg-[#F5F7F9]'} ${pathname?.includes('/u/') ? '' : 'mobile:bg-white tablet:bg-white'}`}>
      {/* Main Container */}
      <div className="flex flex-col items-center w-full tablet:w-full mobile:w-full">
        {/* DESKTOP VERSION */}
        <div className={`w-full hidden desktop:flex tablet:w-full mobile:w-full flex-col ${pathname?.includes('/u/') ? '' : 'items-center'}`}>
          <div className={`w-[777px] tablet:w-[600px] h-[48px] flex flex-row gap-4 ${pathname?.includes('/u/') ? '' : 'mt-[69.07px] mb-[23.93px]'}`}>
            {/* Search Input */}
            <div className="flex relative w-[227px] h-[48px] justify-center items-center">
              <input
                type="text"
                placeholder="Išči po imenu"
                value={searchTerm}
                onChange={handleSearchChange}
                className="relative bg-white border-[#7C7C7C] placeholder-[#7C7C7C] text-[16px] font-[400] leading-[24px] border rounded-lg shadow-sm flex flex-1 items-center justify-between h-full px-4 text-[#7C7C7C] focus:outline-none"
              />
              {suggestion && suggestion.length > 0 && (
                <div
                  className="absolute w-full top-[100%] z-[9999] bg-[#f1fffe] my-[8px] box-border rounded-[4px]"
                  style={{
                    boxShadow:
                      "0 0 0 1px hsla(0, 0%, 0%, 0.1),0 4px 11px hsla(0, 0%, 0%, 0.1)",
                  }}
                  ref={suggestionComponentRef}
                >
                  <div className="max-h-[300px] py-[4px] relative overflow-y-auto css-qr46ko">
                    {suggestion &&
                      suggestion.length > 0 &&
                      suggestion.map((obit, index) => (
                        <div
                          key={index}
                          className="text-[#7d7d7d] py-[8px] px-[12px] cursor-pointer select-none bg-transparent hover:bg-[#6D778E] hover:text-white box-border rounded-[0.375rem]"
                          onClick={() => {
                            setSearchTerm(`${obit.name} ${obit.sirName}`);
                            setSuggestion([]);
                            window.location.href = `/m/${obit.slugKey}`;
                          }}
                        >{`${obit.name} ${obit.sirName}`}</div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {!hideDropdowns ? (
              <>
                {/* Region Dropdown */}
                <SelectDropdown
                  label={"Regija"}
                  isFromNotification={false}
                  isFromFlower={false}
                  data={regionOptions}
                  selectedValue={selectedRegion}
                  onSelect={handleRegionSelect}
                />

                {/* City Dropdown */}
                <SelectDropdown
                  data={cityOptions}
                  label={"Občina"}
                  isFromNotification={false}
                  isFromFlower={false}
                  selectedValue={selectedCity}
                  onSelect={handleCitySelect}
                />
              </>
            ) : null}

            {/* Search Button */}
            <div
              onClick={handleSearch}
              className="flex justify-center items-center w-12 h-full aspect-square rounded-lg bg-[#414141] cursor-pointer"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* TABLET VERSION */}
        <div className={`w-full tablet:w-full mobile:w-full tablet:flex hidden flex-col ${pathname?.includes('/u/') ? '' : 'items-center'}`}>
          <div className={`w-[600px] h-[112px] columns-2 flex flex-wrap flex-row gap-4 ${pathname?.includes('/u/') ? '' : 'mt-[63px] mb-[53px]'}`}>
            {!hideDropdowns ? (
              <>
                {/* Region Dropdown */}
                <SelectDropdown
                  label={"Regija"}
                  isFromNotification={false}
                  isFromFlower={false}
                  data={regionOptions}
                  selectedValue={selectedRegion}
                  onSelect={handleRegionSelect}
                />

                {/* City Dropdown */}
                <SelectDropdown
                  data={cityOptions}
                  label={"Mesto"}
                  isFromNotification={false}
                  isFromFlower={false}
                  selectedValue={selectedCity}
                  onSelect={handleCitySelect}
                />
              </>
            ) : null}

            {/* Search Input */}
            <div className="flex relative w-[292px] h-[48px] justify-center items-center">
              <input
                type="text"
                placeholder="Išči po imenu / priimku"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-white border-[#7C7C7C] placeholder-[#7C7C7C] text-[16px] font-[400] leading-[24px] border rounded-lg shadow-sm flex flex-1 items-center justify-between h-full px-4 text-[#7C7C7C] focus:outline-none"
              />
              {suggestion && suggestion.length > 0 && (
                <div
                  className="absolute w-full top-[100%] z-[9999] bg-[#f1fffe] my-[8px] box-border rounded-[4px]"
                  style={{
                    boxShadow:
                      "0 0 0 1px hsla(0, 0%, 0%, 0.1),0 4px 11px hsla(0, 0%, 0%, 0.1)",
                  }}
                  ref={suggestionComponentRef}
                >
                  <div className="max-h-[300px] py-[4px] relative overflow-y-auto css-qr46ko">
                    {suggestion &&
                      suggestion.length > 0 &&
                      suggestion.map((obit, index) => (
                        <div
                          key={index}
                          className="text-[#7d7d7d] py-[8px] px-[12px] cursor-pointer select-none bg-transparent hover:bg-[#6D778E] hover:text-white box-border rounded-[0.375rem]"
                          onClick={() => {
                            setSearchTerm(`${obit.name} ${obit.sirName}`);
                            setSuggestion([]);
                            window.location.href = `/m/${obit.slugKey}`;
                          }}
                        >{`${obit.name} ${obit.sirName}`}</div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {pathname?.includes('/u/') ? (
              <div
                onClick={handleSearch}
                className="flex justify-center items-center w-12 h-12 aspect-square rounded-lg bg-[#414141] cursor-pointer"
              >
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </div>
            ) : (
              <>
                {/* Search Button */}
                <div
                  onClick={handleSearch}
                  className="w-[292px] h-[48px] text-[16px] text-[#F6F6F6] rounded-lg leading-6 bg-[#414141] font-[400] flex justify-center items-center cursor-pointer"
                >
                  Prikaži
                </div>
              </>
            )}



          </div>
        </div>

        {/* MOBILE VERSION */}
        <div className={`w-full tablet:w-full mobile:w-full mobile:flex hidden flex-col ${pathname?.includes('/u/') ? '' : 'items-center'}`}>
          <div className={`w-[296px] ${pathname?.includes('/u/') ? '' : 'h-[240px] mt-[40px] mb-[42px]'} flex-wrap flex flex-row gap-4`}>
            {/* Search Input */}
            <div className={`flex relative ${pathname?.includes('/u/') ? '' : 'w-[296px]'} h-[48px] justify-center items-center`}>
              <input
                type="text"
                placeholder="Išči po imenu / priimku"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-white border-[#7C7C7C] placeholder-[#7C7C7C] text-[16px] font-[400] leading-[24px] border rounded-lg shadow-sm flex flex-1 items-center justify-between h-full px-4 text-[#7C7C7C] focus:outline-none"
              />
              {suggestion && suggestion.length > 0 && (
                <div
                  className="absolute w-full top-[100%] z-[9999] bg-[#f1fffe] my-[8px] box-border rounded-[4px]"
                  style={{
                    boxShadow:
                      "0 0 0 1px hsla(0, 0%, 0%, 0.1),0 4px 11px hsla(0, 0%, 0%, 0.1)",
                  }}
                  ref={suggestionComponentRef}
                >
                  <div className="max-h-[300px] py-[4px] relative overflow-y-auto css-qr46ko">
                    {suggestion &&
                      suggestion.length > 0 &&
                      suggestion.map((obit, index) => (
                        <div
                          key={index}
                          className="text-[#7d7d7d] py-[8px] px-[12px] cursor-pointer select-none bg-transparent hover:bg-[#6D778E] hover:text-white box-border rounded-[0.375rem]"
                          onClick={() => {
                            setSearchTerm(`${obit.name} ${obit.sirName}`);
                            setSuggestion([]);
                            window.location.href = `/m/${obit.slugKey}`;
                          }}
                        >{`${obit.name} ${obit.sirName}`}</div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {!hideDropdowns ? (
              <>
                {/* Region Dropdown */}
                <SelectDropdown
                  label={"Regija"}
                  isFromNotification={false}
                  isFromFlower={false}
                  isFrom={"pogrebi"}
                  data={regionOptions}
                  selectedValue={selectedRegion}
                  onSelect={handleRegionSelect}
                />

                {/* City Dropdown */}
                <SelectDropdown
                  data={cityOptions}
                  label={"Mesto"}
                  isFromNotification={false}
                  isFromFlower={false}
                  isFrom={"pogrebi"}
                  selectedValue={selectedCity}
                  onSelect={handleCitySelect}
                />
              </>
            ) : null}

            {pathname?.includes('/u/') ? (
              <div
                onClick={handleSearch}
                className="flex justify-center items-center w-12 h-12 aspect-square rounded-lg bg-[#414141] cursor-pointer"
              >
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </div>
            ) : (
              <>
                {/* Search Button */}
                <div
                  onClick={handleSearch}
                  className="w-[296px] h-[48px] text-[16px] text-[#F6F6F6] rounded-lg leading-6 bg-[#414141] font-[400] flex justify-center items-center cursor-pointer"
                >
                  Prikaži
                </div>
              </>
            )}

          </div>
        </div>

        {/* Quick Selection - City Tabs */}
        {!pathname?.includes('/u/') && (
          <div className="flex flex-col desktop:flex-col tablet:flex-row mobile:flex-col desktop:items-start items-center desktop:justify-center tablet:justify-center mobile:justify-start desktop:mt-[48px] tablet:mt-[48px] mobile:mt-[32px] desktop:mb-[48px] tablet:mb-[48px] mobile:mb-[32px]">
            <h2 className="flex text-[32px] mobile:text-[24px] tablet:text-[24px] font-[400px] leading-[28.13px] text-[#1E2125] whitespace-nowrap mobile:h-7 tablet:h-7 desktop:h-auto mobile:mr-[24px] tablet:mr-[18px] desktop:mr-0 desktop:mb-4">
              Hitri izbor
              <span className="hidden tablet:inline desktop:hidden text-[24px] text-[#1E2125] ml-0">:</span>
            </h2>
            <div className="flex mobile:w-[330px] tablet:w-[480px] desktop:mt-0">
              <ul className="flex flex-row list-none flex-wrap mobile:ml-[0px] desktop:justify-center">
                {quickSelectCities.map((cityName, index) => (
                  <li
                    key={cityName}
                    className="flex items-center mobile:w-[104px]"
                  >
                    <button
                      onClick={() => {
                        handleQuickSelect(cityName);
                      }}
                      className={`border border-[#C3C6C8] rounded-sm text-[#3C3E41] mobile:mt-[16px] hover:bg-gray-100 transition-colors cursor-pointer ${index == quickSelectCities.length - 1
                        ? "ml-[0px]"
                        : index == 5
                          ? "mobile:ml-[0px] tablet:mx-[6px] desktop:mr-[17px]"
                          : "mobile:ml-[0px] tablet:mx-[6px] desktop:mr-[17px]"
                        } ${index < 6 ? "tablet:mb-[18px]" : "tablet:mb-[18px]"} ${selectedCity === cityName
                          ? "bg-[#414141] text-white"
                          : "bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]"
                        } text-[14px] mobile:text-[13px] font-extrabold tablet:font-bold mobile:font-bold italic leading-[16.41px] mobile:px-[6px] px-[7.5px] py-[4px]`}
                    >
                      {cityName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Loading component for Suspense fallback
const ObituaryListLoading = () => (
  <div className="max-w-[1920px] w-full pb-[81px] tablet:pb-[55px] desktop:pb-[121px] tablet:w-full mobile:w-full mx-auto flex flex-col items-center desktop:bg-[#F5F7F9] mobile:bg-white tablet:bg-white">
    <div className="flex justify-center items-center h-32">
      <p className="text-gray-500">Nalaganje osmrtnic...</p>
    </div>
  </div>
);

// Wrapper component with Suspense boundary
const ObituaryListWrapper = ({ city }) => {
  return (
    <Suspense fallback={<ObituaryListLoading />}>
      <ObituaryListComponent city={city} />
    </Suspense>
  );
};

export default ObituaryListWrapper;
