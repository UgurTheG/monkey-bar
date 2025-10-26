"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// react-pageflip depends on the browser. We load it dynamically on the client only.
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

// =====================================
// Types
// =====================================
type MenuItem = {
    name: string;
    description?: string;
    price: string;
    badge?: "New" | "Chef" | "Spicy" | "Vegan" | "GF";
    image?: string; // path under /public or remote URL
    imageAlt?: string;
};

type MenuSection = {
    title: string;
    subtitle?: string;
    items: MenuItem[];
};

// =====================================
// Sample Data (edit freely)
// =====================================
const MENU: MenuSection[] = [
    {
        title: "Starters",
        subtitle: "Small plates to share",
        items: [
            { name: "Sourdough & Whipped Butter", description: "Warm bakery sourdough with sea-salt butter", price: "€5", badge: "Chef" },
            { name: "Heirloom Tomato Burrata", description: "Basil oil, balsamic pearls, toasted pine nuts", price: "€12", badge: "Vegan" },
            { name: "Crispy Calamari", description: "Lemon aioli, pickled chili", price: "€11" },
            { name: "Roasted Pumpkin Soup", description: "Nutmeg crème, seed crunch", price: "€9", badge: "GF" },
        ],
    },
    {
        title: "Mains",
        subtitle: "From the kitchen",
        items: [
            { name: "Herb-Crusted Salmon", description: "Garden greens, dill beurre blanc", price: "€22", badge: "Chef" },
            { name: "Tagliatelle al Funghi", description: "Porcini, pecorino, parsley", price: "€18" },
            { name: "Bavette Steak (200g)", description: "Peppercorn jus, triple-cooked chips", price: "€26", badge: "New" },
            { name: "Cauliflower Shawarma Bowl", description: "Hummus, pickles, green tahini", price: "€17", badge: "Vegan" },
        ],
    },
    {
        title: "Desserts",
        subtitle: "Save room",
        items: [
            { name: "Basque Cheesecake", description: "Vanilla bean, seasonal compote", price: "€9", badge: "Chef" },
            { name: "Dark Chocolate Mousse", description: "Espresso whip, cocoa nibs", price: "€8" },
            { name: "Lemon Olive-Oil Cake", description: "Candied citrus, crème fraîche", price: "€8", badge: "New" },
            // many more to simulate overflow:
            { name: "Basque Cheesecake", description: "Vanilla bean, seasonal compote", price: "€9", badge: "Chef" },
            { name: "Dark Chocolate Mousse", description: "Espresso whip, cocoa nibs", price: "€8" },
            { name: "Lemon Olive-Oil Cake", description: "Candied citrus, crème fraîche", price: "€8", badge: "New" },
            { name: "Basque Cheesecake", description: "Vanilla bean, seasonal compote", price: "€9", badge: "Chef" },
            { name: "Dark Chocolate Mousse", description: "Espresso whip, cocoa nibs", price: "€8" },
            { name: "Lemon Olive-Oil Cake", description: "Candied citrus, crème fraîche", price: "€8", badge: "New" },
            { name: "Basque Cheesecake", description: "Vanilla bean, seasonal compote", price: "€9", badge: "Chef" },
            { name: "Dark Chocolate Mousse", description: "Espresso whip, cocoa nibs", price: "€8" },
            { name: "Lemon Olive-Oil Cake", description: "Candied citrus, crème fraîche", price: "€8", badge: "New" },
            { name: "Basque Cheesecake", description: "Vanilla bean, seasonal compote", price: "€9", badge: "Chef" },
            { name: "Dark Chocolate Mousse", description: "Espresso whip, cocoa nibs", price: "€8" },
            { name: "Lemon Olive-Oil Cake", description: "Candied citrus, crème fraîche", price: "€8", badge: "New" },
            // many more to simulate overflow:
            { name: "Basque Cheesecake", description: "Vanilla bean, seasonal compote", price: "€9", badge: "Chef" },
            { name: "Dark Chocolate Mousse", description: "Espresso whip, cocoa nibs", price: "€8" },
            { name: "Lemon Olive-Oil Cake", description: "Candied citrus, crème fraîche", price: "€8", badge: "New" },
            { name: "Basque Cheesecake", description: "Vanilla bean, seasonal compote", price: "€9", badge: "Chef" },
            { name: "Dark Chocolate Mousse", description: "Espresso whip, cocoa nibs", price: "€8" },
            { name: "Lemon Olive-Oil Cake", description: "Candied citrus, crème fraîche", price: "€8", badge: "New", image: "https://picsum.photos/seed/lemonade/200/200", imageAlt: "Glass of house lemonade with mint" },
            { name: "Basque Cheesecake", description: "Vanilla bean, seasonal compote", price: "€9", badge: "Chef" },
            { name: "Dark Chocolate Mousse", description: "Espresso whip, cocoa nibs", price: "€8" },
            { name: "Lemon Olive-Oil Cake", description: "Candied citrus, crème fraîche", price: "€8", badge: "New" }
        ],
    },
    {
        title: "Drinks",
        subtitle: "By the glass",
        items: [
            { name: "House Lemonade", description: "Pressed lemons, mint", price: "€4", image: "https://picsum.photos/seed/lemonade/200/200", imageAlt: "Glass of house lemonade with mint" },
            { name: "Elderflower Spritz", description: "Non-alcoholic", price: "€6", image: "https://picsum.photos/seed/elderflower/200/200", imageAlt: "Elderflower spritz with ice" },
            { name: "Negroni", description: "Gin, Campari, sweet vermouth", price: "€10", image: "https://picsum.photos/seed/negroni/200/200", imageAlt: "Classic Negroni cocktail" },
            { name: "Glass of Red/White", description: "Sommelier’s selection", price: "€7", image: "https://picsum.photos/seed/wine/200/200", imageAlt: "Glass of wine" },
        ],
    },
];

