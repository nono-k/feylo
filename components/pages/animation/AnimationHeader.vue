<script setup lang="ts">
defineProps<{
  data: {
    title: string;
    description: string;
    update: Date;
    image: string;
  };
  category: string;
  group: string;
  groupTitle: string;
}>();
</script>

<template>
  <header class="header">
    <h1 class="header__title">{{ data.title }}</h1>
    <div class="header__wrap">
      <NuxtLink :to="`/animation/${category}/${group}`" class="header__tag">{{ groupTitle }}</NuxtLink>
      <time :datetime="parseDateTime(data.update)" class="header__time">{{ parseDateSlash(data.update) }}に最終更新</time>
    </div>
    <div class="header__img">
      <img :src="data.image" :alt="data.title" />
    </div>
    <p class="header__desc">{{ data.description }}</p>
  </header>
</template>

<style scoped lang="scss">
.header {
  margin-top: 3rem;
  &__title {
    width: fit-content;
    max-width: 1000px;
    margin-inline: auto;
    font-size: 2rem;
    font-weight: 700;
    @include mixin.mobile {
      font-size: 1.5rem;
    }
    @include mixin.phone {
      font-size: 1.25rem;
    }
  }
  &__wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  &__tag {
    font-weight: 700;
    background-color: var(--gray);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    transition: background-color 0.2s, color 0.2s;
    @include mixin.hover {
      background-color: var(--black);
      color: var(--white);
    }
    @include mixin.mobile {
      font-size: 0.875rem;
      padding: 0.25rem 1rem;
    }
  }
  &__img {
    max-width: 600px;
    margin-inline: auto;
    margin-top: 1.5rem;
    border: 4px solid var(--black);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  &__desc {
    margin-top: 2.5rem;
    max-width: 880px;
    margin-inline: auto;
    padding-inline: 40px;
    @include mixin.mobile {
      padding-inline: 0px;
    }
  }
}
</style>
