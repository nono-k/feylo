<script setup lang="ts">
const { blogs } = await useBlogContents();
const newBlogs = blogs.value?.slice(0, 5);
</script>

<template>
  <div class="blog-side-new-blog">
    <div class="blog-side-new-blog__title-wrap">
      <div class="blog-side-new-blog__title-group">
        <div class="blog-side-new-blog__title-sub ff-zilla-slab-700-italic">New</div>
        <div class="blog-side-new-blog__title">新着記事</div>
      </div>
    </div>
    <ul class="blog-side-new-blog__list">
      <li v-for="blog in newBlogs" :key="blog.id" class="blog-side-new-blog__item">
        <NuxtLink :to="`${blog.path}`" class="blog-side-new-blog__link">
          <div class="blog-side-new-blog__deco" />
          <div class="blog-side-new-blog__img">
            <img :src="blog.image" :alt="blog.title" />
          </div>
          <div class="blog-side-new-blog__link-text">{{ blog.title }}</div>
          <time :datetime="parseDateTime(blog.date)" class="blog-side-new-blog__date">{{ parseDate(blog.date) }}</time>
        </Nuxtlink>
      </li>
    </ul>
    <div class="blog-side-new-blog__button-wrap">
      <NuxtLink to="/blog" class="blog-side-new-blog__button ff-open-sans-700">View More</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-side-new-blog {
  &__title-wrap {
    padding-block: 1.5rem;
    border-bottom: 1px solid var(--black);
  }
  &__title-group {
    max-width: 15rem;
    margin-inline: auto;
    padding-block: 0.5rem;
    text-align: center;
    background-color: var(--orange);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 5px 5px 0 var(--black);
  }
  &__title-sub {
  }
  &__title {
    font-size: 1.2rem;
    font-weight: 700;
  }
  &__list {
    > * + * {
      border-top: 1px solid var(--black);
    }
  }
  &__link {
    display: grid;
    grid-template-columns: 60px 1fr;
    column-gap: 1rem;
    row-gap: 0.25rem;
    padding: 1rem;
    position: relative;
    @include mixin.hover {
      .blog-side-new-blog__deco {
        scale: 1;
      }
    }
  }
  &__deco {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--yellow);
    opacity: 0.8;
    z-index: -1;
    scale: 0 1;
    transform-origin: left;
    transition-property: scale;
    transition-duration: 0.4s;
  }
  &__img {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    border: 1px solid var(--black);
    aspect-ratio: 1 / 1;
  }
  &__link-text {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    font-weight: 700;
    font-size: 0.95rem;
  }
  &__date {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    font-size: 0.875rem;
  }
  &__button-wrap {
    border-top: 1px solid var(--black);
    border-bottom: 1px solid var(--black);
    text-align: center;
  }
  &__button {
    display: block;
    padding-block: 1.5rem;
    font-size: 1.2rem;
    transition: 0.4s;
    @include mixin.hover {
      background-color: var(--black);
      color: var(--white);
    }
  }
}
</style>
