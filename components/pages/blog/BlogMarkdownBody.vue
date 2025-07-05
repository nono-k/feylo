<template>
  <article class="blog-markdown-body">
    <slot />
  </article>
</template>

<style lang="scss">
.blog-markdown-body {
  margin-block: 3rem;
  padding-inline: var(--container-padding);
  font-size: 1.125rem;
  line-height: 2;
  overflow-x: auto;
  @include mixin.mobile {
    font-size: 1rem;
  }
}
.blog-markdown-body .content {

  h2, h3, h4, h5, h6 {
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
    border-top: 2px solid var(--black);
    border-bottom: 2px solid var(--black);
    margin-block: 6rem 2.5rem;
    margin-inline: -1.5rem;
    padding-inline: 1.5rem;
    padding-block: 1.5rem;
    @include mixin.mobile {
      font-size: 1.35rem;
      margin-block: 3.5rem 1.5rem;
      margin-inline: 0;
      padding-inline: 0.5rem;
      padding-block: 1rem;
    }
  }

  h3 {
    font-size: 1.25rem;
    margin-block: 3.5rem 1.5rem;
    padding-inline: 0.5rem;
    padding-bottom: 0.5rem;
    position: relative;
    @include mixin.mobile {
      margin-block: 2.5rem 1.5rem;
    }
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: repeating-linear-gradient(90deg, var(--green) 0%, var(--green) 30%, var(--gray) 30%, var(--gray) 100%);
    }
    + .pre {
      margin-top: 1.5rem;
    }
  }

  h4 {
    font-size: 1.125rem;
    margin-top: 1.5rem;
    padding-inline: 1rem;
    text-indent: -1em;
    &::before {
      content: '';
      display: inline-block;
      width: 0.6rem;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: var(--green);
      margin-right: 0.5rem;
    }
    + p {
      margin-top: 0.5rem;
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

  p, ol, ul {
    code {
      padding: 0.2em 0.5em;
      margin-inline: 0.2em;
      border-radius: 0.25rem;
      background-color: #ececed !important;
      border: 1px solid #4f576c;
      color: #484f60 !important;
      font-size: 0.85rem;
      font-family: Consolas,Menlo,Monaco,-apple-system,BlinkMacSystemFont,"Segoe UI",Meiryo,monospace;
    }
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
