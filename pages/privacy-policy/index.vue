<script setup lang="ts">
import { privacyPolicyData } from '~/data/pages/privacyPolicyData';
import { siteConfig } from '~/utils/siteConfig';

const { siteTitle, siteImg } = siteConfig;

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/privacy-policy', label: 'プライバシーポリシー' },
];

useSeoMeta({
  title: `プライバシーポリシー | ${siteTitle}`,
  ogTitle: `プライバシーポリシー | ${siteTitle}`,
  description: 'プライバシーポリシーです。',
  ogDescription: 'プライバシーポリシーです。',
  ogImage: siteImg,
});
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
  @include mixin.mobile {
    margin-top: 3rem;
  }
}
.content {
  margin-inline: 2.5rem;
  @include mixin.mobile {
    margin-inline: 1rem;
  }
  h2 {
    margin-block: 3.5rem 2rem;
    font-weight: 700;
    @include mixin.mobile {
      margin-block: 2.5rem 1.5rem;
    }
  }
  p {
    & + p {
      margin-top: 1.5rem;
    }
  }
}
</style>
