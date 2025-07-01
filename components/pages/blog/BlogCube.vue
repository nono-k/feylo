<script setup lang="ts">
defineProps<{
  image: string;
}>();

const cubeRef = ref<HTMLElement | null>(null);
const rotation = ref({ x: -20, y: 20 });

const isDragging = ref(false);
let startX = 0;
let startY = 0;

const onMouseDown = (event: MouseEvent) => {
  isDragging.value = true;
  startX = event.clientX;
  startY = event.clientY;
};

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging.value) return;

  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;
  startX = event.clientX;
  startY = event.clientY;

  rotation.value.y += deltaX * 0.5;
  rotation.value.x += deltaY * 0.2;

  updateTransform();
};

const onMouseUp = () => {
  isDragging.value = false;
};

const updateTransform = () => {
  if (cubeRef.value) {
    cubeRef.value.style.transform = `
      rotateX(-${rotation.value.x}deg)
      rotateY(${rotation.value.y}deg)
    `;
  }
};

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
});
</script>

<template>
  <div
    ref="cubeRef"
    class="cube for-large"
    @mousedown="onMouseDown"
  >
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
  cursor: grab;
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
