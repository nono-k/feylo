<template>
  <div class="contact">
    <div class="contact__typo-wrap">
      <div v-for="n in 5" :key="n" class="contact__typo ff-zilla-slab-700" :style="{ transform: `translate(${-n * 100}px, 0)` }">
        <span>contact</span>
        <span>contact</span>
      </div>
    </div>
    <a href="/contact" class="contact__inner">
      <p class="contact__sub">お問い合わせ</p>
      <h2 class="contact__title ff-open-sans-700">contact</h2>
      <p class="contact__text">お仕事のことなどお気軽にご連絡ください。<br>メンターもやってますので気になる方は,<br>フォームからご連絡をよろしくお願いします。</p>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.contact {
  position: relative;
  display: grid;
  place-items: center;
  height: 100vh;
  overflow: hidden;
  &__typo-wrap {
    position: absolute;
    top: -100px;
    left: -60px;
    width: calc(100% + 60px);
    background: var(--accent-orange);
    z-index: -1;
  }
  &__typo {
    font-size: 12rem;
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: 0.1em;
  }
  &__inner {
    background: var(--white);
    padding: 2.5rem 2rem;
    width: calc(100% - 20rem);
    text-align: center;
  }
  &__sub {
    font-size: 1.2rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      background: var(--accent-orange);
      border-radius: 50%;
    }
  }
  &__title {
    font-size: 10rem;
    text-transform: uppercase;
    margin-top: 1rem;
  }
  &__text {
    margin-top: 1.5rem;
  }
}
</style>
