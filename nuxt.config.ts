import { siteConfig } from './utils/siteConfig';

const { siteTitle, siteDesc, siteUrl, siteType, siteImg } = siteConfig;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    'nuxt-marquee',
    '@nuxtjs/cloudinary',
    '@nuxt/scripts',
    '@nuxtjs/sitemap',
  ],
  $production: {
    scripts: {
      registry: {
        googleAnalytics: {
          id: 'G-HXP64LZV9W',
        },
      },
    },
  },
  ssr: true,
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
      title: siteTitle,
      meta: [
        { name: 'description', content: siteDesc },
        { property: 'og:description', content: siteDesc },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'og:site_name', content: siteTitle },
        { property: 'og:title', content: siteTitle },
        { property: 'og:type', content: siteType },
        { property: 'og:url', content: siteUrl },
        { property: 'og:image', content: siteImg },
      ],
    },
  },
  css: ['@/styles/styles.scss'],
  vue: {
    compilerOptions: {
      isCustomElement: tag =>
        /^(swiper|swiper-slide|swiper-container)$/.test(tag) || tag === 'baseline-status',
    },
  },
  site: {
    url: siteUrl,
    name: siteTitle,
  },
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-breaks': {},
          'remark-link-card': {
            options: {
              cache: true,
              shortenUrl: true,
            },
          },
        },
        rehypePlugins: {
          'rehype-raw': {},
          'rehype-external-links': {
            options: {
              target: '_blank',
            },
          },
        },
        highlight: {
          theme: 'aurora-x',
        },
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },
  generate: {
    routes: ['/'],
  },
  nitro: {
    preset: 'static',
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/mixin.scss";',
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: {
        blockSpacing: true,
        indent: 2,
        quotes: 'single',
        semi: true,
      },
    },
  },
});
