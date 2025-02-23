import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        setupFiles: "./src/setupTest.ts", // 🚀 Sørger for at `setupTests.ts` lastes før testene
        environment: "jsdom",
        exclude: [...configDefaults.exclude, "e2e/*"], // Ekskluder eventuelle e2e-tester
    },
});
