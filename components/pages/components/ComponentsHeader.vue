<script setup lang="ts">
defineProps<{
  data: {
    title: string;
    image: string;
    description: string;
  };
}>();
</script>

<template>
  <header class="header">
    <div class="header__left">
      <h1 class="header__title ff-open-sans-700">{{ data.title }}</h1>
      <p class="header__desc">{{ data.description }}</p>
    </div>
    <div class="header__right">
      <div class="header__img">
        <img :src="data.image" :alt="data.title" />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  @include mixin.phone {
    grid-template-columns: 1fr;
  }
  &__left, &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--components-purple);
    border-radius: 1.5rem;
    padding: 3.5rem;
    @include mixin.mobile {
      padding: 2rem;
    }
  }
  &__left {
    row-gap: 1rem;
    @include mixin.mobile {
      row-gap: 0.5rem;
    }
    @include mixin.phone {
      padding-block: 1rem;
    }
  }
  &__right {
    @include mixin.phone {
      padding: 1rem;
    }
  }
  &__title {
    font-size: 3rem;
    @include mixin.mobile {
      font-size: 2rem;
    }
  }
  &__desc {
    @include mixin.mobile {
      font-size: 0.875rem;
    }
  }
}
</style>
