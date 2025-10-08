"use client";
import React, { useEffect, useRef, useState } from "react";
import obituaryService from "@/services/obituary-service";
import UserAccountHeaderNew from "../../../components/appcomponents/UserAccountHeaderNew";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const UserAccountDashboard = () => {
  const [isMobilSideBarOpen, setIsMobilSideBarOpen] = useState(true);
  const [isKeeper, setIsKeeper] = useState(false);
  const router = useRouter();
  const gotoTopRef = useRef(null);
  const { user, isLoading, isAuthenticated, status } = useAuth();

  console.log("user", user);
  console.log("Status", status);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // if (window.innerWidth > 768) {
      if (window.innerWidth > 1200) {
        if (!isLoading && isAuthenticated) {
          const parsedUser = user;
          console.log("parsedUser", parsedUser);
          console.log(isAuthenticated);
          router.replace(`/u/${parsedUser.slugKey}/moj-racun`);
        }
      } else {
        fetchPendingPosts();
        getKeeperMemory();
      }
    }
  }, [isLoading]);

  const [pendingPosts, setPendingPosts] = useState([]);

  const fetchPendingPosts = async () => {
    try {
      const response = await obituaryService.fetchPendingPosts();

      if (response.error) {
        return;
      }
      console.log(response);
      setPendingPosts(response.pending);

      setIsKeeper(response.isKeeper);
    } catch (err) {
      console.error("Error Fetching Pending Posts:", err);
    }
  };

  const [memories, setMemories] = useState([]);

  const getKeeperMemory = async () => {
    try {
      const response = await obituaryService.getKeeperMemories();

      setMemories(response.obituaries);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoToTop = () => {
    gotoTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <UserAccountHeaderNew
      setIsMobilSideBarOpen={setIsMobilSideBarOpen}
      isMobilSideBarOpen={isMobilSideBarOpen}
      pendingConfirmations={pendingPosts.length}
      isKeeper={isKeeper}
      memories={memories}
    />
  );
};

export default UserAccountDashboard;
