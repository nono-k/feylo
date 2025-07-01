<script setup lang="ts">
const el = ref<HTMLElement | null>(null);
const visible = ref(false);
const mousePosition = ref({ x: 0, y: 0 });
const mouseFollower = ref<HTMLElement | null>(null);

useIntersectionObserver(el, (isIntersecting) => {
  visible.value = isIntersecting;
});

const onMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  mousePosition.value = {
    x: e.clientX - rect.left - 80,
    y: e.clientY - rect.top - 120,
  };
  if (mouseFollower.value) {
    mouseFollower.value.style.transform = `translate(${mousePosition.value.x}px, ${mousePosition.value.y}px)`;
  }
};

const onMouseEnter = () => {
  if (mouseFollower.value) {
    mouseFollower.value.style.scale = '1';
  }
};

const onMouseLeave = () => {
  if (mouseFollower.value) {
    mouseFollower.value.style.scale = '0';
  }
};
</script>

<template>
  <div
    ref="el"
    :class="['contact', { 'is-visible': visible }]"
  >
    <div class="contact__typo-wrap">
      <div v-for="n in 5" :key="n" class="contact__typo ff-zilla-slab-700" :style="{ transform: `translate(${-n * 100}px, 0)` }">
        <span>contact</span>
        <span>contact</span>
      </div>
    </div>
    <a
      href="https://forms.gle/NwTCisE5mEF55e6U7"
      class="contact__inner"
      target="_blank"
      @mousemove="onMouseMove"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <p class="contact__sub">お問い合わせ</p>
      <h2 class="contact__title ff-open-sans-700">contact</h2>
      <p class="contact__text">お仕事のことなどお気軽にご連絡ください。<br>メンターもやってますので気になる方は,<br>フォームからご連絡をよろしくお願いします。</p>
      <div ref="mouseFollower" class="contact__mouse-follower">Googleフォームで<br>連絡する</div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.contact {
  position: relative;
  display: grid;
  place-items: center;
  height: 600px;
  overflow: hidden;
  clip-path: inset(70px 10rem 70px 10rem);
  transition-property: clip-path;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  @include mixin.phone {
    height: 400px;
  }
  &.is-visible {
    clip-path: inset(0);
  }
  &__typo-wrap {
    position: absolute;
    top: -100px;
    left: -60px;
    width: calc(100% + 60px);
    background: var(--accent-orange);
    z-index: -1;
  }
  &__typo {
    font-size: 12rem;
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: 0.1em;
  }
  &__inner {
    background: var(--white);
    padding: 2.5rem 2rem;
    width: calc(100% - 20rem);
    height: 460px;
    text-align: center;
    position: relative;
    @media (max-width: 1200px) {
      width: calc(100% - 5rem);
    }
    @include mixin.phone {
      width: calc(100% - 2rem);
      height: auto;
      padding: 2.5rem 1rem;
    }
  }
  &__sub {
    font-size: 1.2rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      background: var(--accent-orange);
      border-radius: 50%;
    }
  }
  &__title {
    font-size: 10rem;
    text-transform: uppercase;
    margin-top: 1rem;
    @include mixin.mobile {
      font-size: 6rem;
    }
    @include mixin.phone {
      font-size: 3.875rem;
      margin-top: 0.5rem;
    }
  }
  &__text {
    margin-top: 1.5rem;
    @include mixin.phone {
      font-size: 0.875rem;
      letter-spacing: 0;
    }
  }
  &__mouse-follower {
    position: absolute;
    top: 0;
    left: 0;
    width: 160px;
    aspect-ratio: 1;
    background-color: var(--black);
    color: var(--white);
    border-radius: 50%;
    display: grid;
    place-items: center;
    pointer-events: none;
    scale: 0;
    transition: scale 0.6s;
    @include mixin.phone {
      display: none;
    }
  }
}
</style>
