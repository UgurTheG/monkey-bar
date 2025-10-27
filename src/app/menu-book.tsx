"use client";

import React, {useMemo, useState} from "react";
import Link from "next/link";

// =====================================
// Types
// =====================================
type MenuItem = {
    name: string;
    description?: string;
    price: string;
    badge?: "Neu" | "Scharf" | "Vegan" | "Enthält Nüsse";
};

type MenuSection = {
    title: string;
    subtitle?: string;
    items: MenuItem[];
};

// =====================================
// Sample Data (edit freely)
// =====================================
const MENU: MenuSection[] = [{
    title: "Starters",
    subtitle: "Small plates to share",
    items: [{
        name: "Sourdough & Whipped Butter",
        description: "Warm bakery sourdough with sea-salt butter",
        price: "€5",
        badge: "Neu",
    }, {
        name: "Heirloom Tomato Burrata",
        description: "Basil oil, balsamic pearls, toasted pine nuts",
        price: "€12",
        badge: "Scharf",
    }, {
        name: "Crispy Calamari",
        description: "Lemon aioli, pickled chili",
        price: "€11"
    }, {name: "Roasted Pumpkin Soup", description: "Nutmeg crème, seed crunch", price: "€9"},],
}, {
    title: "Mains",
    subtitle: "From the kitchen",
    items: [{
        name: "Herb-Crusted Salmon",
        description: "Garden greens, dill beurre blanc",
        price: "€22",
    }, {
        name: "Tagliatelle al Funghi",
        description: "Porcini, pecorino, parsley",
        price: "€18"
    }, {
        name: "Bavette Steak (200g)",
        description: "Peppercorn jus, triple-cooked chips",
        price: "€26",
    }, {
        name: "Cauliflower Shawarma Bowl",
        description: "Hummus, pickles, green tahini",
        price: "€17",
        badge: "Vegan"
    },],
}, {
    title: "Desserts",
    subtitle: "Save room",
    items: [{
        name: "Basque Cheesecake",
        description: "Vanilla bean, seasonal compote",
        price: "€9",
    }, {
        name: "Dark Chocolate Mousse",
        description: "Espresso whip, cocoa nibs",
        price: "€8"
    }, {
        name: "Lemon Olive-Oil Cake",
        description: "Candied citrus, crème fraîche",
        price: "€8",
    }, {
        name: "Basque Cheesecake",
        description: "Vanilla bean, seasonal compote",
        price: "€9",
    }, {
        name: "Dark Chocolate Mousse",
        description: "Espresso whip, cocoa nibs",
        price: "€8"
    }, {
        name: "Lemon Olive-Oil Cake",
        description: "Candied citrus, crème fraîche",
        price: "€8",
    }, {
        name: "Basque Cheesecake",
        description: "Vanilla bean, seasonal compote",
        price: "€9",
    }, {
        name: "Dark Chocolate Mousse",
        description: "Espresso whip, cocoa nibs",
        price: "€8"
    }, {
        name: "Lemon Olive-Oil Cake",
        description: "Candied citrus, crème fraîche",
        price: "€8",
    }, {
        name: "Basque Cheesecake",
        description: "Vanilla bean, seasonal compote",
        price: "€9",
    }, {
        name: "Dark Chocolate Mousse",
        description: "Espresso whip, cocoa nibs",
        price: "€8"
    }, {
        name: "Lemon Olive-Oil Cake",
        description: "Candied citrus, crème fraîche",
        price: "€8",
    }, {
        name: "Basque Cheesecake",
        description: "Vanilla bean, seasonal compote",
        price: "€9",
    }, {
        name: "Dark Chocolate Mousse",
        description: "Espresso whip, cocoa nibs",
        price: "€8"
    }, {
        name: "Lemon Olive-Oil Cake",
        description: "Candied citrus, crème fraîche",
        price: "€8",
    }, {
        name: "Basque Cheesecake",
        description: "Vanilla bean, seasonal compote",
        price: "€9",
    }, {
        name: "Dark Chocolate Mousse",
        description: "Espresso whip, cocoa nibs",
        price: "€8"
    }, {name: "Lemon Olive-Oil Cake", description: "Candied citrus, crème fraîche", price: "€8"}],
}, {
    title: "Drinks",
    subtitle: "By the glass",
    items: [{name: "House Lemonade", description: "Pressed lemons, mint", price: "€4",}, {
        name: "Elderflower Spritz",
        description: "Non-alcoholic",
        price: "€6"
    }, {name: "Negroni", description: "Gin, Campari, sweet vermouth", price: "€10"}, {
        name: "Glass of Red/White",
        description: "Sommelier’s selection",
        price: "€7",
        badge: "Enthält Nüsse",
    },],
},];
// =====================================
// Helpers
// =====================================
function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

