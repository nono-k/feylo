<script setup lang="ts">
import { siteConfig } from '~/utils/siteConfig';

const { siteTitle } = siteConfig;

const { blogs } = await useBlogContents();

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/blog', label: 'すべての記事一覧' },
];

useSeoMeta({
  title: `すべての記事一覧 | ${siteTitle}`,
  ogTitle: `すべての記事一覧 | ${siteTitle}`,
  description: 'すべての記事一覧です。',
  ogDescription: 'すべての記事一覧です。',
  ogImage: '/ogp.png',
});
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
