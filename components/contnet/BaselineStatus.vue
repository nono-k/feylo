<script setup lang="ts">
if (import.meta.client) {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://cdn.jsdelivr.net/npm/baseline-status@1/baseline-status.min.js';
  document.head.appendChild(script);
}

const props = defineProps<{
  featureId: string;
}>();
</script>

<template>
  <baseline-status :feature-id="props.featureId"></baseline-status>
</template>

<style scoped lang="scss">
baseline-status {
  margin-block: 2rem;
  margin-inline: auto;
  padding-top: 1rem;
  padding-inline: 1.5rem;
}
</style>
