// blog
export const useBlogContents = async () => {
  const { data: blogs } = await useAsyncData('blog', () =>
    queryCollection('blog')
      .order('date', 'DESC')
      .all(),
  );
  return { blogs };
};

export const useBlogContent = async (path: string) => {
  const { data: blog } = await useAsyncData(path, () =>
    queryCollection('blog').path(path).first(),
  );
  return { blog };
};

export const useBlogRandomContents = async () => {
  const { data: blogs } = await useAsyncData('blog', () =>
    queryCollection('blog')
      .all(),
  );

  const randomBlogs = blogs?.value?.sort(() => Math.random() - 0.5).slice(0, 4);

  return { randomBlogs };
};

// components
export const useComponentsContents = async () => {
  const { data } = await useAsyncData('components', () =>
    queryCollection('components')
      .all(),
  );
  return { data };
};

export const useComponentsContent = async (path: string) => {
  const { data } = await useAsyncData(path, () =>
    queryCollection('components').path(path).first(),
  );
  return { data };
};

// animation
export const useAnimationContents = async () => {
  const { data } = await useAsyncData('animation', () =>
    queryCollection('animation')
      .order('order', 'DESC')
      .all(),
  );
  return { data };
};

export const useAnimationContent = async (path: string) => {
  const { data } = await useAsyncData(path, () =>
    queryCollection('animation').path(path).first(),
  );
  return { data };
};
