<script setup lang="ts">
const props = defineProps<{
  id: string;
  title: string;
}>();
</script>

<template>
  <div class="codepen-embed">
    <iframe
      style="width: 100%; height: 100%;"
      :title="props.title"
      :src="`https://codepen.io/kamenono/embed/${props.id}?default-tab=&theme-id=dark`"
      loading="lazy"
      allowtransparency="true"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>

<style scoped lang="scss">
.codepen-embed {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  margin-top: 1.5rem;
  @include mixin.mobile {
    aspect-ratio: 1 / 1;
  }
  iframe {
    border: none;
  }
}
</style>
