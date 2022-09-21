import {defineStore} from 'pinia'
import { useRouter } from 'vue-router';
import api from '@/helpers/api.js';
import moment from 'moment';

export const useAuth = defineStore('auth', {
            state: () => ({
                isAuth: false,
                token: null,
                tokenExpirationDate: null,
                abilities: [],
                user: {},
            }),

            getters: {
                isTokenActive: (state) => {
                    if(state.tokenExpirationDate === null) {
                        return false;
                    }
                    const tokenExpiry = moment(state.tokenExpirationDate);
                    return moment().isBefore(tokenExpiry);
                },
            },

            actions: {
                setAuthToLocalStorage() {
                    localStorage.setItem('auth', JSON.stringify(this.$state));
                },
                loadAuthFromLocalStorage() {
                    const localStorageAuth = localStorage.getItem('auth');
                    if(localStorageAuth === null) return;

                    this.isAuth = localStorageAuth.isAuth;
                    this.token = localStorageAuth.token;
                    this.tokenExpirationDate = localStorageAuth.tokenExpirationDate;
                    this.abilities = localStorageAuth.abilities;
                    this.user = localStorageAuth.user;
                },
                async login() {
                    return api.post('/auth/login');
                },
                async logout() {
                    await api.post('/auth/logout');
                    await this.$reset();
                    await this.setAuthToLocalStorage();
                    useRouter.push({ name: 'login' });
                },
            }
        }
    )
;
