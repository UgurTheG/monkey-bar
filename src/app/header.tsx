"use client";

import dynamic from "next/dynamic";
const ReservationDialog = dynamic(() => import("@/app/reservation"), { ssr: false });

import React, { useEffect, useState } from "react";
import Hamburger from "hamburger-react";

export default function Header() {
    const [navOpen, setNavOpen] = useState(false);   // logical open/closed
    const [showNav, setShowNav] = useState(false);   // mounted while animating
    const [shrink, setShrink] = useState(false);

    // shrink on scroll
    useEffect(() => {
        const onScroll = () => setShrink(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // keep body locked while menu is visible OR animating out
    useEffect(() => {
        document.body.style.overflow = showNav ? "hidden" : "";
        return () => void (document.body.style.overflow = "");
    }, [showNav]);

    // when opening, ensure it's mounted
    useEffect(() => {
        if (navOpen) setShowNav(true);
    }, [navOpen]);

    const closeNav = () => setNavOpen(false);

    return (
        <header
            id="header"
            className={[
                "fixed inset-x-0 top-0 z-[1000] flex items-center justify-center",
                "transition-[height,background-color] duration-200 ease-in-out",
                shrink ? "h-14 bg-[rgba(6,8,8,0.7)]" : "h-[70px] bg-[rgba(6,8,8,0.5)]",
            ].join(" ")}
        >
            <div className="w-[min(1200px,92%)] flex items-center justify-between">
                {/* Brand */}
                <a href="#" className="flex items-center gap-3 font-bold tracking-[0.5px]">
                    <span className="font-['Playfair_Display',serif] text-[1.5rem] leading-none">
            Monkey <span className="text-[var(--accent)]">Bar</span>
          </span>
                </a>

                {/* Mobile toggle (NO button wrapper) */}
                <div
                    className="relative z-[1001] hidden max-[820px]:inline-flex items-center justify-center rounded-[12px]"
                    aria-label="Menü umschalten"
                    aria-controls="primary-nav"
                    aria-expanded={navOpen}
                >
                    <Hamburger
                        toggled={navOpen}
                        toggle={setNavOpen}
                        size={20}
                        distance="sm"
                        rounded
                        color="#e8ecef"
                    />
                </div>

                {/* Desktop nav */}
                <nav className="hidden min-[821px]:block">
                    <ul className="m-0 flex list-none items-center gap-[clamp(12px,3vw,28px)] p-0">
                        {[
                            { href: "#about", label: "Über uns" },
                            { href: "#menu-list", label: "Menu" },
                            { href: "#gallery", label: "Galerie" },
                            { href: "#visit", label: "Besuch" },
                        ].map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="block px-[6px] py-2 font-medium text-[var(--text)] opacity-85 hover:text-[var(--accent)] hover:opacity-100"
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

            {/* Mobile sheet + backdrop (kept mounted while animating out) */}
            {showNav && (
                <>
                    {/* Backdrop */}
                    <button
                        aria-label="Schließen"
                        onClick={closeNav}
                        className={[
                            "max-[820px]:fixed inset-0 z-[999] bg-black/50 backdrop-blur-[2px] min-[821px]:hidden",
                            navOpen
                                ? "max-[820px]:animate-[fadeIn_.18s_ease-out]"
                                : "max-[820px]:animate-[fadeOut_.18s_ease-in_forwards]",
                        ].join(" ")}
                    />
                    {/* Sheet */}
                    <nav
                        id="primary-nav"
                        className={[
                            "max-[820px]:fixed max-[820px]:left-0 max-[820px]:right-0 min-[821px]:hidden",
                            shrink ? "max-[820px]:top-14" : "max-[820px]:top-[70px]",
                            "max-[820px]:z-[1000] max-[820px]:backdrop-blur-[8px]",
                            navOpen
                                ? "max-[820px]:animate-[slideDown_.18s_ease-out]"
                                : "max-[820px]:animate-[slideUp_.18s_ease-in_forwards]",
                        ].join(" ")}
                        onAnimationEnd={(e) => {
                            if (e.animationName === "slideUp") {
                                setShowNav(false); // unmount AFTER the exit animation finishes
                            }
                        }}
                    >
                        <ul className="m-0 flex list-none flex-col gap-2 p-[14px_16px]">
                            {[
                                { href: "#about", label: "Über uns" },
                                { href: "#menu-list", label: "Menu" },
                                { href: "#gallery", label: "Galerie" },
                                { href: "#visit", label: "Besuch" },
                            ].map((link) => (
                                <li key={link.href} className="w-full">
                                    <a
                                        href={link.href}
                                        onClick={closeNav}
                                        className="block w-full px-1.5 py-2 font-medium text-[var(--text)] opacity-85 hover:text-[var(--accent)] hover:opacity-100"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li className="w-full">
                                <div className="w-full">
                                    <ReservationDialog />
                                </div>
                            </li>
                        </ul>
                    </nav>
                </>
            )}

            <style jsx global>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0%);    opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(0%);    opacity: 1; }
          to   { transform: translateY(-100%); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          #primary-nav,
          .mobile-backdrop {
            animation: none !important;
          }
        }
      `}</style>
        </header>
    );
}
