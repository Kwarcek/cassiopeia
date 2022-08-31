<template>
        <TopBar />
    <div class="flex overflow-hidden bg-white pt-16">
        <SideBar />
        <div
            class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
            id="sidebarBackdrop"
        >
        </div>
        <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
                <BreadCrumbs />
                <div class="pt-6 px-4">
                </div>
            </main>
            <FooterC />
            <p class="text-center text-sm text-gray-500 my-10">
                &copy; 2022 <a href="#" class="hover:underline" target="_blank">Flowbite</a>.
                All rights reserved.
            </p>
        </div>
    </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";
import FooterC from "@/components/FooterC.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";

export default {
    name: 'DashboardView',
    components: {BreadCrumbs, FooterC, SideBar, TopBar},
    setup() {

        return {
            //
        }
    },
}
</script>

<style scoped>
</style>
