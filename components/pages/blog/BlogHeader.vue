<script setup lang="ts">
import { parseDate } from '~/utils/parseDate';

defineProps<{
  blog: {
    title: string;
    image: string;
    date: Date;
    tags: string[];
  };
}>();
</script>

<template>
  <header class="blog-header">
    <div class="blog-header__left">
      <div class="blog-header__left-wrap">
        <div class="blog-header__date-wrap">
          <Icon name="material-symbols:calendar-today-outline-rounded" />
          <time :datetime="parseDateTime(blog.date)" class="blog-header__date">{{ parseDate(blog.date) }}</time>
        </div>
        <h1 class="blog-header__title">{{ blog.title }}</h1>
        <div class="blog-header__tag-wrap">
          <p class="blog-header__tag-label ff-zilla-slab-700-italic">TAG:</p>
          <ul class="blog-header__tags">
            <li v-for="tag in blog.tags" :key="tag" class="blog-header__tag">
              <NuxtLink :to="`/tag/${getTagSlug(tag)}`" class="blog-header__tag-link">#{{ tag }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="blog-header__right for-large">
      <BlogCube :image="blog.image" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.blog-header {
  display: grid;
  grid-template-columns: 73% 27%;
  border-top: 1px solid var(--black);
  height: 28rem;
  background-image: url("/images/common/blog-header-bg.jpg");
  @include mixin.mobile {
    grid-template-columns: 1fr;
    height: 18rem;
  }
  @include mixin.phone {
    height: 16rem;
  }

  &__left {
    align-self: center;
    padding-inline: 1.75rem;
    @include mixin.mobile {
      padding-inline: 1rem;
    }
    @include mixin.phone {
      padding-inline: 0;
    }
  }
  &__left-wrap {
    background-color: var(--white);
    background-image:  linear-gradient(#EBE7E7 1px, transparent 1px), linear-gradient(to right, #EBE7E7 1px, #fff 1px);
    background-size: 20px 20px;
    padding: 2rem 1.5rem;
    border: 1px solid var(--black);
    @include mixin.mobile {
      padding: 1.25rem;
    }
  }
  &__title {
    font-weight: 700;
    @include mixin.mobile {
      font-size: 1.5rem;
    }
    @include mixin.mobile {
      font-size: 1.25rem;
    }
  }
  &__date-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__date {
    @include mixin.mobile {
      font-size: 0.875rem;
    }
  }
  &__tag-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  &__tags {
    display: flex;
    gap: 0.75rem;
    font-size: 0.875rem;
  }
  &__tag-link {
    font-size: 0.75rem;
    display: inline-block;
    padding: 0.25rem 0.75rem 0.35rem;
    line-height: 1;
    border: 1px solid var(--black);
    border-radius: 1rem;
  }
  &__right {
    background-color: var(--purple);
    position: relative;
  }
}
</style>
