<script setup lang="ts">
const props = defineProps<{
  libs: {
    icon: {
      name: string;
      size?: string;
      color?: string;
    };
    name: string;
    version: string;
  }[];
}>();
</script>

<template>
  <div class="version-info">
    <div class="version-info__title">
      <Icon
        name="solar:code-circle-bold"
        size="1.25rem"
      />
      検証環境のバージョン情報
    </div>
    <ul class="version-info__list">
      <li
        v-for="item in props.libs"
        :key="item.name"
        class="version-info__item"
      >
        <Icon
          :name="item.icon.name"
          :size="item.icon?.size"
          :style="item.icon.color ? { color: item.icon.color } : {}"
        />
        <div class="version-info__name">{{ item.name }}</div>
        <div class="version-info__version">{{ item.version }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.version-info {
  margin-top: 1rem;
  font-size: 1rem;
  padding: 0.75rem 1.5rem 1rem;
  border: 2px solid var(--black);
  color: var(--white);
  background-image: linear-gradient(90deg, #152331, #141E30);
  &__title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__list {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0 0.75rem 0 0.5rem;
    border: 1px solid var(--white);
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 700;
  }
}
</style>
