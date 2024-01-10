<script lang="ts" setup>
import type { Item } from '~/ts/interfaces/Item';
// import { mapItems } from '~/ts/classes/Mapper';
import type { StrapiData, StrapiDataCollection, StrapiDataItem } from '~/ts/interfaces/strapi/StrapiData';

const config = useRuntimeConfig();

const items = ref<StrapiDataItem<Item>[]>([]);

onMounted(async () => {
    const response = await fetch(`${config.public.apiUrl}/api/items?populate=*`);
    const data = await response.json() as StrapiDataCollection<Item>;
    items.value = data.data as StrapiDataItem<Item>[];
});

</script>

<template>
    <h1>Store</h1>
    <div class="items">
        <!-- <span>{{ items }}</span> -->
        <nuxt-link :to="`/store/item/${item.id}`" class="room-card" v-for="item in items" :key="item.id">
            <h2 class="room-card__name">{{ item.attributes.Name }}</h2>
            <span class="room-card__description">{{ item.attributes.Description.slice(0, 100) }}{{ item.attributes.Description.length > 100 ? '...' : '' }}</span>
            <span class="room-card__price">Price: {{ item.attributes.Price }}</span>
            <span class="room-card__bookings">Bookings: {{ item.attributes.bookings.data?.length }}</span>
            <img :src="`${$config.public.apiUrl}${item.attributes.Thumbnail.data?.attributes.url}`" alt="" class="room-card__thumbnail">
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
</style>
