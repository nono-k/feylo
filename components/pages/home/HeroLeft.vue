<template>
  <div class="hero__left">
    <div class="deco"></div>
    <p class="hero__left-title">Web制作に役立つ情報を発信します</p>
    <div class="hero__left-links">
      <div class="hero__left-links-title ff-zilla-slab-700">Archive</div>
      <div class="hero__left-links-wrap">
        <a href="/components" class="hero__left-item">
          <span class="hero__left-icon">
            <Icon name="lets-icons:materials-light" size="1.85rem" />
          </span>
          <span class="hero__left-item-text-wrap">
            <span class="hero__left-item-text">コンポーネント</span>
            <span class="hero__left-item-en ff-zilla-slab-700">Components</span>
          </span>
        </a>
        <a href="/tool" class="hero__left-item">
          <span class="hero__left-icon">
            <Icon name="iconoir:frame-tool" size="1.85rem" />
          </span>
          <span class="hero__left-item-text-wrap">
            <span class="hero__left-item-text">ツール</span>
            <span class="hero__left-item-en ff-zilla-slab-700">Tools</span>
          </span>
        </a>
        <a href="/animation" class="hero__left-item">
          <span class="hero__left-icon">
            <Icon name="material-symbols-light:animation" size="1.85rem" />
          </span>
          <span class="hero__left-item-text-wrap">
            <span class="hero__left-item-text">アニメーション</span>
            <span class="hero__left-item-en ff-zilla-slab-700">Animation</span>
          </span>
        </a>
        <a href="/book" class="hero__left-item">
          <span class="hero__left-icon">
            <Icon name="material-symbols-light:menu-book-outline" size="1.85rem" />
          </span>
          <span class="hero__left-item-text-wrap">
            <span class="hero__left-item-text">おすすめ本</span>
            <span class="hero__left-item-en ff-zilla-slab-700">Book</span>
          </span>
        </a>
      </div>
    </div>
    <div class="hero__left-bottom">
      <a href="" class="hero__left-bottom-link">運営者について</a>
      <div class="hero__left-bottom-icons">
        <a class="hero__left-bottom-icon" href="https://x.com/kameno_no3" target="_blank">
          <Icon name="pajamas:twitter" size="1.25rem" />
        </a>
        <a class="hero__left-bottom-icon" href="https://github.com/nono-k" target="_blank">
          <Icon name="fa6-brands:github" size="1.25rem" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  &__left {
    height: 560px;
    background: var(--green);
    border-radius: 1rem;
    padding-block: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--black);
  }
  &__left-title {
    font-size: 0.95rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1.5rem;
    background: var(--black);
    color: var(--white);
  }
  &__left-links {
    border-top: 1px solid var(--black);
    border-bottom: 1px solid var(--black);
    padding-top: 0.75rem;
    padding-bottom: 2rem;
    padding-inline: 1rem;
  }
  &__left-links-title {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    text-align: center;
  }
  &__left-links-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 0.5rem;
    row-gap: 1.5rem;
  }
  &__left-item {
    display: grid;
    grid-template-columns: 1.85rem 1fr;
    column-gap: 0.35rem;
    background: var(--white);
    padding: 0.5rem;
    padding-left: 0.25rem;
    background: var(--yellow);
    box-shadow: 2px 2px 0 var(--black);
    border: 1px solid var(--black);
    @include mixin.hover {
      translate: 2px 2px;
      box-shadow: none;
    }
    &:nth-child(2) {
      background: var(--sky-blue);
    }
    &:nth-child(3) {
      background: var(--orange);
    }
    &:nth-child(4) {
      background: var(--purple);
    }
  }
  &__left-item-text-wrap {
    display: flex;
    flex-direction: column;
  }
  &__left-item-text {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.01em;
  }
  &__left-item-en {
    font-size: 0.75rem;
  }
  &__left-bottom {
    margin-top: auto;
    padding-inline: 1.2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--black);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__left-bottom-link {
    font-size: 0.875rem;
    display: inline-block;
    text-decoration: underline;
  }
  &__left-bottom-icons {
    display: flex;
    gap: 0.5rem;
  }
  &__left-bottom-icon {
    margin-top: 0.5rem;
  }
}
</style>
