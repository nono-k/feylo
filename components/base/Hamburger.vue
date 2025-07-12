<script setup lang="ts">
import { homeArchiveList } from '~/data/pages/home/homeArchiveList';

const { blogs } = await useBlogContents();
const newBlogs = computed(() => blogs.value?.slice(0, 4));

const isOpen = ref(false);

const openMenu = () => {
  isOpen.value = true;
};

const closeMenu = () => {
  isOpen.value = false;
};

const router = useRouter();
router.afterEach(() => {
  isOpen.value = false;
});
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
    <a
      href="https://forms.gle/NwTCisE5mEF55e6U7"
      class="hamburger-menu__marquee for-large"
      target="_blank"
    >
      <template v-for="n in 3" :key="n">
        <NuxtMarquee
          :auto-fill="true"
          :speed="4"
          :pause-on-hover="true"
          :direction="n === 2 ? 'right' : 'left'"
          :play="isOpen ? true : false"
        >
          <span class="hamburger-menu__text-marquee ff-zilla-slab-700">contact</span>
        </NuxtMarquee>
      </template>
    </a>
    <div class="hamburger-menu__body">
      <div class="hamburger-menu__left">
        <div class="hamburger-menu__left-title ff-zilla-slab-700">Archive</div>
        <ul class="hamburger-menu__left-list">
          <li v-for="list, i in homeArchiveList" :key="list.title" class="hamburger-menu__left-item">
            <span class="hamburger-menu__left-num ff-zilla-slab-700-italic">{{ `0${i+1}` }}</span>
            <NuxtLink :to="list.link" class="hamburger-menu__left-link">
              <span
                class="hamburger-menu__left-link-wrap"
                :style="{
                  '--bg-color': list.color,
                }"
              >
                <span class="hamburger-menu__left-link-text">
                  <span class="hamburger-menu__left-link-title ff-zen-kaku-gothic-700">{{ list.title }}</span>
                  <span class="hamburger-menu__left-link-desc">{{ list.desc }}</span>
                </span>
                <span class="hamburger-menu__left-link-img">
                  <img :src="list.image" alt="" />
                </span>
              </span>
            </NuxtLink>
          </li>
        </ul>
        <div class="hamburger-menu__left-sub-list-wrap">
          <ul class="hamburger-menu__left-sub-list">
            <!-- <li class="hamburger-menu__left-sub-item">
              <NuxtLink to="/" class="hamburger-menu__left-sub-link">このサイトについて</NuxtLink>
            </li> -->
            <li class="hamburger-menu__left-sub-item">
              <NuxtLink to="/profile" class="hamburger-menu__left-sub-link">運営者について</NuxtLink>
            </li>
            <li class="hamburger-menu__left-sub-item">
              <NuxtLink to="/site-policy" class="hamburger-menu__left-sub-link">サイトポリシー</NuxtLink>
            </li>
            <li class="hamburger-menu__left-sub-item">
              <NuxtLink to="/privacy-policy" class="hamburger-menu__left-sub-link">プライバシーポリシー</NuxtLink>
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
        <ul v-if="newBlogs" class="hamburger-menu__right-list">
          <li v-for="blog, i in newBlogs" :key="blog.path" class="hamburger-menu__right-item">
            <span class="hamburger-menu__right-num ff-zilla-slab-700-italic">{{ `0${i+1}` }}</span>
            <NuxtLink :to="blog.path" class="hamburger-menu__right-link">
              <div class="hamburger-menu__right-link-text">
                <div class="hamburger-menu__right-link-title">{{ blog.title }}</div>
                <time class="hamburger-menu__right-date">{{ parseDate(blog.date) }}</time>
              </div>
              <div class="hamburger-menu__right-img">
                <img :src="blog.image" :alt="blog.title" />
              </div>
            </NuxtLink>
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
  @include mixin.mobile {
    right: 1rem;
  }
  @include mixin.phone {
    padding: 0.5rem;
    font-size: 0.75rem;
    gap: 0.5rem;
    top: 0.5rem;
  }
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
  @include mixin.mobile {
    grid-template-columns: 1fr;
  }
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
    & > * + * {
      margin-top: 1rem;
    }
  }
  &__text-marquee {
    writing-mode: sideways-lr;
    color: var(--white);
    line-height: 1;
    font-size: 2.8rem;
    text-transform: uppercase;
  }
  &__body {
    display: grid;
    grid-template-columns: 30rem 1fr;
    height: 100%;
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
    transition: clip-path 0.8s cubic-bezier(0.87, 0, 0.13, 1);
    transition-delay: 0.1s;
    overflow-y: auto;
    @include mixin.mobile {
      grid-template-columns: 1fr 1fr;
    }
    @include mixin.phone {
      grid-template-columns: 1fr;
    }
  }
  &__left {
    background-color: var(--gray);
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
    @include mixin.phone {
      order: 2;
    }
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
    @include mixin.mobile {
      right: 1rem;
    }
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
    background-color: var(--bg-color);
    @include mixin.phone {
      grid-template-columns: 1fr 3.5rem;
      align-items: center;
      padding: 1rem;
    }
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
    @include mixin.phone {
      height: fit-content;
    }
  }
  &__left-sub-list-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: auto;
    margin-inline: 0.875rem;
    @include mixin.phone {
      margin-top: 2rem;
    }
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
    @include mixin.phone {
      order: 1;
    }
  }
  &__right-title-wrap {
    color: var(--white);
    text-align: center;
    border-top: 1px solid var(--white);
    border-bottom: 1px solid var(--white);
    padding-block: 0.75rem;
    @include mixin.phone {
      border-top: none;
      padding-top: 1.25rem;
    }
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
