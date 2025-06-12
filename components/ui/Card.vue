<script setup lang="ts">
defineProps<{
  data: {
    title: string;
    path: string;
    date: Date;
    image: string;
    tags: string[];
  };
}>();
</script>

<template>
  <NuxtLink :to="`${data.path}`" class="card">
    <div class="card__img">
      <img :src="data.image" :alt="data.title" />
    </div>
    <div class="card__body">
      <ul class="card__tags">
        <li v-for="tag in data.tags" :key="tag" class="card__tag">{{ tag }}</li>
      </ul>
      <h3 class="card__title">{{ data.title }}</h3>
      <time :datetime="`${data.date}`" class="card__time ff-zilla-slab-700">{{ parseDate(data.date) }}</time>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  display: inline-block;
  padding: 2rem;
  @include mixin.hover {
    .card__img {
      rotate: -10deg;
      scale: 0.9;
    }
  }
  &__img {
    border: 1px solid var(--black);
    transition-property: rotate, scale;
    transition-duration: 0.57s;
    transition-timing-function: cubic-bezier(0.28, 2.5, 0.58, 0.73);
  }
  &__time {
    display: block;
    text-align: right;
  }
  &__body {
    margin-top: 0.5rem;
  }
  &__tags {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  &__tag {
    font-size: 0.75rem;
    padding: 0.18rem 0.5rem;
    border: 1px solid var(--black);
    border-radius: 0.75rem;
  }
  &__title {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
  }
}
</style>
