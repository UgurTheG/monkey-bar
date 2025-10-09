import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
    output: "export", // ✅ enables static export
    basePath: isProd ? "/monkey-bar" : "", // ✅ only use subpath in production
    assetPrefix: isProd ? "/monkey-bar/" : "",
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
