<template>
    <TopBar />
    <div class="flex overflow-hidden bg-white pt-16">
        <SideBar />
        <div
            class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        >
        </div>
        <div
            class="w-full bg-gray-50 relative overflow-y-auto lg:ml-64 h-screen"
        >
            <main>
                <BreadCrumbs />
                <router-view></router-view>
            </main>
            <FooterComponent />
            <p class="text-center text-sm text-gray-500 my-10">
                &copy; 2022 <a href="#" class="hover:underline" target="_blank">Flowbite</a>.
                All rights reserved.
            </p>
        </div>
    </div>
</template>

<script setup>
import TopBar from "@/layouts/base/TopBar.vue";
import SideBar from "@/layouts/base/SideBar.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>*
