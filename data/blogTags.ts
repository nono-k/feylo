type BlogTags = {
  name: string;
  slug: string;
  color: string;
};

export const BlogTags: BlogTags[] = [
  { name: 'Blog', slug: 'blog', color: 'var(--purple)' },
  { name: 'CSS', slug: 'css', color: 'var(--sky-blue)' },
  // { name: 'JavaScript', slug: 'javascript', color: 'var(--yellow)' },
  { name: 'GSAP', slug: 'gsap', color: 'var(--green)' },
  { name: 'VSCode', slug: 'vs-code', color: 'var(--blue)' },
  { name: 'Nuxt.js', slug: 'nuxtjs', color: 'var(--green)' },
];
