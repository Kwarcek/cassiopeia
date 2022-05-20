import App from "./App.vue";
import { createApp } from 'vue'
import moment from 'moment';
import router from './router';
import api from './helpers/api.js'
import pinia from './stores/index';

moment.locale=process.env.APP_LOCALE
moment.defaultFormat='YYYY-MM-DD HH:mm:ss'

const app = createApp(App)
    .use(pinia)
    .use(router)
    .use(api)
    .mount('#app');
