import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
  test: {
    globals: true,
    environment: "node",
    environmentMatchGlobs: [
      ["__tests__/components/**", "jsdom"],
    ],
  },
  resolve: {
    alias: {
      "@a365/shared": path.resolve(__dirname, "../../packages/shared/src"),
    },
  },
});
