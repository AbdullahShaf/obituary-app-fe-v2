// hooks/useAuth.ts - Updated version
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IUserComplete } from "@/types/auth";

export function useAuth() {
  const { data: session, status } = useSession();
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

      if (result?.error) {
        toast.error("Invalid credentials");
        return { success: false, error: result.error };
      }

      if (result?.ok) {
        toast.success("Login successful!");
        
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
        
        return { success: true, user: result};
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      return { success: false, error: "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const hasPermission = (permission: keyof IUserComplete['permissions']): boolean => {
    return user?.permissions?.[permission] || false;
  };

  const isRole = (role: string): boolean => {
    return user?.role === role;
  };

  return {
    user,
    backendToken,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    status,
    login,
    logout,
    hasPermission,
    isRole,
    isAdmin: user?.role === "SUPERADMIN",
    isBlocked: user?.isBlocked || false,
  };
}