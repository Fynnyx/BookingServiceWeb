<!-- @/components/strapi_components/blocks/RichText.vue -->
<script lang="ts" setup>

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});
</script>

<template>
    <div
      v-html="$mdRenderer.render(source)">
  </div>
</template>    