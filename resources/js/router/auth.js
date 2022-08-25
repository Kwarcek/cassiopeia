export default [
    {
        name: 'auth',
        path: '/auth',
        // component: () => import('@/views/auth/LoginView.vue'),
        children: [
            {
                name: 'Login',
                path: '/login',
                component: () => import('@/views/auth/LoginView.vue')
            }
        ],
    },
]
