<script lang="ts" setup>
import type { Item } from '~/ts/interfaces/Item';
// import { mapItems } from '~/ts/classes/Mapper';
import type { StrapiData, StrapiDataCollection, StrapiDataItem } from '~/ts/interfaces/strapi/StrapiData';

const config = useRuntimeConfig();

const items: Ref<StrapiDataItem<Item>[]>  = ref();

onMounted(async () => {
    const response = await fetch(`${config.public.apiUrl}/api/items?populate=*`);
    console.log(response);
    const data = await JSON.parse( await response.json()) as StrapiDataCollection<Item>;
    console.log(data);
    items.value = data.data as StrapiDataItem<Item>[];
});

</script>

<template>
    <h1>Store</h1>
    <div class="items">
        <!-- <span>{{ items }}</span> -->
        <nuxt-link :to="`/store/item/${item.id}`" class="item" v-for="item in items" :key="item.id">
            <h2>{{ item.attributes.name }}</h2>
            <span>Description: {{ item.attributes.description }}</span> <br>
            <span>Price: {{ item.attributes.price }}</span> <br>
            <span>Bookings: {{ item.attributes.bookings.data.length }}</span> <br>
            <!-- <span>{{ `localhost:1337${item.thumbnail.data.attributes.url}`}}</span> -->
            <img :src="`localhost:1337${item.attributes.thumbnail.data.attributes.url}`" alt="">
        </nuxt-link>
    </div>
</template>

<style lang="scss" scoped>
.items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.item {
    border: 3px solid $dark-pink;
    background-color: $pink;
    margin: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
