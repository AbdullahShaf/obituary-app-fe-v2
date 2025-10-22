const CarouselEntry = ({ item }) => {
  const funeralDate = new Date(item.deathDate); // ensure data.funeralDate exists
  const funeralDateFormatted = `${funeralDate
    .getDate()
    .toString()
    .padStart(2, "0")}${(funeralDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${funeralDate.getFullYear().toString().slice(2)}`; // Format: DDMMYY

  return (
    <a
      key={item.id}
      className="flex flex-row items-center border-b border-[#D4D4D4] w-full h-[64px] last:border-b-0 cursor-pointer"
      href={`/m/${item.slugKey}`}
    >
      <h1 className="text-[#0A85C2] font-normal text-sm mobile:text-lg tablet:text-lg desktop:text-xl w-[50px] mobile:w-[60px] tablet:w-[75px] desktop:w-[97px] text-center flex-shrink-0">
        {item.funeralTimestamp
          ? new Date(item.funeralTimestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          : "--:--"}
      </h1>
      <h3 className="text-[#3C3E41] font-semibold text-[12px] mobile:text-[14px] tablet:text-[16px] desktop:text-[18px] flex-1 min-w-0 pl-[8px] mobile:pl-[12px] tablet:pl-[16px] desktop:pl-[22px] truncate">
        {item.name} {item.sirName}
      </h3>
      <h4 className="text-[#3C3E41] font-normal text-[10px] mobile:text-[12px] tablet:text-[14px] desktop:text-[16px] flex-1 min-w-0 pl-[4px] mobile:pl-[6px] tablet:pl-[8px] desktop:pl-[9px] truncate">
        {item.location || item.city || ""}
      </h4>
      {/* <button className="flex-shrink-0 p-1 mobile:p-2"> */}
      <button className="flex-shrink-0 p-1 mobile:hidden">
        <img
          src="/arrow-next.png"
          className="w-3 h-3 mobile:w-4 mobile:h-4 tablet:w-5 tablet:h-5 desktop:w-6 desktop:h-6"
        />
      </button>
    </a>
  );
};
export default CarouselEntry;
