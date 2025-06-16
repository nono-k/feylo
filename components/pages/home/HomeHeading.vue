<script setup lang="ts">
const props = defineProps<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  text?: string;
}>();

const tag = `h${props.level || 2}`;
</script>

<template>
  <div class="heading__wrap">
    <div class="heading__deco ff-open-sans-700">
      <slot />
    </div>
    <component :is="tag" class="heading container ff-open-sans-700">
      <slot />
    </component>
    <p v-if="text" class="text container">{{ text }}</p>
  </div>
</template>

<style scoped lang="scss">
.heading {
  font-size: 8rem;
  text-transform: uppercase;
  line-height: 1.25;
  &__deco {
    font-size: 15rem;
    height: 6.25rem;
    line-height: 0.5;
    border-top: 1px solid var(--black);
    border-bottom: 1px solid var(--black);
    text-transform: uppercase;
    overflow: hidden;
    color: var(--gray);
  }
}
</style>
