<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import { heroData } from '~/data/pages/home/heroData';

register();
</script>

<template>
  <div class="hero__main">
    <ClientOnly>
      <swiper-container
        :slides-per-view="1"
        :pagination="{
          el: '.swiper-pagination',
          type: 'fraction',
        }"
        :navigation="{
          nextEl: '.hero__main-next-btn',
          prevEl: '.hero__main-prev-btn',
        }"
        class="hero__main-swiper"
      >
        <swiper-slide v-for="item in heroData" :key="item.title" class="hero__main-slide">
          <NuxtLink :to="item.link">
            <div class="hero__main-img">
              <img :src="item.img" alt="">
            </div>
            <h2 class="hero__main-title">
              <div v-for="char in item.title" :key="char">
                <span class="hero__main-title-char">{{ char }}</span>
              </div>
            </h2>
          </NuxtLink>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
    <div class="hero__main-bottom">
      <button class="hero__main-prev-btn">
        <Icon name="bitcoin-icons:arrow-left-outline" />
      </button>
      <div class="swiper-pagination"></div>
      <button class="hero__main-next-btn">
        <Icon name="bitcoin-icons:arrow-right-outline" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  &__main {
    display: flex;
    flex-direction: column;
  }
  &__main-swiper {
    height: 530px;
  }
  &__main-slide {
    width: 100% !important;
  }
  &__main-img {
    height: 490px;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  &__main-title {
    position: absolute;
    left: 1rem;
    bottom: -1rem;
    bottom: 0;
    > div {
      &:first-child {
        translate: 0 0.75rem;
        .hero__main-title-char {
          border-bottom-left-radius: 0;
        }
      }
    }
  }
  &__main-title-char {
    display: inline-block;
    background: var(--green);
    padding: 0.25rem 0.75rem;
    border-radius: 0.75rem;
    font-size: 1.15rem;
  }
  &__main-bottom {
    margin-top: auto;
    // margin-bottom: 0.75rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;
    .swiper-pagination {
      display: flex;
      gap: 2rem;
      font-size: 0.875rem;
    }
  }
  &__main-prev-btn, &__main-next-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
}
</style>
