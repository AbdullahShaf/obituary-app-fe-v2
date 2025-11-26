import React from "react";
import Select from "react-select";
import regionsAndCities from "@/utils/regionAndCities";

const DropdownWithCustomDesign = ({
  placeholder,
  onSelectRegion,
  onSelectCity,
  selectedRegion,
  selectedCity,
  isDisabled = false,
  defaultStyles = {
    backgroundColor: "#f1fffe",
    border: "1px solid #d4d4d4"
  },
  variant = "default",
}) => {
  const flattenedOptions = Object.keys(regionsAndCities)
    .flatMap((region) =>
      regionsAndCities[region].map((city) => ({
        label: city,
        value: city,
        region,
      }))
    )
    .sort((a, b) => a.label.localeCompare(b.label, "sl"));

  const handleChange = (selected) => {
    if (selected) {
      const selectedRegion = selected.region;
      const selectedCity = selected.value;

      if (onSelectRegion) {
        onSelectRegion(selectedRegion);
      }
      if (onSelectCity) {
        onSelectCity(selectedCity);
      }
    } else {
      if (onSelectRegion) {
        onSelectRegion(null);
      }
      if (onSelectCity) {
        onSelectCity(null);
      }
    }
  };

  const isGhostVariant = variant === "ghost";

  return (
    <div className="w-full mx-auto">
      <Select
        options={flattenedOptions} // Use flattened options without grouping
        onChange={handleChange}
        value={
          selectedCity
            ? flattenedOptions.find((option) => option.value === selectedCity)
            : null
        }
        placeholder={placeholder || ""}
        isSearchable
        filterOption={(option, inputValue) =>
          option.label.toLowerCase().startsWith(inputValue.toLowerCase())
        }
        isDisabled={isDisabled}
        styles={{
          control: (base) => ({
            ...base,
            ...(isGhostVariant
              ? {
                  backgroundColor: "transparent",
                  border: "none",
                }
              : defaultStyles), // Light gray border
            boxShadow: "none", // Remove default shadow
            borderRadius: "4px",
            "&:hover": { borderColor: "#105ccf" }, // Change border on hover
            minHeight: isGhostVariant ? "48px" : "36px", // Match the dropdown height in the image
            paddingLeft: isGhostVariant ? "0px" : base.paddingLeft,
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "#7d7d7d", // Arrow color
            "&:hover": { color: "#808080" }, // Arrow hover color
          }),
          indicatorSeparator: () => ({
            display: "none", // Remove the separator line
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "4px", // Rounded menu
            marginTop: "2px", // Minimal gap
            zIndex: 10,
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? "#e8f5f4" : "#fff", // Highlight on hover
            color: "#333", // Text color
            cursor: "pointer",
          }),
          placeholder: (base) => ({
            ...base,
            color: isGhostVariant ? "#ACAAAA" : "#6D778E",
            fontSize: isGhostVariant ? "16px" : base.fontSize,
          }),
          singleValue: (base) => ({
            ...base,
            color: isGhostVariant ? "#6D778E" : "#105CCF",
            fontSize: isGhostVariant ? "16px" : "18px",
          }),
          input: (base) => ({
            ...base,
            color: isGhostVariant ? "#6D778E" : base.color,
          }),
        }}
      />
    </div>
  );
};

export default DropdownWithCustomDesign;
