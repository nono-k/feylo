<script setup lang="ts">
interface Props {
  text?: string;
  items: {
    title: string;
    link: string;
    image: string;
    description: string;
  }[];
}
const props = withDefaults(defineProps<Props>(), {
  text: 'あわせて読みたい',
});
</script>

<template>
  <div class="recommend-link">
    <div class="recommend-link__text">
      <Icon name="uit:check" />
      {{ props.text }}
    </div>
    <ul class="recommend-link__list">
      <li v-for="item in props.items" :key="item.title" class="recommend-link__item">
        <NuxtLink :to="item.link" class="recommend-link__link">
          <div class="recommend-link__image">
            <img :src="item.image" alt="" />
          </div>
          <div class="recommend-link__body">
            <div class="recommend-link__title">{{ item.title }}</div>
            <p class="recommend-link__description text-ellipsis">{{ item.description }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.recommend-link {
  margin-top: 2rem;
  padding: 1.75rem 1.5rem 1.5rem;
  border: 1px solid var(--black);
  position: relative;
  @include mixin.phone {
    padding-inline: 1.25rem;
  }
  &__text {
    position: absolute;
    top: -1.5rem;
    left: 1rem;
    background-color: var(--white);
    padding: 0.5rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__list {
    margin-top: 0 !important;
    list-style: none;
    > * + * {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--black);
    }
  }
  &__item {
    list-style: none;
    margin-left: 0;
  }
  &__link {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    column-gap: 1rem;
    color: var(--black) !important;
    text-decoration: none !important;
    border: 1px solid var(--black);
    box-shadow: 6px 6px 0 var(--black);
    transition: translate 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    @include mixin.phone {
      grid-template-columns: 1fr;
      row-gap: 0.5rem;
    }
    @include mixin.hover {
      translate: 6px 6px;
      box-shadow: 0 0 3px 0 rgb(0 0 0 / 12%), 0 2px 3px 0 rgb(0 0 0 / 22%);
    }
  }
  &__body {
    padding-right: 0.5rem;
  }
  &__title {
    font-size: 1rem;
    font-weight: 700;
  }
  &__description {
    margin-top: 0 !important;
    font-size: 0.875rem;
    @include mixin.phone {
      display: none;
    }
  }
}
</style>
