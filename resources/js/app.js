import App from "@/App.vue";
import { createApp } from 'vue'
import router from '@/router';
import api from '@/helpers/api.js';
import pinia from '@/stores/index';
import vuetify from "./plugins/vuetify";

const app = createApp(App)
    .use(pinia)
    .use(router)
    .use(api)
    .use(vuetify)
    .mount('#app');
