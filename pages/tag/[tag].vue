<script setup lang="ts">
import { siteConfig } from '~/utils/siteConfig';
import { BlogTags } from '~/data/blogTags';

const { siteTitle, siteImg } = siteConfig;

const route = useRoute();
const currentTagName = BlogTags.find(tag => tag.slug === route.params.tag)?.name;

const { data: blogs } = await useAsyncData(route.path, () =>
  queryCollection('blog')
    .where('tags', 'LIKE', `%${currentTagName}%`)
    .order('date', 'DESC')
    .all(),
);

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/tag', label: `${currentTagName}の記事一覧` },
];

useSeoMeta({
  title: `${currentTagName}の記事一覧 | ${siteTitle}`,
  ogTitle: `${currentTagName}の記事一覧 | ${siteTitle}`,
  description: `${currentTagName}の記事一覧です。`,
  ogDescription: `${currentTagName}の記事一覧です。`,
  ogImage: siteImg,
});
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />
    <section class="section">
      <div class="heading__wrap container">
        <h2 class="heading ff-open-sans-700">
          {{ currentTagName }}
        </h2>
        <p class="text">「{{ currentTagName }}」タグの記事一覧です。</p>
      </div>
      <BlogTagList />
      <BlogList v-if="blogs" :blogs="blogs" />
    </section>
    <section class="section">
      <Contact />
    </section>
  </main>
</template>

<style scoped lang="scss">
.heading {
  font-size: 5rem;
  line-height: 1.25;
  margin-bottom: 0.5rem;
  &__wrap {
    margin-top: 2rem;
  }
}
</style>
