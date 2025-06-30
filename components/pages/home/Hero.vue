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
  gap: 1.5rem;
  margin-top: 1.5rem;
  @media (max-width: 1100px) {
    grid-template-columns: 320px 1fr;
  }
  @include mixin.mobile {
    grid-template-columns: 240px 1fr;
    gap: 1rem;
  }
  @include mixin.phone {
    grid-template-columns: 1fr;
  }
}
</style>
