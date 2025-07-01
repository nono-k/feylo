<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import { BlogTags } from '~/data/blogTags';

register();
const route = useRoute();
</script>

<template>
  <div class="blog-tag">
    <div :class="route.path"></div>
    <ClientOnly>
      <swiper-container
        :slides-per-view="'auto'"
        :space-between="20"
        :free-mode="true"
        :loop="true"
        class="blog-tag__swiper"
      >
        <swiper-slide class="blog-tag__item">
          <NuxtLink
            to="/blog"
            :class="['blog-tag__link', route.path === '/blog' ? '-active' : '']"
          >
            All
          </NuxtLink>
        </swiper-slide>
        <swiper-slide v-for="tag in BlogTags" :key="tag.name" class="blog-tag__item">
          <NuxtLink
            :to="`/tag/${tag.slug}`"
            :class="['blog-tag__link', route.path === `/tag/${tag.slug}` ? '-active' : '']"
          >
            {{ tag.name }}
          </NuxtLink>
        </swiper-slide>

      </swiper-container>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.blog-tag {
  margin-top: 2.5rem;
  padding-block: 1.5rem;
  border-top: 1px solid var(--black);
  border-bottom: 1px solid var(--black);
  margin-bottom: -1px;
  background-color: var(--blue);
  &__item {
    width: fit-content;
  }
  &__link {
    display: inline-block;
    padding: 0.45rem 2rem;
    background-color: var(--white);
    border-radius: 1.6rem;
    font-size: 1.6rem;
    font-weight: 700;
    transition: 0.3s;
    @include mixin.mobile {
      font-size: 1.25rem;
      padding: 0.45rem 1.5rem;
    }
    &.-active {
      background-color: var(--black);
      color: var(--white);
    }
    @include mixin.hover {
      background-color: var(--black);
      color: var(--white);
    }
  }
}
</style>
