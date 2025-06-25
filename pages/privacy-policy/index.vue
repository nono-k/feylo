<script setup lang="ts">
import { privacyPolicyData } from '~/data/pages/privacyPolicyData';

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/privacy-policy', label: 'プライバシーポリシー' },
];
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />
    <HomeHeading text="プライバシーポリシー">{{ privacyPolicyData.title }}</HomeHeading>

    <div class="wraper">
      <div v-for="item in privacyPolicyData.contents" :key="item.heading" class="content">
        <h2>{{ item.heading }}</h2>
        <p v-for="text in item.text" :key="text">{{ text }}</p>
      </div>
    </div>

    <section class="section">
      <Contact />
    </section>
  </main>
</template>

<style scoped lang="scss">
.wraper {
  max-width: 1000px;
  margin-inline: auto;
  margin-block: 6rem 10rem;
}
.content {
  margin-inline: 2.5rem;
  h2 {
    margin-block: 3.5rem 2rem;
    font-weight: 700;
  }
  p {
    & + p {
      margin-top: 1.5rem;
    }
  }
}
</style>
