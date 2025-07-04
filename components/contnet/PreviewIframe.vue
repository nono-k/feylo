<script setup lang="ts">
import { createHighlighter } from 'shiki';

const props = defineProps<{
  html: string;
  css: string;
  height?: string;
  active?: 'html' | 'css';
}>();

const activeTab = ref(props.active || 'html');
const highlightedHtml = ref('');
const highlightedCss = ref('');

const iframeContent = computed(() => {
  return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
        }
        .container {
          margin-inline: 1rem;
          height: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .flex {
          display: flex;
          &.center {
            width: 100%;
            align-items: center;
            justify-content: center;
          }
          &[gap="1rem"] {
            gap: 1rem;
          }
        }
        .stack {
          > * + * {
            margin-top: 1rem;
          }
        }
        ${props.css}
      </style>
    </head>
    <body>
      <div class="container">
        ${props.html}
      </div>
    </body>
    </html>
  `.trim();
});

onMounted(async () => {
  const highlighter = await createHighlighter({
    themes: ['aurora-x'],
    langs: ['html', 'css'],
  });

  highlightedHtml.value = highlighter.codeToHtml(props.html.trim(), { lang: 'html', theme: 'aurora-x' });
  highlightedCss.value = highlighter.codeToHtml(props.css.trim(), { lang: 'css', theme: 'aurora-x' });
});

const codeCopied = ref<boolean>(false);

const copyCode = (): void => {
  const code = activeTab.value === 'html' ? props.html : props.css;
  navigator.clipboard
    .writeText(code.trim())
    .then(() => {
      codeCopied.value = true;
      setTimeout(function () {
        codeCopied.value = false;
      }, 5000);
    })
    .catch(() => {
      console.error('Error: Unable to copy code.');
    });
};
</script>

<template>
  <div class="preview">
    <div class="preview__browser">
      <div class="preview__bar">
        <div class="preview__bar-circle" />
        <div class="preview__bar-circle" />
        <div class="preview__bar-circle" />
      </div>
      <iframe
        :srcdoc="iframeContent"
        sandbox="allow-scripts"
        frameborder="0"
        class="preview__iframe"
        :style="{ '--iframe-height': props.height || '100px' }"
      />
    </div>

    <div class="preview__tabs">
      <button :class="['preview__btn', { 'is-active': activeTab === 'html' }]" @click="activeTab = 'html'">HTML</button>
      <button :class="['preview__btn', { 'is-active': activeTab === 'css' }]" @click="activeTab = 'css'">CSS</button>
      <div class="preview__copy">
        <span
          v-if="codeCopied"
          class="copy-success ff-zen-kaku-gothic-700"
        >
          コピーしました！
        </span>
        <button
          :class="['copy-btn', { success: codeCopied }]"
          @click="copyCode"
        >
          Copy
        </button>
      </div>
    </div>
    <div class="preview__content">
      <div class="preview__code" v-html="activeTab === 'html' ? highlightedHtml : highlightedCss" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview {
  margin-top: 3rem;
  &__browser {
    border: 1px solid var(--code-bg);
  }
  &__bar {
    height: 1.5rem;
    background: var(--gray);
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-left: 1rem;
  }
  &__bar-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff7676;
    &:nth-child(2) {
      background: #ffc41f;
    }
    &:nth-child(3) {
      background: #46e26b;
    }
  }
  &__iframe {
    width: 100%;
    height: var(--iframe-height);
  }
  &__tabs {
    display: flex;
    background-color: var(--code-bg);
    height: 2.5rem;
    margin-top: 0.75rem;
  }
  &__btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: Consolas,Menlo,Monaco,-apple-system,BlinkMacSystemFont,"Segoe UI",Meiryo,monospace;
    color: var(--white);
    &.is-active {
      background-color: #15181e;
    }
  }
  &__copy {
    margin-left: auto;
    .copy-success,
    .copy-btn {
      font-size: 0.75rem;
      color: var(--white);
      padding: 0.35rem 0.75rem;
      border-radius: 4px;
      border: 1px solid var(--white);
      margin-right: 0.5rem;
      line-height: 1;
    }
    .copy-success {
      background-color: #22863a;
      border-color: #22863a;
    }
    .copy-btn.success {
      display: none;
    }
  }
  &__content {
    box-shadow: 0 -5px 3px -4px rgba(0,0,0,.9);
  }
  &__code {
    max-height: 300px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.45rem;
    }
    &::-webkit-scrollbar-track {
      // margin-block: 0.875rem;
      background: var(--code-bg);
    }
    &::-webkit-scrollbar-thumb {
      margin-block: 10.5rem;
      background: rgba(255, 255, 255, 0.44);
      border-radius: 3px;
    }
  }
}
</style>

<style lang="scss">
.preview {
  &__code {
    pre {
      background-color: var(--code-bg) !important;
      font-size: 0.90625rem;
      padding-block: 1.25rem;
    }
    code {
      .line {
        padding-inline: 1.25rem;
        line-height: 1.75;
        font-family: Consolas,Menlo,Monaco,-apple-system,BlinkMacSystemFont,"Segoe UI",Meiryo,monospace;
      }
    }
  }
}
</style>
