<script setup lang="ts">
defineProps<{
  data: {
    title: string;
    description: string;
    path: string;
    image: string;
  };
}>();
</script>

<template>
  <NuxtLink :to="data.path" class="card__link">
    <div class="card__item-img">
      <img :src="data.image" :alt="data.title" />
    </div>
    <div class="card__item-body">
      <h2 class="card__item-title ff-open-sans-700">{{ data.title }}</h2>
      <p class="card__item-text">{{ data.description }}</p>
    </div>
  </Nuxtlink>
</template>

<style scoped lang="scss">
.card {
  &__link {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
    border-radius: 1.5rem;
    overflow: hidden;
    background-color: #f8f1f6;
    border: 1px solid transparent;
    transition: border-radius .3s cubic-bezier(.2,0,0,1),background-color .3s cubic-bezier(.2,0,0,1);
    @include mixin.hover {
      border-radius: 2rem;
      background-color: #dcdaf5;
      border-color: var(--black);
      .card__item-img {
        border-bottom: 1px solid var(--black)
      }
    }
  }
  &__item-img {
    height: 12.5rem;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    overflow: hidden;
    @include mixin.mobile {
      height: auto;
    }
    img {
      height: 100%;
    }
  }
  &__item-body {
    padding: 0 1.5rem 0.5rem;
    @include mixin.phone {
      padding: 0 0.5rem 0.5rem;
    }
  }
  &__item-title {
    @include mixin.mobile {
      font-size: 1rem;
    }
  }
  &__item-text {
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    line-clamp: 4;
    @include mixin.mobile {
      font-size: 0.75rem;
      -webkit-line-clamp: 2;
      line-clamp: 2;
    }
  }
}
</style>
