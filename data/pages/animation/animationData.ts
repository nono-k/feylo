type AnimationIcon = {
  name: string;
  size: string;
};

type AnimationItem = {
  title: string;
  description: string;
  link: string;
  image?: string;
  icon?: AnimationIcon;
};

export type AnimationCategoryKey = 'interactive' | 'visual';

type AnimationData = Record<AnimationCategoryKey, AnimationItem[]>;

export const animationData: AnimationData = {
  interactive: [
    {
      title: 'マウスホバー',
      description: 'マウスホバーのアニメーションを紹介します。',
      link: 'interactive/mousehover',
      icon: {
        name: 'fluent:cursor-hover-16-regular',
        size: '2.5rem',
      },
    },
    {
      title: 'マウスクリック',
      description: 'マウスクリックのアニメーションを紹介します。',
      link: 'interactive/mouseclick',
      icon: {
        name: 'mynaui:click',
        size: '2.5rem',
      },
    },
  ],
  visual: [
    {
      title: 'スクロール',
      description: 'GSAP・ScrollTriggerなどを使ったスクロール連動のアニメーションを紹介します。',
      link: 'visual/scroll',
      icon: {
        name: 'lineicons:scroll-down-2',
        size: '2.5rem',
      },
    },
  ],
};
