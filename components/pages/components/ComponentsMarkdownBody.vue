<template>
  <article class="components-markdown-body">
    <slot />
  </article>
</template>

<style lang="scss">
.components-markdown-body {
  margin-block: 2rem;
  padding-inline: 1rem;
  font-size: 1.125rem;
  line-height: 1.75;
  @include mixin.mobile {
    font-size: 1rem;
  }
  @include mixin.phone {
    padding-inline: 0rem;
  }

  h2, h3, h4, h5, h6 {
    font-weight: 700;
    a {
      color: var(--black);
      text-decoration: none;
      transition: color 0.3s;
      @include mixin.hover {
        color: var(--blue);
      }
    }
  }

  h2 {
    font-size: 1.5rem;
    border-bottom: 2px solid var(--blue);
    margin-block: 4rem 1.75rem;
    padding-bottom: 0.75rem;
    @include mixin.mobile {
      margin-block: 3rem 1.5rem;
      font-size: 1.25rem;
      padding-bottom: 0.5rem;
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
      background-color: var(--blue);
      margin-right: 0.5rem;
    }
    + .pre {
      margin-top: 1.25rem;
    }
  }

  h4 {
    font-size: 1.2rem;
    margin-top: 2rem;
    border-bottom: 1px solid var(--black);
    padding-bottom: 0.25rem;
    + p {
      margin-top: 0.75rem;
    }
  }

  a {
    color: #3366cc;
    text-decoration: underline;
    text-underline-offset: 0.25em
  }

  p {
    margin-top: 1.5rem;
  }

  p code {
    padding: 0.2em 0.5em;
    margin-inline: 0.2em;
    border-radius: 0.25rem;
    background-color: #f0f5f9;
    border: 1px solid #e6edf3;
    font-size: 0.85rem;
    font-family: Consolas,Menlo,Monaco,-apple-system,BlinkMacSystemFont,"Segoe UI",Meiryo,monospace;
  }

  ol, ul {
    margin-top: 1.5rem;
    li {
      list-style: inherit;
      margin-left: 1rem;
    }
  }
}
</style>
