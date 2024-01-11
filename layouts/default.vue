<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const router = useRouter();


const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
    logUserOut();
    router.push('/login');
};

const authStore = storeToRefs(useAuthStore());
const user = authStore.user;
</script>

<template>
    <div class="content">
        <header class="header">
            <ul class="header__nav header__nav__left">
                <li class="header__nav__item"><nuxt-link to="/" class="header__nav__item__link">Home</nuxt-link></li>
                <li class="header__nav__item"><nuxt-link to="/store" class="header__nav__item__link">Store</nuxt-link></li>
                <li class="header__nav__item"><nuxt-link to="/about" class="header__nav__item__link">About</nuxt-link></li>

            </ul>
            <ul class="header__nav header__nav__right">
                <li class="header__nav__item" v-if="authenticated">
                    <span>Authenticated as: <b>{{ user?.username }}</b></span>
                </li>
                <li v-if="!authenticated" class="header__nav__item">
                    <nuxt-link id="loginBtn" class="header__nav__item__link" to="/login">Login</nuxt-link>
                    <nuxt-link to="/register" class="header__nav__item__link">Register</nuxt-link>
                </li>
                <li v-if="authenticated" id="logoutBtn" class="header__nav__item">
                    <nuxt-link @click="logout" class="header__nav__item__link">Logout</nuxt-link>
                </li>
            </ul>
        </header>
        <div class="mainContent">
            <slot />
        </div>
        <footer class="footer">
            <nuxt-link to="/imprint" class="footer__link">Imprint</nuxt-link>
            <nuxt-link to="/about" class="footer__link">About</nuxt-link>
            <span class="footer__item">&copy; Copyrigth 2024, <b>Fynnyx Inc.</b></span>
            <nuxt-link to="/tos" class="footer__link">Terms of Service</nuxt-link>
            <nuxt-link to="/privacy" class="footer__link">Privacy Policy</nuxt-link>
        </footer>
    </div>
</template>

<style lang="scss" scoped></style>
