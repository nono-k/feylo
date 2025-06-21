<template>
  <div class="hero container">
    <HeroLeft />
    <HeroMain />
    <HeroRight />
  </div>
</template>

<style scoped lang="scss">
.hero {
  max-width: 1380px;
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  gap: 2.8rem;
  margin-top: 1.5rem;
}
</style>
