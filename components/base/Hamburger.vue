<script setup lang="ts">
import { homeArchiveList } from '~/data/pages/home/homeArchiveList';

const { blogs } = await useBlogContents();
const newBlogs = blogs.value?.slice(0, 5);

const isOpen = ref(false);

const openMenu = () => {
  isOpen.value = true;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <button class="hamburger ff-open-sans-700" @click="openMenu">
    MENU
    <span class="line-wrap">
      <span class="line" />
      <span class="line" />
      <span class="line" />
    </span>
  </button>

  <div :class="['hamburger-menu', isOpen ? 'is-open' : '']">
    <div class="hamburger-menu__marquee">
      <span class="hamburger-menu__text-marquee ff-zilla-slab-700">contact contact</span>
      <span class="hamburger-menu__text-marquee ff-zilla-slab-700">contact contact</span>
      <span class="hamburger-menu__text-marquee ff-zilla-slab-700">contact contact</span>
    </div>
    <div class="hamburger-menu__body">
      <div class="hamburger-menu__left">
        <div class="hamburger-menu__left-title ff-zilla-slab-700">Archive</div>
        <ul class="hamburger-menu__left-list">
          <li v-for="list, i in homeArchiveList" :key="list.title" class="hamburger-menu__left-item">
            <span class="hamburger-menu__left-num ff-zilla-slab-700-italic">{{ `0${i+1}` }}</span>
            <NuxtLink :to="list.link" class="hamburger-menu__left-link">
              <span class="hamburger-menu__left-link-wrap">
                <span class="hamburger-menu__left-link-text">
                  <span class="hamburger-menu__left-link-title ff-zen-kaku-gothic-700">{{ list.title }}</span>
                  <span class="hamburger-menu__left-link-desc">{{ list.desc }}</span>
                </span>
                <span class="hamburger-menu__left-link-img">
                  <img src="https://placehold.jp/150x150.png" alt="">
                </span>
              </span>
            </NuxtLink>
          </li>
        </ul>
        <div class="hamburger-menu__left-sub-list-wrap">
          <ul class="hamburger-menu__left-sub-list">
            <li class="hamburger-menu__left-sub-item">
              <NuxtLink to="/" class="hamburger-menu__left-sub-link">このサイトについて</NuxtLink>
            </li>
            <li class="hamburger-menu__left-sub-item">
              <NuxtLink to="/" class="hamburger-menu__left-sub-link">運営者について</NuxtLink>
            </li>
            <li class="hamburger-menu__left-sub-item">
              <NuxtLink to="/" class="hamburger-menu__left-sub-link">ご利用規約</NuxtLink>
            </li>
            <li class="hamburger-menu__left-sub-item">
              <NuxtLink to="/" class="hamburger-menu__left-sub-link">プライバシーポリシー</NuxtLink>
            </li>
          </ul>
          <ul class="hamburger-menu__left-sub-sns-wrap">
            <li class="hamburger-menu__left-sub-sns-item">
              <a class="hamburger-menu__left-sub-sns-icon" href="https://x.com/kameno_no3" target="_blank">
                <Icon name="pajamas:twitter" size="1.25rem" />
              </a>
            </li>
            <li class="hamburger-menu__left-sub-sns-item">
              <a class="hamburger-menu__left-sub-sns-icon" href="https://github.com/nono-k" target="_blank">
                <Icon name="fa6-brands:github" size="1.25rem" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="hamburger-menu__right">
        <div class="hamburger-menu__right-title-wrap">
          <div class="hamburger-menu__right-title-sub ff-zilla-slab-700">New</div>
          <div class="hamburger-menu__right-title ff-zilla-slab-700">最新記事</div>
        </div>
        <ul class="hamburger-menu__right-list">
          <li v-for="blog, i in newBlogs" :key="blog.id" class="hamburger-menu__right-item">
            <span class="hamburger-menu__right-num ff-zilla-slab-700-italic">{{ `0${i+1}` }}</span>
            <NuxtLink :to="`${blog.path}`" class="hamburger-menu__right-link">
              <div class="hamburger-menu__right-link-text">
                <div class="hamburger-menu__right-link-title">{{ blog.title }}</div>
                <time :datetime="String(blog.date)" class="hamburger-menu__right-date">{{ parseDate(blog.date) }}</time>
              </div>
              <div class="hamburger-menu__right-img">
                <img :src="blog.image" :alt="blog.title" />
              </div>
            </Nuxtlink>
          </li>
        </ul>
        <a class="hamburger-menu__right-more ff-open-sans-700" href="/blog">View More</a>
      </div>
    </div>
    <button class="hamburger-menu__close ff-open-sans-700" @click="closeMenu">CLOSE</button>
  </div>
</template>

<style lang="scss" scoped>
.hamburger {
  position: fixed;
  top: 0.875rem;
  right: 3.75rem;
  padding: 0.5rem 1rem;
  background: var(--white);
  border: 2px solid var(--black);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0.25rem 0.25rem 0 var(--black);
  outline: 0.125rem solid var(--white);
  z-index: 99;
  transition: 0.3s ease-in-out;
  @include mixin.hover {
    translate: 2px 2px;
    box-shadow: 0 0 0 var(--black);
  }
}
.line-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.line {
  width: 1.1rem;
  height: 2px;
  background-color: var(--black);
  border-radius: 0.25rem;
}

.hamburger-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: grid;
  grid-template-columns: 10rem 1fr;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  transition-delay: 0.8s;
  &.is-open {
    visibility: visible;
    opacity: 1;
    transition-delay: 0s;
    .hamburger-menu__close {
      opacity: 1;
      transition-delay: 0.8s;
    }
    .hamburger-menu__marquee {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    .hamburger-menu__body {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
  &__marquee {
    background-color: var(--black);
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
    transition: clip-path 0.8s cubic-bezier(0.87, 0, 0.13, 1);
  }
  &__text-marquee {
    writing-mode: sideways-lr;
    color: var(--white);
    line-height: 1;
    font-size: 2rem;
    text-transform: uppercase;
  }
  &__body {
    display: grid;
    grid-template-columns: 30rem 1fr;
    height: 100%;
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
    transition: clip-path 0.8s cubic-bezier(0.87, 0, 0.13, 1);
    transition-delay: 0.1s;
  }
  &__left {
    background-color: var(--gray);
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
  }
  &__close {
    position: absolute;
    top: 0.875rem;
    right: 3.75rem;
    padding: 0.5rem 1rem;
    background: var(--white);
    border: 2px solid var(--black);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    box-shadow: 0.25rem 0.25rem 0 var(--black);
    outline: 0.125rem solid var(--white);
    opacity: 0;
    transition: opacity 0.3s;
    transition-delay: 0s;
  }
  &__left-title {
    padding-block: 1rem;
    font-size: 1.5rem;
    text-align: center;
    border-bottom: 1px solid var(--black);
  }
  &__left-item {
    display: grid;
    grid-template-columns: 2rem 1fr;
    border-bottom: 1px solid var(--black);
    &:nth-child(1) {
      .hamburger-menu__left-link-wrap {
        background: var(--yellow);
      }
    }
    &:nth-child(2) {
      .hamburger-menu__left-link-wrap {
        background: var(--sky-blue);
      }
    }
    &:nth-child(3) {
      .hamburger-menu__left-link-wrap {
        background: var(--orange);
      }
    }
    &:nth-child(4) {
      .hamburger-menu__left-link-wrap {
        background: var(--purple);
      }
    }
  }
  &__left-num {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--black);
    font-size: 0.875rem;
  }
  &__left-link {
    @include mixin.hover {
      .hamburger-menu__left-link-img {
        rotate: 10deg;
      }
    }
  }
  &__left-link-wrap {
    display: grid;
    grid-template-columns: 1fr 5rem;
    gap: 1.25rem;
    padding: 0.5rem 1.25rem 0.5rem;
  }
  &__left-link-title {
    display: block;
    margin-top: 0.5rem;
    font-size: 1rem;
  }
  &__left-link-desc {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.7rem;
  }
  &__left-link-img {
    display: block;
    border-radius: 0.5rem;
    overflow: hidden;
    transition-property: rotate;
    transition-duration: 0.57s;
    transition-timing-function: cubic-bezier(0.28, 2.5, 0.58, 0.73);
  }
  &__left-sub-list-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: auto;
    margin-inline: 0.875rem;
  }
  &__left-sub-sns-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    margin-top: auto;
  }
  &__left-sub-list {
    > * + * {
      margin-top: 0.25rem;
    }
  }
  &__left-sub-item {
    font-size: 0.875rem;
  }
  &__right {
    background-color: var(--black);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 1rem;
  }
  &__right-title-wrap {
    color: var(--white);
    text-align: center;
    border-top: 1px solid var(--white);
    border-bottom: 1px solid var(--white);
    padding-block: 0.75rem;
  }
  &__right-title {
    font-size: 1.25rem;
  }
  &__right-item {
    display: grid;
    grid-template-columns: 2rem 1fr;
    border-bottom: 1px solid var(--white);
  }
  &__right-link {
    display: grid;
    grid-template-columns: 1fr 3.75rem;
    column-gap: 1rem;
    align-items: center;
    padding: 1rem;
    position: relative;
    color: var(--white);
  }
  &__right-num {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--white);
    font-size: 0.875rem;
    color: var(--white);
  }
  &__right-link-title {
    font-size: 0.875rem;
  }
  &__right-date {
    font-size: 0.75rem;
  }
  &__right-more {
    display: inline-block;
    color: var(--white);
    text-align: right;
    text-decoration: underline;
    margin-top: 0.5rem;
    margin-right: 1rem;
  }
}
</style>
