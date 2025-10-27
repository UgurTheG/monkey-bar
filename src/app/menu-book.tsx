"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    Flame,
    Leaf,
    Nut,
    Sparkles,
    Coffee,
    CupSoda,
    Beer,
    Wine,
    Snowflake,
    ThermometerSun,
    Droplets,
    CircleSlash,
    Blend,
} from "lucide-react";

// =====================================
// Types
// =====================================

type TagId =
    | "vegan"
    | "vegetarian"
    | "gluten_free"
    | "lactose_free"
    | "nut_free"
    | "contains_nuts"
    | "halal"
    | "kosher"
    | "sugar_free"
    | "low_sugar"
    | "high_protein"
    | "mild"
    | "medium"
    | "hot"
    | "extra_hot"
    | "sweet"
    | "bitter"
    | "sour"
    | "umami"
    | "smoky"
    | "floral"
    | "fruity"
    | "herbal"
    | "citrus"
    | "house_made"
    | "signature"
    | "seasonal"
    | "limited"
    | "local"
    | "organic"
    | "single_origin"
    | "fair_trade"
    | "hot_temp"
    | "warm_temp"
    | "iced"
    | "frozen"
    | "sparkling"
    | "still"
    | "rocks"
    | "neat"
    | "up"
    | "small_plate"
    | "shareable"
    | "tap"
    | "bottle"
    | "can"
    | "carafe"
    | "light_roast"
    | "medium_roast"
    | "dark_roast"
    | "decaf"
    | "caffeinated"
    | "cold_brew"
    | "nitro"
    | "ipa"
    | "lager"
    | "stout"
    | "sour_beer"
    | "hazy"
    | "low_abv"
    | "zero_proof"
    | "dry"
    | "off_dry"
    | "sweet_wine"
    | "varietal"
    | "vintage"
    | "classic"
    | "twist";

type TagMeta = {
    label: string; // guest-facing label (DE/EN mix okay)
    emoji?: string;
    group:
        | "dietary"
        | "flavor"
        | "prep"
        | "serve"
        | "format"
        | "coffee_tea"
        | "beer_wine_cocktail";
};