// =====================================
// Helpers
// =====================================
function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}
function useIsMounted() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
}
function chunk<T>(arr: T[], size: number) {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}
function normalize(s: string) {
    // Lowercase + strip common combining marks without regex escapes to keep this file replacement-friendly
    try {
        return s
            .toLowerCase()
            .normalize("NFKD")
            .split("")
            .filter((ch) => {
                const code = ch.charCodeAt(0);
                return !(code >= 0x0300 && code <= 0x036f);
            })
            .join("");
    } catch {
        return s.toLowerCase();
    }
}
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const m = window.matchMedia(query);
        const on = () => setMatches(m.matches);
        on();
        m.addEventListener("change", on);
        return () => m.removeEventListener("change", on);
    }, [query]);
    return matches;
}

// =====================================
// Tunables
// =====================================
const ITEMS_PER_PAGE = 14; // tweak if your content is longer/shorter

// =====================================
// Page Shell
// =====================================
const BookPage = React.forwardRef<
    HTMLDivElement,
    { children: React.ReactNode; className?: string; isCover?: boolean }
>(({ children, className, isCover }, ref) => (
    <div
        ref={ref}
        data-density={isCover ? "hard" : undefined}
        className={cx(
            "h-full w-full text-neutral-900 dark:text-neutral-100",
            // Soft paper look
            "bg-[radial-gradient(1100px_500px_at_50%_-10%,theme(colors.amber.50/.9),theme(colors.white/1))]",
            "dark:bg-[radial-gradient(1100px_500px_at_50%_-10%,theme(colors.zinc.800/.9),theme(colors.neutral.900/1))]",
            "px-6 sm:px-8 py-8 sm:py-10 flex flex-col relative overflow-hidden",
            // subtle border + shadow to lift the page content
            "ring-1 ring-black/5 dark:ring-white/10"
        )}
    >
        {/* decorative corner glow */}
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_40%_at_0%_0%,#000_0%,transparent_70%)] bg-amber-500/5 dark:bg-amber-400/5" />
        {/* scrollable content container to prevent clipping */}
        <div
            className={cx("relative z-10 h-full overflow-y-auto overscroll-contain pr-1", className)}
            style={{ scrollbarGutter: "stable both-edges" }}
        >
            {children}
        </div>
    </div>
));
BookPage.displayName = "BookPage";

// =====================================
// Tiny UI Bits
// =====================================
function Pill({ label }: { label: NonNullable<MenuItem["badge"]> }) {
    const map: Record<NonNullable<MenuItem["badge"]>, string> = {
        New: "bg-emerald-100 text-emerald-900 border-emerald-200",
        Chef: "bg-amber-100 text-amber-900 border-amber-200",
        Spicy: "bg-red-100 text-red-900 border-red-200",
        Vegan: "bg-green-100 text-green-900 border-green-200",
        GF: "bg-sky-100 text-sky-900 border-sky-200",
    };
    return (
        <span
            className={cx(
                "text-[10px] px-1.5 py-0.5 rounded-full border",
                "font-medium tracking-wide",
                map[label]
            )}
        >
      {label}
    </span>
    );
}

