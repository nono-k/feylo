<script setup lang="ts">
import type { AnimationCategoryKey } from '~/data/pages/animation/animationData';
import { animationData } from '~/data/pages/animation/animationData';

const route = useRoute();

const category = route.params.category as string;
const group = route.params.group as string;

const groupTitle = animationData[category as AnimationCategoryKey].filter(item => item.link === `${category}/${group}`)[0].title;
const description = animationData[category as AnimationCategoryKey].filter(item => item.link === `${category}/${group}`)[0].description;

const { data } = await useAsyncData(route.path, () =>
  queryCollection('animation')
    .where('group', 'LIKE', `%${groupTitle}%`)
    .order('order', 'DESC')
    .all(),
);

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/animation', label: 'Webデザインアニメーション集' },
  { path: `/animation/${category}/${group}`, label: `${groupTitle}` },
];
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />
    <section class="section container main">
      <h1 class="title">{{ groupTitle }}</h1>
      <p class="lead">{{ description }}</p>
      <ul class="list">
        <li v-for="item in data" :key="item.id">
          <NuxtLink :to="`${item.path}`" class="card">
            <div class="card__img">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="card__title">
              {{ item.title }}
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>
    <section class="section">
      <Contact />
    </section>
  </main>
</template>

<style scoped lang="scss">
.main {
  padding-block: 3rem 6.5rem;
}
.title {
  font-size: 3.5rem;
  text-align: center;
  font-weight: 700;
}
.lead {
  text-align: center;
  margin-top: 1.5rem;
  line-height: 1.75;
}
.list {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 1rem;
  row-gap: 1.5rem;
  margin: 3rem 1.5rem 0;
}
.card {
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  box-shadow: 0 0 3px 0 rgb(0 0 0 / 12%), 0 2px 3px 0 rgb(0 0 0 / 22%);
  overflow: hidden;
  &__title {
    padding: 0.5rem 0.75rem;
  }
}
</style>
