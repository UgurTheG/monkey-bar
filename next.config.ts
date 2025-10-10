import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        remotePatterns: [
            { protocol: "https", hostname: "www.maltwhisky.de" },
            { protocol: "https", hostname: "www.merkur.de" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "www.jimbeam.com" },
        ],
    },
};

export default nextConfig;