// Registry (curate the most common labels for UI)
export const TAGS: Record<TagId, TagMeta> = {
    // dietary
    vegan: { label: "Vegan", emoji: "🌱", group: "dietary" },
    vegetarian: { label: "Vegetarisch", emoji: "🥗", group: "dietary" },
    gluten_free: { label: "Glutenfrei", emoji: "🚫🌾", group: "dietary" },
    lactose_free: { label: "Laktosefrei", emoji: "🥛🚫", group: "dietary" },
    nut_free: { label: "Nussfrei", emoji: "🥜🚫", group: "dietary" },
    contains_nuts: { label: "Enthält Nüsse", emoji: "🥜", group: "dietary" },
    halal: { label: "Halal", group: "dietary" },
    kosher: { label: "Koscher", group: "dietary" },
    sugar_free: { label: "Zuckerfrei", group: "dietary" },
    low_sugar: { label: "Zuckerarm", group: "dietary" },
    high_protein: { label: "Proteinreich", group: "dietary" },

    // flavor
    mild: { label: "Mild", group: "flavor" },
    medium: { label: "Mittel", group: "flavor" },
    hot: { label: "Scharf", emoji: "🌶️", group: "flavor" },
    extra_hot: { label: "Sehr scharf", group: "flavor" },
    sweet: { label: "Süß", group: "flavor" },
    bitter: { label: "Bitter", group: "flavor" },
    sour: { label: "Sauer", group: "flavor" },
    umami: { label: "Umami", group: "flavor" },
    smoky: { label: "Rauchig", group: "flavor" },
    floral: { label: "Blumig", group: "flavor" },
    fruity: { label: "Fruchtig", group: "flavor" },
    herbal: { label: "Kräutrig", group: "flavor" },
    citrus: { label: "Zitrus", group: "flavor" },

    // prep
    house_made: { label: "Hausgemacht", group: "prep" },
    signature: { label: "Signature", group: "prep" },
    seasonal: { label: "Saisonal", group: "prep" },
    limited: { label: "Limitiert", group: "prep" },
    local: { label: "Regional", group: "prep" },
    organic: { label: "Bio", group: "prep" },
    single_origin: { label: "Single Origin", group: "prep" },
    fair_trade: { label: "Fair Trade", group: "prep" },

    // serve
    hot_temp: { label: "Heiß", group: "serve" },
    warm_temp: { label: "Warm", group: "serve" },
    iced: { label: "Gekühlt", group: "serve" },
    frozen: { label: "Gefroren", group: "serve" },
    sparkling: { label: "Spritzig", group: "serve" },
    still: { label: "Still", group: "serve" },
    rocks: { label: "Auf Eis", group: "serve" },
    neat: { label: "Pur", group: "serve" },
    up: { label: "Up", group: "serve" },

    // format
    small_plate: { label: "Klein", group: "format" },
    shareable: { label: "Zum Teilen", group: "format" },
    tap: { label: "Vom Fass", group: "format" },
    bottle: { label: "Flasche", group: "format" },
    can: { label: "Dose", group: "format" },
    carafe: { label: "Karaffe", group: "format" },

    // coffee & tea
    light_roast: { label: "Helle Röstung", group: "coffee_tea" },
    medium_roast: { label: "Mittlere Röstung", group: "coffee_tea" },
    dark_roast: { label: "Dunkle Röstung", group: "coffee_tea" },
    decaf: { label: "Koffeinfrei", group: "coffee_tea" },
    caffeinated: { label: "Koffeinhaltig", group: "coffee_tea" },
    cold_brew: { label: "Cold Brew", group: "coffee_tea" },
    nitro: { label: "Nitro", group: "coffee_tea" },

    // beer, wine, cocktails
    ipa: { label: "IPA", group: "beer_wine_cocktail" },
    lager: { label: "Lager", group: "beer_wine_cocktail" },
    stout: { label: "Stout", group: "beer_wine_cocktail" },
    sour_beer: { label: "Sour", group: "beer_wine_cocktail" },
    hazy: { label: "Hazy", group: "beer_wine_cocktail" },
    low_abv: { label: "Leichter Alkohol", group: "beer_wine_cocktail" },
    zero_proof: { label: "Alkoholfrei", group: "beer_wine_cocktail" },
    dry: { label: "Trocken", group: "beer_wine_cocktail" },
    off_dry: { label: "Halbtrocken", group: "beer_wine_cocktail" },
    sweet_wine: { label: "Süß", group: "beer_wine_cocktail" },
    varietal: { label: "Rebsorte", group: "beer_wine_cocktail" },
    vintage: { label: "Jahrgang", group: "beer_wine_cocktail" },
    classic: { label: "Klassiker", group: "beer_wine_cocktail" },
    twist: { label: "Mit Twist", group: "beer_wine_cocktail" },
};

function iconForTag(id: TagId): React.ReactNode {
    const g = TAGS[id].group;
    // coarse icons by meaning
    if (id === "vegan") return <Leaf className="h-3.5 w-3.5" aria-hidden />;
    if (id === "hot" || id === "extra_hot") return <Flame className="h-3.5 w-3.5" aria-hidden />;
    if (id === "sparkling") return <CupSoda className="h-3.5 w-3.5" aria-hidden />;
    if (id === "iced" || id === "frozen") return <Snowflake className="h-3.5 w-3.5" aria-hidden />;
    if (id === "hot_temp" || id === "warm_temp") return <ThermometerSun className="h-3.5 w-3.5" aria-hidden />;
    if (id === "contains_nuts") return <Nut className="h-3.5 w-3.5" aria-hidden />;
    if (id === "sugar_free" || id === "zero_proof") return <CircleSlash className="h-3.5 w-3.5" aria-hidden />;
    if (g === "coffee_tea") return <Coffee className="h-3.5 w-3.5" aria-hidden />;
    if (id === "ipa" || id === "lager" || id === "stout" || id === "sour_beer" || id === "hazy")
        return <Beer className="h-3.5 w-3.5" aria-hidden />;
    if (id === "dry" || id === "off_dry" || id === "sweet_wine" || id === "vintage" || id === "varietal")
        return <Wine className="h-3.5 w-3.5" aria-hidden />;
    if (id === "signature") return <Sparkles className="h-3.5 w-3.5" aria-hidden />;
    if (id === "house_made") return <Blend className="h-3.5 w-3.5" aria-hidden />;
    if (g === "serve") return <Droplets className="h-3.5 w-3.5" aria-hidden />;
    return null;
}

