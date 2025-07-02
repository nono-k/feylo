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
}>();
</script>

<template>
  <div class="toc">
    <div class="toc__title">目次</div>
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
  padding: 1.5rem 1rem 0;
  &__title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
  }
  &__list {
    ul {
      margin-left: 2rem;
      li {
        list-style: circle;
        margin-top: 0.25rem;
      }
    }
  }
  &__list-item {
    margin-bottom: 0.5rem;
  }
  &__link {
    @include mixin.hover {
      color: var(--blue);
    }
  }
}
</style>
