import React from "react";
import Image from "next/image";

export default function AboutUs() {
    return (
        <section id="about">
            <div className="wrap about">
                <div className="copy reveal">
                    <div className="section-kicker">Über uns</div>
                    <h2 className="section-title">Craft Cocktails & gute Gesellschaft</h2>
                    <p className="section-lead">
                        Ob klassisch geschüttelt oder modern gerührt – bei uns treffen hochwertige Zutaten
                        auf entspannte Atmosphäre. Unser Team liebt Details: hausgemachte Sirups, frische
                        Säfte und eine Spirituosenkarte, die entdeckt werden will.
                    </p>
                    <p>
                        <br/>
                        Jeden Donnerstag: <strong>Vinyl Night</strong>.
                        <br/>
                        Sonntags:{" "} <strong>Low-ABV & Zero-Proof Specials</strong>.
                        <br/>
                        Und von 17–19 Uhr: <strong>Happy Hour</strong>.
                    </p>
                </div>
                <Image
                    className="reveal rounded-xl object-cover"
                    alt="Bar-Interior mit warmem Licht"
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop"
                    width={1400}
                    height={933}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            </div>
        </section>
    )
}