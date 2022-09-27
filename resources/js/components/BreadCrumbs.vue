<template>
    <nav
        class="flex mt-6 ml-6" aria-label="Breadcrumb"
    >
        <ol
            class="inline-flex items-center space-x-1 md:space-x-3"
        >
            <li
                v-for="(breadCrumb, index) in breadCrumbs"
                :key="index"
                :to="breadCrumb.to"
                class="inline-flex items-center"
            >
                <span v-if="breadCrumb.icon">
                    <i class="ri-remixicon-fill"></i>
                </span>

                {{ breadCrumb.text }}
            </li>
        </ol>
    </nav>
</template>

<script>
import {computed} from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();
        const routerMeta = router.currentRoute.value.meta;
        console.log(router);
        const breadCrumbs = computed(() => {
            if (typeof routerMeta.breadCrumb === "function") {
                return routerMeta.breadCrumb.call(this, useRouter());
            }
            return routerMeta;
        })

        return {
            breadCrumbs
        }
    }
}
</script>
