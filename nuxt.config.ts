// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/fonts'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: { enabled: false },
  css: ['@/styles/styles.scss'],
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
