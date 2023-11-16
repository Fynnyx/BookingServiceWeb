import { defineStore } from 'pinia';
import type { Auth, RegisterUser } from '@/ts/interfaces/Auth';
import type { Cart } from '~/ts/interfaces/Cart';
import type { Booking } from '~/ts/interfaces/Booking';

interface UserPayloadInterface {
    identifier: string;
    password: string;
}

interface CookieUser {
    username: string;
    email: string;
    cart: Cart;
    bookings: Booking[];
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        user: null as CookieUser | null,
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

                // ToDo: Store whole user in cookie
            }
        },
        async register(user: RegisterUser): Promise<Auth | undefined> {
            const config = useRuntimeConfig(); // useRuntimeConfig new hook in nuxt 3
            const { data, pending }: any = await useFetch(`${config.public.apiUrl}/auth/local/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            this.loading = pending;

            // create a cart for the user
            const { data: cartData, pending: cartPending }: any = await useFetch(`${config.public.apiUrl}/carts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: data.value.id,
                }),
            });

            this.loading = cartPending;

            if (data.value) {

                const registeredUser = {
                    jwt: data.value.jwt,
                    user: data.value.user,
                };

                const token = useCookie('token'); // useCookie new hook in nuxt 3
                token.value = registeredUser.jwt; // set token to cookie
                this.authenticated = true; // set authenticated  state value to true

                // ToDo: Store whole user in cookie


                return registeredUser;
            }
        },
        logUserOut() {
            const token = useCookie('token'); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated  state value to false
            token.value = null; // clear the token cookie
        },
    },
});