function Legend() {
    const items: Array<{ k: NonNullable<MenuItem["badge"]>; d: string }> = [
        { k: "New", d: "Recently added" },
        { k: "Chef", d: "Chef’s special" },
        { k: "Spicy", d: "Contains chili" },
        { k: "Vegan", d: "Plant-based" },
        { k: "GF", d: "Gluten-free" },
    ];
    return (
        <ul className="grid grid-cols-2 gap-2 text-xs">
            {items.map(({ k, d }) => (
                <li key={k} className="flex items-center gap-2">
                    <Pill label={k} />
                    <span className="opacity-70">{d}</span>
                </li>
            ))}
        </ul>
    );
}

// =====================================
// Specific Pages
// =====================================
function CoverFront() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center gap-5">
            <div className="inline-flex items-center justify-center rounded-2xl px-5 py-2 bg-white/70 dark:bg-zinc-900/70 ring-1 ring-black/5 dark:ring-white/10 shadow-sm">
                <span className="text-xs tracking-[0.25em] uppercase">Since 2024</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">Monkey Bar</h1>
            <p className="max-w-md text-sm opacity-80">Seasonal plates • Natural drinks • Good company</p>
            <div className="mt-6 text-xs opacity-60">
                <p>Open daily · Kitchen 12:00–22:00</p>
                <p>IG: @monkeybarbalingen9</p>
            </div>
        </div>
    );
}

function IntroPage() {
    return (
        <div className="flex flex-col gap-5 h-full">
            <header>
                <h2 className="text-2xl font-semibold">Welcome</h2>
                <p className="text-sm opacity-80">
                    We cook with local, seasonal ingredients. Prices include VAT. Please inform us of any allergies.
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-zinc-800/60 border border-amber-100 dark:border-zinc-700">
                    <strong>Kitchen Hours</strong>
                    <p>Mon–Sat 12:00–22:00 · Sun 12:00–20:00</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-zinc-800/60 border border-amber-100 dark:border-zinc-700">
                    <strong>Origin</strong>
                    <p>Fish (EU), Beef (DE), Eggs (DE), Nuts (EU)</p>
                </div>
            </div>

            <div className="rounded-xl border border-amber-100 dark:border-zinc-700 p-4 bg-white/60 dark:bg-zinc-900/50">
                <strong className="text-sm">Legend</strong>
                <div className="mt-2"><Legend /></div>
            </div>

            <div className="mt-auto text-xs opacity-70">Service charge not included · Tap water happily provided</div>
        </div>
    );
}

