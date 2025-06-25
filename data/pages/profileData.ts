type ProfileData = {
  title: string;
  description: string;
  contents: {
    title: string;
    text?: string;
    site?: {
      url: string;
      title: string;
      image: string;
    }[];
  }[];
};

export const profileData: ProfileData = {
  title: 'Profile',
  description: '運営者について',
  contents: [
    {
      title: '運営者',
      text: 'かめのの（<a href="https://x.com/kameno_no3" target="_blank">@kameno_no3</a>）',
    },
    {
      title: 'サイト名',
      text: 'Feylo（フェイロ）',
    },
    {
      title: '開設日',
      text: '2025/07/20',
    },
    {
      title: 'URL',
      text: 'https://feylo.dev',
    },
    {
      title: 'X/Twitter',
      text: '<a href="https://x.com/kameno_no3" target="_blank">https://x.com/kameno_no3</a>',
    },
    {
      title: 'Github',
      text: '<a href="https://github.com/nono-k" target="_blank">https://github.com/nono-k</a>',
    },
    {
      title: 'その他運営サイト',
      site: [
        {
          url: 'https://hypb.dev',
          title: 'нуль',
          image: '/images/common/hypb.png',
        },
        {
          url: 'https://munus.dev',
          title: 'munus',
          image: '/images/common/munus.png',
        },
      ],
    },
  ],
};