function groupClasses(group: TagMeta["group"]) {
    switch (group) {
        case "dietary":
            return "bg-green-100/70 text-green-900 border-green-300/60 dark:bg-green-300/10 dark:text-green-200 dark:border-green-400/20";
        case "flavor":
            return "bg-amber-100/70 text-amber-900 border-amber-300/60 dark:bg-amber-300/10 dark:text-amber-200 dark:border-amber-400/20";
        case "prep":
            return "bg-indigo-100/70 text-indigo-900 border-indigo-300/60 dark:bg-indigo-300/10 dark:text-indigo-200 dark:border-indigo-400/20";
        case "serve":
            return "bg-sky-100/70 text-sky-900 border-sky-300/60 dark:bg-sky-300/10 dark:text-sky-200 dark:border-sky-400/20";
        case "format":
            return "bg-zinc-100/70 text-zinc-900 border-zinc-300/60 dark:bg-zinc-300/10 dark:text-zinc-200 dark:border-zinc-400/20";
        case "coffee_tea":
            return "bg-yellow-100/70 text-yellow-900 border-yellow-300/60 dark:bg-yellow-300/10 dark:text-yellow-200 dark:border-yellow-400/20";
        case "beer_wine_cocktail":
            return "bg-rose-100/70 text-rose-900 border-rose-300/60 dark:bg-rose-300/10 dark:text-rose-200 dark:border-rose-400/20";
    }
}

// =====================================
// Menu Types
// =====================================

type MenuItem = {
    name: string;
    description?: string;
    price: string;
    tags?: TagId[];
};

type MenuSection = {
    title: string;
    subtitle?: string;
    items: MenuItem[];
};

// =====================================
// Sample Menu (Drinks & Snacks)
// =====================================
const MENU: MenuSection[] = [
    {
        title: "Snacks",
        subtitle: "Zum Teilen & Für Zwischendurch",
        items: [
            {
                name: "Smoked Paprika Almonds",
                description: "Geräucherte Paprika, Meersalz",
                price: "€5",
                tags: ["vegan", "contains_nuts", "smoky", "shareable"],
            },
            {
                name: "Truffle Fries",
                description: "Parmesan, Trüffel-Aioli",
                price: "€8",
                tags: ["vegetarian", "umami", "shareable"],
            },
            {
                name: "Edamame",
                description: "Sesam, Meersalz",
                price: "€6",
                tags: ["vegan", "gluten_free", "house_made", "shareable"],
            },
            {
                name: "Dark Chocolate Mousse",
                description: "Espresso-Sahne, Kakaonibs",
                price: "€7",
                tags: ["vegetarian", "sweet"],
            },
        ],
    },
    {
        title: "Zero‑Proof",
        subtitle: "Erfrischend ohne Alkohol",
        items: [
            {
                name: "Cucumber Basil Spritz",
                description: "Gurke, Basilikum, Zitrus, Soda",
                price: "€7",
                tags: ["zero_proof", "sparkling", "herbal", "citrus", "iced", "house_made"],
            },
            {
                name: "Ginger-Lemon Cooler",
                description: "Ingwer, Zitrone, Honig",
                price: "€6",
                tags: ["zero_proof", "sour", "citrus", "iced"],
            },
            {
                name: "Berry Hibiscus Iced Tea",
                description: "Beeren, Hibiskus, leicht süß",
                price: "€5",
                tags: ["zero_proof", "iced", "floral", "fruity"],
            },
        ],
    },
    {
        title: "Coffee & Tea",
        subtitle: "Röstung & Infusion",
        items: [
            {
                name: "Single‑Origin Espresso",
                description: "Noten von Kakao & Kirsche",
                price: "€3",
                tags: ["single_origin", "caffeinated", "hot_temp", "dark_roast"],
            },
            {
                name: "Oat Flat White",
                description: "Hafermilch, seidig",
                price: "€4",
                tags: ["vegetarian", "caffeinated", "hot_temp", "medium_roast"],
            },
            {
                name: "Nitro Cold Brew",
                description: "Samtig, auf Stickstoff gezapft",
                price: "€5",
                tags: ["cold_brew", "nitro", "iced", "caffeinated", "single_origin"],
            },
            {
                name: "Jasmine Green Tea",
                description: "Duftend, zart blumig",
                price: "€4",
                tags: ["floral", "hot_temp", "zero_proof"],
            },
            {
                name: "Chai Latte (Decaf)",
                description: "Gewürze, Milch, cozy",
                price: "€4.50",
                tags: ["decaf", "sweet", "hot_temp"],
            },
        ],
    },
    {
        title: "Cocktails",
        subtitle: "Klassiker & Twists",
        items: [
            {
                name: "Mango-Chili Margarita",
                description: "Tequila, Mango, Limette, Chili",
                price: "€11",
                tags: ["classic", "twist", "hot", "fruity", "rocks"],
            },
            {
                name: "Negroni Sbagliato",
                description: "Mit Prosecco, bitter & spritzig",
                price: "€10",
                tags: ["classic", "sparkling", "bitter", "up"],
            },
            {
                name: "Smoky Old Fashioned",
                description: "Rauchige Note, Orange",
                price: "€12",
                tags: ["classic", "smoky", "rocks"],
            },
        ],
    },
    {
        title: "Beer & Wine",
        subtitle: "Vom Fass & aus der Flasche",
        items: [
            { name: "Hazy IPA (0,4l)", description: "Tropisch, trüb", price: "€6", tags: ["ipa", "hazy", "tap"] },
            { name: "Pils Lager (0,5l)", description: "Knackig, frisch", price: "€5", tags: ["lager", "tap"] },
            { name: "Dry Riesling", description: "Zitrus, Mineralität", price: "€7", tags: ["dry", "varietal", "bottle"] },
            { name: "Pinot Noir", description: "Kirsche, Gewürz", price: "€8", tags: ["varietal", "bottle"] },
            { name: "Stout (0,33l)", description: "Kaffee, Schokolade", price: "€4.50", tags: ["stout", "bottle"] },
        ],
    },
];

