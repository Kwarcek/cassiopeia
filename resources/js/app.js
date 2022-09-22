import '../css/app.css';
import 'remixicon/fonts/remixicon.css'

import Echo from 'laravel-echo';
import App from "@/App.vue";
import {createApp} from 'vue'
import router from "@/router/index.js";
import pinia from "@/stores/index.js";
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    authEndpoint: `//${window.location.hostname}/broadcasting/auth`,
    host: import.meta.env.APP_URL+'/api',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
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
