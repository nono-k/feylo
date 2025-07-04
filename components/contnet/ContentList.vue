<script setup lang="ts">
interface Props {
  list: string[];
  title?: string;
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
    class="content-list"
    :style="{ backgroundColor: backgroundColor, color: textColor }"
  >
    <div
      v-if="props.title"
      class="content-list__title"
    >
      {{ props.title }}
    </div>
    <ul class="content-list__list">
      <li v-for="item in props.list" :key="item" class="content-list__item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.content-list {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  box-shadow: 4px 4px 0 0 var(--black);
  &__title {
    font-weight: 700;
  }
  &__list {
    margin-top: 0.5rem;
  }
  &__item {
    list-style: inherit;
    margin-left: 1rem;
  }
}
</style>
