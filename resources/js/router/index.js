import {createRouter, createWebHistory } from "vue-router";
import authRoutes from '@/router/auth';
// import {useAuth} from "@/stores/auth";

const routes = [
    {
        component: () => import('@/layouts/base/BaseLayout.vue'),
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('@/views/DashboardView.vue'),
                meta: (route) => ({
                    breadCrumb: [
                        {
                            text: 'Home',
                            to: {name: 'Home'}
                        },
                        {
                            text: route.params.paramToPageB,
                            to: {
                                name: 'PageB',
                                params: {
                                    paramToPageB: route.params.paramToPageB
                                }
                            }
                        },
                        {
                            text: 'Action'
                        }

                    ]
                })
            },
            {
                path: '/users',
                name: 'users',
                component: () => import('@/views/users/UsersList.vue'),
                meta: (route) => ({
                    breadCrumb: [
                            {
                                text: 'Home',
                                to: {name: 'Home'}
                            },
                            {
                                text: route.params.paramToPageB,
                                to: {
                                    name: 'PageB',
                                    params: {
                                        paramToPageB: route.params.paramToPageB
                                    }
                                }
                            },
                            {
                                text: 'Action'
                            }

                        ]
                })
            }
        ],
        meta: {
            requiresAuth: true,
        },
    },
    ...authRoutes
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((to, from, next) => {
//     const auth = useAuth();
//     auth.loadAuthFromLocalStorage();
    // const { token, user, isTokenExpired, isAuth } = auth;
    // const token = auth.token
    // const user = auth.isTokenExpired;

    // const isRequiredAuth = to.matched.some(record => record.meta.requiresAuth);
    // console.log(auth.isAuth);
    // return next();
    // const token = auth.token;
    // const isAuth = auth.isAuth;
    // const { token } = auth;
    // console.log(token)
    // return next();

    // if (isRequiredAuth && (!isTokenExpired || !isAuth)) {
    //     return next('/auth/login');
    // }
    //
    // if (to.path === '/auth/login' && (isAuth || !isTokenExpired)) {
    //     return next('/');
    // }
    //
    // const record = to.matched[to.matched.length - 1];
    //
    // const hasPermission = record?.meta?.permission
    //     ? permission.can(record.meta.permission)
    //     : true;
    //
    // if (hasPermission === true) {
    //     return next();
    // }
    //
    // return next('/404');

// });

export default router;
