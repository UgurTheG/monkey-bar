"use client";

import "@splidejs/splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";

export default function Gallery() {
    const images = [
        {
            alt: "Cocktail mit Limette",
            src: "https://www.maltwhisky.de/wp-content/uploads/2016/05/caipirinha-cocktail-1160px.jpg",
        },
        {
            alt: "Barhocker und Theke",
            src: "https://www.maltwhisky.de/wp-content/uploads/2016/05/caipirinha-cocktail-1160px.jpg",
        },
        {
            alt: "Shaker und Tools",
            src: "https://www.maltwhisky.de/wp-content/uploads/2016/05/caipirinha-cocktail-1160px.jpg",
        },
        {
            alt: "Neon Sign",
            src: "https://www.maltwhisky.de/wp-content/uploads/2016/05/caipirinha-cocktail-1160px.jpg",
        },
        {
            alt: "Detailaufnahme Cocktail",
            src: "https://www.merkur.de/assets/images/39/356/39356044-zwei-glaeser-lillet-spritz-dekoriert-mit-orange-und-minze-vor-einer-mediterranen-steinwand-und-einem-arrangement-aus-frischen-orangen.png",
        },
    ];

    return (
        <section id="gallery" className={"py-[86px]"}>
            <div className="wrap">
                <div className="section-kicker">Einblicke</div>
                <h2 className="section-title">Gallery</h2>

                <Splide
                    aria-label="Monkey Bar Gallery"
                    hasTrack={true}
                    extensions={{ AutoScroll }}
                    options={{
                        type: "loop",
                        perPage: 4,
                        gap: "1rem",
                        arrows: true,
                        autoScroll: {
                            speed: 1,
                            pauseOnFocus: true,
                        },
                    }}
                >
                    {images.map((img, i) => (
                        <SplideSlide key={i}>
                            <div className="flex justify-center items-center w-full bg-black rounded-xl">
                                <div className="relative w-full max-w-[900px] h-auto">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        width={1200}
                                        height={800}
                                        className="object-contain rounded-xl w-full h-auto"
                                        priority={i === 0}
                                    />
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </section>
    );
}
