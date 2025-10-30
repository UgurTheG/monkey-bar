"use client";

import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";

export default function Footer() {
    return (
        <footer
            className="
        pt-10 pb-14
        text-[var(--muted)]
        border-t border-[rgba(255,255,255,0.06)]
        bg-[radial-gradient(100%_50%_at_50%_100%,rgba(224,179,65,.06),transparent_60%)]
      "
        >
            <div
                className="
          w-[min(1100px,92%)] mx-auto
          flex flex-col items-center gap-4
          text-center
        "
            >
                <div className="social flex justify-center gap-5 text-2xl">
                    <a
                        href="https://www.instagram.com/monkeybarbalingen9/"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-500 transition-colors"
                    >
                        <SiInstagram />
                    </a>

                    <a
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
                    </a>
                </div>

                <p className="text-sm">© 2025 Monkey Bar – All rights reserved.</p>
            </div>
        </footer>
    );
}
