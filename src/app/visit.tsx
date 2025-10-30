"use client";

import React from "react";

export default function Visit() {
    return (
        <section id="visit" className="py-20 overflow-x-hidden">
            <div className="wrap">
                <div className="section-kicker">Besuch</div>
                <h2 className="section-title">Öffnungszeiten & Anfahrt</h2>

                {/* stack on mobile + prevent grid-item overflow */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* allow content to shrink + wrap */}
                    <div className="min-w-0 card panel reveal p-4 break-words">
                        <h3 className="mt-0">Öffnungszeiten</h3>
                        <table className="w-full border-collapse">
                            <tbody>
                            <tr>
                                <td className="py-2 border-b border-dashed border-white/10">
                                    Montag–Mittwoch
                                </td>
                                <td className="py-2 border-b border-dashed border-white/10">
                                    geschlossen
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 border-b border-dashed border-white/10">
                                    Donnerstag
                                </td>
                                <td className="py-2 border-b border-dashed border-white/10">
                                    18:00 – 22:00
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 border-b border-dashed border-white/10">
                                    Freitag
                                </td>
                                <td className="py-2 border-b border-dashed border-white/10">
                                    18:00 – 02:00
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 border-b border-dashed border-white/10">
                                    Samstag
                                </td>
                                <td className="py-2 border-b border-dashed border-white/10">
                                    18:00 – 02:00
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 border-b border-dashed border-white/10">
                                    Sonntag
                                </td>
                                <td className="py-2 border-b border-dashed border-white/10">
                                    18:00 – 22:00
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <p className="mt-2 break-words">
                            Telefon:{" "}
                            <a className="break-all" href="tel:+491234567890">
                                +49 123 456 7890
                            </a>
                            <br />
                            E-Mail:{" "}
                            <a className="break-all" href="mailto:hello@monkeybar.example">
                                hello@monkeybar.example
                            </a>
                        </p>
                    </div>

                    {/* prevent iframe column from forcing overflow as well */}
                    <div className="min-w-0 reveal">
                        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[var(--shadow)] h-[340px]">
                            <iframe
                                title="Karte – Monkey Bar"
                                className="w-full h-full border-0"
                                loading="lazy"
                                allowFullScreen
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2655.4986719885956!2d8.850288913083945!3d48.27402147113914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a0716dc2464a1%3A0x73046239dbd239b7!2s%C3%96lbergstra%C3%9Fe%209%2C%2072336%20Balingen!5e0!3m2!1sde!2sde!4v1759997684390!5m2!1sde!2sde"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
