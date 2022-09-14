import '../css/app.css';
import 'remixicon/fonts/remixicon.css'

import Echo from 'laravel-echo';
import App from "@/App.vue";
import {createApp} from 'vue'
import router from "@/router/index.js";
import pinia from "@/stores/index.js";

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    authEndpoint: `//${window.location.hostname}/broadcasting/auth`,
    host: process.env.API_URL,
    key: process.env.VITE_PUSHER_APP_KEY,
    cluster: process.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: false,
    auth: {
        headers: {
            Authorization: `Bearer null`,
        },
    }
});

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');
