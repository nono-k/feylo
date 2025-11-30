<script setup lang="ts">
interface Props {
  href: string;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
  text: 'デモをみる',
  backgroundColor: 'var(--yellow)',
  textColor: 'var(--black)',
});
</script>

<template>
  <a
    :href="props.href"
    class="link-btn"
    target="_blank"
    :style="{ backgroundColor: props.backgroundColor, color: props.textColor }"
  >{{ props.text }}</a>
</template>

<style scoped lang="scss">
.link-btn {
  display: block;
  width: fit-content;
  margin-left: auto;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none !important;
  transition-property: color, background;
  transition-duration: 0.3s;
  @include mixin.phone {
    padding: 0.25rem 1rem;
  }
  @include mixin.hover {
    background: var(--black) !important;
    color: var(--white) !important;
  }
}
</style>
