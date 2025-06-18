<script setup lang="ts">
const props = defineProps<{
  link: string;
  bgColor?: string;
  hoverColor?: string;
}>();

const buttonRef = ref<HTMLElement>();
const bgRef = ref<HTMLElement>();
const bgStyle = ref<Record<string, string>>();

const onEnter = (e: MouseEvent) => {
  const x = e.offsetX;
  const y = e.offsetY;

  bgStyle.value = {
    translate: `${x}px ${y}px`,
    scale: '2',
    background: props.bgColor || 'var(--black)',
  };
};

const onLeave = () => {
  bgStyle.value = {
    ...bgStyle.value,
    scale: '0',
  };
};
</script>

<template>
  <NuxtLink
    ref="buttonRef"
    :to="`${link}`"
    class="button ff-open-sans-700"
    :style="{ '--hover-color': props.hoverColor || 'var(--white)' }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <span ref="bgRef" class="button__circle" :style="bgStyle"></span>
    <slot />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.button {
  position: relative;
  display: inline-block;
  padding: 0.75rem 1rem;
  border: 1px solid var(--black);
  color: var(--black);
  text-decoration: none;
  overflow: hidden;
  width: 280px;
  text-align: center;
  border-radius: 1.5rem;
  z-index: 1;
  transition-property: color;
  transition-duration: 0.3s;
  @include mixin.hover {
    color: var(--hover-color);
  }
  &__circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 280px;
    height: 280px;
    background: var(--black);
    border-radius: 50%;
    scale: 0;
    margin-top: -140px;
    margin-left: -140px;
    transform-origin: center center;
    transition-property: scale;
    transition-duration: 0.5s;
    z-index: -1;
  }
}
</style>
