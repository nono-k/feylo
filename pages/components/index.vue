<script setup lang="ts">
const { data } = await useComponentsContents();

definePageMeta({
  layout: 'components-layout',
});

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/components', label: 'コンポーネントまとめ' },
];
</script>

<template>
  <main>
    <section class="main">
      <div class="main__wrap">
        <div class="main__inner">
          <h1 class="main__title ff-open-sans-700">Components</h1>
          <p class="main__lead">Web制作初学者向けにHTML/CSS/JavaScriptで楽に使い回せるようなコンポーネントをまとめました。</p>

          <ul v-if="data" class="main__list">
            <li v-for="item in data" :key="item.title" class="main__list-item">
              <ComponentsCard :data="item" />
            </li>
          </ul>
        </div>
        <ComponentsBreadcrumb :items="breadcrumbItems" />
      </div>
    </section>
    <section class="contact-section">
      <Contact />
    </section>
  </main>
</template>

<style scoped lang="scss">
.main {
  background-color: var(--gray);
  padding-block: 1.5rem 6.5rem;
  &__wrap {
    margin-inline: 1rem;
    height: calc(100vh - 60px - 1.5rem * 2);
    background-color: var(--white);
    border-radius: 1.5rem;
    border: 1px solid var(--black);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.45rem;
    }
    &::-webkit-scrollbar-track {
      margin-block: 0.875rem;
    }
    &::-webkit-scrollbar-thumb {
      margin-block: 10.5rem;
      background: var(--blue);
      border-radius: 3px;
    }
  }
  &__inner {
    padding-block: 1rem;
    margin-inline: 2rem;
    margin-bottom: 3.75rem;
  }
  &__title {
    font-size: 5.5rem;
    text-align: center;
  }
  &__lead {
    font-size: 1rem;
    text-align: center;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    margin-top: 4rem;
  }
  &__list-item {
    display: contents;
  }
}
</style>
