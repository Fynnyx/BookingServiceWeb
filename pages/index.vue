<script lang="ts" setup>
import { useAuthStore } from '~/store/auth';

const authStore = storeToRefs(useAuthStore())
const user = authStore.user.value
</script>

<template>
    <h1>Welcome to Fynnyx Booking, {{ user?.Firstname }} {{ user?.Lastname }}</h1>
    <p>Take a look at our <nuxt-link to="/store">store</nuxt-link></p>
</template>

<style lang="scss" scoped></style>
