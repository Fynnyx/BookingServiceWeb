<script lang="ts" setup>
import type { StrapiData } from '~/ts/interfaces/strapi/StrapiData';
import type { About } from '~/ts/interfaces/About';

const aboutText = ref<StrapiData<About>>();

onMounted(async () => {
    const response = await fetch(`http://localhost:1337/api/about/`);
    aboutText.value = await response.json() as StrapiData<About>;
});
</script>

<template>
    <h1>About</h1>

    <p>
        {{ aboutText?.data.attributes.description }}
    </p>
</template>

<style lang="scss" scoped>
    
</style>
