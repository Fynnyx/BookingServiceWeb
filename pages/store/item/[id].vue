<script lang="ts" setup>
const route = useRoute();

const id = ref(route.params.id);
</script>

<template>
    <span>Item: {{ id }}</span>
</template>

<style lang="scss" scoped>
    
</style>
