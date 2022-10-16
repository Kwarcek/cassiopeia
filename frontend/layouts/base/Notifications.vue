<template>
    <div>
        <div v-for="(notification, index) in notifications" :key="index" class="h-25 overflow-y-scroll">
            <Alert :type="notification.type" />
        </div>
    </div>
</template>

<script lang="ts">
import { useAuth } from "@/stores/auth"
import Alert from "@/components/Alert/Alert.vue"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Notifications",
    components: { Alert },
    setup() {
        const auth = useAuth()

        return {
            notifications: auth.notifications,
        }
    },
}
</script>
