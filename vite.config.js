import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import securityPlugin from "./vite.security.plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), securityPlugin()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@api": path.resolve(__dirname, "src/api"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
});
