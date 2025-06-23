<script setup lang="ts">
defineProps<{
  image: string;
}>();
</script>

<template>
  <div class="cube">
    <div class="face front" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="face back" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="face right" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="face left" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="face top" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="face bottom" :style="{ backgroundImage: `url(${image})` }"></div>
  </div>
</template>

<style scoped lang="scss">
.cube {
  --w: 240px;
  --h: 240px;
  --z: calc(var(--w) / 2);
  width: var(--w);
  height: var(--h);
  position: absolute;
  top: 50%;
  translate: 0% -50%;
  transform: rotateX(4deg) rotateY(-12deg) rotateZ(15deg);
  transform-style: preserve-3d;
  // animation: rotate 20s linear infinite;
}
.face {
  position: absolute;
  width: var(--w);
  height: var(--h);
  background-size: cover;
  background-position: center;
}
.front  { transform: rotateY(  0deg) translateZ(var(--z));  }
.back   { transform: rotateY(180deg) translateZ(var(--z)); }
.right  { transform: rotateY( 90deg) translateZ(var(--z));  }
.left   { transform: rotateY(-90deg) translateZ(var(--z)); }
.top    { transform: rotateX( 90deg) translateZ(var(--z)); }
.bottom { transform: rotateX(-90deg) translateZ(var(--z)); }

@keyframes rotate {
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(-360deg) rotateY(-360deg);
  }
}
</style>