function SectionPage({ section, continued = false }: { section: MenuSection; continued?: boolean }) {
    return (
        <div className="flex flex-col h-full">
            <header className="mb-4">
                <h2 className="text-2xl font-semibold">
                    {section.title} {continued && <span className="text-sm opacity-60 align-baseline">(continued)</span>}
                </h2>
                {section.subtitle && !continued && <p className="text-sm opacity-80">{section.subtitle}</p>}
            </header>

            {/* 1 column on small screens, 2 columns on md+ (keeps columns balanced) */}
            <ul className={cx("text-sm grid grid-cols-1 md:grid-cols-2 md:gap-x-6 ")}>
                {section.items.map((it) => (
                    <li key={it.name} className="mb-4">
                        <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 items-start">
                            {it.image ? (
                                <div className="relative h-14 w-14 rounded-xl overflow-hidden border bg-white/40 dark:bg-zinc-900/40">
                                    <Image src={it.image} alt={it.imageAlt ?? it.name} fill sizes="56px" className="object-cover" unoptimized />
                                </div>
                            ) : (
                                <div className="h-14 w-14 hidden sm:block" aria-hidden="true" />
                            )}
                            <div>
                                <div className="font-medium flex items-center gap-2 leading-tight">
                                    {it.name}
                                    {it.badge && <Pill label={it.badge} />}
                                </div>
                                {it.description && <p className="opacity-70 leading-snug mt-0.5">{it.description}</p>}
                            </div>
                            <div className="text-right font-semibold tabular-nums whitespace-nowrap">{it.price}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function BackCover() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center gap-3">
            <h3 className="text-xl font-medium">Bon Appétit</h3>
            <p className="text-xs opacity-70">Instagram: @monkeybarbalingen9</p>
            <p className="text-xs opacity-60">Menu auto-updates — scan QR on table</p>
        </div>
    );
}

// =====================================
// Main Component
// =====================================

type PageFlipApi = { flipPrev(): void; flipNext(): void; turnToPage?(n: number): void };
type FlipBookHandle = { pageFlip(): PageFlipApi };

type ViewMode = "book" | "list";

export default function MenuBook() {
    const mounted = useIsMounted();
    const bookRef = useRef<FlipBookHandle | null>(null);
    const [page, setPage] = useState(0);
    const [view, setView] = useState<ViewMode>("book");
    const [query, setQuery] = useState("");
    const isNarrow = useMediaQuery("(max-width: 640px)"); // phones
    const canUseBook = !isNarrow; // we force list view on phones for readability

    // Default to list view on phones
    useEffect(() => {
        if (isNarrow) setView("list");
    }, [isNarrow]);

    // Build paginated pages from MENU
    const { pagedSections, sectionStartPage } = useMemo(() => {
        const out: Array<{ section: MenuSection; continued: boolean; key: string }> = [];
        const startMap = new Map<string, number>();
        let pageCursor = 2 /* covers */ + 1 /* intro */; // first section page index

        MENU.forEach((s) => {
            const pieces = chunk(s.items, ITEMS_PER_PAGE);
            pieces.forEach((items, idx) => {
                out.push({ section: { ...s, items }, continued: idx > 0, key: `${s.title}-${idx}` });
                if (idx === 0) startMap.set(s.title, pageCursor);
                pageCursor += 1;
            });
        });

        return { pagedSections: out, sectionStartPage: startMap };
    }, []);

    const pagesTotal = useMemo(() => 2 /* covers */ + 1 /* intro */ + pagedSections.length, [pagedSections.length]);

    const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();
    const goNext = () => bookRef.current?.pageFlip()?.flipNext();

    const jumpToSection = (title: string) => {
        const idx = sectionStartPage.get(title);
        if (typeof idx === "number") {
            const api = bookRef.current?.pageFlip();
            if (api?.turnToPage) api.turnToPage(idx);
            else if (api) {
                // naive: iterate until we reach the desired page
                const steps = Math.max(0, idx - page);
                for (let i = 0; i < steps; i++) api.flipNext();
            }
        }
    };

    // Keyboard navigation (book view only, when not typing in search)
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            const target = e.target as HTMLElement;
            const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
            if (!canUseBook || view !== "book" || typing) return;
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "ArrowRight") goNext();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [view, canUseBook]);

    // Filtered menu for search + list view rendering
    const filteredMenu = useMemo(() => {
        if (!query.trim()) return MENU;
        const q = normalize(query.trim());
        const matched: MenuSection[] = [];
        for (const sec of MENU) {
            const items = sec.items.filter((i) =>
                [i.name, i.description, i.badge, i.price]
                    .filter(Boolean)
                    .map(String)
                    .some((s) => q ? normalize(s).includes(q) : true)
            );
            if (items.length) matched.push({ ...sec, items });
        }
        return matched.length ? matched : [];
    }, [query]);

    const showSearchResults = query.trim().length > 0;

    return (
        <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8">
            {/* Top Bar */}
            <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Monkey Bar Menu</h1>
                    <p className="opacity-70 text-sm">Blättern Sie die Seiten um – oder nutzen Sie die Liste & Suche.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    {/* View toggle */}
                    <div className="inline-flex h-9 items-center rounded-xl border bg-white/70 dark:bg-zinc-800/70 shadow-sm overflow-hidden text-xs sm:text-sm">
                        <button
                            onClick={() => setView("list")}
                            className={cx(
                                "px-3 h-full inline-flex items-center",
                                view === "list" ? "bg-white dark:bg-zinc-900 font-medium" : "opacity-70 hover:opacity-100"
                            )}
                            aria-pressed={view === "list"}
                        >
                            List
                        </button>
                        {canUseBook && (
                            <button
                                onClick={() => setView("book")}
                                className={cx(
                                    "px-3 h-full inline-flex items-center border-l",
                                    view === "book" ? "bg-white dark:bg-zinc-900 font-medium" : "opacity-70 hover:opacity-100"
                                )}
                                aria-pressed={view === "book"}
                            >
                                Book
                            </button>
                        )}
                    </div>

                    {/* Search */}
                    <label className="relative w-full sm:w-64">
                        <span className="sr-only">Search menu</span>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search dishes, badges, prices…"
                            className="w-full rounded-xl border bg-white/80 dark:bg-zinc-900/70 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs opacity-70 hover:opacity-100"
                                aria-label="Clear search"
                            >
                                Clear
                            </button>
                        )}
                    </label>

                    {/* Book pager (hidden in list/search, phones, and on print) */}
                    {canUseBook && view === "book" && !showSearchResults && (
                        <div className="hidden sm:flex items-center gap-2 print:hidden">
                            <button
                                onClick={goPrev}
                                className="px-3 py-2 rounded-xl border bg-white/70 dark:bg-zinc-800 hover:bg-white shadow-sm"
                                aria-label="Previous page"
                            >
                                ◀
                            </button>
                            <span className="text-sm tabular-nums min-w-[6ch] text-center" aria-live="polite">
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
                    )}
                </div>
            </div>

            {/* Section quick nav */}
            <div className="mb-3 sm:mb-4 overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
                <nav className="flex gap-2 min-w-max">
                    {MENU.map((s) => (
                        <button
                            key={s.title}
                            onClick={() => (canUseBook && view === "book" && !showSearchResults ? jumpToSection(s.title) : document.getElementById(`sec-${s.title}`)?.scrollIntoView({ behavior: "smooth", block: "start" }))}
                            className="px-3 py-2 rounded-full text-sm border bg-white/70 dark:bg-zinc-800/70 shadow-sm hover:bg-white"
                        >
                            {s.title}
                        </button>
                    ))}
                </nav>
            </div>

            {/* LIST VIEW or SEARCH RESULTS (always on phones) */}
            {(view === "list" || !canUseBook || showSearchResults) && (
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 print:block">
                    {filteredMenu.length === 0 && (
                        <div className="text-sm opacity-70">No matches. Try a different term.</div>
                    )}
                    {filteredMenu.map((s) => (
                        <section key={s.title} id={`sec-${s.title}`} className="p-4 sm:p-6 rounded-2xl border bg-white/80 dark:bg-zinc-900 shadow-sm">
                            <h2 className="text-lg sm:text-xl font-semibold">{s.title}</h2>
                            {s.subtitle && <p className="opacity-70 text-sm">{s.subtitle}</p>}
                            <ul className="mt-3 sm:mt-4 space-y-3 text-base sm:text-sm">
                                {s.items.map((i) => (
                                    <li key={i.name} className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 items-start">
                                        <div>
                                            <div className="font-medium flex items-center gap-2">
                                                {i.name}
                                                {i.badge && <Pill label={i.badge} />}
                                            </div>
                                            {i.description && <p className="opacity-70 leading-snug">{i.description}</p>}
                                        </div>
                                        <div className="font-semibold tabular-nums whitespace-nowrap">{i.price}</div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            )}

            {/* BOOK VIEW (hidden on phones) */}
            {canUseBook && view === "book" && !showSearchResults && (
                <div className="print:hidden">
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
                                                    <div className="font-medium flex items-center gap-2">
                                                        {i.name}
                                                        {i.badge && <Pill label={i.badge} />}
                                                    </div>
                                                    {i.description && <p className="opacity-70 leading-snug">{i.description}</p>}
                                                </div>
                                                <div className="font-semibold tabular-nums">{i.price}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    )}

                    {/* Flipbook when mounted */}
                    {mounted && (
                        <div className="[--book-w:520px] [--book-h:720px] md:[--book-w:640px] md:[--book-h:840px] mx-auto">
                            {/* @ts-expect-error react-pageflip has loose types */}
                            <HTMLFlipBook
                                ref={(el) => {
                                    bookRef.current = el as unknown as FlipBookHandle;
                                }}
                                className="shadow-2xl rounded-2xl"
                                width={520}
                                height={720}
                                size="stretch"
                                minWidth={480}
                                maxWidth={900}
                                minHeight={640}
                                maxHeight={1200}
                                maxShadowOpacity={0.45}
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

                                {/* Paginated Sections */}
                                {pagedSections.map(({ section, continued, key }) => (
                                    <BookPage key={key}>
                                        <SectionPage section={section} continued={continued} />
                                    </BookPage>
                                ))}

                                {/* Back Cover */}
                                <BookPage isCover>
                                    <BackCover />
                                </BookPage>
                            </HTMLFlipBook>

                            {/* Progress bar */}
                            <div className="mt-4 h-1.5 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                                <div
                                    className="h-full bg-amber-300 dark:bg-amber-400 transition-[width]"
                                    style={{ width: `${(Math.min(page + 1, pagesTotal) / pagesTotal) * 100}%` }}
                                    aria-hidden
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Print hint */}
            <p className="mt-4 sm:mt-6 text-xs opacity-60 print:hidden">
                On phones we automatically switch to <span className="font-medium">List</span> view for readability. Use Book view on tablets and larger.
            </p>
        </div>
    );
}
