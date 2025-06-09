// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: { enabled: false },
  css: ['@/styles/styles.scss'],
  vue: {
    compilerOptions: {
      isCustomElement: tag => /^(swiper|swiper-slide|swiper-container)$/.test(tag),
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
