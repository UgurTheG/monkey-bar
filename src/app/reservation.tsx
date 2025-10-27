"use client";

import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Cal = dynamic(() => import("@calcom/embed-react").then(m => m.default), { ssr: false });
import { getCalApi } from "@calcom/embed-react";

export default function ReservationDialog() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        (async () => {
            const cal = await getCalApi();
            cal("ui", {
                theme: "dark",
                styles: { branding: { brandColor: "#f59e0b" } },
            });
        })();
    }, [open]);

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(v) => {
                setOpen(v);
                document.body.style.overflow = v ? "hidden" : "";
            }}
        >
            <Dialog.Trigger className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-semibold px-4 py-2 rounded-full">
                Tisch reservieren
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm" />

                {/* Full-screen on mobile; card on desktop */}
                <Dialog.Content
                    className="
            fixed z-[9999]
            inset-0
            md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            w-screen md:w-[min(720px,92vw)]
            h-[100dvh] md:max-h-[90vh]
            rounded-none md:rounded-2xl
            bg-neutral-900 text-white border border-neutral-800
            p-0
            flex flex-col               /* <-- make it a column */
          "
                >
                    {/* Header (non-scrolling) */}
                    <div className="shrink-0 h-14 px-4 border-b border-neutral-800 flex items-center justify-between">
                        <Dialog.Title className="text-lg font-semibold">Tisch reservieren</Dialog.Title>
                        <Dialog.Close className="text-neutral-400 hover:text-white">✕</Dialog.Close>
                    </div>

                    {/* Scroll container */}
                    <div
                        className="
              grow min-h-0               /* allows child to shrink and enable scroll */
              overflow-y-auto            /* <-- enables scrolling */
              [-webkit-overflow-scrolling:touch]  /* smooth iOS scroll */
            "
                    >
                        {/* No forced 100% height on Cal — let it size and let THIS div scroll */}
                        <Cal
                            calLink="monkeybarbalingen/monkey-bar-balingen"
                            calOrigin="https://cal.com"

                        />
                    </div>

                    {/* Optional fallback link */}
                    <div className="md:hidden text-center text-xs text-neutral-400 py-2">
                        Lädt nicht?
                        <a
                            href="https://cal.com/monkeybarbalingen/monkey-bar-balingen/tischreservierung"
                            target="_blank"
                            rel="noreferrer"
                            className="text-yellow-400 underline ml-1"
                        >
                            Kalender in neuem Tab öffnen
                        </a>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
