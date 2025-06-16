<script setup lang="ts">
const { blogs } = await useBlogContents();

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/blog', label: 'すべての記事一覧' },
];
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />
    <section class="section">
      <HomeHeading text="すべての記事一覧">Blog</HomeHeading>
      <BlogTagList />
      <BlogList v-if="blogs" :blogs="blogs" />
    </section>
    <section class="section">
      <Contact />
    </section>
  </main>
</template>
