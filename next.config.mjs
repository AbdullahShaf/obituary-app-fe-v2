/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "dev111.osmrtnica.com",
      "staging.osmrtnica.com",
      "osmrtnica.com",
      "obituary-app-bee.b-cdn.net",
    ],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/api/obituaryUploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/api/companyUploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/api/cemetryUploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/api/floristShopUploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/api/floristSlideUploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/api/packageUploads/**",
      },
      // dev111 patterns
      {
        protocol: "https",
        hostname: "dev111.osmrtnica.com",
        pathname: "/be/api/obituaryUploads/**",
      },
      {
        protocol: "https",
        hostname: "dev111.osmrtnica.com",
        pathname: "/be/api/companyUploads/**",
      },
      {
        protocol: "https",
        hostname: "dev111.osmrtnica.com",
        pathname: "/be/api/cemetryUploads/**",
      },
      {
        protocol: "https",
        hostname: "dev111.osmrtnica.com",
        pathname: "/be/api/floristShopUploads/**",
      },
      {
        protocol: "https",
        hostname: "dev111.osmrtnica.com",
        pathname: "/be/api/floristSlideUploads/**",
      },
      {
        protocol: "https",
        hostname: "dev111.osmrtnica.com",
        pathname: "/be/api/packageUploads/**",
      },

      // staging patterns
      {
        protocol: "https",
        hostname: "staging.osmrtnica.com",
        pathname: "/be/api/obituaryUploads/**",
      },
      {
        protocol: "https",
        hostname: "staging.osmrtnica.com",
        pathname: "/be/api/companyUploads/**",
      },
      {
        protocol: "https",
        hostname: "staging.osmrtnica.com",
        pathname: "/be/api/cemetryUploads/**",
      },
      {
        protocol: "https",
        hostname: "staging.osmrtnica.com",
        pathname: "/be/api/floristShopUploads/**",
      },
      {
        protocol: "https",
        hostname: "staging.osmrtnica.com",
        pathname: "/be/api/floristSlideUploads/**",
      },
      {
        protocol: "https",
        hostname: "staging.osmrtnica.com",
        pathname: "/be/api/packageUploads/**",
      },
      {
        protocol: "https",
        hostname: "obituary-app-bee.b-cdn.net",
        pathname: "/obituaries/**",
      }
    ],
  },
};

export default nextConfig;
