<script setup lang="ts">
defineProps<{
  blogs: {
    title: string;
    path: string;
    date: Date;
    image: string;
    tags: string[];
  }[];
}>();
</script>

<template>
  <div class="blog-list">
    <ul class="fullscreen__list">
      <li v-for="blog in blogs" :key="blog.title" class="fullscreen__item">
        <Card :data="blog" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
// .blog-list {
//   margin-top: 3rem;
// }
</style>
