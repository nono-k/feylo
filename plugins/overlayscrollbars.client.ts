import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const initScrollbars = () => {
      OverlayScrollbars(document.body, {
        scrollbars: {
          autoHide: 'leave',
        },
      });
    };

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', initScrollbars);
    }
    else {
      initScrollbars();
    }
  }
});
