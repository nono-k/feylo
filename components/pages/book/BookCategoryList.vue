<script setup lang="ts">
import { bookCategory } from '~/data/pages/book/bookCategory';
</script>

<template>
  <aside class="book-category">
    <ul class="book-category__list">
      <li v-for="list, i in bookCategory" :key="list.name" class="book-category__item">
        <span class="book-category__num ff-zilla-slab-700-italic">{{ `0${i+1}` }}</span>
        <NuxtLink
          :to="`/book/${list.slug}`"
          class="book-category__link"
          :style="`background: ${list.color}`"
        >
          {{ list.name }}
          <span class="book-category__img"><img :src="list.image"></span>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.book-category {
  border-right: 1px solid var(--black);
  &__item {
    display: grid;
    grid-template-columns: 1.875rem 1fr;
    border-bottom: 1px solid var(--black);
  }
  &__num {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--black);
    font-size: 0.875rem;
  }
  &__link {
    display: flex;
    padding: 3rem 0.5rem;
    font-weight: 700;
    position: relative;
    @include mixin.hover {
      .book-category__img {
        rotate: 6deg;
        box-shadow: 0 0 10px var(--white);
        filter: contrast(1.2);
      }
    }
  }
  &__img {
    display: block;
    position: absolute;
    right: 1.25rem;
    top: 50%;
    translate: 0 -50%;
    width: 3.75rem;
    border: 1px solid var(--black);
    rotate: 3deg;
    transition: 0.3s;
  }
}
</style>
