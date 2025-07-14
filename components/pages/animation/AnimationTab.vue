<script setup lang="ts">
import type { AnimationCategoryKey } from '~/data/pages/animation/animationData';
import { animationData } from '~/data/pages/animation/animationData';

const categoryKeys: AnimationCategoryKey[] = ['interactive', 'visual'];
const tabLabels: Record<AnimationCategoryKey, string> = {
  interactive: '操作に反応する動き',
  visual: '魅せるアニメーション',
};
const currentTab = ref<AnimationCategoryKey>('interactive');

const isSticky = ref(false);
const tabWrap = ref<HTMLElement | null>(null);

const checkPosition = () => {
  if (!tabWrap.value) return;
  const top = tabWrap.value.getBoundingClientRect().top;
  isSticky.value = top < 24;
};

onMounted(() => {
  window.addEventListener('scroll', checkPosition, { passive: true });
  checkPosition();
});
onUnmounted(() => {
  window.removeEventListener('scroll', checkPosition);
});
</script>

<template>
  <div class="tab__container">
    <div ref="tabWrap" :class="['tab__wrap', { '-active': isSticky }]">
      <button
        v-for="key in categoryKeys"
        :key="key"
        :class="['tab__btn', { '-active': key === currentTab }]"
        @click="currentTab = key"
      >
        {{ tabLabels[key] }}
      </button>
    </div>
    <div class="tab__content">
      <NuxtLink
        v-for="item in animationData[currentTab]"
        :key="item.title"
        :to="`/animation/${item.link}`"
        class="tab__item"
      >
        <div v-if="item.icon" class="tab__item-icon">
          <Icon :name="item.icon.name" :size="item.icon.size" />
        </div>
        <div v-if="item.image" class="tab__item-img">
          <img :src="item.image" :alt="item.title" />
        </div>
        <div class="tab__item-title">{{ item.title }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab {
  &__container {
  }
  &__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow: hidden;
    position: sticky;
    top: 1rem;
    --tab-radius: 2rem;
    background-color: var(--white);
    border-radius: var(--tab-radius);
    box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 30%), 0px 1px 3px 1px rgb(0 0 0 / 15%);
    z-index: 1;
    max-width: 100%;
    margin-inline: auto;
    transition-property: max-width;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(.2,0,0,1);
    &.-active {
      max-width: calc(100% - 15rem);
      @include mixin.mobile {
        max-width: calc(100% - 5rem);
      }
      @include mixin.phone {
        max-width: calc(100% - 2rem);
      }
    }
  }
  &__btn {
    padding: 1.5rem 1rem;
    border-radius: var(--tab-radius);
    cursor: pointer;
    transition: 0.3s;
    &.-active {
      background-color: var(--orange);
      pointer-events: none;
    }
    @include mixin.mobile {
      padding: 1.2rem 0.875rem;
      font-size: 0.875rem;
      letter-spacing: 0;
    }
    @include mixin.hover {
      background-color: var(--gray);
    }
  }
  &__content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    row-gap: 1.5rem;
    margin: 5rem 1.5rem 0;
    @include mixin.mobile {
      grid-template-columns: repeat(3, 1fr);
      margin-top: 3rem;
    }
    @include mixin.phone {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  &__item {
    display: flex;
    flex-direction: column;
    border-radius: 0.75rem;
    box-shadow: 0 0 3px 0 rgb(0 0 0 / 12%), 0 2px 3px 0 rgb(0 0 0 / 22%);
    overflow: hidden;
    transition: 0.2s ease-in-out;
    @include mixin.hover {
      box-shadow: 0 15px 30px -5px rgb(0 0 0 / 15%), 0 0 5px rgb(0 0 0 / 10%);
      translate: 0 -4px;
    }
  }
  &__item-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 1.5rem 0.5rem;
  }
  &__item-img {
    width: 2.5rem;
    margin-inline: auto;
    padding-block: 1.5rem 0.5rem;
  }
  &__item-title {
    text-align: center;
    padding: 0.5rem 0.75rem;
  }
}
</style>
