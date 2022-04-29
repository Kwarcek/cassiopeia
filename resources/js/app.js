import App from "./App.vue";
import { createApp } from 'vue'
import moment from 'moment';
import { createPinia } from 'pinia'
import router from './router';
import api from './helpers/api.js'

const app = createApp(App)
    .use(createPinia())
    .use(router)
    .use(api)
    .mount('#app');
