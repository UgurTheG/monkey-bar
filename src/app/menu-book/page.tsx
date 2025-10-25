"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// react-pageflip depends on the browser. We load it dynamically on the client only.
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

// ---------- Types ----------
type MenuItem = {
    name: string;
    description?: string;
    price: string;
    badge?: "New" | "Chef" | "Spicy" | "Vegan" | "GF";
    image?: string; // path under /public, e.g. "/img/drinks/lemonade.jpg"
    imageAlt?: string;
};

type MenuSection = {
    title: string;
    subtitle?: string;
    items: MenuItem[];
};

// ---------- Sample Data (edit freely) ----------
const MENU: MenuSection[] = [
    {
        title: "Starters",
        subtitle: "Small plates to share",
        items: [
            {
                name: "Sourdough & Whipped Butter",
                description: "Warm bakery sourdough with sea‑salt butter",
                price: "€5",
                badge: "Chef",
            },
            {
                name: "Heirloom Tomato Burrata",
                description: "Basil oil, balsamic pearls, toasted pine nuts",
                price: "€12",
                badge: "Vegan",
            },
            {
                name: "Crispy Calamari",
                description: "Lemon aioli, pickled chili",
                price: "€11",
            },
            {
                name: "Roasted Pumpkin Soup",
                description: "Nutmeg crème, seed crunch",
                price: "€9",
                badge: "GF",
            },
        ],
    },
    {
        title: "Mains",
        subtitle: "From the kitchen",
        items: [
            {
                name: "Herb‑Crusted Salmon",
                description: "Garden greens, dill beurre blanc",
                price: "€22",
                badge: "Chef",
            },
            {
                name: "Tagliatelle al Funghi",
                description: "Porcini, pecorino, parsley",
                price: "€18",
            },
            {
                name: "Bavette Steak (200g)",
                description: "Peppercorn jus, triple‑cooked chips",
                price: "€26",
                badge: "New",
            },
            {
                name: "Cauliflower Shawarma Bowl",
                description: "Hummus, pickles, green tahini",
                price: "€17",
                badge: "Vegan",
            },
        ],
    },
    {
        title: "Desserts",
        subtitle: "Save room",
        items: [
            {
                name: "Basque Cheesecake",
                description: "Vanilla bean, seasonal compote",
                price: "€9",
                badge: "Chef",
            },
            {
                name: "Dark Chocolate Mousse",
                description: "Espresso whip, cocoa nibs",
                price: "€8",
            },
            {
                name: "Lemon Olive‑Oil Cake",
                description: "Candied citrus, crème fraîche",
                price: "€8",
                badge: "New",
            },
        ],
    },
    {
        title: "Drinks",
        subtitle: "By the glass",
        items: [
            {
                name: "House Lemonade",
                description: "Pressed lemons, mint",
                price: "€4",
                image: "https://picsum.photos/seed/lemonade/200/200",
                imageAlt: "Glass of house lemonade with mint",
            },
            {
                name: "Elderflower Spritz",
                description: "Non‑alcoholic",
                price: "€6",
                image: "https://picsum.photos/seed/elderflower/200/200",
                imageAlt: "Elderflower spritz with ice",
            },
            {
                name: "Negroni",
                description: "Gin, Campari, sweet vermouth",
                price: "€10",
                image: "https://picsum.photos/seed/negroni/200/200",
                imageAlt: "Classic Negroni cocktail",
            },
            {
                name: "Glass of Red/White",
                description: "Sommelier’s selection",
                price: "€7",
                image: "https://picsum.photos/seed/wine/200/200",
                imageAlt: "Glass of wine",
            },
        ],
    },
];

// ---------- Helpers ----------
function classNames(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

function useIsMounted() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
}

// ---------- Page Shell (each child page must be a component) ----------
const BookPage = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string; isCover?: boolean }>(
    ({ children, className, isCover }, ref) => (
        <div
            ref={ref}
            data-density={isCover ? "hard" : undefined}
            className={classNames(
                "h-full w-full bg-white/95 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
                "px-8 py-10 flex flex-col",
                isCover ? "bg-gradient-to-br from-amber-100 to-orange-50 dark:from-neutral-800 dark:to-neutral-900" : "",
                className
            )}
        >
            {children}
        </div>
    )
);
BookPage.displayName = "BookPage";

// ---------- Specific Pages ----------
function CoverFront() {
    return (
        <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-amber-100 to-white dark:from-zinc-800 dark:via-zinc-900 dark:to-black rounded-r-2xl" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-4">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Monkey Bar</h1>
                <p className="uppercase tracking-[0.3em] text-sm"></p>
                <div className="mt-4 text-xs opacity-70"></div>
            </div>
        </div>
    );
}

function IntroPage() {
    return (
        <div className="flex flex-col gap-4 h-full">
            <header>
                <h2 className="text-2xl font-semibold">Welcome</h2>
                <p className="text-sm opacity-80">We cook with local, seasonal ingredients. Prices include VAT. Please inform us of any allergies.</p>
            </header>
            <div className="mt-2 grid grid-cols-1 gap-3 text-sm">
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-zinc-800/60 border border-amber-100 dark:border-zinc-700">
                    <strong>Kitchen Hours</strong>
                    <p>Mon–Sat 12:00–22:00 · Sun 12:00–20:00</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-zinc-800/60 border border-amber-100 dark:border-zinc-700">
                    <strong>Origin</strong>
                    <p>Fish (EU), Beef (DE), Eggs (DE), Nuts (EU)</p>
                </div>
            </div>
            <div className="mt-auto text-xs opacity-70">Service charge not included · Tap water happily provided</div>
        </div>
    );
}

