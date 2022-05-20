import {defineStore} from 'pinia'
import {toRaw} from "vue";

export const useLoggedInUser = defineStore('loggedInUser', {
            state: () => ({
                isAuth: false,
                user: null,
            }),

            getters: {
                getLoggedInUser: (state) => {
                    return state.user;
                },
                getIsAuth: (state) => {
                    return state.isAuth;
                }
            },

            actions: {
                setLoggedInUser(user) {
                    this.user = user;
                },
                setIsAuth(bool) {
                    this.isAuth = bool;
                }
            }
        }
    )
;
