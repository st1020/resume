import { defineConfig, presetIcons, presetWind4 } from "unocss";

const progressPreflightCss = `
progress {
  border-radius:9999px;
  background-color:rgb(207 250 254);
}
progress::-webkit-progress-value {
  border-radius:9999px;
  background-color:rgb(14 116 144);
}
progress::-webkit-progress-bar {
  border-radius:9999px;
  background-color:rgb(207 250 254);
}
progress::-moz-progress-bar {
  border-radius:9999px;
  background-color:rgb(14 116 144);
}`;

export default defineConfig({
  cli: {
    entry: {
      patterns: ["templates/**/*.html", "content/**/*.toml"],
      outFile: "static/main.css",
      // @ts-ignore
      rewrite: true,
    },
  },
  preflights: [
    {
      getCSS: ({ theme }) => {
        // @ts-ignore
        const cyan100 = theme.colors.cyan[100] as string;
        // @ts-ignore
        const cyan700 = theme.colors.cyan[700] as string;
        return `
progress {
  border-radius: 9999px;
  background-color: ${cyan100};
}
progress::-webkit-progress-value {
  border-radius: 9999px;
  background-color: ${cyan700};
}
progress::-webkit-progress-bar {
  border-radius: 9999px;
  background-color: ${cyan100};
}
progress::-moz-progress-bar {
  border-radius: 9999px;
  background-color: ${cyan700};
}`;
      },
    },
  ],
  presets: [
    presetIcons(),
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
  ],
});
