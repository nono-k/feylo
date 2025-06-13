<template>
  <Hero />
  <HomeNews />
  <main>
    <section class="section">
      <HomeHeading text="最新記事一覧">Blog</HomeHeading>
      <HomeBlogList />
      <div class="button__wrap">
        <HoverCircleButton link="/blog">View More</HoverCircleButton>
      </div>
    </section>
    <section class="section">
      <HomeHeading
        text="Feyloによるコンテンツの一覧。ぜひリンクをクリックして御覧ください。"
      >
        Archive
      </HomeHeading>
      <HomeArchiveList />
    </section>
    <section class="section">
      <HomeHeading text="ランダムな記事">Random</HomeHeading>
      <RandomBlog />
    </section>
    <section class="section">
      <Contact />
    </section>
  </main>
</template>

<style scoped>
.section {
  margin-top: 5rem;
}
.button__wrap {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}
</style>
