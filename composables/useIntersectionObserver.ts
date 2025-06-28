export const useIntersectionObserver = (
  target: Ref<HTMLElement | null>,
  callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {},
) => {
  const isSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window;
  const observer = ref<IntersectionObserver | null>(null);

  onMounted(() => {
    if (!isSupported || !target.value) return;

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting, entry);
      });
    }, options);

    if (target.value) {
      observer.value.observe(target.value);
    }
  });

  onUnmounted(() => {
    if (observer.value && target.value) {
      observer.value.unobserve(target.value);
    }
  });
};
