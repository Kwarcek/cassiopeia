import {createRouter, createWebHistory} from "vue-router";
import {useLoggedInUser} from "@/stores/user";

const routes = [
    {
        path: '/',
        component: () => import('@/views/Index.vue')
    },
    {
        name: 'auth',
        path: '/auth',
        component: () => import('@/views/LoginView.vue'),
        children: [
            {
                name: 'Login',
                path: '/login',
                component: () => import('@/views/LoginView.vue')
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const store = useLoggedInUser();

    if (!store.isAuth && to.name !== 'Login') {
        next({name: 'Login'})
    }

    next();
});

export default router;
