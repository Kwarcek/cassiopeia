<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';
import logoDark from '../../public/layout/images/logo-dark.svg';
import logoWhite from '../../public/layout/images/logo-white.svg';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return layoutConfig.darkTheme.value ? logoWhite : logoDark;
});
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
        by
        <span class="font-medium ml-2">PrimeVue</span>
    </div>
</template>
<style lang="scss" scoped></style>
