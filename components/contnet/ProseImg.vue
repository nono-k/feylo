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

const config = useRuntimeConfig();
const cloudName = config.public.cloudinary.cloudName;

const isStringSrc = typeof props.src === 'string';
const isCloudinaryImage = isStringSrc && props.src.startsWith(`https://res.cloudinary.com/${cloudName}/image/`);
const isCloudinaryVideo = isStringSrc && props.src.startsWith(`https://res.cloudinary.com/${cloudName}/video/`);
</script>

<template>
  <figure class="figure">
    <div class="figure__img">
      <component
        :is="isCloudinaryVideo ? 'CldVideoPlayer' : isCloudinaryImage ? 'CldImage' : 'img'"
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
