<script setup lang="ts">
import { BlogTags } from '~/data/blogTags';
</script>

<template>
  <footer class="footer">
    <div class="footer__keywords">
      <h2 class="footer__heading">キーワードから探す💬</h2>
      <div class="footer__keywords-marquee-wrap">
        <div v-for="n in 2" :key="n" class="footer__keywords-marquee">
          <ul class="footer__keywords-marquee-list">
            <NuxtMarquee
              :auto-fill="true"
              :speed="10"
              :delay="n * 5"
              :pause-on-hover="true"
              :direction="n === 2 ? 'right' : 'left'"
            >
              <li v-for="tag in BlogTags" :key="tag.name" class="footer__keywords-marquee-item">
                <NuxtLink
                  :to="`/tag/${tag.slug}`"
                  class="footer__keywords-marquee-link"
                  :style="`--hover-color: ${tag.color}`"
                >
                  <span class="footer__keywords-slash ff-open-sans-700" :style="`color: ${tag.color}`">#</span>
                  {{ tag.name }}
                </NuxtLink>
              </li>
            </NuxtMarquee>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer__content">
      <h2 class="footer__heading">コンテンツ一覧📦</h2>
      <div class="footer__content-wrap">
        <ul class="footer__content-list">
          <li class="footer__content-item">
            <NuxtLink to="/blog" class="footer__content-link" style="background: var(--green);">
              <span class="footer__content-text">ブログ記事一覧</span>
            </NuxtLink>
          </li>
          <li class="footer__content-item">
            <NuxtLink to="/components" class="footer__content-link" style="background: var(--yellow);">
              <span class="footer__content-text">コンポーネントまとめ</span>
            </NuxtLink>
          </li>
          <!-- <li class="footer__content-item">
            <NuxtLink to="/tools" class="footer__content-link" style="background: var(--sky-blue);">
              <span class="footer__content-text">Web制作に役立つツール集</span>
            </NuxtLink>
          </li> -->
          <li class="footer__content-item">
            <NuxtLink to="/animation" class="footer__content-link" style="background: var(--orange);">
              <span class="footer__content-text">Webデザインアニメーション帳</span>
            </NuxtLink>
          </li>
          <li class="footer__content-item">
            <NuxtLink to="/book" class="footer__content-link" style="background: var(--purple);">
              <span class="footer__content-text">おすすめ本</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <ul class="footer__bottom-links">
        <!-- <li>
          <a href="" class="footer__bottom-link">このサイトについて</a>
        </li> -->
        <li>
          <NuxtLink to="/profile" class="footer__bottom-link">運営者について</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/site-policy" class="footer__bottom-link">サイトポリシー</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/privacy-policy" class="footer__bottom-link">プライバシーポリシー</NuxtLink>
        </li>
      </ul>
      <div class="footer__bottom-logo ff-zilla-slab-700-italic">
        <NuxtLink to="/">Feylo</NuxtLink>
      </div>
      <small class="footer__bottom-copy">Copyright© Feylo All Rights Reserved.</small>
    </div></footer>
</template>

<style lang="scss" scoped>
.footer {
  // background-color: var(--gray);
  height: 50vh;
  // margin-top: 5rem;
  &__heading {
    padding-left: var(--container-padding);
    font-size: 1.5rem;
    font-weight: 700;
  }
  &__keywords {
    padding-block: 1.5rem 3rem;
    border-bottom: 1px solid var(--black);
  }
  &__keywords-marquee-wrap {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @include mixin.phone {
      gap: 0.75rem;
    }
  }
  &__keywords-marquee-list {
    display: flex;
    gap: 0.5rem;
  }
  &__keywords-marquee-item {
    margin-right: 1rem;
    @include mixin.phone {
      margin-right: 0.5rem;
    }
  }
  &__keywords-marquee-link {
    display: inline-block;
    line-height: 1;
    font-size: 0.75rem;
    font-weight: 700;
    background: var(--gray);
    background: #eee;
    padding: 0.3rem 0.5rem;
    border-radius: 0.75rem;
    transition: 0.3s;
    @include mixin.hover {
      background: var(--hover-color);
      .footer__keywords-slash {
        color: var(--black) !important;
      }
    }
  }
  &__content {
    margin-top: 1.5rem;
    border-bottom: 1px solid var(--black);
  }
  &__content-wrap {
    margin-top: 2.5rem;
    @include mixin.phone {
      margin-top: 1.75rem;
    }
  }
  &__content-list {
    display: flex;
    height: 25rem;
    > * + * {
      margin-left: -1px;
    }
    @include mixin.phone {
      height: 22rem;
    }
  }
  &__content-item {
    width: 5rem;
    display: flex;
    border: 1px solid var(--black);
    // border-bottom: none;
    margin-bottom: -1px;
    transition-property: translate;
    transition-duration: 0.43s;
    transition-timing-function: cubic-bezier(0.35, 2.5, 0.7, 0.65);
    @include mixin.hover {
      translate: 0 -1rem
    }
    @include mixin.phone {
      width: 4rem;
    }
  }
  &__content-link {
    display: block;
    width: 40rem;
    position: relative;
  }
  &__content-text {
    writing-mode: vertical-rl;
    margin-left: 1.5rem;
    margin-top: 1.5rem;
    font-weight: 700;
    @include mixin.phone {
      font-size: 0.875rem;
      margin-top: 1rem;
      margin-left: 1.25rem;
    }
  }
  &__bottom {
    padding-block: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  &__bottom-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      &:last-child {
        .footer__bottom-link {
          border-right: none;
        }
      }
    }
  }
  &__bottom-link {
    font-size: 0.875rem;
    padding-inline: 0.5rem;
    border-right: 1px solid var(--black);
  }
  &__bottom-logo {
    font-size: 1.75rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
