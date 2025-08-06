<script setup lang="ts">
const { blogs } = await useBlogContents();
const newBlogs = computed(() => blogs.value?.slice(0, 8));
</script>

<template>
  <div class="blog-list__wrap container">
    <ul class="blog-list">
      <li v-for="blog in newBlogs" :key="blog.title">
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
  @include mixin.mobile {
    grid-template-columns: repeat(2, 1fr);
  }
  @include mixin.phone {
    grid-template-columns: 1fr;
    margin-top: 2rem;
  }
  li {
    border-right: 1px solid var(--black);
    &:nth-child(4n) {
      border-right: none;
    }
    @include mixin.phone {
      border-right: none;
    }
  }
}
</style>
