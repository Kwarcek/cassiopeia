<template>
    <div class="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Login To Your Account
        </div>
        <div class="mt-8">
            <form @submit.prevent="login">
                <div class="flex flex-col mb-2">
                    <div class="flex relative ">
                    <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <RemixIcon icon="ri-mail-fill" />
                    </span>
                        <input
                            v-model="form.email"
                            name="email"
                            type="text"
                            class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Your email"
                        />
                    </div>
                    <p v-if="errors.email" class="mb-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Some error message.</p>
                </div>
                <div class="flex flex-col mb-6">
                    <div class="flex relative ">
                        <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <RemixIcon icon="ri-lock-unlock-fill" />
                        </span>
                        <input
                            v-model="form.password"
                            name="password"
                            type="password"
                            class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Your password"
                        />
                    </div>
                    <p v-if="errors.password" class="mb-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Some error message.</p>
                </div>
                <div class="flex items-center mb-6 -mt-4">
                    <div class="flex ml-auto">
                        <a
                            class="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                            @click="$router.push({ name: 'auth-password-reset'})"
                        >
                            Forgot Your Password?
                        </a>
                    </div>
                </div>
                <div class="flex w-full">
                    <button
                        type="submit"
                        class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        @click="login"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import RemixIcon from "@/components/RemixIcon.vue";
import { useAuth } from "@/stores/auth.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
    name: 'LoginView',
    components: {RemixIcon},
    setup() {
        const form = ref({
            email: '',
            password: '',
        });

        let errors = ref([]);

        async function login() {
            try {
                const response = await useAuth().login({
                    email: form.value.email,
                    password: form.value.password
                });
                useAuth().isAuth = true;
                useAuth().token = response.data.access_token;
                useAuth().tokenExpirationDate = response.data.token_expiration_date;
                useAuth().user = response.data.user;
                useAuth().abilities = []; // todo

                await useRouter().push({name: 'dashboard'})

            } catch (exception) {
                if(typeof exception?.response?.data?.errors === 'object') {
                    this.errors = exception.response.data.errors;
                }
            }
        }

        return {
            errors,
            form,
            login,
        }
    },
};
</script>
