export default [
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users/UsersList.vue'),
        meta: {},
    }
]
