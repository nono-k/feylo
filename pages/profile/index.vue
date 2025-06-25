<script setup lang="ts">
import { profileData } from '~/data/pages/profileData';

const breadcrumbItems = [
  { path: '/', label: 'HOME' },
  { path: '/site-policy', label: '運営者について' },
];
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
  max-width: 1000px;
  margin-inline: auto;
  margin-block: 4rem 10rem;
}

.profile {
  &__list {
    border: 4px solid var(--black);
    border-radius: 1.5rem;
    overflow: hidden;
  }
  &__item {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    border-bottom: 1px solid var(--black);
    &:last-child {
      border-bottom: none;
    }
  }
  &__dt {
    padding: 1rem;
    background-color: var(--gray);
    font-weight: 700;
    text-align: center;
    border-right: 1px solid var(--black);
    height: 100%;
  }
  &__dd {
    padding: 1rem;
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
  }
  &__link {
    text-align: center;
  }
}
</style>
