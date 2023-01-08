import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import api from "@/plugins/axios/api"
import moment from "moment"
import { toRaw, PropType } from "vue"
import { clone } from "lodash"

interface NotificationItem {
    type: string
    message: string
}

interface LoginForm {
    email: string
    password: string
}

interface Ability {
    ability: string
    permission: string
}

export const useAuth = defineStore({
    id: "Auth",
    state: () => ({
        isAuth: false as boolean,
        token: null as string | null,
        tokenExpirationDate: null as string | null,
        darkMode: false as boolean,
        abilities: [] as PropType<Ability[]>,
        notifications: [] as PropType<NotificationItem[]>,
        user: {
            id: null,
        },
    }),

    actions: {
        setAuthToLocalStorage(): void {
            localStorage.setItem("auth", JSON.stringify(this.$state))
        },
        loadAuthFromLocalStorage(): void {
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
