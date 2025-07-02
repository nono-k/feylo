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
    <div class="card__top">
      <time :datetime="parseDateTime(data.date)" class="card__time ff-zilla-slab-700">{{ parseDate(data.date) }}</time>
      <div class="card__img">
        <img :src="data.image" :alt="data.title" />
      </div>
    </div>
    <div class="card__bottom">
      <ul class="card__tags">
        <li v-for="tag in data.tags" :key="tag" class="card__tag">{{ tag }}</li>
      </ul>
      <h3 class="card__title text-ellipsis">{{ data.title }}</h3>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  display: inline-block;
  margin-inline: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--black);
  @include mixin.mobile {
    margin-inline: 1rem;
  }
  @include mixin.hover {
    .card__img {
      rotate: -10deg;
      scale: 0.9;
    }
  }
  &__top {
    display: grid;
    grid-template-columns: 2rem 1fr;
  }
  &__img {
    border: 1px solid var(--black);
    transition-property: rotate, scale;
    transition-duration: 0.57s;
    transition-timing-function: cubic-bezier(0.28, 2.5, 0.58, 0.73);
  }
  &__time {
    writing-mode: tb;
    scale: -1;
    text-align: right;
  }
  &__bottom {
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
    height: 46px;
    margin-top: 0.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    @include mixin.phone {
      height: auto;
    }
  }
}
</style>
