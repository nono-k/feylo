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
    {
      title: 'マウスストーカー',
      description: '様々なマウスストーカーの表現を紹介します。',
      link: 'interactive/mouse-stalker',
      image: '/images/animation/icon/mouse-stalker.svg',
    },
    {
      title: 'ハンバーガーメニュー',
      description: '様々なハンバーガーメニューのアニメーションを紹介します。',
      link: 'interactive/hamburger-menu',
      icon: {
        name: 'solar:hamburger-menu-bold',
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
    {
      title: 'ギャラリー',
      description: '画像やカードコンポーネントがgridなどで並べられて利用するアニメーションを紹介します。',
      link: 'visual/gallery',
      icon: {
        name: 'circum:grid-4-2',
        size: '2.5rem',
      },
    },
  ],
};
