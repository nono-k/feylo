<template>
  <div class="hero container">
    <HeroLeft />
    <HeroMain />
    <div class="hero__right" />
  </div>
</template>

<style scoped lang="scss">
.hero {
  max-width: 1380px;
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  gap: 2.8rem;
  margin-top: 1.5rem;
  &__right {
    background: var(--green);
    height: 560px;
  }
}
</style>
