"use client";
import Head from "next/head";
import Layout from "../components/appcomponents/Layout";
import OrbetoryFormComp from "../components/appcomponents/OrbetoryFormComp";
import Newobituary from "../components/appcomponents/Newobituary";
import React, { useState, useRef } from "react";
import AddFuneralModal from "../components/appcomponents/AddFuneralModal";
import keeperService from "@/services/keeper-service";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

const FloristsGifts = () => {
  const [showBelowForms, setShowBelowForms] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState(null);
  const [relation, setRelation] = useState(null);
  const [KeeperExpiry, setKeeperExpiry] = useState(null);
  const [selectedObituary, setSelectedObituary] = useState(null);
  const [email, setEmail] = useState("");

  const { user, isLoading, isAuthenticated } = useAuth();

  const funcShowForms = (shouldShow) => {
    setShowBelowForms(shouldShow);
  };
  const focusRef = useRef(null);

  const focusInput = () => {
    focusRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const handleModalVisibility = () => {
    setIsModalVisible(true);
  };
  const handleAssignKeeper = async () => {
    // Check permission before allowing submission
    const currentUser = isAuthenticated ? user : {};
    // Temporarily commented
    if (!currentUser.assignKeeperPermission) {
      toast.error("Nimaš pooblastila dodeljevati status Skrbnika");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("obituaryId", String(selectedObituary));
      formData.append("time", String(KeeperExpiry));
      formData.append("email", email);
      if (relation && name) {
        formData.append("relation", relation);
        formData.append("name", name);
      }

      if (selectedFile) {
        formData.append("deathReport", selectedFile);
      }
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log(formData);

      const response = await keeperService.assignKeeper(formData);
      toast.success("Registracija Skrbnika je uspela");
      console.log(response);
    } catch (error) {
      console.log('>>>>>>>>> error', error);
      // toast.error(error?.data?.error ?? "Prišlo je do napake.");
    }
  };

  if (isLoading) {
    return (
      <Layout megaMenu={""} isMegaMenuVisible={false} from={"18"} currentPage="" forFooter={'memorypage'}>
        <div className="flex flex-1 flex-col bg-[#F5F7F9] items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A85C2] mx-auto mb-4"></div>
            <p className="text-[#6D778E] text-lg">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }



  return (
    <>
      {/* Allow crawlability but no indexing. */}
      <Head>
        <title>Darila | Osmrtnica</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      
      <Layout megaMenu={""} isMegaMenuVisible={false} from={"18"}  currentPage="" forFooter={'memorypage'}>
      <div className="flex flex-1 flex-col bg-[#F5F7F9]">

   
      
      <OrbetoryFormComp
        setModalVisible={handleModalVisibility}
        showForms={funcShowForms}
        focusInput={focusInput}
        setParentEmail={(email) => setEmail(email)}
        setObituaryId={(id) => setSelectedObituary(id)}
        setExpiry={(expiry) => setKeeperExpiry(expiry)}
      />
      {showBelowForms && (
        <Newobituary
          setFile={(file) => setSelectedFile(file)}
          setName={(name) => setName(name)}
          setRelation={(relation) => setRelation(relation)}
          onSubmit={handleAssignKeeper}
          focusRef={focusRef}
        />
      )}
      {isModalVisible && (
        <AddFuneralModal setModalVisible={setIsModalVisible} />
      )}
    </div>
    </Layout>
    </>
  );
};

export default FloristsGifts;
