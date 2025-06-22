type AnimationItem = {
  title: string;
  description: string;
  link: string;
  image: string;
};

export type AnimationCategoryKey = 'interactive' | 'visual';

type AnimationData = Record<AnimationCategoryKey, AnimationItem[]>;

export const animationData: AnimationData = {
  interactive: [
    {
      title: 'マウスホバー',
      description: 'マウスホバーでアニメーション',
      link: 'interactive/mousehover',
      image: 'https://placehold.jp/160x90.png',
    },
  ],
  visual: [
    {
      title: 'スクロール',
      description: 'スクロールでアニメーション',
      link: 'visual/scroll',
      image: 'https://placehold.jp/160x90.png',
    },
  ],
};
