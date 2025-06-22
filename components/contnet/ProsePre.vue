<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});

const codeCopied = ref<boolean>(false);

const copyCode = (): void => {
  navigator.clipboard
    .writeText(props.code)
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
  <div class="pre">
    <div class="pre-head">
      <div
        v-if="props.filename"
        class="filename"
      >
        {{ filename }}
      </div>
      <span
        v-if="codeCopied"
        class="copy-success"
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
    <pre
      class="pre-body"
      :class="$props.class"
    ><slot /></pre>
  </div>
</template>

<style>
.pre {
  overflow-x: hidden;
  border-radius: 0.25rem;
  background-color: #25292f;
  font-family: Consolas,Menlo,Monaco,-apple-system,BlinkMacSystemFont,"Segoe UI",Meiryo,monospace;
  font-size: 0.90625rem;
  margin-top: 3rem;
}

.pre-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-gray-700);
  box-shadow: 0 5px 3px -4px rgba(0,0,0,.9);
}

.pre-head .filename {
  color: var(--white);
  padding: 0.75rem 1rem;
  background-color: #15181e;
  font-size: 0.8rem;
  font-weight: 600;
}

.pre-head .copy-success,
.pre-head .copy-btn {
  font-size: 0.8rem;
  color: var(--white);
  padding: 0.25em 0.75em;
  border-radius: 4px;
  border: 1px solid var(--white);
  margin-right: 0.5rem;
}

.pre-head .copy-success {
  background-color: #22863a;
  border-color: #22863a;
}

.pre-head .copy-btn.success {
  display: none;
}

.pre-body {
  padding-block: 1rem;
  overflow-x: auto;
}

.pre-body code {
  display: inline-block;
  width: 100%;
}

.pre-body .line {
  padding-inline: 1.25rem;
  line-height: 1.75;
}

.pre-body .line span {
  background-color: transparent !important;
}

.pre-body .line.highlight,
.pre-body .line.highlighted {
  background-color: #2e4c35;
  border-left: 4px solid #469458;
}

.pre-body .line.diff.remove {
  background-color: color-mix(in srgb, var(--shiki-default-bg) 65%, #f43f5e);
}

.pre-body .line.diff.add {
  background-color: color-mix(in srgb, var(--shiki-default-bg) 75%, #10b981);
}

pre code .line {
  display: block;
}
</style>
