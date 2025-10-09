"use client";

import "@splidejs/splide/css";
import Image from "next/image";
import React from "react";

interface Drink {
    name: string;
    price: string;
    description: string;
    image: string;
}

const drinks: Drink[] = [
    {
        name: "Jungle Old Fashioned",
        price: "€12",
        description: "Rum Blend · Bananenlikör · Kakao Bitters",
        image:
            "https://www.jimbeam.com/sites/default/files/styles/original/public/2024-07/jim-beam-cocktail-kentucky-sunrise.jpg.webp?itok=CsUr-cXn",
    },
    {
        name: "Tropic Negroni",
        price: "€11",
        description: "Gin · Campari · Ananas-Wermut",
        image:
            "https://www.jimbeam.com/sites/default/files/styles/original/public/2024-07/jim-beam-cocktail-kentucky-sunrise.jpg.webp?itok=CsUr-cXn",
    },
    {
        name: "Smokey Gorilla",
        price: "€13",
        description: "Mezcal · Limette · Agave · Chili-Salz",
        image:
            "https://www.jimbeam.com/sites/default/files/styles/original/public/2024-07/jim-beam-cocktail-kentucky-sunrise.jpg.webp?itok=CsUr-cXn",
    },
    {
        name: "Banana Daiquiri (klar)",
        price: "€12",
        description: "Rum · Klare Banane · Limette · Zucker",
        image:
            "https://www.jimbeam.com/sites/default/files/styles/original/public/2024-07/jim-beam-cocktail-kentucky-sunrise.jpg.webp?itok=CsUr-cXn",
    },
    {
        name: "Zero-Proof Jungle Spritz",
        price: "€8",
        description: "Aperitif 0% · Grapefruit · Soda",
        image:
            "https://www.jimbeam.com/sites/default/files/styles/original/public/2024-07/jim-beam-cocktail-kentucky-sunrise.jpg.webp?itok=CsUr-cXn",
    },
    {
        name: "Plantain Highball",
        price: "€10",
        description: "Rye · Plantain-Sirup · Soda",
        image:
            "https://www.jimbeam.com/sites/default/files/styles/original/public/2024-07/jim-beam-cocktail-kentucky-sunrise.jpg.webp?itok=CsUr-cXn",
    },
];

export default function Menu() {
    return (
        <section id="menu">
            <div className="wrap">
                <div className="section-kicker">Menu</div>
                <h2 className="section-title">Signature Drinks</h2>
                <p className="section-lead">
                    Ein Auszug unserer Karte. Preise inkl. MwSt. – Änderungen vorbehalten.
                </p>

                {/* ✅ Loop through drinks */}
                <div className="menu-grid">
                    {drinks.map((drink) => (
                        <div key={drink.name} className="card menu-item reveal">
                            <h4>
                                {drink.name} <span className="price">{drink.price}</span>
                            </h4>
                            <div className="muted">{drink.description}</div>
                            <Image
                                alt={drink.name}
                                src={drink.image}
                                width={600}
                                height={400}
                                className="rounded-xl object-cover mt-2"
                                sizes="(max-width: 768px) 100vw, 600px"
                            />
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 18 }} className="reveal">
                    <p className="section-lead">
                        Snacks: Oliven & Nüsse (€5), Gegrillter Käse-Sandwich (€7),
                        Trüffel-Popcorn (€4)
                    </p>
                </div>
            </div>
        </section>
    );
}
