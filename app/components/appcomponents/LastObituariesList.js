import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ObituaryCard from "@/app/components/appcomponents/ObituaryCard";
import imgPrevious from "@/public/previous_img.png";
import imgNext from "@/public/next_img.png";
import { toast } from "react-hot-toast";
import obituaryService from "@/services/obituary-service";
import { useAuth } from "@/hooks/useAuth";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const LastObituariesList = ({ city = "", userId }) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [search, setSearch] = useState("");

  const [obituaries, setObituaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("Za ogled strani moraš biti prijavljen");
      router.push("/registracija");
    }
  }, [isLoading]);
  const fetchObituary = async () => {
    try {
      let payload = { userId: userId, city: city };
      if (search) payload.search = search;
      const response = await obituaryService.getCompanyPageObituary(payload);

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
  useEffect(() => {


    if (user) fetchObituary();
  }, [user]);
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
        pb-[50px] tablet:pb-[62px] desktop:pb-[0px]
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
      <div
        className="flex flex-row
             desktop:mt-[40px] tablet:mt-[30px] mobile:mt-[15px]
             desktop:w-[300px] tablet:w-[300px] mobile:w-[296]
               items-center justify-center "
      >
        <div className="flex w-full items-center tablet:flex-row desktop:flex-row desktop:space-x-[16px] tablet:justify-between mobile:h-[40px] tablet:h-[48px] desktop:h-[48px]">
          <div className="flex h-[48px]">
            <input
              type="text"
              value={search}
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div
          onClick={() => fetchObituary()}
          className="flex justify-center  w-12 items-center h-12 desktop:aspect-square rounded-lg bg-[#414141]"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-white desktop:block" />
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
          {/* Previous Button */}
          <div
            className="w-[48px] h-[48px] rounded-lg text-black flex justify-center items-center shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF] hover:border-black hover:border-2 cursor-pointer"
            onClick={() => goToPage(currentPage > 1 ? currentPage - 1 : 1)}
          >
            <Image
              src={imgPrevious}
              alt="imgPrevious"
              className="w-[5.66px] h-[8.49px]"
            />
          </div>

          {/* Page Numbers (Max 4 shown) */}
          {(() => {
            let startPage = Math.max(1, currentPage - 1);
            let endPage = startPage + 3;

            if (endPage > totalPages) {
              endPage = totalPages;
              startPage = Math.max(1, endPage - 3);
            }

            const visiblePages = [];
            for (let i = startPage; i <= endPage; i++) {
              visiblePages.push(i);
            }

            return visiblePages.map((pageNumber) => (
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

          {/* Next Button */}
          <div
            className="w-[48px] h-[48px] rounded-lg text-black flex justify-center items-center shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF] hover:border-black hover:border-2 cursor-pointer transition-colors duration-200"
            onClick={() => goToPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
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

export default LastObituariesList;
