<template>
  <div class="news__wrap">
    <div class="news__heading ff-zilla-slab-700">news</div>
    <a href="" class="news__link">ニュースです</a>
  </div>
</template>

<style scoped lang="scss">
.news {
  &__wrap {
    display: grid;
    grid-template-columns: 8rem 1fr;
    margin-top: 2rem;
  }
  &__heading {
    background: var(--black);
    color: var(--white);
    font-size: 1.25rem;
    text-transform: uppercase;
    text-align: center;
    padding-block: 0.2rem;
  }
  &__link {
    padding-block: 0.2rem;
    padding-inline: 0.5rem;
    background: var(--purple);
    font-weight: 500;
  }
}
</style>
