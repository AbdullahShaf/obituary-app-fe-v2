// hooks/useAuth.ts - Updated version
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IUserComplete } from "@/types/auth";
import userService from "@/services/user-service";
import axiosInstance, { axiosNoAuth } from "@/services/axios";

export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // Extract user from session
  const user = session?.user.me as IUserComplete | undefined;
  const backendToken = session?.user?.accessToken;

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const result = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });
      console.log("login", result);

      if (result?.error) {
        toast.error("Napačni vnos");
        return { success: false, error: result.error };
      }

      if (result?.ok) {
        toast.success("Prijava je uspela");

        // Wait for session to update, then redirect
        setTimeout(() => {
          if (user?.role === "SUPERADMIN") {
            router.push("/admin/obituaries");
          } else if (user?.role === "Florist") {
            router.push(`/c/${user.slugKey}/menu`);
          } else if (user?.role === "Funeral") {
            router.push(`/p/${user.slugKey}/menu`);
          } else if (user?.role === "User") {
            router.push(`/u/${user.slugKey}/moj-racun`);
          }
        }, 100);

        return { success: true, user: result };
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Prijava ni uspela");
      return { success: false, error: "Login failed" };
    }
  };


  const ghostLogin = async (credentials: { userId: string; adminId: string }) => {
    try {
      const result = await signIn("ghost-login", {
        ...credentials,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Napačni vnos");
        return { success: false, error: result.error };
      }

      if (result?.ok) {
        toast.success("Zahteva uspešna!");
        const newSession = await getSession();
        const user1 = newSession?.user.me as IUserComplete | undefined;

        // Wait for session to update, then redirect
        setTimeout(() => {
          if (user1?.role === "SUPERADMIN") {
            router.push("/admin/approval-requests");
          } else if (user1?.role === "Florist") {
            router.push(`/c/${user1.slugKey}/spletna-stran`);
          } else if (user1?.role === "Funeral") {
            router.push(`/p/${user1.slugKey}/spletna-stran`);
          }
        }, 2000);

        return { success: true, user: result };
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Prijava ni uspela");
      return { success: false, error: "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      toast.success("Odjava je uspela");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const hasPermission = (
    permission: keyof IUserComplete["permissions"]
  ): boolean => {
    return user?.permissions?.[permission] || false;
  };

  const isRole = (role: string): boolean => {
    return user?.role === role;
  };

  // Function to refresh user data in session
  const refreshUserSession = async () => {
    try {
      const freshUserData = await userService.getMyUser();
      if (freshUserData && !freshUserData.error) {
        // Update the session with fresh user data
        await update({
          ...session,
          user: {
            ...session?.user,
            me: freshUserData,
          },
        });
        return { success: true, user: freshUserData };
      }
      return { success: false, error: "Failed to fetch user data" };
    } catch (error) {
      console.error("Error refreshing user session:", error);
      return { success: false, error: "Network error" };
    }
  };

  // Enhanced user update function that automatically refreshes session
  const updateUserAndRefreshSession = async (userData: {
    name?: string;
    email?: string;
    company?: string;
    region?: string;
    city?: string;
    secondaryCity?: string;
  }) => {
    try {
      const updateResponse = await userService.updateMyUser(userData);
      if (updateResponse && !updateResponse.error) {
        // Refresh session with updated user data
        const refreshResult = await refreshUserSession();
        if (refreshResult.success) {
          return { success: true, user: refreshResult.user };
        }
      }
      return {
        success: false,
        error: updateResponse?.error || "Update failed",
      };
    } catch (error) {
      console.error("Error updating user and refreshing session:", error);
      return { success: false, error: "Network error" };
    }
  };

  // Enhanced slug change function that automatically refreshes session
  const changeSlugAndRefreshSession = async (newSlug: string) => {
    try {
      const slugResponse = await userService.changeSlug(newSlug);
      if (slugResponse && !slugResponse.error) {
        // Refresh session with updated user data
        const refreshResult = await refreshUserSession();
        if (refreshResult.success) {
          return { success: true, user: refreshResult.user };
        }
      }
      return {
        success: false,
        error: slugResponse?.error || "Slug change failed",
      };
    } catch (error) {
      console.error("Error changing slug and refreshing session:", error);
      return { success: false, error: "Network error" };
    }
  };

  return {
    user,
    backendToken,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    status,
    login,
    logout,
    ghostLogin,
    hasPermission,
    isRole,
    isAdmin: user?.role === "SUPERADMIN",
    isBlocked: user?.isBlocked || false,
    refreshUserSession,
    updateUserAndRefreshSession,
    changeSlugAndRefreshSession,
  };
}
