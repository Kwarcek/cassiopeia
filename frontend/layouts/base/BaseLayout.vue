<template>
    <div class="flex overflow-hidden bg-white">
        <SideBar />
        <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"></div>
        <div class="dark:bg-gray-800 w-full bg-gray-50 relative overflow-y-auto h-screen">
            <TopBar />
            <main>
                <Notifications />
                <BreadCrumbs />
                <router-view></router-view>
            </main>
            <p class="text-center text-sm text-gray-500 my-10 dark:text-white">
                &copy; 2022 <a href="https://github.com/Kwarcek/cassiopeia" class="hover:underline" target="_blank">Cassiopeia</a>. All rights reserved.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import TopBar from "@/layouts/base/TopBar.vue"
import SideBar from "@/layouts/base/SideBar.vue"
import BreadCrumbs from "@/components/BreadCrumbs.vue"
import Notifications from "@/layouts/base/Notifications.vue"

export default {
    name: "BaseLayout",
    components: { TopBar, SideBar, BreadCrumbs, Notifications },
}
</script>
