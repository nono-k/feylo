<script setup lang="ts">
import { homeArchiveList } from '~/data/pages/home/homeArchiveList';
</script>

<template>
  <ul class="archive__list">
    <li v-for="list, i in homeArchiveList" :key="list.title" class="archive__item">
      <span class="archive__num ff-zilla-slab-700-italic">{{ `0${i+1}` }}</span>
      <NuxtLink :to="list.link" class="archive__link">
        <span class="archive__link-wrap">
          <span class="archive__link-text">
            <span class="archive__link-title ff-zen-kaku-gothic-700">{{ list.title }}</span>
            <span class="archive__link-desc">{{ list.desc }}</span>
          </span>
          <span class="archive__link-img">
            <img src="https://placehold.jp/150x150.png" alt="">
          </span>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.archive {
  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 3rem;
    border: 1px solid var(--black);
  }
  &__item {
    display: grid;
    grid-template-columns: 3.75rem 1fr;
    &:nth-child(even) {
      border-left: 1px solid var(--black);
    }
    &:nth-child(n+3) {
      border-top: 1px solid var(--black);
    }
    &:nth-child(1) {
      .archive__link-wrap {
        background: var(--yellow);
      }
    }
    &:nth-child(2) {
      .archive__link-wrap {
        background: var(--sky-blue);
      }
    }
    &:nth-child(3) {
      .archive__link-wrap {
        background: var(--orange);
      }
    }
    &:nth-child(4) {
      .archive__link-wrap {
        background: var(--purple);
      }
    }
  }
  &__num {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--black);
    font-size: 1.2rem;
  }
  &__link {
    @include mixin.hover {
      .archive__link-img {
        rotate: 10deg;
      }
    }
  }
  &__link-wrap {
    display: grid;
    grid-template-columns: 1fr 6.875rem;
    gap: 1.25rem;
    padding: 1rem 1.25rem 1.5rem 2.0625rem;
  }
  &__link-title {
    display: block;
    margin-top: 0.5rem;
    font-size: 1.25rem;
  }
  &__link-desc {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
  &__link-img {
    display: block;
    border-radius: 0.5rem;
    overflow: hidden;
    transition-property: rotate;
    transition-duration: 0.57s;
    transition-timing-function: cubic-bezier(0.28, 2.5, 0.58, 0.73);
  }
}
</style>
