import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        strictPort: true,
        hmr: {
            host: 'localhost',
            overlay: false,
        },
    },
    plugins: [
        eslintPlugin(),
        laravel({
            input: 'frontend/app.js',
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
            '@': path.resolve(__dirname, './frontend'),
        },
    }
});
