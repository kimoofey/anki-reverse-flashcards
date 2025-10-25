// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://kimoofey.github.io",
  base: "/anki-reverse-flashcards",
  vite: {
    plugins: [tailwindcss()],
  },
});
