<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import { heroRightData } from '~/data/pages/home/heroData';

register();
</script>

<template>
  <div class="hero__right">
    <div class="hero__right-title ff-zilla-slab-700">Animation Snap</div>
    <ClientOnly>
      <swiper-container
        :slides-per-view="1.3"
        :space-between="20"
        :centered-slides="true"
        :loop="true"
        :navigation="{
          nextEl: '.hero__right-next-btn',
          prevEl: '.hero__right-prev-btn',
        }"
        class="hero__right-swiper"
      >
        <swiper-slide v-for="item in heroRightData" :key="item.title" class="hero__right-slide">
          <div class="hero__right-iframe">
            <iframe :src="item.src" frameborder="0" allowfullscreen></iframe>
            <a :href="item.link" class="hero__right-slide-link">実装方法を見る</a>
          </div>
          <a :href="item.link" class="hero__right-slide-title">{{ item.title }}</a>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
    <div class="hero__right-bottom">
      <button class="hero__right-prev-btn">
        <Icon name="fe:arrow-left" />
      </button>
      <button class="hero__right-next-btn">
        <Icon name="fe:arrow-right" />
      </button>
    </div>
    <a href="/animation" class="hero__right-link">
      アニメーション一覧
      <span class="hero__right-link-icon">
        <Icon name="bitcoin-icons:arrow-right-outline" />
      </span>
    </a>
  </div>
</template>

<style scoped lang="scss">
.hero {
  &__right {
    background: var(--green);
    height: 560px;
    border-radius: 1rem;
    padding-block: 0.75rem 1.25rem;
    border: 1px solid var(--black);
    position: relative;
    display: flex;
    flex-direction: column;
  }
  &__right-title {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }
  &__right-iframe {
    width: 100%;
    height: 350px;
    border: 1px solid var(--black);
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    @include mixin.hover {
      .hero__right-slide-link {
        translate: 0 0;
      }
    }
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  &__right-slide-link {
    position: absolute;
    bottom: -1px;
    right: -1px;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--black);
    background: var(--orange);
    border: 1px solid var(--black);
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    translate: 0 32px;
    transition: background 0.3s, color 0.3s, translate 0.4s cubic-bezier(0.35, 2.5, 0.7, 0.65);
    @include mixin.hover {
      background: var(--yellow);
    }
  }
  &__right-slide-title {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    font-weight: 700;
    @include mixin.hover {
      text-decoration: underline;
    }
  }
  &__right-bottom {
    position: absolute;
    top: 240px;
    left: 50%;
    translate: -50% 0%;
    width: 100%;
    z-index: 1;
  }
  &__right-prev-btn, &__right-next-btn {
    position: absolute;
    width: 2rem;
    height: 2rem;
    background: var(--green);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--black);
    transition: background 0.3s, color 0.3s;
    @include mixin.hover {
      background: var(--black);
      color: var(--white);
    }
  }
  &__right-prev-btn {
    left: 16px;
  }
  &__right-next-btn {
    right: 16px;
  }
  &__right-link {
    font-size: 0.8rem;
    display: block;
    width: fit-content;
    margin-top: auto;
    margin-left: auto;
    margin-right: 0.75rem;
    @include mixin.hover {
      text-decoration: underline;
    }
  }
  &__right-link-icon {
    display: inline-block;
    translate: 0 2px;
  }
}
</style>
