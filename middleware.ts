// middleware.ts - Updated version
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = ["/", "/registracija", "/auth/signin", "/auth/error", "/m/:slug*"];


async function checkGeolocation(ip: string): Promise<boolean> {
  try {
    // Get API base URL based on environment
    const apiBaseUrl = process.env.NEXT_PUBLIC_APP_ENV === 'staging' 
      ? 'https://staging.osmrtnica.com/be/api'
      : process.env.NEXT_PUBLIC_APP_ENV === 'production' 
      ? 'https://osmrtnica.com/be/api' 
      : 'http://localhost:4000/api';
    
    const response = await fetch(`${apiBaseUrl}/geo-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip }),
      // Set a timeout to avoid delays
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });

    if (!response.ok) {
      // If API fails, allow access to avoid blocking legitimate users
      console.warn('Geolocation API failed, allowing access');
      return true;
    }

    const data = await response.json();
    const allowed = data.allowed === true;
    
    return allowed;
  } catch (error) {
    // If any error occurs (timeout, network issues), allow access
    console.warn('Geolocation check failed, allowing access:', error);
    return true;
  }
}

function getClientIP(request: NextRequest): string {
  // Try to get the real IP from various headers
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const xRealIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (xForwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return xForwardedFor.split(',')[0].trim();
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  if (xRealIP) {
    return xRealIP;
  }
  
  // Fallback to request IP
  return request.ip || '127.0.0.1';
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip geolocation check for access-denied page to avoid infinite redirects
  if (pathname === "/access-denied") {
    return NextResponse.next();
  }

  // Perform geolocation check first (before any other checks)
  const clientIP = getClientIP(request);
  const isAllowedCountry = await checkGeolocation(clientIP);
  
  if (!isAllowedCountry) {
    return NextResponse.redirect(new URL("/access-denied?reason=geo", request.url));
  }

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
    // Include all routes except static files, APIs, and _next
    // "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|js|css|ico)$).*)",
    "/",
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
