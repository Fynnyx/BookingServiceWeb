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

const register = async () => {
    await registerUser(user.value); // call authenticateUser and pass the user object
    if (authenticated) {
        router.push('/');
    }
};
</script>
  
<template>
    <div>
        <div class="title">
            <h2>Login</h2>
        </div>
        <div class="container form">
            <form>
                <label for="uname"><b>Username</b></label>
                <input v-model="user.identifier" type="text" class="input" placeholder="Enter Username" name="uname"
                    required />
                <label for="psw"><b>Password</b></label>
                <input v-model="user.password" type="password" class="input" placeholder="Enter Password" name="psw"
                    required />
                <button @click.prevent="login" type="submit" class="button">Login</button>
            </form>
        </div>
    </div>
</template>