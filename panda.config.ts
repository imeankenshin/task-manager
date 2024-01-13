import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          "warmGray.50": {
            value: "#fafaf9"
          },
          "warmGray.100": {
            value: "#f5f5f4"
          },
          "warmGray.200": {
            value: "#e7e5e4"
          },
          "warmGray.300": {
            value: "#d6d3d1"
          },
          "warmGray.400": {
            value: "#a8a29e"
          },
          "warmGray.500": {
            value: "#78716c"
          },
          "warmGray.600": {
            value: "#57534e"
          },
          "warmGray.700": {
            value: "#44403c"
          },
          "warmGray.800": {
            value: "#292524"
          },
          "warmGray.900": {
            value: "#1c1917"
          }
        },
        sizes: {
          sm: {
            value: "24rem"
          }
        }
      }
    }
  },
  jsxFramework: "solid",

  // The output directory for your css system
  outdir: "styled-system"
});
