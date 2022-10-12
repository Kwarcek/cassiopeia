<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800">
        <div class="flex flex-col items-center">
            <div class="text-indigo-500 font-bold text-7xl">404</div>

            <div class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">This page does not exist</div>

            <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">The page you are looking for could not be found.</div>

            <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                <button
                    @click="$router.push({ name: 'dashboard' })"
                    type="button"
                    class="focus:outline-none text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
                >
                    Go to dashboard
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "404View",
}
</script>
