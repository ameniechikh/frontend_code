module.exports = {
  darkMode: "class", // Active le mode sombre en ajoutant la classe "dark" sur <html>
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1E1E1E", // Noir clair (gris foncé)
        "dark-text": "#E0E0E0", // Texte clair sur fond sombre
      },
    },
  },
  plugins: [],
};
