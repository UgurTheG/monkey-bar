"use client";
import React from "react";

interface VideoSectionProps {
    src: string;
    height?: string;
    overlay?: boolean;
    children?: React.ReactNode;
}

const VideoSection: React.FC<VideoSectionProps> = ({
                                                       src,
                                                       height = "400px",
                                                       overlay = true,
                                                       children,
                                                   }) => (
    <section
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ height }}
    >
        <video
            className="absolute inset-0 w-full h-full object-cover"
            src={src}
            autoPlay
            muted
            loop
            playsInline
        />
        {overlay && <div className="absolute inset-0 bg-black/40" />}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4">
            {children}
        </div>
    </section>
);

export default VideoSection;
