import { BlogTags } from '~/data/blogTags';

export const getTagSlug = (tag: string) => {
  const tagData = BlogTags.find(tagData => tagData.name === tag);
  return tagData?.slug;
};
