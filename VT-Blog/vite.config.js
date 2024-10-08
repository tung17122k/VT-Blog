import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"), // @ trỏ đến thư mục src
      "@component": path.resolve("src/component"),
    },
  },
  define: {
    // "process.env.NODE_ENV": "development", // set NODE_ENV
  },
});
