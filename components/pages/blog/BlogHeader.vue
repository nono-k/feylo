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
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='32' height='32' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(240,6.7%,17.6%,1)'/><path d='M40 16h-6m-4 0h-6m8 8v-6m0-4V8M8 16H2m-4 0h-6m8 8v-6m0-4V8'  stroke-linecap='square' stroke-width='1' stroke='hsla(47,80.9%,61%,1)' fill='none'/><path d='M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8'  stroke-linecap='square' stroke-width='1' stroke='hsla(4.1,89.6%,58.4%,1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
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
    padding: 0.2rem 0.75rem;
    border: 1px solid var(--black);
    border-radius: 1rem;
  }
  &__right {
    background-color: var(--purple);
    position: relative;
  }
}
</style>
