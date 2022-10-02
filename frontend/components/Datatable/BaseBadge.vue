<template>
    <div
        class="px-6 h-6 rounded-full text-xs font-semibold inline-flex justify-center items-center cursor-pointer"
        :class="`bg-${color}-100 text-${color}-700 hover:bg-${color}-500 hover:text-white`"
    >
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        color: {
            type: String,
            default: "teal"
        }
    }
};
</script>
