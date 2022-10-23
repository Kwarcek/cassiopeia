import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import api from "@/plugins/axios/api"
import moment from "moment"
import { toRaw, PropType } from "vue"
import Ability from "@/interfaces/Ability.interface"
import LoginForm from "@/interfaces/LoginForm.interface"
import NotificationItem from "@/interfaces/NotificationItem.interface"
import { clone } from "lodash"

export const useAuth = defineStore({
    id: "Auth",
    state: () => ({
        isAuth: false as boolean,
        token: null as string | null,
        tokenExpirationDate: null as string | null,
        darkMode: false as boolean,
        abilities: [] as PropType<Array<Ability>>,
        notifications: [] as PropType<Array<NotificationItem>>,
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
        async login(loginForm: LoginForm) {
            return api.post("/auth/login", loginForm)
        },
        async fetchAbilities() {
            const userId = toRaw(this.user)?.id
            if (!userId) return []
            return await api.get("/permissions/abilities/" + userId)
        },
        async passwordReset(email: string) {
            return api.post("/auth/password/reset", {
                email: email,
            })
        },
        async logout() {
            const router = useRouter()
            await api.post("/auth/logout")
            const darkMode = clone(this.darkMode)
            await this.$reset()
            this.darkMode = darkMode
            await this.setAuthToLocalStorage()
            await router.push({ name: "auth-login" })
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
