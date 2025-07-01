<template>
  <article class="animation-markdown-body">
    <slot />
  </article>
</template>

<style lang="scss">
.animation-markdown-body {
  max-width: 880px;
  margin-inline: auto;
  padding-inline: 40px;
  font-size: 1.125rem;
  line-height: 2;
  @include mixin.mobile {
    padding-inline: 0;
    font-size: 1rem;
  }

  h2, h3 {
    font-weight: 700;
    a {
      color: var(--black);
      text-decoration: none;
      transition: color 0.3s;
      @include mixin.hover {
        color: var(--green);
      }
    }
  }

  h2 {
    font-size: 1.5rem;
    border-bottom: 2px solid var(--black);
    margin-block: 6rem 1.75rem;
    padding-inline: 1rem;
    padding-bottom: 0.75rem;
    @include mixin.mobile {
      margin-block: 3.5rem 1.5rem;
    }
  }

  h3 {
    font-size: 1.25rem;
    margin-block: 3rem 1.5rem;
    padding-inline: 1rem;
    text-indent: -1em;
    @include mixin.mobile {
      margin-block: 2.5rem 1.5rem;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.75rem;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: var(--orange);
      margin-right: 0.5rem;
    }
    + .pre {
      margin-top: 1.25rem;
    }
  }

  p {
    margin-top: 1.5rem;
  }

  p code {
    padding: 0.2em 0.5em;
    margin-inline: 0.2em;
    border-radius: 0.25rem;
    background-color: #ececed;
    border: 1px solid #4f576c;
    color: #484f60;
    font-size: 0.85rem;
    font-family: Consolas,Menlo,Monaco,-apple-system,BlinkMacSystemFont,"Segoe UI",Meiryo,monospace;
  }
}
</style>
