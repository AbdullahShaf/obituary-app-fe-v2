"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "@/app/components/appcomponents/Dropdown";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ObituaryCard from "@/app/components/appcomponents/ObituaryCard";
import imgPrevious from "@/public/previous_img.png";
import imgNext from "@/public/next_img.png";
import Image from "next/image";
import { toast } from "react-hot-toast";
import obituaryService from "@/services/obituary-service";
import regionsAndCities from "@/utils/regionAndCities";
import { SelectDropdown } from "./SelectDropdown";
import { set } from "date-fns";

const ObituaryListComponent = ({ city }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("city") || city || "Celje"
  );
  const [selectedRegion, setSelectedRegion] = useState(
    searchParams.get("region") || null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [obituaries, setObituaries] = useState([]);
  const defaultCities = Object.values(regionsAndCities)
    .flat()
    .sort((a, b) => a.localeCompare(b, "sl"));
  const [allCities, setAllCities] = useState(defaultCities);
  const [suggestion, setSuggestion] = useState([]);
  const suggestionComponentRef = React.useRef(null);
  // Dropdown options
  const allRegionsOption = {
    place: "- Pokaži vse regije -",
    id: "allRegions",
  };

  const allCitiesOption = {
    place: "- Pokaži vse občine -",
    id: "allCities",
  };

  // Region options
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

  // Update URL with query parameters
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

  // Handle region selection
  const handleRegionSelect = (item) => {
    if (item.id === "allRegions" || item.place === "- Pokaži vse regije -") {
      setSelectedRegion(null);
      updateURL("", null, searchTerm); // selectedCity
    } else {
      setSelectedRegion(item.place);
      updateURL("", item.place, searchTerm); // selectedCity
    }
  };

  // Handle city selection
  const handleCitySelect = (item) => {
    console.log("sssss", item);

    if (item.id === "allCities" || item.place === "- Pokaži vse občine -") {
      setSelectedCity(null);
      updateURL(null, selectedRegion, searchTerm);
    } else {
      setSelectedCity(item.place);
      updateURL(item.place, selectedRegion, searchTerm);
    }
  };

  // Handle search input change
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
    // updateURL(selectedCity, selectedRegion, value);
  };

  // Handle quick selection (for the quick select buttons)
  const handleQuickSelect = (cityName) => {
    // Find the region for this city (optional, can be used for reference)
    const region = Object.keys(regionsAndCities).find((region) =>
      regionsAndCities[region].includes(cityName)
    );

    setSelectedCity(cityName);
    // Don't automatically set the region, keep current region selection
    updateURL(cityName, selectedRegion, searchTerm);
  };

  // Handle search/filter
  const handleSearch = () => {
    if (selectedCity && selectedCity.length > 0) {
      updateURL(selectedCity, selectedRegion, searchTerm);
    }
    fetchObituary();
  };

  // Set default city in URL if none is specified
  useEffect(() => {
    if (!searchParams.get("city") && !city && !selectedRegion) {
      updateURL("Celje", selectedRegion, searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegion]);

  // Fetch obituaries when filters change
  useEffect(() => {
    fetchObituary();
  }, [selectedCity, selectedRegion, searchTerm]);

  const fetchObituary = async () => {
    try {
      const queryParams = {};

      if (selectedCity) queryParams.city = selectedCity;
      if (selectedRegion) queryParams.region = selectedRegion;
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

  return (
    <div className="max-w-[1920px] w-full tablet:w-full mobile:w-full mx-auto flex flex-col items-center desktop:bg-[#F5F7F9] mobile:bg-white tablet:bg-white">
      {/* Main Container */}
      <div className="flex flex-col items-center w-full tablet:w-full mobile:w-full">
        {/* DESKTOP VERSION */}
        <div className="w-full hidden desktop:flex tablet:w-full mobile:w-full flex-col items-center">
          <div className="w-[777px] tablet:w-[600px] h-[48px] flex flex-row gap-4 mt-[69.07px] mb-[23.93px]">
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
                          }}
                        >{`${obit.name} ${obit.sirName}`}</div>
                      ))}
                  </div>
                </div>
              )}
            </div>

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
        <div className="w-full tablet:w-full mobile:w-full tablet:flex hidden flex-col items-center">
          <div className="w-[600px] h-[112px] columns-2 flex flex-wrap flex-row gap-4 mt-[63px] mb-[53px]">
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

            {/* Search Input */}
            <div className="flex w-[292px] h-[48px] justify-center items-center">
              <input
                type="text"
                placeholder="Išči po imenu / priimku"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-white border-[#7C7C7C] placeholder-[#7C7C7C] text-[16px] font-[400] leading-[24px] border rounded-lg shadow-sm flex flex-1 items-center justify-between h-full px-4 text-[#7C7C7C] focus:outline-none"
              />
            </div>

            {/* Search Button */}
            <div
              onClick={handleSearch}
              className="w-[292px] h-[48px] text-[16px] text-[#F6F6F6] rounded-lg leading-6 bg-[#414141] font-[400] flex justify-center items-center cursor-pointer"
            >
              Prikaži
            </div>
          </div>
        </div>

        {/* MOBILE VERSION */}
        <div className="w-full tablet:w-full mobile:w-full mobile:flex hidden flex-col items-center">
          <div className="w-[296px] h-[240px] flex-wrap flex flex-row gap-4 mt-[40px] mb-[42px]">
            {/* Search Input */}
            <div className="flex w-[296px] h-[48px] justify-center items-center">
              <input
                type="text"
                placeholder="Išči po imenu / priimku"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-white border-[#7C7C7C] placeholder-[#7C7C7C] text-[16px] font-[400] leading-[24px] border rounded-lg shadow-sm flex flex-1 items-center justify-between h-full px-4 text-[#7C7C7C] focus:outline-none"
              />
            </div>

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

            {/* Search Button */}
            <div
              onClick={handleSearch}
              className="w-[296px] h-[48px] text-[16px] text-[#F6F6F6] rounded-lg leading-6 bg-[#414141] font-[400] flex justify-center items-center cursor-pointer"
            >
              Prikaži
            </div>
          </div>
        </div>

        {/* Quick Selection remains the same... */}
        {/* ... rest of your existing quick selection code ... */}
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
