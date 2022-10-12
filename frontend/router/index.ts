import { createRouter, createWebHistory } from "vue-router"
import authRoutes from "@/router/auth"
import userRoutes from "@/router/users"
import { useAuth } from "@/stores/auth"
import { usePermission } from "@/composables/permissions"

const routes = [
    {
        component: () => import("@/layouts/base/BaseLayout.vue"),
        children: [
            {
                path: "/",
                name: "dashboard",
                component: () => import("@/views/DashboardView.vue"),
                meta: {},
            },
            ...userRoutes,
        ],
        meta: {
            requiresAuth: true,
        },
    },
    ...authRoutes,
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/404View.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const auth = useAuth()
    auth.loadAuthFromLocalStorage()

    const { isTokenExpired, isAuth } = auth

    const isRequiredAuth = to.matched.some((record) => record.meta.requiresAuth)

    if (auth) {
        // todo
        return next()
    }

    if (isRequiredAuth && (!isTokenExpired || !isAuth)) {
        return next("/auth/login")
    }

    if (to.path === "/auth/login" && isAuth && !isTokenExpired) {
        return next("/")
    }

    const record = to.matched[to.matched.length - 1]

    const hasPermission = record?.meta?.permission ? usePermission().can(record.meta.permission) : true

    return hasPermission ? next() : next("/404")
})

export default router
