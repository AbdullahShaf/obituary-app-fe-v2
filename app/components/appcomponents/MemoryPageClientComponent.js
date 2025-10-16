"use client";
import { Suspense, useEffect, useRef } from "react";
import { useState } from "react";
import Layout from "../../components/appcomponents/Layout";
import ObituaryPublished from "../../components/appcomponents/ObituaryPublished";
import FlowerShops from "../../components/appcomponents/FlowerShops";
import ShippingNotifications from "../../components/appcomponents/ShippingNotifications";
import MemorialPageTopComp from "../../components/appcomponents/MemorialPageTopComp";
import ModalLibrary from "../../components/appcomponents/ModalLibrary";
import ImageFullView from "../../components/appcomponents/ImageFullView";
import imgUp from "@/public/ico_up.png";
import Image from "next/image";
import obituaryService from "@/services/obituary-service";
import { toast } from "react-hot-toast";
import AnnouncementBlock from "../../components/appcomponents/AnnouncementBlock";
import { FlowerShops2 } from "../../components/appcomponents/FlowerShops";
import { useRouter, useSearchParams } from "next/navigation";
import { getTemplateCardImages } from "@/utils/commonUtils";
import { useAuth } from "@/hooks/useAuth";
import APP_BASE_URL from "@/config/appConfig";

const MemoryPageContent = ({ params, obituaryDataFromServer }) => {
  const { slugKey } = params;
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user, isLoading } = useAuth();

  const [isShowModal, setIsShowModal] = useState(false);
  const [select_id, setSelect_Id] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showShops, setShowShops] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [imageId, setImageId] = useState("0");
  const [obituary, setObituary] = useState({});
  const city = searchParams.get("city");
  const region = searchParams.get("region");

  useEffect(() => {
    fetchMemory();
  }, [user, isLoading]);

  const fetchMemory = async () => {
    try {
      const response = await obituaryService.getMemory({ slugKey: slugKey });

      if (response.error) {
        // toast.error(
        //   response.error || "Prišlo je do napake."
        // );
        return;
      }

      setObituary(response.obituary);

      if (response?.obituary) {
        const visitRespone = await obituaryService.updateObituaryVisits({
          obituaryId: response?.obituary?.id,
          userId: currentUser?.id || null,
        });

        if (visitRespone.error) {
          // toast.error(
          //   visitRespone.error || "Prišlo je do napake."
          // );
          return;
        }

        // setObituary(visitRespone);
        if (visitRespone.Condolences.length === 0) {
          const persons = [
            {
              name: "osmrtnica.com",
              createdTimestamp: new Date(),
              relation: "",
              message: "Počivaj v miru",
            },
          ];
          updateObituary({ ["Condolences"]: persons });
        }
      }
    } catch (err) {
      console.error("Error fetching obituary:", err);
      // toast.error(err.message || "Failed to fetch obituary.");
    }
  };

  const updateObituary = (updatedData) => {
    setObituary((prevObituary) => ({
      ...prevObituary,
      ...updatedData,
    }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleMemoryChange = async (type) => {
    try {
      // Use city and region from searchParams if available, fallback to obituary
      const queryParams = {
        city: city || obituary.city,
        region: region || obituary.region,
        date: obituary.createdTimestamp,
        type: type,
      };

      const response = await obituaryService.getMemoryId(queryParams);

      const data = response;

      const urlParams = [];
      if (queryParams.city)
        urlParams.push(`city=${encodeURIComponent(queryParams.city)}`);
      if (queryParams.region)
        urlParams.push(`region=${encodeURIComponent(queryParams.region)}`);
      const queryString = urlParams.length ? `?${urlParams.join("&")}` : "";

      // Temporarily commented
      router.push(`/m/${data.slugKey}${queryString}`);
    } catch (error) {
      console.error("Error fetching memory:", error);
      if (error?.response?.status === 404) {
        // toast.error(`No ${type} memory exists`);
      } else {
        // toast.error("Prišlo je do napake.");
      }
    }
  };

  // ⚡ Convert and Upload image
  const handleFacebookShare = async () => {
    try {
      const pageUrl = `${APP_BASE_URL}/m/${slugKey}`;
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        pageUrl
      )}`;
      const width = 600;
      const height = 500;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      window.open(
        shareUrl,
        "facebook-share-dialog",
        `width=${width},height=${height},top=${top},left=${left}`
      );
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <>
      <Layout
        from={"3"}
        onChangeMemory={handleMemoryChange}
        forFooter={"memorypage"}
      >
        <div className="flex flex-1 flex-col mx-auto bg-[#ecf0f3] pt-[20px] max-w-[100vw] overflow-x-hidden">
          <ModalLibrary
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            select_id={select_id}
            set_Id={setSelect_Id}
            selectedImage={selectedImage}
            data={obituary}
            updateObituary={updateObituary}
          />
          <ImageFullView
            showImageView={showImageView}
            imageId={imageId}
            setShowImageView={setShowImageView}
            data={obituary?.Photos}
          />
          <MemorialPageTopComp
            set_Id={setSelect_Id}
            setModal={setIsShowModal}
            data={obituary}
            updateObituary={updateObituary}
            handleFacebookShare={handleFacebookShare}
          />

          {obituary?.Keepers?.length === 0 && <AnnouncementBlock />}

          <ShippingNotifications
            set_Id={setSelect_Id}
            setModal={setIsShowModal}
            images={getTemplateCardImages(obituary?.cardImages)}
            blurredImages={Boolean(obituary?.cardImages?.length)}
          />

          <FlowerShops
            setIsOpen={(value) => {
              setShowShops(value);
            }}
            data={obituary}
            showShop={showShops}
          />

          <FlowerShops2
            setIsOpen={(value) => {
              setShowShops(value);
            }}
            showShop={showShops}
          />

          <ObituaryPublished
            set_Id={setSelect_Id}
            setModal={setIsShowModal}
            data={obituary}
          />
          <a
            className="z-50 bottom-10 right-10 fixed w-[48px] h-[48px] mt-[26px] 
                shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]
                flex justify-center items-center rounded-lg"
            href="#memoryPageTop"
          >
            <Image
              src={imgUp}
              alt="imgPrevious"
              className=" w-[24px] h-[24px]"
            />
          </a>
        </div>
      </Layout>
    </>
  );
};

const MemoryPageClientComponent = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <MemoryPageContent {...props} />
  </Suspense>
);

export default MemoryPageClientComponent;
