import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/Dine-Restaurant-Website/",
  plugins: [react()],
  define: {
    "process.env": {
      VITE_BASE_URL: "/Dine-Restaurant-Website/",
    },
  },
});
