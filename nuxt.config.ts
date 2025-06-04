// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/eslint'],
  devtools: { enabled: false },
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
