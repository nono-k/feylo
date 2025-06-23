<script setup lang="ts">
defineProps<{
  summaryText?: string;
  summaryList?: string[];
}>();
</script>

<template>
  <div class="blogSummary">
    <p class="blogSummary__text">{{ summaryText }}</p>
    <ul class="blogSummary__list">
      <li v-for="item in summaryList" :key="item" class="blogSummary__item">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.blogSummary {
  margin-top: 3rem;
  font-size: 1rem;
  &__text {
    display: inline-block;
    border: 1px solid var(--black);
    padding: 0.5rem 1rem;
    position: relative;
    &::before {
      content: '';
      background: var(--white);
      border-bottom: 1px solid;
      border-right: 1px solid;
      bottom: -7px;
      width: 12px;
      height: 12px;
      left: 1.25em;
      position: absolute;
      rotate: 45deg;
    }
  }
  &__list {
    margin-top: 1.5rem;
    border: 1px solid var(--black);
    padding: 1rem;
    > * + * {
      margin-top: 0.5rem;
    }
  }
  &__item {
    &::before {
      content: '✅';
      margin-right: 0.5rem;
    }
  }
}
</style>
