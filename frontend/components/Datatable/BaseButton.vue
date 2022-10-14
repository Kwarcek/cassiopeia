<template>
    <span
        class="rounded-md"
        :class="{
            'block w-full': block,
            'inline-flex': !block,
            'shadow-sm': !variant.includes('link'),
        }"
    >
        <button
            v-bind="$attrs"
            :type="$attrs.type || 'button'"
            :disabled="disabled || loading"
            ref="button"
            class="items-center justify-center border border-transparent font-medium rounded focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150"
            :class="{
                'text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700': variant === 'primary',
                'text-blue-600 hover:text-blue-900': variant === 'primary-link',
                'text-gray-600 hover:text-gray-900': variant === 'gray-link',
                'text-white bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700': variant === 'danger',
                'text-red-600 hover:text-red-900': variant === 'danger-link',
                'border-gray-300 text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50': variant === 'white',
                'text-xs px-2.5 py-1.5 leading-4': size === 'xs',
                'text-sm px-3 py-2 leading-4': size === 'sm',
                'text-sm px-4 py-2 leading-5': size === 'md',
                'text-base px-6 py-2 leading-6': size === 'lg',
                'text-base px-8 py-3 leading-6': size === 'xl',
                'opacity-50 cursor-not-allowed': disabled || loading,
                'inline-flex': !block,
                'w-full flex justify-center': block,
            }"
        >
            <i
                v-if="loading"
                class="ri-loader-fill"
                :class="{
                    'h-4 w-4': size === 'xs',
                    'h-5 w-5': size === 'sm',
                    'h-5 w-5': !['xs', 'sm'].includes(size),
                }"
            ></i>
            <!--      <loader-icon-->
            <!--          v-if="loading"-->
            <!--          class="spin-animation"-->
            <!--          :class="{-->
            <!--          'h-4 w-4': size === 'xs',-->
            <!--          'h-5 w-5': size === 'sm',-->
            <!--          'h-5 w-5': !['xs', 'sm'].includes(size),-->
            <!--        }"-->
            <!--      />-->

            <slot v-if="!loading"></slot>
        </button>
    </span>
</template>

<script lang="ts">
// import { LoaderIcon } from "vue-feather-icons";

export default {
    // components: {
    //     LoaderIcon
    // },
    inheritAttrs: false,
    props: {
        block: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        variant: {
            type: String,
            default: "primary", // blue|secondary|danger|danger-secondary|white
        },
        size: {
            type: String,
            default: "md", // xs|sm|md|lg|xl
        },
    },
    methods: {
        focus() {
            if (!this.$refs.button) {
                return
            }
            this.$refs.button.focus()
        },
    },
}
</script>
