<script setup lang="ts">
defineProps<{
  links: {
    id: string;
    depth: number;
    text: string;
    children?: {
      id: string;
      depth: number;
      text: string;
    }[];
  }[];
  color?: string;
}>();
</script>

<template>
  <div class="toc">
    <div :class="['toc__title', color]"><div class="toc__icon"><Icon name="fluent-emoji-flat:card-file-box" size="2.4rem" /></div>この記事の目次</div>
    <ul class="toc__list">
      <li v-for="link in links" :key="link.id" class="toc__list-item">
        <NuxtLink :to="`#${link.id}`" class="toc__link">{{ link.text }}</NuxtLink>
        <ul v-if="link.children">
          <li v-for="child in link.children" :key="child.id">
            <NuxtLink :to="`#${child.id}`" class="toc__link">{{ child.text }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.toc {
  max-width: 800px;
  margin-inline: auto;
  margin-top: 3rem;
  border: 1px solid var(--black);
  border-radius: 1rem;
  overflow: hidden;
  &__title {
    padding-block: 0.75rem 1rem;
    background-color: var(--sky-blue);
    border-bottom: 1px solid var(--black);
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
    &.orange {
      background-color: var(--orange);
    }
  }
  &__list {
    padding: 1.25rem 1rem 1.3rem 3.125rem;
    column-count: 2;
    column-gap: 3.125rem;
  }
  &__list-item {
    break-inside: avoid;
    margin-bottom: 1.25rem;
    list-style: decimal;
    font-weight: 700;
    font-size: 1.15rem;
    li {
      color: rgba(0,13,37,.6);
      font-weight: 400;
      margin-top: 0.5rem;
      font-size: 1rem;
      font-weight: 400;
    }
  }
  &__link {
    color: var(--black);
    text-decoration: none;
    @include mixin.hover {
      text-decoration: underline;
    }
  }
}
</style>
