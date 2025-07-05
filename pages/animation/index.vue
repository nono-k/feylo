<script setup lang="ts">
import { siteConfig } from '~/utils/siteConfig';

const { siteTitle, siteImg } = siteConfig;

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/animation', label: 'Webデザインアニメーション集' },
];

useSeoMeta({
  title: `Webデザインアニメーション集 | ${siteTitle}`,
  ogTitle: `Webデザインアニメーション集 | ${siteTitle}`,
  description: 'Web制作をはじめたばかりの方へアニメーションの作り方を分かりやすく解説しています',
  ogDescription: 'Web制作をはじめたばかりの方へアニメーションの作り方を分かりやすく解説しています',
  ogImage: siteImg,
});
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />
    <section class="section container main">
      <h1 class="title">Webデザイン<br>アニメーション集</h1>
      <p class="lead">Web制作をはじめたばかりの方へ<br>アニメーションの作り方を分かりやすく解説しています</p>
      <div class="tab">
        <AnimationTab />
      </div>
    </section>
    <section class="section">
      <Contact />
    </section>
  </main>
</template>

<style scoped lang="scss">
.main {
  padding-block: 3rem 6.5rem;
  padding-bottom: 18rem;
}
.title {
  font-size: 3.5rem;
  text-align: center;
  font-weight: 700;
  @include mixin.phone {
    font-size: 2.5rem;
  }
}
.lead {
  text-align: center;
  margin-top: 1.5rem;
  line-height: 1.75;
  @include mixin.phone {
    font-size: 0.875rem;
    margin-top: 1rem;
  }
}
.tab {
  margin-top: 4rem;
  @include mixin.mobile {
    margin-top: 3rem;
  }
}
</style>
