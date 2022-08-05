import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        vuetify({ autoImport: true }),
        laravel([
            'resource/css/app.css',
            'resources/js/app.js',
        ]),
    ],
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            '@': '/resources/js',
        }
    },
});
