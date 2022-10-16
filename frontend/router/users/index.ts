export default [
    {
        path: "/users",
        name: "users-list",
        component: () => import("@/views/user/UsersList.vue"),
        meta: {
            permission: "user.index",
        },
    },
]
