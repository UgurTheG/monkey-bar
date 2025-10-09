// ReservationDialog.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { de } from "date-fns/locale";
import {
    format,
    startOfToday,
} from "date-fns";
import React from "react";

registerLocale("de", de);

export default function ReservationDialog() {
    const [open, setOpen] = React.useState(false);

    const defaultDate = React.useMemo(() => {
        const d = new Date();
        d.setHours(18, 0, 0, 0);
        return d;
    }, []);

    const [dt, setDt] = React.useState<Date | null>(defaultDate);
    const today = startOfToday();

    // Öffnungszeiten (0 = Sonntag, 1 = Montag, …)
    const openingHours: Record<number, [number, number] | null> = {
        0: [18, 22], // Sonntag
        1: null,     // Montag – geschlossen
        2: null,     // Dienstag – geschlossen
        3: null,     // Mittwoch – geschlossen
        4: [18, 22], // Donnerstag
        5: [18, 26], // Freitag (02:00)
        6: [18, 26], // Samstag (02:00)
    };

    // Hilfsfunktion: verfügbare Uhrzeiten generieren (15-Minuten-Schritte)
    function generateAvailableTimes(date: Date | null): Date[] {
        if (!date) return [];
        const day = date.getDay();
        const hours = openingHours[day];
        if (!hours) return []; // geschlossen

        const [openHour, closeHour] = hours;
        const times: Date[] = [];
        const base = new Date(date);

        for (let h = openHour; h < closeHour; h++) {
            for (let m = 0; m < 60; m += 15) {
                const slot = new Date(base);
                slot.setHours(h % 24, m, 0, 0);
                times.push(slot);
            }
        }
        return times;
    }

    const availableTimes = React.useMemo(() => generateAvailableTimes(dt), [dt, generateAvailableTimes]);

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(v) => {
                setOpen(v);
                document.body.style.overflow = v ? "hidden" : "";
            }}
        >
            {/* Trigger button */}
            <Dialog.Trigger className="btn-primary bg-gradient-to-r from-yellow-600 to-yellow-400
                                 text-black font-semibold px-4 py-2 rounded-full
                                 hover:shadow-lg transition-all">
                Tisch reservieren
            </Dialog.Trigger>

            {/* Portal for modal */}
            <Dialog.Portal>
                {/* Background overlay */}
                <Dialog.Overlay
                    className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm
                     data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut"
                />

                {/* Modal content */}
                <Dialog.Content
                    className="fixed left-1/2 top-1/2 z-[9999] w-[min(560px,92vw)]
                     -translate-x-1/2 -translate-y-1/2 rounded-2xl
                     bg-neutral-900 text-white p-6 border border-neutral-800
                     shadow-[0_0_40px_rgba(0,0,0,0.6)]
                     data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut
                     focus:outline-none"
                >
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-xl font-semibold text-gold-400">
                            <i className="fa-regular fa-calendar mr-2 text-gold-400" />
                            Tisch reservieren
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-neutral-400 mb-2">
                            Bitte fülle das Formular aus, um deine Reservierungsanfrage zu senden.
                        </Dialog.Description>
                        <Dialog.Close
                            aria-label="Schließen"
                            className="text-neutral-400 hover:text-white transition-colors text-lg cursor-pointer"
                        >
                            ✕
                        </Dialog.Close>
                    </div>

                    <form
                        action="https://formsubmit.co/ugurg@outlook.de"
                        method="POST"
                        target={"_blank"}
                        onSubmit={() => {
                            setTimeout(() => setOpen(false), 300); // give browser time to send request
                        }}
                    >
                        {/* FormSubmit hidden fields */}
                        <input type="hidden" name="_subject" value="Reservierung – Monkey Bar" />
                        <input type="hidden" name="_template" value="table" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="text" name="_honey" style={{ display: "none" }} />

                        {/* DatePicker */}
                        <label className="block">
                            <span className="sr-only">Datum &amp; Uhrzeit</span>
                            <DatePicker
                                selected={dt}
                                onChange={(d) => setDt(d)}
                                locale="de"
                                showTimeSelect
                                timeIntervals={15}
                                timeCaption="Uhrzeit"
                                dateFormat="dd.MM.yyyy HH:mm"
                                placeholderText="Datum & Uhrzeit"
                                minDate={today}
                                includeTimes={availableTimes}
                                shouldCloseOnSelect
                                className="input w-full bg-neutral-800 text-white border border-neutral-700 rounded-xl
                           px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
                                popperContainer={({ children }) => <div className="z-50">{children}</div>}
                            />
                        </label>

                        {availableTimes.length === 0 && (
                            <p className="text-sm text-red-400">
                                An diesem Tag sind wir geschlossen.
                            </p>
                        )}

                        {/* Hidden formatted date/time */}
                        <input
                            type="hidden"
                            name="Datum & Uhrzeit"
                            value={dt ? format(dt, "dd.MM.yyyy HH:mm") : ""}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                                className="input bg-neutral-800 text-white border border-neutral-700 rounded-xl px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-gold-500"
                                name="Name"
                                placeholder="Name"
                                required
                            />
                            <input
                                className="input bg-neutral-800 text-white border border-neutral-700 rounded-xl px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-gold-500"
                                name="E-Mail"
                                type="email"
                                placeholder="E-Mail"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                                className="input bg-neutral-800 text-white border border-neutral-700 rounded-xl px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-gold-500"
                                name="Anzahl Personen"
                                type="number"
                                min={1}
                                max={12}
                                placeholder="Personen"
                                required
                            />
                            <input
                                className="input bg-neutral-800 text-white border border-neutral-700 rounded-xl px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-gold-500"
                                name="Telefon"
                                placeholder="Telefon (optional)"
                            />
                        </div>

                        <textarea
                            className="input bg-neutral-800 text-white border border-neutral-700 rounded-xl px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-gold-500"
                            name="Reservierungshinweis"
                            rows={3}
                            placeholder="Hinweise (optional)"
                        />

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Dialog.Close asChild>
                                <button
                                    type="button"
                                    className="px-5 py-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 transition-colors"
                                >
                                    Abbrechen
                                </button>
                            </Dialog.Close>
                            <button
                                className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-400
                           text-black font-semibold shadow-md hover:shadow-lg transition-all"
                                type="submit"
                            >
                                Anfrage senden
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
