import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/consultation",
        destination: "/contact?form=1",
        permanent: true,
      },
    ];
  },
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
      {
        pathname: "/assets/**",
      },
      {
        pathname: "/thinqasset-assets/**",
      },
      {
        pathname: "/lab/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
