import {createRouter, createWebHistory} from "vue-router";
// import {useLoggedInUser} from "@/stores/user";
import auth from '@/router/auth.js';

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/Index.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue')
    },
    ...auth
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // const store = useLoggedInUser();

    // if (!store.isAuth && to.name !== 'Login') {
    //     next({name: 'Login'})
    // }

    next();
});

export default router;
