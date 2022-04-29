import {createRouter, createWebHistory} from "vue-router";
import Index from '../views/Index.vue'

const routes = [
    {
        path: '/',
        components: Index,
        // component: () => import('@/views/Index.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
