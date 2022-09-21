import {createRouter, createWebHistory} from "vue-router";
import { useAuth } from "@/stores/auth";
import authRoutes from '@/router/auth/index.js';

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/DashboardView.vue'),
        children: [
            {
                path: '/users',
                name: 'users',
                component: () => import('@/views/users/UsersList.vue')
            }
        ],
        meta: {
            auth: true,
        },
    },
    ...authRoutes
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = useAuth();
    auth.loadAuthFromLocalStorage();
    const isRequiredAuth = to.matched.some(record => record.meta.auth);
    const { token, user, isTokenExpired, isAuth } = auth;

    if (isRequiredAuth && (!isTokenExpired || !isAuth)) {
        return next('/auth/login');
    }

    if (to.path === '/auth/login' && (isAuth || !isTokenExpired)) {
        return next('/');
    }

    const record = to.matched[to.matched.length - 1];

    const hasPermission = record?.meta?.permission
        ? permission.can(record.meta.permission)
        : true;

    if (hasPermission === true) {
        return next();
    }

    return next('/404');
});

export default router;
