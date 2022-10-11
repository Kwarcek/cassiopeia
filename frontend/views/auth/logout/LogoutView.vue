<template>
    <div></div>
</template>

<script setup>
import { onMounted } from "vue"
import { useAuth } from "@/stores/auth"

onMounted(async () => {
    await useAuth().logout()
})
</script>
