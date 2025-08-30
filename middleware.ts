// middleware.ts - Updated version
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = ["/", "/registracija", "/auth/signin", "/auth/error"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathParts = pathname.split("/").filter(Boolean);
  const isRoleBasedRoute =
    pathname.startsWith("/c/") ||
    pathname.startsWith("/p/") ||
    pathname.startsWith("/u/");

  // Allow role-based routes if authenticated
  if (isRoleBasedRoute && token) {
    const slugFromPath = pathParts[1];
    const userSlug = token.me?.slugKey as string;
    const userRole = token.me?.role as string;

    if (userSlug === slugFromPath || userRole === "SUPERADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }
  }

  // Handle authenticated user redirects from registration page
  if (pathname === "/registracija" && token) {
    const role = token.me?.role as string;
    const slugKey = token.me?.slugKey as string;

    switch (role) {
      case "Florist":
        return NextResponse.redirect(
          new URL(`/c/${slugKey}/menu`, request.url)
        );
      case "Funeral":
        return NextResponse.redirect(
          new URL(`/p/${slugKey}/menu`, request.url)
        );
      case "User":
        return NextResponse.redirect(
          new URL(`/u/${slugKey}/moj-racun`, request.url)
        );
      case "SUPERADMIN":
        return NextResponse.redirect(new URL("/admin/obituaries", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/registracija", request.url));
  }

  if (token.me?.isBlocked) {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }

  // Admin route protection
  if (pathname.startsWith("/admin") && token.me?.role !== "SUPERADMIN") {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|js|css|ico)$).*)", // Exclude APIs, static, and images
    "/registracija", // Explicitly include the pages you want
    "/moj-racun",
    "/moji-prispevki",
    "/obletnice",
    "/pregled",
    "/pregled2",
    "/user-accounts-dashboard",
    "/potrditev-objave",
    "/admin/:path*", // Admin routes
    "/c/:slug/:page*", // Parametric routes
    "/p/:slug/:page*",
    "/u/:slug/:page*",
  ],
};