// =====================================
// Helpers
// =====================================
function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

// =====================================
// UI Bits
// =====================================
function TagPill({ id }: { id: TagId }) {
    const meta = TAGS[id];
    return (
        <span
            className={cx(
                "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
                groupClasses(meta.group)
            )}
        >
      {iconForTag(id)}
            <span>{meta.label}</span>
    </span>
    );
}

function CategoryChip({
                          title,
                          active,
                          onClick,
                      }: {
    title: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            aria-pressed={active}
            className={cx(
                "px-3 py-2 rounded-full text-sm border shadow-sm transition",
                active
                    ? "bg-amber-200/70 border-amber-300 text-amber-900 dark:bg-amber-300/15 dark:text-amber-200 dark:border-amber-400/20"
                    : "bg-white/70 dark:bg-zinc-900/60 hover:bg-white/90 dark:hover:bg-zinc-900"
            )}
        >
            {title}
        </button>
    );
}

function FilterChip({ id, active, onToggle }: { id: TagId; active: boolean; onToggle: (id: TagId) => void }) {
    const meta = TAGS[id];
    return (
        <button
            onClick={() => onToggle(id)}
            aria-pressed={active}
            className={cx(
                "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs shadow-sm transition",
                active ? "ring-2 ring-amber-400" : "",
                groupClasses(meta.group)
            )}
            title={meta.label}
        >
            {iconForTag(id)}
            <span className="whitespace-nowrap">{meta.label}</span>
        </button>
    );
}

function MenuCard({ item }: { item: MenuItem }) {
    return (
        <li className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 items-start">
            <div>
                <div className="font-medium flex items-center gap-2">
                    <span>{item.name}</span>
                </div>
                {item.description && (
                    <p className="opacity-70 leading-snug mt-0.5 text-[15px] sm:text-sm">{item.description}</p>
                )}
                {!!item.tags?.length && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.tags!.map((t) => (
                            <TagPill key={t} id={t} />
                        ))}
                    </div>
                )}
            </div>
            <div className="font-semibold tabular-nums whitespace-nowrap">{item.price}</div>
        </li>
    );
}

