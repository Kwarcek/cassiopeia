<template>
    <div class="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Reset Your password
        </div>
        <div class="mt-8">
            <form @submit.prevent="resetPassword">
                <div class="flex flex-col mb-5">
                    <div class="flex relative ">
                    <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <RemixIcon icon="ri-mail-fill" />
                    </span>
                        <input
                            ref="EmailInputRef"
                            v-model="email"
                            type="text"
                            class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Your email"
                        />
                    </div>
                </div>
                <div class="flex w-full">
                    <button
                        type="submit"
                        class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        @click="resetPassword"
                    >
                        Zresetuj hasło
                    </button>
                </div>
            </form>
        </div>
        <div class="flex items-center justify-center mt-6">
            <a
                class="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white cursor-pointer"
                @click="useRouter.push({name: 'auth-login'})"
            >
                    <span class="ml-2">
                        Przejdź do logowania
                    </span>
            </a>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import api from "@/plugins/axios/api";
import RemixIcon from "@/components/RemixIcon.vue";
import { onMounted } from "vue";

export default {
    name: 'PasswordResetView',
    components: {RemixIcon},
    setup() {
        const email = ref(null);
        const EmailInputRef = ref(null);

        function resetPassword() {
            try {
                api.post('/auth/password/reset', {
                    email: email.value
                });
            } catch(exception) {
                console.log(exception)
            }
        }

        onMounted(() => {
            console.log(EmailInputRef);
        })

        return {
            EmailInputRef,
            email,
            useRouter,
            resetPassword
        }
    },
};
</script>
