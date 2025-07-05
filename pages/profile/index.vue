<script setup lang="ts">
import { profileData } from '~/data/pages/profileData';
import { siteConfig } from '~/utils/siteConfig';

const { siteTitle, siteImg } = siteConfig;

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/site-policy', label: '運営者について' },
];

useSeoMeta({
  title: `運営者について | ${siteTitle}`,
  ogTitle: `運営者について | ${siteTitle}`,
  description: '運営者についてです。',
  ogDescription: '運営者についてです。',
  ogImage: siteImg,
});
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />
    <HomeHeading text="運営者について">{{ profileData.title }}</HomeHeading>

    <div class="wraper">
      <dl class="profile__list">
        <div v-for="item in profileData.contents" :key="item.title" class="profile__item">
          <dt class="profile__dt">{{ item.title }}</dt>
          <dd v-if="item.site" class="profile__sites">
            <div v-for="site in item.site" :key="site.title" class="profile__card">
              <a :href="site.url" target="_blank" class="profile__img">
                <img :src="site.image" :alt="site.title" />
              </a>
              <a :href="site.url" target="_blank" class="profile__link">({{ site.title }})</a>
            </div>
          </dd>
          <dd v-else class="profile__dd" v-html="item.text" />
        </div>
      </dl>
    </div>

    <section class="section">
      <Contact />
    </section>
  </main>
</template>

<style lang="scss">
.profile {
  &__list {
    a {
      text-decoration: underline;
    }
  }
}
</style>

<style scoped lang="scss">
.wraper {
  max-width: 1080px;
  margin-inline: auto;
  margin-block: 4rem 10rem;
  padding-inline: 1.5rem;
  @include mixin.mobile {
    margin-top: 3rem;
    padding-inline: 1rem;
  }
}

.profile {
  &__list {
    border: 4px solid var(--black);
    border-radius: 1.5rem;
    overflow: hidden;
    @include mixin.mobile {
      border-width: 2px;
      border-radius: 0.5rem;
    }
  }
  &__item {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    border-bottom: 1px solid var(--black);
    &:last-child {
      border-bottom: none;
    }
    @include mixin.phone {
      grid-template-columns: 92px 1fr;
      font-size: 0.875rem;
    }
  }
  &__dt {
    padding: 1rem;
    background-color: var(--gray);
    font-weight: 700;
    text-align: center;
    border-right: 1px solid var(--black);
    height: 100%;
    @include mixin.phone {
      padding: 0.75rem;
    }
  }
  &__dd {
    padding: 1rem;
    @include mixin.phone {
      padding: 0.75rem;
    }
  }
  &__sites {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  &__card {
    display: grid;
    flex-direction: column;
    gap: 0.2rem;
    padding: 1.5rem 2rem;
    &:nth-child(2n) {
      border-left: 1px solid var(--black);
    }
    @include mixin.phone {
      padding: 1rem 0.75rem;
    }
  }
  &__link {
    text-align: center;
  }
}
</style>
