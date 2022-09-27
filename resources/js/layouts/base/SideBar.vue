<template>
    <aside id="sidebar"
           class="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
           aria-label="Sidebar"
    >
        <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div class="flex-1 px-3 bg-white divide-y space-y-1">
                    <ul class="space-y-2 pb-2">
                        <li>
                            <form action="#" method="GET" class="lg:hidden">
                                <label for="mobile-search" class="sr-only">Search</label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                    >
                                        <RemixIcon
                                            icon="ri-search-line"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="email"
                                        id="mobile-search"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5"
                                        placeholder="Search"
                                        disabled
                                    >
                                </div>
                            </form>
                        </li>
                        <li>
                            <a @click="$router.push({ name: 'dashboard'})"
                               class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group cursor-pointer"
                            >
                                <RemixIcon
                                    icon="ri-dashboard-fill"
                                    classes="text-2xl w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                />
                                <span class="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a @click="$router.push({ name: 'users'})"
                               class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group cursor-pointer"
                            >
                                <RemixIcon
                                    icon="ri-user-line"
                                    classes="text-2xl w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                />
                                <span class="ml-3 flex-1 whitespace-nowrap">Users</span>
                            </a>
                        </li>
                        <li>
                            <a @click="router.push({name: 'auth-logout'})"
                               class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group cursor-pointer"
                            >
                                <RemixIcon
                                    icon="ri-logout-box-line"
                                    classes="text-2xl w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                />
                                <span class="ml-3 flex-1 whitespace-nowrap">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import RemixIcon from "@/components/RemixIcon.vue";
import {useRouter} from "vue-router";

const router = useRouter();

</script>

<style scoped>

</style>
