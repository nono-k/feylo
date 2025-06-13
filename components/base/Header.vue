<script setup lang="ts">
defineProps<{
  backgroundColor?: string;
  isComponentsMenu?: boolean;
}>();
</script>

<template>
  <header class="header container" :style="{ backgroundColor: backgroundColor }">
    <ComponentsMenu v-if="isComponentsMenu" />
    <h1 class="logo ff-zilla-slab-700-italic">
      <NuxtLink to="/">Feylo</NuxtLink>
    </h1>
    <Hamburger />
  </header>
</template>

<style scoped lang="scss">
.logo {
  font-size: 2.5rem;
}
</style>
