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
</script>

<template>
    <div class="content">
        <header class="header">
            <ul class="header__nav">
                <li class="header__nav__item"><nuxt-link to="/" class="header__nav__item__link">Home</nuxt-link></li>
                <li class="header__nav__item"><nuxt-link to="/store" class="header__nav__item__link">Store</nuxt-link></li>
                <li class="header__nav__item"><nuxt-link to="/about" class="header__nav__item__link">About</nuxt-link></li>
                <li v-if="!authenticated" id="loginBtn" class="header__nav__item__link">
                    <nuxt-link to="/login" >Login</nuxt-link>
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
            <h1>Footer</h1>
        </footer>
    </div>
</template>

<style lang="scss" scoped></style>
