import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // Paid plans were removed; keep old links working.
    return [
      { source: "/tarifs", destination: "/tuteur", permanent: false },
      // English exam was first published with the wrong year
      { source: "/examens/anglais-sciences-humaines-2020-normale", destination: "/examens/anglais-sciences-humaines-2024-normale", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default config;
