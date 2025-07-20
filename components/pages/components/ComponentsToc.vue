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

const scrollTo = (id: string) => {
  const target = document.getElementById(id);
  const container = document.querySelector('.main__content');
  if (!target || !container) return;

  const headerOffset = 24;
  const targetRect = target.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const offset = targetRect.top - containerRect.top - headerOffset;

  container.scrollTo({
    top: offset + container.scrollTop,
    behavior: 'smooth',
  });
};
</script>

<template>
  <div class="toc">
    <div class="toc__title">目次</div>
    <ul class="toc__list">
      <li v-for="link in links" :key="link.id" class="toc__list-item">
        <NuxtLink
          :to="`#${link.id}`"
          class="toc__link"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.text }}
        </NuxtLink>
        <ul v-if="link.children">
          <li v-for="child in link.children" :key="child.id">
            <NuxtLink
              :to="`#${child.id}`"
              class="toc__link"
              @click.prevent="scrollTo(child.id)"
            >
              {{ child.text }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.toc {
  padding: 1.5rem 1rem;
  &__title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
  }
  &__list {
    > * + * {
      margin-top: 0.75rem;
    }
    ul {
      margin-left: 2rem;
      li {
        list-style: revert;
        margin-top: 0.25rem;
      }
    }
  }
  &__list-item {
    line-height: 1.4;
  }
  &__link {
    font-size: 0.875rem;
    @include mixin.hover {
      color: var(--blue);
    }
  }
}
</style>
