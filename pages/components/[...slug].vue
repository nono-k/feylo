<script setup lang="ts">
import { siteConfig } from '~/utils/siteConfig';

const { siteTitle, siteUrl } = siteConfig;
const route = useRoute();
const { data } = await useComponentsContent(route.path);

definePageMeta({
  layout: 'components-layout',
});

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/components', label: 'コンポーネントまとめ' },
  { path: `/components/${route.path}`, label: `${data.value?.title}` },
];

useSeoMeta({
  title: `${data.value?.title} | ${siteTitle}`,
  ogTitle: `${data.value?.title} | ${siteTitle}`,
  description: data.value?.description,
  ogDescription: data.value?.description,
  ogImage: `${siteUrl}${data.value?.image}`,
});
</script>

<template>
  <main v-if="data">
    <div class="main">
      <div class="main__content">
        <div class="main__article">
          <ComponentsHeader :data="data" />

          <ComponentsMarkdownBody>
            <ContentRenderer :value="data" class="content" />
          </ComponentsMarkdownBody>

        </div>
        <ComponentsBreadcrumb :items="breadcrumbItems" />
      </div>

      <aside class="main__content for-large">
        <ComponentsToc v-if="data.body.toc?.links" :links="data.body.toc.links" />
      </aside>
    </div>
    <section class="contact-section">
      <Contact />
    </section>
  </main>
</template>

<style scoped lang="scss">
.main {
  background-color: var(--gray);
  padding-block: 1.25rem 6.5rem;
  padding-inline: 1rem;
  display: grid;
  grid-template-columns: 1fr 250px;
  column-gap: 1rem;
  @include mixin.mobile {
    grid-template-columns: 1fr;
  }
  @include mixin.phone {
    padding-inline: 0.5rem;
  }
  &__content {
    height: calc(100vh - 60px - 1.25rem * 2);
    background-color: var(--white);
    border-radius: 1.5rem;
    border: 1px solid var(--black);
    overflow-y: auto;
    @include mixin.phone {
      height: calc(100vh - 48px - 1.2rem * 2);
    }
    &::-webkit-scrollbar {
      width: 0.45rem;
    }
    &::-webkit-scrollbar-track {
      margin-block: 0.875rem;
    }
    &::-webkit-scrollbar-thumb {
      margin-block: 10.5rem;
      background: var(--blue);
      border-radius: 3px;
    }
  }
  &__article {
    padding-block: 1rem;
    margin-inline: 2rem;
    margin-bottom: 3.75rem;
    @include mixin.mobile {
      margin-inline: 1rem;
    }
  }
}
</style>
