<script setup lang="ts">
import type { BookType } from '~/data/pages/book/bookType';
import { bookData } from '~/data/pages/book/bookData';

const route = useRoute();
const slug = route.params.slug[0];

let bookList: BookType[] = [];
let title: string = '';

switch (slug) {
  case 'html-css':
    bookList = bookData.htmlCss;
    title = 'HTML・CSS';
    break;
  case 'javascript':
    bookList = bookData.javascript;
    title = 'JavaScript';
    break;
  case 'programming':
    bookList = bookData.programming;
    title = 'プログラミング';
    break;
  case 'math':
    bookList = bookData.math;
    title = '数学';
    break;
  case 'design':
    bookList = bookData.design;
    title = 'デザイン';
    break;
}

const count = bookList.length;

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/book', label: 'おすすめ本' },
  { path: '/book', label: `${title}のおすすめ本` },
];
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />
    <div class="book-details">
      <BookCategoryList />

      <div class="book-details__main">
        <h1 class="book-details__title">{{ title }}を学ぶあなたにおすすめの本【{{ count }}選】紹介！</h1>
        <p class="book-details__lead">{{ title }}のおすすめ本をまとめて紹介します<br>リンク先はAmazonの商品ページになります。</p>
        <section class="book-details__section">
          <ul class="book-details__list">
            <li v-for="item in bookList" :key="item.name" class="book-details__item">
              <a :href="`https://amzn.to/${item.link}`" target="_blank" class="book-details__img">
                <img :src="`https://m.media-amazon.com/images/I/${item.image}.jpg`" :alt="item.name" />
              </a>
              <div class="book-details__right">
                <h2 class="book-details__name">{{ item.name }}</h2>
                <p class="book-details__desc">{{ item.desc }}</p>
                <a :href="`https://amzn.to/${item.link}`" target="_blank" class="book-details__link">Amazonで詳細を見る</a>
              </div>
            </li>
          </ul>
        </section>
        <SnsShare :title="title" :slug="route.path" />
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
.book-details {
  display: grid;
  grid-template-columns: 16rem auto 27%;
  border-top: 1px solid var(--black);
  &__main {
    margin: 1.5rem 0 3rem;
  }
  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }
  &__lead {
    margin-top: 0.5rem;
    text-align: center;
  }
  &__section {
    margin-top: 3rem;
    border-top: 1px solid var(--black);
  }
  &__list {

  }
  &__item {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
    border-bottom: 1px solid var(--black);
    padding: 1.5rem;
  }
  &__img {
    transition: opacity 0.3s;
    @include mixin.hover {
      opacity: 0.8;
    }
    img {
      box-shadow: 10px 16px 14px -7px rgba(128, 128, 128, 0.2);
    }
  }
  &__right {
    display: flex;
    flex-direction: column;
  }
  &__name {
    font-size: 1.15rem;
    font-weight: 700;
  }
  &__desc {
    margin-top: 0.5rem;
    font-size: 0.95rem;
  }
  &__link {
    display: inline-block;
    margin-top: auto;
    margin-left: auto;
    padding: 0.5rem 1rem;
    background-color: var(--orange);
    border: 1px solid var(--black);
    border-radius: 0.25rem;
    font-weight: 700;
    position: relative;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 45%, rgba(255, 255, 255, 0) 100%);
      transform: skewX(-45deg);
      transition: .5s;
    }
    @include mixin.hover {
      &::before {
        left: 100%;
      }
    }
  }
}
</style>
