<template>
    <nav class="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start">
                    <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar"
                            class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                    >
                        <svg id="toggleSidebarMobileHamburger" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill-rule="evenodd"
                                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clip-rule="evenodd"
                            ></path>
                        </svg>
                        <svg id="toggleSidebarMobileClose" class="w-6 h-6 hidden" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <a href="#" class="text-xl font-bold flex items-center lg:ml-2.5">
                        <img src="/tailwind-logo.svg" class="h-6 mr-2"
                             alt="Windster Logo"
                        >
                        <span class="self-center whitespace-nowrap">Laravel-Vue</span>
                    </a>
                    <form action="#" method="GET" class="hidden lg:block lg:pl-32">
                        <label for="topbar-search" class="sr-only">Search</label>
                        <div class="mt-1 relative lg:w-64">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill-rule="evenodd"
                                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                          clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input type="text" name="email" id="topbar-search"
                                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                                   placeholder="Search"
                            >
                        </div>
                    </form>
                </div>
                <div class="flex items-center">
                    <button id="toggleSidebarMobileSearch" type="button"
                            class="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
                    >
                        <span class="sr-only">Search</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
<!--                    <div class="hidden lg:flex items-center">-->
<!--                        <span class="text-base font-normal text-gray-500 mr-5">Open source ❤️</span>-->
<!--                        <div class="-mb-1">-->
<!--                            <a class="github-button"-->
<!--                               href="https://github.com/themesberg/windster-tailwind-css-dashboard"-->
<!--                               data-color-scheme="no-preference: dark; light: light; dark: light;"-->
<!--                               data-icon="octicon-star" data-size="large" data-show-count="true"-->
<!--                               aria-label="Star themesberg/windster-tailwind-css-dashboard on GitHub"-->
<!--                            >Star</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <a href="#"-->
<!--                       class="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3"-->
<!--                    >-->
<!--                        <svg class="svg-inline&#45;&#45;fa fa-gem -ml-1 mr-2 h-4 w-4" aria-hidden="true" focusable="false"-->
<!--                             data-prefix="fas" data-icon="gem" role="img" xmlns="http://www.w3.org/2000/svg"-->
<!--                             viewBox="0 0 512 512"-->
<!--                        >-->
<!--                            <path fill="currentColor"-->
<!--                                  d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"-->
<!--                            ></path>-->
<!--                        </svg>-->
<!--                        Upgrade to Pro-->
<!--                    </a>-->

                    <img
                        @click="showUserDropdown = !showUserDropdown"
                        id="avatarButton"
                        type="button"
                        data-dropdown-toggle="userDropdown"
                        data-dropdown-placement="bottom-start"
                        class="w-10 h-10 rounded-full cursor-pointer"
                        src="/profile.jpg"
                        alt="User dropdown"
                    >

                    <!-- Dropdown menu -->
                    <div
                        v-if="showUserDropdown"
                        id="userDropdown"
                        class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block"
                        style="position: absolute; margin: 0; transform: translate(20px, 70px); top: 5px; right: 30px"
                        data-popper-reference-hidden=""
                        data-popper-escaped=""
                        data-popper-placement="bottom-start"
                    >
                        <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
                            <div>Bonnie Green</div>
                            <div class="font-medium truncate">name@flowbite.com</div>
                        </div>
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                            <li>
                                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                            </li>
                        </ul>
                        <div class="py-1">
                            <a
                                @click="logout"
                                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                            >
                                Sign out
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref } from 'vue'

export default {
    name: "NavBar",
    setup() {
        const showUserDropdown = ref(false);

        return {
            showUserDropdown,
        }
    },
    methods: {

    }
}
</script>

<style scoped>

</style>
