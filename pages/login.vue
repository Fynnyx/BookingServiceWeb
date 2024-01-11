<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
    identifier: '',
    password: '',
});
const messages = ref([]);
const router = useRouter();

const login = async () => {
    await authenticateUser(user.value); // call authenticateUser and pass the user object
    // redirect to homepage if user is authenticated
    if (authenticated) {
        router.push('/');
    }
};
</script>
  
<template>
    <h2>Login</h2>
    <form id="loginForm">
        <label for="uname"><b>Username</b></label>
        <input v-model="user.identifier" type="text" class="input" placeholder="Enter Username" name="uname" required />
        <label for="psw"><b>Password</b></label>
        <input v-model="user.password" type="password" class="input" placeholder="Enter Password" name="psw" required />
        <button @click.prevent="login" type="submit" class="button">Login</button>
    </form>
    <span>Dont have an account? Register <nuxt-link to="/register">here.</nuxt-link></span>
</template>

<style lang="scss" scoped>
#loginForm {
    width: 80vw;
}
</style>
