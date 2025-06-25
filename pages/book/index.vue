<script setup lang="ts">
import type { BookType } from '~/data/pages/book/bookType';
import { bookData } from '~/data/pages/book/bookData';

type SectionData = {
  title: string;
  list: BookType[];
  link: string;
  color: string;
};

const sectionData: SectionData[] = [
  {
    title: 'HTML・CSS',
    list: bookData.htmlCss.slice(0, 3),
    link: '/book/html-css',
    color: 'var(--sky-blue)',
  },
  {
    title: 'JavaScript',
    list: bookData.javascript.slice(0, 3),
    link: '/book/javascript',
    color: 'var(--yellow)',
  },
  {
    title: 'プログラミング',
    list: bookData.programming.slice(0, 3),
    link: '/book/programming',
    color: 'var(--green)',
  },
  {
    title: '数学',
    list: bookData.math.slice(0, 3),
    link: '/book/math',
    color: 'var(--blue)',
  },
  {
    title: 'デザイン',
    list: bookData.design.slice(0, 3),
    link: '/book/design',
    color: 'var(--purple)',
  },
];

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/book', label: 'おすすめ本' },
];
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />
    <div class="book">
      <BookCategoryList />

      <div class="book__main">
        <h1 class="book__title">PR おすすめ本紹介</h1>
        <p class="book__lead">管理人が読んでためになった本をまとめて紹介します<br>リンク先はAmazonの商品ページになります。</p>
        <section v-for="list in sectionData" :key="list.title" class="book__section" :style="{ '--section-color': list.color }">
          <h2 class="book__section-title">{{ list.title }}</h2>
          <ul class="book__list">
            <li v-for="item in list.list" :key="item.name" class="book__item">
              <a :href="`https://amzn.to/${item.link}`" target="_blank" class="book__link">
                <div class="book__img">
                  <img :src="`https://m.media-amazon.com/images/I/${item.image}.jpg`" :alt="item.name" />
                </div>
                <div class="book__name text-ellipsis">{{ item.name }}</div>
              </a>
            </li>
          </ul>
          <div class="book__button-wrap">
            <HoverCircleButton
              :link="list.link"
              :bg-color="list.color"
              hover-color="var(--black)"
            >
              View More
            </HoverCircleButton>
          </div>
        </section>
      </div>

      <BlogSide />
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
.book {
  display: grid;
  grid-template-columns: 16rem auto 27%;
  border-top: 1px solid var(--black);
  &__main {
    margin: 1rem 1.5rem 3rem;
  }
  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
  }
  &__lead {
    margin-top: 0.5rem;
    text-align: center;
  }
  &__section {
    margin-top: 4rem
  }
  &__section-title {
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    &::before {
      content: '';
      width: 0.5rem;
      aspect-ratio: 1;
      background-color: var(--section-color);
      border-radius: 50%;
    }
  }
  &__list {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  &__item {
    display: contents;
  }
  &__link {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 2;
    row-gap: 0.25rem;
    @include mixin.hover {
      .book__img {
        background-color: var(--section-color);
      }
    }
  }
  &__img {
    display: grid;
    place-items: center;
    padding: 1rem;
    background-color: var(--gray);
    transition: background-color 0.3s;
  }
  &__name {
    font-size: 0.875rem;
  }
  &__button-wrap {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }
}
</style>
