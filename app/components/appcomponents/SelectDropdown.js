// components/Dropdown.js
import { useId } from "react";
import Select from "react-select";

export const SelectDropdown = ({
  heading,
  label,
  isFromNotification,
  isFromFlower,
  isFrom,
  isFromFlowerGreenBgTablet,
  isFromObituary,
  data = [],
  selectedValue = "",
  onSelect,
  isDisabled = false,
  id,
}) => {
  const options = data.map((item) => ({
    label: item.place,
    value: item.place,
  }));


  const getContainerClass = () => {
    if (isFrom === "florist" || isFrom === "companyregistration") return "w-full h-full";
    if (isFrom === "pogrebi") return "w-full h-12";
    if (isFromObituary === "obituaryform") return "w-full h-full mobile:h-[20px]";
    if (isFromNotification) {
      return label === "Mesto"
        ? "w-[306px] mobile:w-[240px] h-[48.48px]"
        : "w-[306px] h-[48.48px]";
    }
    if (isFromFlower) return "w-[476px] h-[48px] tablet:w-[320px] mobile:w-[302px]";
    if (isFromFlowerGreenBgTablet)
      return "w-[292px] desktop:w-[476px] h-[48px] tablet:w-[476px]";
    return "w-[292px] desktop:w-[227px] h-[48px]";
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor:
        isFromObituary === "obituaryform" ? "#F1FFFE" : "#FFFFFF",
      borderColor: "#7C7C7C",
      borderWidth: 1,
      borderRadius: 6,
      paddingLeft: isFromFlower || isFromFlowerGreenBgTablet ? "8px" : "4px",
      paddingRight: "4px",
      minHeight: "48px",
      boxShadow: state.isFocused ? "0 0 0 2px #105CCF" : "none",
      "&:hover": {
        borderColor: "#105CCF",
      },
      opacity: isDisabled ? 0.6 : 1,
      cursor: isDisabled ? "not-allowed" : "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#105CCF",
      fontSize: "18px",
      lineHeight: "24px",
      fontWeight: 400,
      fontVariationSettings: "'opsz' 16",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#808080",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 400,
      fontVariationSettings: "'opsz' 16",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#f1fffe",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#6D778E" : "transparent",
      color: state.isFocused ? "#ffffff" : "#7d7d7d",
      paddingLeft: "1rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      borderRadius: "0.375rem",
      cursor: "pointer",
    }),
  };

  const handleChange = (selectedOption) => {
    onSelect({ place: selectedOption.value });
  };
  const customFilter = (candidate, input) => {
    const lowerCaseInput = input.toLowerCase();
    const lowerCaseLabel = candidate.label.toLowerCase();

    return lowerCaseLabel.startsWith(lowerCaseInput);
  };
  
  const uniqueId = useId();
  const baseId = id || uniqueId;
  const sanitizedLabel = label?.toLowerCase().replace(/\s+/g, '-') || 'dropdown';
  const inputId = `select-${sanitizedLabel}-${baseId}`;
  
  return (
    <div className={`dropdown ${getContainerClass()}`}>
      {heading && (
      <h3 className="sr-only">
        {heading}
      </h3>
    )}
      <label htmlFor={inputId} className="sr-only">
        {label || heading || "Izbira"}
      </label>
      <Select
        inputId={inputId}
        aria-label={label || heading || "Izbira"}
        options={options}
        isDisabled={isDisabled}
        value={options.find((opt) => opt.value === selectedValue) || null}
        onChange={handleChange}
        placeholder={label}
        styles={customStyles}
        isSearchable={true}
        components={{
          IndicatorSeparator: () => null,
        }}
        filterOption={customFilter}
      />
    </div>
  );
};
