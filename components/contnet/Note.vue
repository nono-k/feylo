<script setup lang="ts">
interface Props {
  title?: string;
  text: string;
  backgroundColor?: string;
  textColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  backgroundColor: 'var(--gray)',
  textColor: 'var(--black)',
});
</script>

<template>
  <div
    class="note"
    :style="{ backgroundColor: backgroundColor, color: textColor }"
  >
    <div
      v-if="props.title"
      class="note__title"
    >
      {{ props.title }}
    </div>
    <p class="note__text">{{ props.text }}</p>
  </div>
</template>

<style scoped lang="scss">
.note {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  box-shadow: 4px 4px 0 0 var(--black);
  &__title {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  &__text {
    margin-top: 0 !important;
  }
}
</style>
