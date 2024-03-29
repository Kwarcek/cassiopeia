<template>
    <nav class="dark:bg-gray-800 w-full">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start">
                    <button class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                        <i class="ri-menu-line w-6 h-6 hidden" />
                        <i class="ri-close-line w-6 h-6 hidden" />
                    </button>
                    <form class="hidden">
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"> Search </label>
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <i class="ri-search-line w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input
                                type="search"
                                class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search"
                                required
                                disabled
                            />
                        </div>
                    </form>
                </div>
                <div class="flex items-center">
                    <div class="pr-5 flex justify-center items-center">
                        <div class="sun sun-logo" ref="SunIcon">
                            <i class="text-xl cursor-pointer ri-sun-line" @click="changeDarkMode" />
                        </div>
                        <div class="moon moon-logo" ref="MoonIcon">
                            <i class="text-xl cursor-pointer ri-moon-line" @click="changeDarkMode" />
                        </div>
                    </div>
                    <button type="button" class="hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg">
                        <span class="sr-only">Search</span>
                        <i class="ri-search-line w-6 h-6" />
                    </button>

                    <img src="/profile.jpg" class="w-10 h-10 rounded-full cursor-pointer" alt="User profile picture" @click="showUserDropdown = !showUserDropdown" />

                    <div
                        v-if="showUserDropdown"
                        class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block absolute"
                        style="margin: 0; transform: translate(20px, 70px); top: 5px; right: 30px"
                    >
                        <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
                            <div>Bonnie Green</div>
                            <div class="font-medium truncate">name@flowbite.com</div>
                        </div>
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                            <li @click="$router.push({})" class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <button class="block py-2 px-4">Settings</button>
                            </li>
                            <li @click="$router.push({})" class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <button class="block py-2 px-4">Notifications</button>
                            </li>
                        </ul>
                        <div class="py-1">
                            <a class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer" @click="auth.logout()">
                                Sign out
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { ref } from "vue"
import { useAuth } from "@/stores/auth"

export default {
    name: "TopBar",
    setup() {
        const showUserDropdown = ref<boolean>(false)

        const SunIcon = ref<HTMLElement | null>(null)
        const MoonIcon = ref<HTMLElement | null>(null)

        const auth = useAuth()

        function changeDarkMode() {
            if (SunIcon?.value?.classList) {
                SunIcon.value.classList.add("animate-sun")
            }
            if (MoonIcon?.value?.classList) {
                MoonIcon.value.classList.add("animate-moon")
            }

            if (auth.darkMode) {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
            auth.darkMode = !auth.darkMode
            // document.querySelector(".sun-logo").classList.toggle("animate-sun")
            // document.querySelector(".moon-logo").classList.toggle("animate-moon")
            // document.querySelector("body").classList.toggle("dark")
        }

        return {
            changeDarkMode,
            auth,
            showUserDropdown,
            SunIcon,
            MoonIcon,
        }
    },
}
</script>

<style scoped>
.moon-logo {
    opacity: 0;
    transform: translateY(20%) rotateZ(50deg);
    transition: all 1s ease-out;
}

.sun-logo {
    opacity: 1;
    transform: translateY(0) rotateZ(0deg);
    transition: all 1s ease-out;
}

.animate-sun {
    opacity: 0;
    transform: translateY(20%) rotateZ(100deg);
}

.animate-moon {
    opacity: 1;
    transform: translateY(0%) rotateZ(0deg);
}

/*.animate-moon path {*/
/*    fill: white;*/
/*}*/

/*.animate-sun path {*/
/*    fill: white;*/
/*}*/
</style>
