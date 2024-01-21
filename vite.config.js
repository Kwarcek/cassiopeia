import {defineConfig} from "vite"
import laravel from "laravel-vite-plugin"
import vue from "@vitejs/plugin-vue"
import path from "path"

export default defineConfig(({command}) => {
    return {
        publicDir: false,
        build: {
            reportCompressedSize: true,
            chunkSizeWarningLimit: 1000,
        },
        server: {
            host: "0.0.0.0",
            strictPort: true,
            watch: {
                usePolling: true,
            },
            hmr: {
                host: "localhost",
                overlay: false,
            },
        },
        clearScreen: true,
        plugins: [
            laravel({
                input: "frontend/main.js",
                refresh: true,
            }),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./frontend/src"),
                "@assets": path.resolve(__dirname, "./frontend/src/assets"),
                "@layout": path.resolve(__dirname, "./frontend/src/layout"),
                "@public": path.resolve(__dirname, "./frontend/public"),
            },
        },
    }
})

