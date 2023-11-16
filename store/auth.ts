import { defineStore } from 'pinia';

interface UserPayloadInterface {
    identifier: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
    }),

    actions: {
        async authenticateUser({ identifier, password }: UserPayloadInterface) {
            const config = useRuntimeConfig(); // useRuntimeConfig new hook in nuxt 3
            // useFetch from nuxt 3
            const { data, pending }: any = await useFetch(`${config.public.apiUrl}/api/auth/local`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    identifier,
                    password,
                },
            });
            this.loading = pending;
            if (data.value) {
                const token = useCookie('token'); // useCookie new hook in nuxt 3
                token.value = data?.value?.jwt; // set token to cookie
                this.authenticated = true; // set authenticated  state value to true
            }
        },
        logUserOut() {
            const token = useCookie('token'); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated  state value to false
            token.value = null; // clear the token cookie
        },
    },
});