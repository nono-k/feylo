<script setup lang="ts">
interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  text?: string;
  marqueeSpeed?: number;
  marqueeDirection?: 'left' | 'right';
  marqueePauseOnHover?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  level: 2,
  text: '',
  marqueeSpeed: 40,
  marqueeDirection: 'left',
  marqueePauseOnHover: false,
});

const tag = `h${props.level || 2}`;
</script>

<template>
  <div class="heading__wrap">
    <div class="heading__deco ff-open-sans-700">
      <NuxtMarquee
        :auto-fill="true"
        :speed="40"
        :direction="props.marqueeDirection"
        :pause-on-hover="props.marqueePauseOnHover"
      >
        <slot />
      </NuxtMarquee>
    </div>
    <component :is="tag" class="heading container ff-open-sans-700">
      <slot />
    </component>
    <p v-if="text" class="text container">{{ text }}</p>
  </div>
</template>

<style scoped lang="scss">
.heading {
  font-size: 8rem;
  text-transform: uppercase;
  line-height: 1.25;
  @include mixin.mobile {
    font-size: 5rem;
  }
  @include mixin.phone {
    font-size: 3.5rem;
    margin-top: 0.5rem;
  }
  &__deco {
    font-size: 15rem;
    height: 6.25rem;
    line-height: 0.5;
    border-top: 1px solid var(--black);
    border-bottom: 1px solid var(--black);
    text-transform: uppercase;
    overflow: hidden;
    color: var(--gray);
    @include mixin.mobile {
      font-size: 10rem;
      height: 5rem;
    }
    @include mixin.phone {
      font-size: 7rem;
      height: 3.5rem;
    }
  }
}
.text {
  @include mixin.mobile {
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
}
</style>
