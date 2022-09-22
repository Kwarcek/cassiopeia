export default [
    {
        name: 'auth',
        path: '/auth',
        // component: () => import('@/views/auth/login/LoginView.vue'),
        children: [
            {
                name: 'Login',
                path: '/auth/login',
                component: () => import('@/views/auth/login/LoginView.vue')
            },
            {
                name: 'Password reset',
                path: '/auth/password/reset',
                component: () => import('@/views/auth/password/reset/PasswordResetView.vue')
            }
        ],
    },
]
