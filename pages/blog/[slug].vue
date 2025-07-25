<script setup lang="ts">
import { siteConfig } from '~/utils/siteConfig';

const { siteTitle, siteUrl } = siteConfig;

const route = useRoute();
const { blog } = await useBlogContent(route.path);

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/blog', label: 'すべての記事一覧' },
  { path: `/blog/${route.path}`, label: `${blog.value?.title}` },
];

useSeoMeta({
  title: `${blog.value?.title} | ${siteTitle}`,
  ogTitle: `${blog.value?.title} | ${siteTitle}`,
  description: blog.value?.description,
  ogDescription: blog.value?.description,
  ogImage: `${siteUrl}${blog.value?.image}`,
  twitterCard: 'summary',
});
</script>

<template>
  <main v-if="blog">
    <Breadcrumb :items="breadcrumbItems" />
    <BlogHeader :blog="blog" />

    <div class="article">
      <BlogMarkdownBody>
        <p class="article__lead">{{ blog.description }}</p>

        <BlogSummary
          v-if="blog.summaryList"
          :summary-text="blog.summaryText || 'この記事でわかること'"
          :summary-list="blog.summaryList"
        />

        <Toc v-if="blog.body.toc?.links" :links="blog.body.toc.links" />

        <ContentRenderer :value="blog" class="content" />

        <SnsShare :title="blog.title" :slug="route.path" />
      </BlogMarkdownBody>

      <div class="article__aside">
        <BlogSide />
      </div>
    </div>

    <section class="section">
      <HomeHeading text="ランダムな記事">Random</HomeHeading>
      <RandomBlog />
    </section>

    <section class="section">
      <Contact />
    </section>
  </main>
</template>

<style scoped lang="scss">
.article {
  display: grid;
  grid-template-columns: 73% 27%;
  border-top: 1px solid var(--black);
  @include mixin.mobile {
    grid-template-columns: 1fr;
  }
  &__aside {
    border-left: 1px solid var(--black);
  }
}
</style>
