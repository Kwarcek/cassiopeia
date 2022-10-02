import axios from 'axios';
import { useAuth } from "@/stores/auth.js";
import { getBearerToken } from "@/helpers/auth.js";

const api = axios.create();

api.defaults.baseURL = `//${window.location.host}/api`;

api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
api.defaults.headers.common.Authorization = `Bearer ${getBearerToken()}`;

api.interceptors.request.use((request) => {
    return request;
});


api.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    const isRouteAuth = window.location.href.toLowerCase().includes('auth');

    if ([401, 403].includes(error.response.status) && !isRouteAuth) {
        await useAuth().logout();
    }

    throw error;
});

export default api;
