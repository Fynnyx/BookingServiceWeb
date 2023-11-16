<script lang="ts" setup>
import type { Item } from '~/ts/interfaces/Item';
import type { StrapiData, StrapiDataItem } from '~/ts/interfaces/strapi/StrapiData';

const route = useRoute();

const id = route.params.id;

const item = ref<StrapiDataItem<Item>>();

onMounted(async () => {
    const response = await fetch(`http://localhost:1337/api/items/${id}?populate=*`);
    console.log(response);
    const data = await response.json() as StrapiData<Item>;
    item.value = data.data;
});

</script>

<template>
    <span>Item: {{ item?.id }}</span>
    <span>Price: {{ item?.attributes.Price }}</span>
</template>

<style lang="scss" scoped>
    
</style>
