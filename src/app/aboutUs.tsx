import React from "react";
import Image from "next/image";

export default function AboutUs() {
    return (
        <section id="about" className="py-[86px]">
            <div className="mx-auto max-w-screen-xl px-4 md:px-6">
                {/* Grid: 1.2fr / 0.8fr on md+, with a 28px gap and centered alignment */}
                <div className="grid items-center gap-7 md:grid-cols-[1.2fr_0.8fr]">
                    {/* Copy */}
                    <div className="space-y-6">
                        <div className="section-kicker text-xs font-semibold uppercase tracking-[0.2em] ">
                            Über uns
                        </div>
                        <h2 className="text-3xl font-semibold leading-tight text-neutral-100 sm:text-4xl">
                            Craft Cocktails & gute Gesellschaft
                        </h2>
                        <p className="text-lg leading-relaxed text-neutral-300">
                            Ob klassisch geschüttelt oder modern gerührt – bei uns treffen hochwertige Zutaten
                            auf entspannte Atmosphäre. Unser Team liebt Details: hausgemachte Sirups, frische
                            Säfte und eine Spirituosenkarte, die entdeckt werden will.
                        </p>
                        <p className="text-neutral-300">
                            <span className="block"><strong>Jeden Donnerstag:</strong> Vinyl Night.</span>
                            <span className="block"><strong>Sonntags:</strong> Low-ABV & Zero-Proof Specials.</span>
                            <span className="block"><strong>17–19 Uhr:</strong> Happy Hour.</span>
                        </p>
                    </div>

                    {/* Media */}
                    <Image
                        className="h-full w-full rounded-[var(--radius)] object-cover border border-[rgba(255,255,255,0.06)] [box-shadow:var(--shadow)]"
                        alt="Bar-Interior mit warmem Licht"
                        src="/monkey-bar.jpg"
                        width={1400}
                        height={933}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
