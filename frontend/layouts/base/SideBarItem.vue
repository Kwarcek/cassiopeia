<template>
    <li class="text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" @click="redirect">
        <button class="flex items-center p-2 text-sm font-normal" :disabled="!item.targetName">
            <slot name="prefix" class="flex-shrink-0 w-6 h-6 transition duration-75"></slot>
            <span class="flex-1 ml-3 whitespace-nowrap">
                {{ item.text }}
            </span>
            <slot name="suffix" class="inline-flex justify-center items-center px-2 ml-3"></slot>
        </button>
    </li>
</template>

<script lang="ts">
import tailwindLogo from "@/assets/images/tailwind-logo.svg"
import { PropType } from "vue"
import { useRouter } from "vue-router"

interface SidebarItem {
    text: string
    icon?: string
    targetName?: string | null
}

export default {
    name: "SideBarItem",
    props: {
        item: {
            type: Object as PropType<SidebarItem>,
            required: true,
        },
    },
    setup(props: { item: SidebarItem }) {
        const router = useRouter()

        const redirect = () => {
            if (!props.item.targetName) return
            console.log(props.item.targetName)
            router.push({ name: props.item.targetName })
        }

        return {
            redirect,
            target: props.item.targetName,
            tailwindLogo,
        }
    },
}
</script>
