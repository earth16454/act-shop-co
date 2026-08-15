import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      width: {
        frame: "77.5rem",
      },
      maxWidth: {
        frame: "77.5rem",
      },
    },
  },
} satisfies Config;

export default config;
