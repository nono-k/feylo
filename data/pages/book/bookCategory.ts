type BookCategory = {
  name: string;
  slug: string;
  image: string;
  color: string;
};

export const bookCategory: BookCategory[] = [
  {
    name: 'HTML・CSS',
    slug: 'html-css',
    image: '/images/book/book-category-01.jpg',
    color: 'var(--sky-blue)',
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    image: '/images/book/book-category-02.jpg',
    color: 'var(--yellow)',
  },
  {
    name: 'プログラミング',
    slug: 'programming',
    image: '/images/book/book-category-03.jpg',
    color: 'var(--green)',
  },
  {
    name: '数学',
    slug: 'math',
    image: '/images/book/book-category-04.jpg',
    color: 'var(--blue)',
  },
  {
    name: 'デザイン',
    slug: 'design',
    image: '/images/book/book-category-05.jpg',
    color: 'var(--purple)',
  },
];
