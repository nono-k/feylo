<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '',
  },
  height: {
    type: [String, Number],
    default: '',
  },
});
</script>

<template>
  <figure class="figure">
    <div class="figure__img">
      <img
        :src="props.src"
        :alt="props.alt"
        :width="props.width"
        :height="props.height"
      />
    </div>
    <figcaption class="figure__caption">{{ props.alt }}</figcaption>
  </figure>
</template>

<style scoped lang="scss">
.figure {
  max-width: 800px;
  margin-inline: auto;
  margin-block: 3rem 2rem;
  &__caption {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 1rem;
  }
}
</style>
