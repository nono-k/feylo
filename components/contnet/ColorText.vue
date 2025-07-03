<script setup lang="ts">
interface Props {
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {
  color: 'var(--red-dark)',
});
</script>

<template>
  <span class="text" :style="{ color: props.color }">
    <slot />
  </span>
</template>

<style scoped lang="scss">
.text {
  font-weight: 500;
}
</style>
