"use client";
import Header from "./Header";
import ObituaryHeader from "./ObituaryHeader";
import CommonHeader from "./CommonHeader";

import TopBar from "./TopBar";
import Header7 from "./Header7";

import Footer from "./Footer";
import CompanyFooter from "./CompanyFooter";

import DrawerDialoge from "./DrawerDialoge";
import { useState, useEffect } from "react";
import PopUp from "@/app/components/appcomponents/popup";
import MessagePopUp from "@/app/components/appcomponents/MessagePopup";
import {
  LocalQuickReview,
  LocalQuickReviewModal,
} from "@/app/components/appcomponents/LocalQuickReview";
import MemoryHeader from "./MemoryHeader";
import { useAuth } from "@/hooks/useAuth";
import SideMenu from "../ui/sideMenu";
import CommonFooter from "./CommonFooter";
const Layout = ({
  children,
  from,
  forFooter,
  isMegaMenuVisible,
  megaMenu,
  showHamburger = true,
  data = {},
  onChangeMemory = () => {},
  currentPage = "",
  handleCloseModal = () => {},
  isModalLayout = false,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [isLocalQuickModalVisible, setIsLocalQuickModalVisible] =
    useState(false);
  const [isLocalQuickReviewModalVisible, setIsLocalQuickReviewModalVisible] =
    useState(false); // Fixed prop name

  const OnDrawerButtonClicked = (item) => {
    console.log(item.name);
  };

  return (
    <div>
      {/* Headers */}
      {from == "1" || from == "2" ? (
        <div className="fixed top-0 z-50 flex w-full justify-center">
          <TopBar
            setIsModalVisible={setIsModalVisible}
            setIsMessageModalVisible={setIsMessageModalVisible}
            setIsLocalQuickModalVisible={setIsLocalQuickModalVisible}
            setIsLocalQuickReviewModalVisible={
              setIsLocalQuickReviewModalVisible
            } // Fixed prop name
          />
        </div>
      ) : null}

      {from == "1" ? (
        <Header
          isMegaMenuVisible={isMegaMenuVisible}
          onMenuCLick={megaMenu}
          from={from}
        />
      ) : from == "5" ? (
        <Header7
          handleCloseModal={isModalLayout ? handleCloseModal : undefined}
          data={data}
          from={5}
          showHamburger={showHamburger}
        />
      ) : from == "7" ? (
        <Header7
          handleCloseModal={isModalLayout ? handleCloseModal : undefined}
          data={data}
          from={7}
          showHamburger={showHamburger}
        />
      ) : from == "3" ? (
        <MemoryHeader onChange={onChangeMemory} />
      ) : from == "18" ? (
        // CommonHeader now handles its own modals
        <CommonHeader currentPage={currentPage} />
      ) : (
        <>
          {from == "2" ? <div className="flex h-[45px]" /> : null}
          <ObituaryHeader from={from} />
        </>
      )}

      {/* Modals for non-CommonHeader pages */}
      {from !== "18" && (
        <>
          {isModalVisible && (
            <div className="flex">
              <PopUp setIsModalVisible={setIsModalVisible} />
            </div>
          )}

          {isMessageModalVisible && (
            <div className="flex">
              <MessagePopUp
                setIsMessageModalVisible={setIsMessageModalVisible}
              />
            </div>
          )}

          {isLocalQuickModalVisible && (
            <div className="flex">
              <LocalQuickReview
                setIsLocalQuickModalVisible={setIsLocalQuickModalVisible}
              />
            </div>
          )}

          {isLocalQuickReviewModalVisible &&
            isAuthenticated && ( // Fixed prop name
              <div className="flex">
                <LocalQuickReviewModal
                  setIsLocalQuickReviewModalVisible={
                    setIsLocalQuickReviewModalVisible
                  }
                />
              </div>
            )}
        </>
      )}

      {from == "23" ? (
        <>
          <CommonHeader currentPage={currentPage} />
          <div className="flex relative mobile:h-[196px] tablet:h-[220px] desktop:h-[300px] mt-[65px] desktop:mt-[91px] w-full mx-auto">
            <img
              className="object-cover h-full w-full"
              src="/payment-hero.jpg"
            />
            <div className="absolute text-[#1E2125] border border-[#ffffff] mobile:text-[28px] text-[40px] top-[35%] mx-auto left-0 right-0 flex items-center justify-center mobile:w-[114px] mobile:h-[64px] w-[137px] h-[79px] bg-gradient-to-r from-[#ffffff] to-[#ffffff]/[30%] rounded-[8px]">
              Cenik
            </div>
          </div>
        </>
      ) : null}

      <main className="flex bg-[#F5F7F9]">{children}</main>

      {/* Footer */}
      {forFooter == "company" ? (
        <CompanyFooter data={data} />
      ) : forFooter == "memorypage" ? null : forFooter === "cenikpage" ? (
        <CommonFooter currentPage="/cenik" />
      ) : (
        <Footer />
      )}

      <DrawerDialoge
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        OnDrawerButtonClicked={OnDrawerButtonClicked}
      />
    </div>
  );
};

export default Layout;
