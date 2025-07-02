<script setup lang="ts">
const { data } = await useComponentsContents();

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <button class="menu__buttom" @click="toggleMenu">
    <span class="line-wrap">
      <span class="line" />
      <span class="line" />
      <span class="line" />
    </span>
  </button>

  <div
    :class="['menu__overlay', isOpen ? 'is-open' : '']"
    @click="closeMenu"
  />

  <div :class="['hamburger-menu', isOpen ? 'is-open' : '']">
    <div class="hamburger-menu__wrap">
      <ul class="hamburger-menu__list">
        <li v-for="item in data" :key="item.title" class="hamburger-menu__item">
          <NuxtLink :to="item.path" class="hamburger-menu__link">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  &__buttom {
    position: absolute;
    top: 1.6rem;
    left: 0.875rem;
    padding-inline: 0.5rem;
    @include mixin.hover {
      &::before {
        opacity: 1;
      }
    }
    &::before {
      content: '';
      display: block;
      width: 2.8rem;
      aspect-ratio: 1;
      background-color: var(--white);
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      opacity: 0;
      transition-property: opacity;
      transition-duration: 0.4s;
    }
  }
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 101;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    &.is-open {
      visibility: visible;
      opacity: 1;
    }
  }
}
.line-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  position: relative;
  z-index: 1;
}
.line {
  width: 1.1rem;
  height: 2px;
  background-color: var(--black);
  border-radius: 0.25rem;
}
.hamburger-menu {
  position: fixed;
  top: 60px;
  left: 0;
  width: 300px;
  height: 100%;
  z-index: 102;
  visibility: hidden;
  opacity: 0;
  padding: 1.25rem;
  background-color: var(--white);
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  &.is-open {
    visibility: visible;
    opacity: 1;
  }
  &__link {
    font-size: 2.25rem;
  }
}
</style>
