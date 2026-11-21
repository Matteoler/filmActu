import { FontFamily, fontSize, letterSpacing, lineHeight } from "./src/config/tailwind/fonts.cjs";
import plugin from "tailwindcss/plugin";
import grid from "./src/config/tailwind/grid.js";

const generateClassUtilities = (property, classSuffix, calculation, variants = []) => {
  const utilities = {};
  for (let i = 0; i <= 12; i++) {
    if (variants.length > 0) {
      for (const variant of variants) {
        utilities[`.span-${classSuffix}-${i}-${variant}`] = { [property]: calculation(i, variant) };
      }
    } else {
      utilities[`.span-${classSuffix}-${i}`] = { [property]: calculation(i) };
    }
  }
  return utilities;
};

const createGridVariables = (columns, gutter, margin) => {
  const windowWidth = "100vw";
  const gridWidth = `calc(${windowWidth} - 2 * ${margin}px)`;
  const columnWidth = `calc((${gridWidth} - (${columns} - 1) * ${gutter}px) / ${columns})`;
  return {
    "--columns": columns,
    "--gutter": `${gutter}px`,
    "--margin": `${margin}px`,
    "--grid-width": gridWidth,
    "--column": columnWidth,
  };
};

const createMediaGridVariables = () => ({
  ":root": createGridVariables(grid.desktop.columns, grid.desktop.gutter, grid.desktop.margin),
  "@media (max-width: 899px)": { ":root": createGridVariables(grid.tablet.columns, grid.tablet.gutter, grid.tablet.margin) },
  "@media (max-width: 459px)": { ":root": createGridVariables(grid.mobile.columns, grid.mobile.gutter, grid.mobile.margin) },
});

const config = {
  theme: {
    extend: {
      fontFamily: FontFamily,
      fontSize: fontSize,
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
    },
  },
  safelist: [],
  plugins: [
    // Ajout des variables de grille
    plugin(({ addBase }) => {
      addBase(createMediaGridVariables());
    }),

    // Ajout des utilitaires personnalisés
    plugin(({ addUtilities }) => {
      addUtilities({
        ...generateClassUtilities("width", "w", (i) => `calc(${i} * var(--column) + ${Math.max(0, i - 1)} * var(--gutter))`),
        ...generateClassUtilities("gap", "gap", (i) => `calc(${i} * var(--column) + ${Math.max(0, i - 1)} * var(--gutter))`),
        ...generateClassUtilities(
            "width",
            "w",
            (i, variant) => `calc(${i} * var(--column) + ${variant === "wide" ? i : Math.min(12, i + 1)} * var(--gutter))`,
            ["wide", "wider"]
        ),
        ...generateClassUtilities(
            "gap",
            "gap",
            (i, variant) => `calc(${i} * var(--column) + ${variant === "wide" ? i : Math.min(12, i + 1)} * var(--gutter))`,
            ["wide", "wider"]
        ),
      });
    }),
  ],
};

export default config;
