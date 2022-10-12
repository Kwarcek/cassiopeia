export default [
    {
        component: () => import("@/layouts/auth/AuthLayout.vue"),
        children: [
            {
                name: "auth-login",
                path: "/auth/login",
                component: () => import("@/views/auth/login/LoginView.vue"),
            },
            {
                name: "auth-logout",
                path: "/auth/logout",
                component: () => import("@/views/auth/logout/LogoutView.vue"),
            },
            {
                name: "auth-password-reset",
                path: "/auth/password/reset",
                component: () => import("@/views/auth/password/reset/PasswordResetView.vue"),
            },
        ],
    },
]
