"use client";

import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="footer flex flex-col items-center gap-4 py-8">
            <div className="social flex gap-5 text-2xl">
                <a
                    href="https://www.instagram.com/monkeybarbalingen9/"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-500 transition-colors"
                >
                    <SiInstagram />
                </a>
            {/*    <a
                    href="#"
                    aria-label="TikTok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-800 transition-colors"
                >
                    <SiTiktok />
                </a>
                <a
                    href="#"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                >
                    <SiFacebook />
                </a>*/}
            </div>
            <p className="text-sm text-gray-500">© 2025 Monkey Bar – All rights reserved.</p>
        </footer>
    );
}
