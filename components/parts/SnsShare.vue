<script setup lang="ts">
interface Props {
  title?: string;
  slug?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  slug: '',
});

const siteUrl = 'https://feylo.dev';
const shareLink = [
  {
    name: 'X/Twitter',
    icon: 'fa6-brands:x-twitter',
    url: `https://twitter.com/intent/tweet?text=${props.title}&url=${siteUrl}${props.slug}`,
  },
  {
    name: 'Facebook',
    icon: 'fa6-brands:facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}${props.slug}`,
    color: '#1777F2',
  },
  {
    name: 'LINE',
    icon: 'fa6-brands:line',
    url: `https://social-plugins.line.me/lineit/share?url=${siteUrl}${props.slug}`,
    color: '#00B901',
  },
  {
    name: 'Hatena',
    icon: 'simple-icons:hatenabookmark',
    url: `https://b.hatena.ne.jp/entry/${siteUrl}${props.slug}`,
    color: '#00A4DE',
  },
];
</script>

<template>
  <div class="sns-share">
    <div class="sns-share__title ff-zilla-slab-700-italic">Share</div>
    <div class="sns-share__list">
      <a v-for="share in shareLink" :key="share.name" :href="share.url" class="sns-share__link" target="_blank">
        <Icon :name="share.icon" size="1.5rem" />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sns-share {
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  &__list {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }
  &__link {
    color: var(--black);
  }
}
</style>
