<script setup lang="ts">
interface Props {
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {
  color: 'var(--yellow)',
});
</script>

<template>
  <strong class="marker" :style="{ '--markerColor': props.color }">
    <slot />
  </strong>
</template>

<style scoped lang="scss">
.marker {
  background: linear-gradient(transparent 75%, var(--markerColor) 25%);
  font-weight: 700;
}
</style>