function SectionPage({ section }: { section: MenuSection }) {
    return (
        <div className="flex flex-col h-full">
            <header className="mb-3">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                {section.subtitle && (
                    <p className="text-sm opacity-80">{section.subtitle}</p>
                )}
            </header>
            <ul className="space-y-4 text-sm">
                {section.items.map((it) => (
                    <li key={it.name} className="grid grid-cols-[auto_1fr_auto] gap-x-4 items-start">
                        {it.image ? (
                            <div className="relative h-14 w-14 rounded-xl overflow-hidden border bg-white/40 dark:bg-zinc-900/40">
                                <Image src={it.image} alt={it.imageAlt ?? it.name} fill sizes="56px" className="object-cover" unoptimized />
                            </div>
                        ) : (
                            <div className="h-14 w-14 hidden sm:block" aria-hidden="true" />
                        )}
                        <div>
                            <div className="font-medium flex items-center gap-2">
                                {it.name}
                                {it.badge && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-200/70 text-amber-900 border border-amber-300">
                    {it.badge}
                  </span>
                                )}
                            </div>
                            {it.description && (
                                <p className="opacity-70 leading-snug mt-0.5">
                                    {it.description}
                                </p>
                            )}
                        </div>
                        <div className="text-right font-semibold tabular-nums">{it.price}</div>
                    </li>
                ))}
            </ul>
            <div className="mt-auto pt-6 text-[11px] opacity-60">
                Ask about today’s specials and wine pairings.
            </div>
        </div>
    );
}

function BackCover() {
    return (
        <div className="relative h-full w-full">
            <div className="absolute inset-0 rounded-l-2xl bg-gradient-to-tl from-amber-200 via-amber-100 to-white dark:from-zinc-800 dark:via-zinc-900 dark:to-black" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-2">
                <h3 className="text-xl font-medium">Bon Appétit</h3>
                <p className="text-xs opacity-70">Instagram: @monkeybarbalingen9</p>
            </div>
        </div>
    );
}

// ---------- Main Component ----------
// Narrow refs to avoid `any` while keeping compatibility with react-pageflip
// Minimal subset of the instance API we use
type PageFlipApi = { flipPrev(): void; flipNext(): void };
type FlipBookHandle = { pageFlip(): PageFlipApi };

export default function MenuBook() {
    const mounted = useIsMounted();
    const bookRef = useRef<FlipBookHandle | null>(null);
    const [page, setPage] = useState(0);
    const pagesTotal = useMemo(() => 2 /* covers */ + 1 /* intro */ + MENU.length, []);

    const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();
    const goNext = () => bookRef.current?.pageFlip()?.flipNext();

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-semibold">Monkey Bar Menu</h1>
                    <p className="opacity-70 text-sm">Bättern Sie die Seiten um, wie bei einem echten Menü.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={goPrev}
                        className="px-3 py-2 rounded-xl border bg-white/70 dark:bg-zinc-800 hover:bg-white shadow-sm"
                        aria-label="Previous page"
                    >
                        ◀
                    </button>
                    <span className="text-sm tabular-nums min-w-[5ch] text-center" aria-live="polite">
            {Math.min(page + 1, pagesTotal)} / {pagesTotal}
          </span>
                    <button
                        onClick={goNext}
                        className="px-3 py-2 rounded-xl border bg-white/70 dark:bg-zinc-800 hover:bg-white shadow-sm"
                        aria-label="Next page"
                    >
                        ▶
                    </button>
                </div>
            </div>

            {/* Static accessible fallback if JS hasn’t mounted yet */}
            {!mounted && (
                <div className="grid sm:grid-cols-2 gap-6">
                    {MENU.map((s) => (
                        <section key={s.title} className="p-6 rounded-2xl border bg-white/80 dark:bg-zinc-900 shadow-sm">
                            <h2 className="text-xl font-semibold">{s.title}</h2>
                            {s.subtitle && <p className="opacity-70 text-sm">{s.subtitle}</p>}
                            <ul className="mt-4 space-y-3 text-sm">
                                {s.items.map((i) => (
                                    <li key={i.name} className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="font-medium">{i.name}</div>
                                            {i.description && (
                                                <p className="opacity-70 leading-snug">{i.description}</p>
                                            )}
                                        </div>
                                        <div className="font-semibold tabular-nums">{i.price}</div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            )}

            {mounted && (
                <div className="[--book-w:520px] [--book-h:720px] md:[--book-w:640px] md:[--book-h:840px]">
                    {/* @ts-expect-error react-pageflip has loose types */}
                    <HTMLFlipBook
                        ref={(el) => { bookRef.current = el as unknown as FlipBookHandle; }}
                        className="shadow-2xl rounded-2xl"
                        width={520}
                        height={720}
                        size="stretch"
                        minWidth={315}
                        maxWidth={900}
                        minHeight={420}
                        maxHeight={1200}
                        maxShadowOpacity={0.5}
                        showCover
                        mobileScrollSupport
                        onFlip={(e: { data: number }) => setPage(e.data)}
                    >
                        {/* Front Cover */}
                        <BookPage isCover>
                            <CoverFront />
                        </BookPage>

                        {/* Intro (first inner page) */}
                        <BookPage>
                            <IntroPage />
                        </BookPage>

                        {/* Sections */}
                        {MENU.map((section) => (
                            <BookPage key={section.title}>
                                <SectionPage section={section} />
                            </BookPage>
                        ))}

                        {/* Back Cover */}
                        <BookPage isCover>
                            <BackCover />
                        </BookPage>
                    </HTMLFlipBook>
                </div>
            )}
        </div>
    );
}
