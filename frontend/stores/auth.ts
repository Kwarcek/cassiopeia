import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import api from "@/plugins/axios/api"
import moment from "moment"
import { toRaw, PropType } from "vue"
import { Ability } from "@/types";

export const useAuth = defineStore({
    id: "Auth",
    state: () => ({
        isAuth: false as boolean,
        token: null as string|null,
        tokenExpirationDate: null as string|null,
        abilities: [] as PropType<Array<Ability>>,
        user: {
            id: null,
        },
    }),

    actions: {
        setAuthToLocalStorage() {
            localStorage.setItem("auth", JSON.stringify(this.$state))
        },
        loadAuthFromLocalStorage() {
            const localStorageAuth = localStorage.getItem("auth")
            if (localStorageAuth === null) return
            const localStorageObject = JSON.parse(localStorageAuth)

            this.isAuth = localStorageObject.isAuth
            this.token = localStorageObject.token
            this.tokenExpirationDate = localStorageObject.tokenExpirationDate
            this.abilities = localStorageObject.abilities
            this.user = localStorageObject.user
        },
        async login(loginForm: any) {
            return api.post("/auth/login", loginForm)
        },
        async fetchAbilities() {
            const userId = toRaw(this.user)?.id
            if (!userId) return []
            return api.get("/permissions/abilities/" + userId)
        },
        async passwordReset(form: any) {
            return api.post("/auth/password/reset", form)
        },
        async logout() {
            await api.post("/auth/logout")
            await this.$reset()
            await this.setAuthToLocalStorage()
            await useRouter().push({ name: "auth-login" })
        },
    },

    getters: {
        isTokenExpired: (state) => {
            if (state.tokenExpirationDate === null) {
                return false
            }
            const tokenExpiry = moment(state.tokenExpirationDate)
            return moment().isBefore(tokenExpiry)
        },
    },
})
