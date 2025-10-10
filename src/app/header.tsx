"use client";

import dynamic from "next/dynamic";
const ReservationDialog = dynamic(() => import("@/app/reservation"), { ssr: false });

import React, { useState } from "react";
import Hamburger from "hamburger-react";

export default function Header() {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header id="header">
            <div className="nav">
                <div className="brand">
                    <span>
            Monkey <span className="dot">Bar</span>
          </span>
                </div>

                <div className="nav-toggle">
                    <Hamburger
                        toggled={navOpen}
                        toggle={(next) => {
                            setNavOpen(next);
                            document.body.style.overflow = next ? "hidden" : "";
                        }}
                        size={20}        // controls the bar length
                        distance="sm"    // makes lines closer together
                        rounded          // optional: round line ends
                        color="#fff"     // match your theme
                    />
                </div>


                <nav id="primary-nav" className={navOpen ? "open" : undefined}>
                    <ul>
                        {[
                            { href: "#about", label: "Über uns" },
                            { href: "#menu", label: "Menu" },
                            { href: "#gallery", label: "Galerie" },
                            { href: "#visit", label: "Besuch" },
                        ].map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={() => {
                                        setNavOpen(false);
                                        document.body.style.overflow = "";
                                    }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <ReservationDialog />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
