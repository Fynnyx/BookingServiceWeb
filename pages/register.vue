<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { register: registerUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
    identifier: '',
    password: '',
    Firstname: '',
    Lastname: '',
    Birthday: '',
});
const messages = ref([]);
const router = useRouter();

const register = async () => {
    await registerUser({ username: user.value.identifier, email: user.value.identifier, password: user.value.password }); // call authenticateUser and pass the user object
    if (authenticated) {
        router.push('/');
    }
};
</script>
  
<template>
    <h2>Register</h2>
    <div class="container form">
        <form id="registerForm">
            <!-- Add Firstname and Lastname -->
            <label for="fname"><b>Firstname</b></label>
            <input v-model="user.Firstname" type="text" class="input" placeholder="Enter Firstname" name="fname"
                required />
            <label for="lname"><b>Lastname</b></label>
            <input v-model="user.Lastname" type="text" class="input" placeholder="Enter Lastname" name="lname"
                required />
            <label for="bday"><b>Birthday</b></label>
            <input v-model="user.Birthday" type="date" class="input" placeholder="Enter Birthday" name="bday"
                required />
            <label for="uname"><b>Email</b></label>
            <input v-model="user.identifier" type="email" class="input" placeholder="Enter Username" name="uname"
                required />
            <label for="psw"><b>Password</b></label>
            <input v-model="user.password" type="password" class="input" placeholder="Enter Password" name="psw" required />
            <button @click.prevent="register" type="submit" class="button">Register</button>
        </form>
    </div>
</template>

<style lang="scss">
#registerForm {
    width: 80vw;
}
</style>