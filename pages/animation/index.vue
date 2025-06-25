<script setup lang="ts">
const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/animation', label: 'Webデザインアニメーション集' },
];
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
.tab {
  margin-top: 4rem;
}
</style>
