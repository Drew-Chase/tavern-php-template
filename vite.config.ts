import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    clearScreen: false,
    server: {
        host: true,
        port: 3000,
        strictPort: true,
        hmr: {
            protocol: "ws",
            host: "localhost",
            port: 3000,
            clientPort: 3000,
            overlay: true
        },
        "proxy": {
            "/api": {
                target: "http://localhost:8000",
                changeOrigin: true,
                secure: false
            }
        },
        watch: {
            ignored: ["**/src-*/**"]
        }
    },
    build: {
        outDir: "dist/"
    }
});