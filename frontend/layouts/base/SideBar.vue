<template>
    <aside class="w-72">
        <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-screen">
            <p class="flex items-center pl-2.5 mb-7">
                <img :src="tailwindLogo" class="mr-3 h-6 sm:h-7" alt="Laravel-Vue logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"> Laravel-Vue </span>
            </p>
            <ul class="space-y-2">
                <SideBarItem v-for="(item, index) in sidebarItems" :key="index" :item="item">
                    <template v-if="item.icon" #prefix>
                        <i :class="item.icon" class="text-xl" />
                    </template>
                </SideBarItem>
            </ul>
        </div>
    </aside>
</template>

<script lang="ts">
import tailwindLogo from "@/assets/images/tailwind-logo.svg"
import SideBarItem from "@/layouts/base/SideBarItem.vue"
import SidebarItemInterface from "@/interfaces/SidebarItem.interface"

export default {
    name: "SideBar",
    components: { SideBarItem },
    setup() {
        const sidebarItems: Array<SidebarItemInterface> = [
            {
                text: "Dashboard",
                icon: "ri-dashboard-fill",
                targetName: "dashboard",
            },
            {
                text: "Users",
                icon: "ri-user-line",
                targetName: "users-list",
            },
            {
                text: "Logout",
                icon: "ri-logout-box-line",
                targetName: "auth-logout",
            },
        ]

        return {
            tailwindLogo,
            sidebarItems,
        }
    },
}
</script>
