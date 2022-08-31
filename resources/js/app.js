import '../css/app.css';
import 'remixicon/fonts/remixicon.css'

import App from "@/App.vue";
import { createApp } from 'vue'
import router from "@/router/index.js";
import pinia from "@/stores/index.js";

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');
