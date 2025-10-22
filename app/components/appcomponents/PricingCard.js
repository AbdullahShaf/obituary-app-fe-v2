"use client";

export default function PricingCard(props) {
  return (
    <div
      style={{ fontFamily: "Roboto Flex" }}
      className="relative w-full mobile:h-[75px] h-[90px] rounded-[8px] p-[2px] border-gradient-rounded shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between rounded-[8px] mobile:py-1.5 p-3">
        <div>
          <p className="mobile:text-[14px] flex items-center text-[14px] font-medium text-[#7A7A7A] uppercase">
            <span className={props.mobilelabel && "block mobile:hidden"}>
              {props.label}
            </span>
            {props.mobilelabel && (
              <span className="hidden mobile:block">{props.mobilelabel}</span>
            )}
            {props.sublabel && (
              <>
                <span className="block mobile:hidden lowercase ml-1">
                  {props.sublabel}
                </span>
                <span className="hidden mobile:block lowercase ml-1">
                  {props.mobilesublabel}
                </span>
              </>
            )}
          </p>
          <div className="mobile:text-[20px] flex items-center gap-1 text-[24px] text-[#1E2125] mt-1 font-semibold">
            <p className={props.number && "mt-1"}>{props.title}</p>{" "}
            {props.number && <p className="text-[14px]">{props.number}</p>}
            {props.subtitle && (
              <p className="mobile:text-[14px] text-[16px] ml-1 text-[#6D778E] font-medium">
                {props.subtitle}
              </p>
            )}
          </div>
        </div>
        {props.price && (
          <div className="mobile:text-[32px] absolute right-3 top-4 text-[40px] text-[#1E2125] font-[300]">
            {props.price}
          </div>
        )}
        {props.text && (
          <div className="text-[#530CC6] absolute right-3 top-7 mobile:text-[14px] uppercase text-[16px]">
            {props.text}
          </div>
        )}
        {props.icon && (
          <img
            src={props.icon}
            className="mobile:w-[36px] absolute right-3 top-5 mobile:h-[36px]"
            alt="icon"
          />
        )}
      </div>
    </div>
  );
}
