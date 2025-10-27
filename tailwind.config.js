/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "#0b0e0e",
                panel: "#101415",
                text: "#e8ecef",
                muted: "#aeb6b8",
                accent: "#e0b341",
                accent2: "#e74c3c",
            },
            boxShadow: {
                elevated: "0 10px 30px rgba(0,0,0,.45)",
            },
            borderRadius: {
                soft: "18px",
            },
            fontFamily: {
                display: ['"Playfair Display"', "serif"],
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};
