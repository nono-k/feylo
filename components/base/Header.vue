<script setup lang="ts">
defineProps<{
  backgroundColor?: string;
}>();
</script>

<template>
  <header class="header container" :style="{ backgroundColor: backgroundColor }">
    <h1 class="logo ff-zilla-slab-700-italic">
      <NuxtLink to="/">Feylo</NuxtLink>
    </h1>
    <Hamburger />
  </header>
</template>

<style scoped lang="scss">
.logo {
  font-size: 2.5rem;
  @include mixin.phone {
    font-size: 2rem;
  }
}
</style>
