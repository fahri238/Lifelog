import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 8080,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
