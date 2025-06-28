<script setup lang="ts">
const { randomBlogs } = await useBlogRandomContents();
</script>

<template>
  <div class="random-blog">
    <ul class="fullscreen__list">
      <li v-for="blog in randomBlogs" :key="blog.title" class="fullscreen__item">
        <ClientOnly>
          <Card :data="blog" />
        </ClientOnly>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.random-blog {
  margin-top: 3rem;
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 2rem;
  }
  &__item {
    border-right: 1px solid var(--black);
    border-top: 1px solid var(--black);
    border-bottom: 1px solid var(--black);
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
