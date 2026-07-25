import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [tailwindcss()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/test/setup.tsx",
    },
});
