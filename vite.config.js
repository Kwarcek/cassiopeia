// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import vue from '@vitejs/plugin-vue';
// import { resolve } from 'path';
//
// export default defineConfig({
//     server: {
//         https: false,
//         host: 'localhost',
//     },
//     plugins: [
//         laravel([
//             'resources/css/app.css',
//             'resources/js/app.js',
//         ]),
//         vue({
//             template: {
//                 transformAssetUrls: {
//                     base: null,
//                     includeAbsolute: false,
//                 },
//             },
//         }),
//     ],
//     resolve: {
//         alias: {
//             "@": resolve(__dirname, "./resources/js"),
//         }
//     },
// });

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost'
        },
    },
    plugins: [
        // basicSsl(),
        laravel({
            input: 'resources/js/app.js',
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
});
