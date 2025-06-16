<script setup lang="ts">
const { blogs } = await useBlogContents();
</script>

<template>
  <div class="blog-list__wrap container">
    <ul class="blog-list">
      <li v-for="blog in blogs" :key="blog.id">
        <CardTimeTop :data="blog" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.blog-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 2rem;
  margin-top: 3rem;
  li {
    border-right: 1px solid var(--black);
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
