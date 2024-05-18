import fs from "fs/promises";
import { defineConfig, presetIcons, presetUno, transformerDirectives } from "unocss";

export default defineConfig({
  preflights: [
    {
      getCSS: () => fs.readFile("node_modules/@unocss/reset/tailwind.css", "utf-8"),
    },
  ],
  content: {
    filesystem: ["templates/**/*.html", "content/**/*.toml"],
  },
  presets: [presetUno(), presetIcons()],
  transformers: [transformerDirectives()],
});
