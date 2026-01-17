/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{html,ts}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4A4A4A",
                accent: "#F27830",
                "neutral-soft": "#f8f9fa",
                "brand-bg": "#3D3D3D",
            },
            fontFamily: {
                display: ["Manrope", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.375rem",
                lg: "0.75rem",
                xl: "1.25rem",
                full: "9999px",
            },
        },
    },
    plugins: [],
};
