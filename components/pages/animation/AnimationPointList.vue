<script setup lang="ts">
defineProps<{
  list: string[];
}>();
</script>

<template>
  <div class="point-list">
    <ul class="point-list__list">
      <div class="point-list__title">
        <Icon name="lets-icons:check-fill" size="1.4rem" class="point-list__icon" />
        実装のポイント
      </div>
      <li v-for="item in list" :key="item" class="point-list__item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.point-list {
  margin-top: 3rem;
  max-width: 880px;
  margin-inline: auto;
  padding-inline: 40px;
  @include mixin.mobile {
    padding-inline: 0px;
  }
  &__list {
    border: 2px solid var(--green);
    padding: 1rem;
    @include mixin.phone {
      padding: 1rem 0.5rem;
    }
    > * + * {
      margin-top: 0.5rem;
    }
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 1.2rem;
    @include mixin.phone {
      font-size: 1rem;
    }
  }
  &__icon {
    color: var(--green);
  }
  &__item {
    padding-left: 1.5rem;
    @include mixin.phone {
      padding-left: 1rem;
      font-size: 0.875rem;
    }
  }
}
</style>
