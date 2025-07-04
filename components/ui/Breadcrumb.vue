<script setup lang="ts">
interface BreadcrumbItem {
  path: string;
  label: string;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

<template>
  <div class="breadcrumb container">
    <nav aria-label="breadcrumb">
      <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="breadcrumb__list">
        <li
          v-for="(crumb, index) in items"
          :key="index"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
          class="breadcrumb__item"
        >
          <NuxtLink
            v-if="index !== items.length - 1"
            :to="crumb.path"
            itemprop="item"
            class="breadcrumb__link"
          >
            <span itemprop="name">
              {{ crumb.label }}
            </span>
          </NuxtLink>
          <span v-else itemprop="name" class="breadcrumb__text">
            {{ crumb.label }}
          </span>
          <meta itemprop="position" :content="String(index + 1)" />
        </li>
      </ol>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  margin-top: 1rem;
  padding-block: 0.75rem;
  border-top: 1px solid var(--black);
  background-color: var(--gray);
  &__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 0.5rem;
  }
  &__item {
    display: flex;
    font-size: 0.875rem;
    @include mixin.mobile {
      font-size: 0.75rem;
    }
    &:first-child {
      &::before {
        content: '🏠';
        margin-right: 0.25rem;
      }
    }
    &:nth-child(n+2) {
      &::before {
        content: '>';
        display: block;
        margin-top: -0.1em;
        margin-inline: 1rem;
        @include mixin.mobile {
          margin-inline: 0.5rem;
        }
      }
    }
  }
  &__link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: underline;
    @include mixin.hover {
      opacity: 0.7;
    }
  }
  &__text {
    @include mixin.phone {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      line-clamp: 1;
    }
  }
}
</style>
