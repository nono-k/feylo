<script setup lang="ts">
import type { AnimationCategoryKey } from '~/data/pages/animation/animationData';
import { animationData } from '~/data/pages/animation/animationData';
import { siteConfig } from '~/utils/siteConfig';

const { siteTitle, siteUrl } = siteConfig;

const route = useRoute();

const category = route.params.category as string;
const group = route.params.group as string;

const groupTitle = animationData[category as AnimationCategoryKey].filter(item => item.link === `${category}/${group}`)[0].title;

const { data } = await useAnimationContent(route.path);

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/animation', label: 'Webデザインアニメーション集' },
  { path: `/animation/${category}/${group}`, label: `${groupTitle}` },
  { path: `/animation/${route.path}`, label: `${data.value?.title}` },
];

useSeoMeta({
  title: `${data.value?.title} | ${siteTitle}`,
  ogTitle: `${data.value?.title} | ${siteTitle}`,
  description: `${data.value?.description}`,
  ogDescription: `${data.value?.description}`,
  ogImage: `${siteUrl}${data.value?.image}`,
});
</script>

<template>
  <main v-if="data">
    <Breadcrumb :items="breadcrumbItems" />

    <div class="article container">
      <iframe
        v-if="data.demoUrl"
        :src="data.demoUrl"
        frameborder="0"
        class="article__iframe"
      />
      <div v-if="data.demoUrl" class="article__buttons">
        <a :href="data.demoUrl" target="_blank" class="article__button">デモを見る</a>
        <a v-if="data.demoCode" :href="data.demoCode" target="_blank" class="article__button">コードを見る</a>
      </div>

      <AnimationHeader
        :data="data"
        :category="category"
        :group="group"
        :group-title="groupTitle"
      />

      <AnimationPointList v-if="data.pointList" :list="data.pointList" />

      <Toc
        v-if="data.body.toc?.links"
        :links="data.body.toc.links"
        color="orange"
      />

      <AnimationMarkdownBody>

        <ContentRenderer :value="data" class="content" />

        <SnsShare :title="data.title" :slug="route.path" />
      </AnimationMarkdownBody>
    </div>

    <section class="section">
      <Contact />
    </section>
  </main>
</template>

<style scoped lang="scss">
.article {
  margin-block: 3rem 6rem;
  &__iframe {
    width: 100%;
    height: 580px;
    border: 2px solid var(--black);
    border-radius: 0.5rem;
    @include mixin.phone {
      height: 380px;
    }
  }
  &__buttons {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  &__button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: var(--orange);
    border-radius: 0.25rem;
    border: 1px solid var(--black);
    box-shadow: 2px 2px 0 var(--black);
    font-weight: 700;
    transition: all 0.3s;
    @include mixin.hover {
      translate: 2px 2px;
      box-shadow: none;
    }
  }
}
</style>
