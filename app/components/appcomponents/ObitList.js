import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ObituaryCard from "@/app/components/appcomponents/ObituaryCard";
import imgPrevious from "@/public/previous_img.png";
import imgNext from "@/public/next_img.png";
import { toast } from "react-hot-toast";
import obituaryService from "@/services/obituary-service";
import { useAuth} from "@/hooks/useAuth";

const ObituariesList = ({userId}) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [obituaries, setObituaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchObituary = async () => {
      try {
        const response = await obituaryService.getObituary({ userId: userId });

        if (response.error) {
          toast.error(
            response.error || "Something went wrong. Please try again!"
          );
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

    fetchObituary();
  }, [userId]);
  const totalPages = Math.ceil(obituaries.length / itemsPerPage);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        // Desktop
        setItemsPerPage(6); // 6+6
      } else if (width >= 768) {
        // Tablet
        setItemsPerPage(4); // 5+5
      } else {
        // Mobile
        setItemsPerPage(4); // Single column
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
  return (
    <div
      className="flex flex-col w-full items-center  
         pt-[34.65px] tablet:pt-[52px] desktop:pt-[61.58px]
        pb-[50px] tablet:pb-[62px] desktop:pb-[107.42px]
        "
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-[33px] tablet:h-[47px] desktop:h-[47px] ">
          <div className="font-variation-customOpt28 tablet:font-variation-customOpt40 desktop:font-variation-customOpt40 desktop:text-[40px] tablet:text-[40px] mobile:text-[24px]  text-[#1E2125] leading-[46.88px] ">
            Zadnje osmrtnice
          </div>
        </div>
        <div className="flex items-center mt-4 h-6 ">
          <p className="flex text-[16px] text-[#414141] font-normal">
            Pregled zadnjih osmrtnic v našem kraju{" "}
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-[29.35px] items-center tablet:mt-12 desktop:mt-12">
        <div className="mx-auto mobile:hidden tablet:hidden desktop:grid desktop:grid-cols-2 grid-cols-1 mobile:gap-[22px] tablet:gap-6 desktop:gap-6 justify-between">
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
        <div className="mx-auto hidden tablet:grid desktop:hidden grid-cols-1 mobile:gap-[22px] tablet:gap-6 desktop:gap-6 justify-between">
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

        <div className="mx-auto grid tablet:hidden desktop:hidden  grid-cols-1 mobile:gap-[22px] tablet:gap-6 desktop:gap-6 justify-between">
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
            className="w-[48px] h-[48px] rounded-lg text-black flex justify-center items-center shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF] hover:border-black hover:border-2"
            onClick={() => goToPage(currentPage - 1)}
          >
            <Image
              src={imgPrevious}
              alt="imgPrevious"
              className=" w-[5.66px] h-[8.49px]"
            />
          </div>
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <div
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`hover:border-black hover:border-2 w-[48px] h-[48px] rounded-lg text-black flex justify-center items-center cursor-pointer shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF] ${
                  currentPage === pageNumber ? "bg-gray-300 font-bold" : ""
                }`}
              >
                {pageNumber}
              </div>
            );
          })}
          <div
            className="w-[48px] h-[48px] rounded-lg text-black flex justify-center items-center shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF] hover:border-black hover:border-2 cursor-pointer transition-colors duration-200"
            onClick={() => {
              goToPage(currentPage + 1);
            }}
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

export default ObituariesList;