// A curated set of filterable tags for the UI (you can expand this)
const FILTER_TAGS: TagId[] = [
    // dietary
    "vegan",
    "vegetarian",
    "gluten_free",
    "contains_nuts",
    // flavor
    "hot",
    "mild",
    "sweet",
    "sour",
    "fruity",
    "herbal",
    "citrus",
    "smoky",
    // prep
    "house_made",
    "seasonal",
    "organic",
    "single_origin",
    // serve
    "sparkling",
    "iced",
    "hot_temp",
    "rocks",
    // coffee/tea
    "caffeinated",
    "decaf",
    "cold_brew",
    "nitro",
    // booze
    "zero_proof",
    "low_abv",
    "classic",
    "twist",
    "ipa",
    "lager",
    "stout",
    "dry",
    "off_dry",
    "sweet_wine",
];

// =====================================
// Main Component
// =====================================
export default function MenuWithTags() {
    // Category toggle (click again to clear)
    const [section, setSection] = useState<string | null>(null);
    // Tag filters (AND logic)
    const [selectedTags, setSelectedTags] = useState<TagId[]>([]);

    const categories = useMemo(() => MENU.map((s) => s.title), []);

    const toggleSection = (title: string) => {
        setSection((prev) => (prev === title ? null : title));
    };

    const toggleTag = (id: TagId) => {
        setSelectedTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
    };

    const clearTags = () => setSelectedTags([]);

    const filteredMenu = useMemo(() => {
        const base = section ? MENU.filter((s) => s.title === section) : MENU;
        if (selectedTags.length === 0) return base;

        return base
            .map((sec) => {
                const items = sec.items.filter((it) => {
                    const tags = it.tags || [];
                    return selectedTags.every((t) => tags.includes(t));
                });
                return { ...sec, items } as MenuSection;
            })
            .filter((s) => s.items.length > 0);
    }, [section, selectedTags]);

    return (
        <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-10" id="menu-list">
            {/* Header */}
                <div className="relative pb-8">
                    <div className="section-kicker">Menu</div>
                    <h2 className="section-title">Getränke & Snacks</h2>
                    <p className="mt-1.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300/80 max-w-2xl">
                        Kategorien antippen zum Filtern. Nochmals tippen um alles zu sehen. Wählen Sie Tags für präzise Filter (UND-Logik).
                    </p>
                </div>

            {/* Category Bar */}
            <div className="mb-3 overflow-x-auto -mx-3 px-3 no-scrollbar overscroll-x-contain">
                <nav className="flex gap-2 min-w-max">
                    {categories.map((title) => (
                        <CategoryChip key={title} title={title} active={section === title} onClick={() => toggleSection(title)} />
                    ))}
                </nav>
            </div>

            {/* Tag Filters */}
            <div className="mb-4 sm:mb-6 -mx-3 px-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold tracking-tight opacity-80">Tags</h3>
                    {selectedTags.length > 0 && (
                        <button onClick={clearTags} className="text-xs underline underline-offset-4 opacity-80 hover:opacity-100">
                            Filter zurücksetzen ({selectedTags.length})
                        </button>
                    )}
                </div>
                <div className="overflow-x-auto no-scrollbar overscroll-x-contain">
                    <div className="flex gap-2 min-w-max">
                        {FILTER_TAGS.map((id) => (
                            <FilterChip key={id} id={id} active={selectedTags.includes(id)} onToggle={toggleTag} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Sections */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {filteredMenu.length === 0 && (
                    <div className="text-sm opacity-70 p-6 rounded-xl border bg-white/70 dark:bg-zinc-900/60">
                        Keine Treffer. Passen Sie die Tags an oder wählen Sie eine andere Kategorie.
                    </div>
                )}

                {filteredMenu.map((s) => (
                    <section key={s.title} id={`sec-${s.title}`} className="p-4 sm:p-6 rounded-2xl border bg-white/80 dark:bg-zinc-950/60 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                        <div className="flex items-baseline justify-between gap-3">
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{s.title}</h2>
                                {s.subtitle && <p className="opacity-70 text-sm mt-0.5">{s.subtitle}</p>}
                            </div>
                        </div>

                        <ul className="mt-3 sm:mt-4 space-y-3 text-base sm:text-sm">
                            {s.items.map((i, idx) => (
                                <MenuCard key={`${i.name}-${idx}`} item={i} />
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            {/* No-JS fallback for the back/home control */}
            <noscript>
                <div className="mt-6">
                    <Link href="/" className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                        ← Home
                    </Link>
                </div>
            </noscript>
        </div>
    );
}
