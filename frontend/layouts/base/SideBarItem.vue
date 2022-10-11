<template>
    <li>
        <a
            class="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            @click="$router.push({ name: item.target })"
        >
            <slot name="prefix" class="flex-shrink-0 w-6 h-6 transition duration-75"></slot>
            <span class="flex-1 ml-3 whitespace-nowrap">
                {{ item.text }}
            </span>
            <slot name="suffix" class="inline-flex justify-center items-center px-2 ml-3"></slot>
        </a>
    </li>
</template>

<script>
import tailwindLogo from "@/assets/images/tailwind-logo.svg"

export default {
    name: "SideBarItem",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    setup() {
        return {
            tailwindLogo,
        }
    },
}
</script>
