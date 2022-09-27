import '../css/app.css';
import 'remixicon/fonts/remixicon.css'

import Echo from 'laravel-echo';
import App from "@/App.vue";
import {createApp} from 'vue'
import router from "@/router/index.js";
import pinia from "@/stores/index.js";
import Pusher from 'pusher-js';
import moment from 'moment';
import { getBearerToken } from "@/helpers/auth";

moment.locale=import.meta.env.APP_LOCALE;
moment.defaultFormat='YYYY-MM-DD HH:mm:ss'

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    authEndpoint: `//${window.location.hostname}/broadcasting/auth`,
    host: import.meta.env.APP_URL+'/api',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    auth: {
        headers: {
            Authorization: `Bearer ${getBearerToken()}`,
        },
    }
});

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');
