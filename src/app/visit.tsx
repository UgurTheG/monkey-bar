"use client";

import React from "react";

export default function Visit() {
    return (
        <section id="visit" className={"py-[86px]"}>
            <div className="wrap">
                <div className="section-kicker">Besuch</div>
                <h2 className="section-title">Öffnungszeiten & Anfahrt</h2>
                <div className="hours">
                    <div className="card panel reveal">
                        <h3 style={{marginTop: 0}}>Öffnungszeiten</h3>
                        <table>
                            <tbody>
                            <tr>
                                <td>Montag–Mittwoch</td>
                                <td>geschlossen</td>
                            </tr>
                            <tr>
                                <td>Donnerstag</td>
                                <td>18:00 – 22:00</td>
                            </tr>
                            <tr>
                                <td>Freitag</td>
                                <td>18:00 – 02:00</td>
                            </tr>
                            <tr>
                                <td>Samstag</td>
                                <td>18:00 – 02:00</td>
                            </tr>
                            <tr>
                                <td>Sonntag</td>
                                <td>18:00 – 22:00</td>
                            </tr>
                            </tbody>
                        </table>
                        <p style={{marginTop: 10}}>
                            Telefon: <a href="tel:+491234567890">+49 123 456 7890</a><br/>
                            E-Mail: <a href="mailto:hello@monkeybar.example">hello@monkeybar.example</a>
                        </p>
                    </div>
                    <div className="reveal">
                        <div className="map">
                            <iframe
                                title="Karte – Monkey Bar"
                                width="100%"
                                height="100%"
                                style={{border: 0}}
                                loading="lazy"
                                allowFullScreen
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2655.4986719885956!2d8.850288913083945!3d48.27402147113914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a0716dc2464a1%3A0x73046239dbd239b7!2s%C3%96lbergstra%C3%9Fe%209%2C%2072336%20Balingen!5e0!3m2!1sde!2sde!4v1759997684390!5m2!1sde!2sde"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}