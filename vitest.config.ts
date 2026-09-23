import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    // Mirrors tsconfig.json "paths" and vite.config.ts aliases
    alias: {
      "@shared": path.resolve(root, "shared"),
      "@": path.resolve(root, "client/src"),
    },
    // Vite tries ".js" before ".ts" by default, so a stale compiled twin such as
    // shared/schema.js would shadow shared/schema.ts. Match tsconfig "moduleResolution: bundler".
    extensions: [".ts", ".tsx", ".mts", ".js", ".mjs", ".jsx", ".json"],
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    // Client modules read import.meta.env.VITE_*; pin the production hosts so the
    // domain tests are deterministic regardless of the developer's .env.
    env: {
      VITE_APP_HOST: "app.zonvo.tech",
      VITE_SITE_HOST: "zonvo.tech",
    },
  },
});
