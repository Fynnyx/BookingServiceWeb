<script lang="ts" setup>
import { useAuthStore } from '~/store/auth';
import type { User } from '~/ts/interfaces/User';

let user: User;
const config = useRuntimeConfig();
const authStore = toRefs(useAuthStore());
const token = authStore.token.value;

const response = await fetch(`${config.public.apiUrl}/api/users/me?populate[bookings][populate][0]=item`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

if (response.status === 200) {
    user = await response.json() as User;
    console.log(user);

} else {
    console.error('Error while fetching user data');
}
</script>

<template>
    <h1>Profile: {{ user.username }}</h1>

    <h2>Bookings</h2>
    <table class="booking-table">
        <tr>
            <th>ID</th>
            <th>Start</th>
            <th>End</th>
            <th>Booked at</th>
            <th>Link</th>
        </tr>
        <tr v-for="booking in user.bookings" :key="booking.id">
            <td>{{ `#${booking.id}` }}</td>
            <td>{{ booking.StartDate }}</td>
            <td>{{ booking.EndDate }}</td>
            <td>{{ booking.createdAt }}</td>
            <td><nuxt-link :to="`/store/item/${booking.item.id}`">{{ booking.item.Name }}</nuxt-link></td>
        </tr>
    </table>
</template>

<style lang="scss" scoped></style>