function normalize(s: string) {
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

// =====================================
// Tiny UI Bits
// =====================================
function Pill({label}: { label: NonNullable<MenuItem["badge"]> }) {
    const map: Record<NonNullable<MenuItem["badge"]>, string> = {
        Neu: "bg-emerald-100 text-emerald-900 border-emerald-200",
        Scharf: "bg-red-100 text-red-900 border-red-200",
        Vegan: "bg-green-100 text-green-900 border-green-200",
        "Enthält Nüsse": "bg-amber-100 text-amber-800 border-amber-300",
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

// =====================================
// Main Component (List + Search + Category Buttons only)
// =====================================
export default function MenuList() {
    const [query, setQuery] = useState("");
    const filteredMenu = useMemo(() => {
        if (!query.trim()) return MENU;
        const q = normalize(query.trim());
        const matched: MenuSection[] = [];
        for (const sec of MENU) {
            const items = sec.items.filter((i) =>
                [i.name, i.description, i.badge, i.price]
                    .filter(Boolean)
                    .map(String)
                    .some((s) => (q ? normalize(s).includes(q) : true))
            );
            if (items.length) matched.push({...sec, items});
        }
        return matched.length ? matched : [];
    }, [query]);

    return (
        <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8" id={"menu-list"}>
            <div className="section-kicker">Menu</div>
            <h2 className="section-title">Getränke & Snacks</h2>
            {/* Top Bar */}
            <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <label className="relative w-full sm:w-72">
                    <span className="sr-only">Search menu</span>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Suchen Sie nach Getränken, Labels, Preise etc…"
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
            </div>

            {/* Section quick nav – mobile only */}
            <div className="mb-3 overflow-x-auto -mx-3 px-3 sm:hidden">
                <nav className="flex gap-2 min-w-max">
                    {MENU.map((s) => (
                        <button
                            key={s.title}
                            onClick={() =>
                                document
                                    .getElementById(`sec-${s.title}`)
                                    ?.scrollIntoView({behavior: "smooth", block: "start"})
                            }
                            className="px-3 py-2 rounded-full text-sm border bg-white/70 dark:bg-zinc-800/70 shadow-sm hover:bg-white"
                        >
                            {s.title}
                        </button>
                    ))}
                </nav>
            </div>

            {/* LIST ONLY */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {filteredMenu.length === 0 && (
                    <div className="text-sm opacity-70">No matches. Try a different term.</div>
                )}

                {filteredMenu.map((s) => (
                    <section
                        key={s.title}
                        id={`sec-${s.title}`}
                        className="p-4 sm:p-6 rounded-2xl border bg-white/80 dark:bg-zinc-900 shadow-sm"
                    >
                        <h2 className="text-lg sm:text-xl font-semibold">{s.title}</h2>
                        {s.subtitle && <p className="opacity-70 text-sm">{s.subtitle}</p>}

                        <ul className="mt-3 sm:mt-4 space-y-3 text-base sm:text-sm">
                            {s.items.map((i, idx) => (
                                <li
                                    key={`${i.name}-${idx}`}
                                    className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 items-start"
                                >
                                    <div>
                                        <div className="font-medium flex items-center gap-2">
                                            {i.name}
                                            {i.badge && <Pill label={i.badge}/>}
                                        </div>
                                        {i.description && (
                                            <p className="opacity-70 leading-snug">{i.description}</p>
                                        )}
                                    </div>
                                    <div className="font-semibold tabular-nums whitespace-nowrap">
                                        {i.price}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            {/* No-JS fallback for the back/home control */}
            <noscript>
                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                    >
                        ← Home
                    </Link>
                </div>
            </noscript>
        </div>
    );
}
