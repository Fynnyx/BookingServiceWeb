<script lang="ts" setup>
import type { StrapiData } from '~/ts/interfaces/strapi/StrapiData';
import type { About } from '~/ts/interfaces/About';

const config = useRuntimeConfig();
const aboutText = ref<StrapiData<About>>();

onMounted(async () => {
    const response = await fetch(`${config.public.apiUrl}/api/about/`);
    aboutText.value = await response.json() as StrapiData<About>;
});
</script>

<template>
    <Markdown :source="aboutText?.data?.attributes.description ? aboutText.data.attributes.description : '*Nothing found*'" />
</template>

<style lang="scss" scoped></style>
