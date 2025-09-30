---
title: "Swiperでサムネイル付きのスライダーの実装方法"
description: "スライダーライブラリのSwiperを使ってサムネイル付きのスライダーの実装方法を紹介します。サムネイルをクリックしたらそのスライダーに切り替わるように実装します。"
order: 2
update: 2025-08-15
group: "スライダー"
image: "/images/animation/swiper-thumbnail.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/swiper-thumbnail/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/swiper-thumbnail.astro"
pointList:
  - "Swiperでサムネイル付きのスライダーを実装する"
  - "サムネイルをクリックしたらそのスライダーに切り替わるように実装する"
  - "サムネイルはスクロールバーでスクロールできるように実装する"
---

## 実装の考え方

スライダーライブラリとして1番使われている[Swiper](https://swiperjs.com/)を使用して、サムネイル付きのスライダーの実装方法を紹介します。

サムネイルと連動させるには、親になる`swiper`を2つ用意して、メインのスライダーの方に`thumbs`をサムネイルになるスライダーに設定します。

## バージョン情報

この記事で使用しているSwiperのライブラリのバージョンは以下の通りです。

::version-info
---
libs:
  - icon: 
      name: simple-icons:swiper
      color: "#00AFFF"
    name: Swiper
    version: 11.2.10
---
::

Swiperの読み込みに関しては、解説しませんが、`import`かCDNでCSSファイルとJSファイルを読み込んでください。`import`の例は下記のようになります。

```js [JavaScript]
import Swiper from 'swiper';
import 'swiper/css/bundle';
```

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

```html [HTML]
<!-- メインのスライダー -->
<div class="swiper main-swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="https://picsum.photos/640/360?random=1" alt="">
    </div>
    <!-- スライダー枚数分追加 -->
  </div>
  <!-- スライダーの矢印ボタン -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>

<!-- サムネイルのスライダー -->
<div class="swiper thumbs-swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="https://picsum.photos/640/360?random=1" alt="">
    </div>
    <!-- スライダー枚数分追加 -->
  </div>
  <!-- スライダーのスクロールバー -->
  <div class="swiper-scrollbar"></div>
</div>
```

スライダーとサムネイルが連動するように、`main-swiper`と`thumbs-swiper`の2つのスライダーを用意します。メインのスライダーは、`main-swiper`に、サムネイルのスライダーは`thumbs-swiper`になります。連動させるためにメインのスライダーとサムネイルのスライダーは同じ順番の画像にしましょう。

サムネイルのスライダーをスクロールバーでスクロールできるように、`thumbs-swiper`の中に`swiper-scrollbar`を追加しましょう。

### CSS

サムネイルのスライダーと、スクロールバーについてのCSSについて解説します。

```css [CSS]
.thumbs-swiper {
  margin-top: 0.5rem;
}

.thumbs-swiper .swiper-slide {
  filter: brightness(0.5);
}

.thumbs-swiper .swiper-slide.swiper-slide-thumb-active {
  filter: brightness(1);
}

.swiper-scrollbar {
  position: static !important;
  margin-top: 0.5rem;
}
```
メインのスライダーとサムネイルの間に余白を設けるために、`margin-top`を設定しています。

サムネイルのスライダーの初期状態は、`filter: brightness(0.5)`で暗くしています。メインのスライダーと連動して、現在表示されている画像のサムネイルには、`swiper-slide-thumb-active`クラスが付与されるので、その際は`filter: brightness(1)`を使用してアクティブなサムネイルであることが分かるようになります。

スクロールバーの`swiper-scrollbar`はデフォルトでは、`position: absolute`で表示されるので、`position: static`にすることで設定を切りましょう。

### JavaScript

最後にJavaScriptを実装していきます。
まずは、メインのスライダーとサムネイルのスライダーを取得しましょう。

```js [JavaScript]
// メインのスライダーとサムネイルのスライダーを取得
const mainSwiperEl = document.querySelector('.main-swiper');
const thumbsSwiperEl = document.querySelector('.thumbs-swiper');
```

次はメインのスライダーの設定になります。

```js [JavaScript]
// メインのスライダーの設定
const mainSwiper = new Swiper(mainSwiperEl, {
  slidesPerView: 1,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  thumbs: {
    swiper: thumbsSwiperEl,
  }
});
```
メインのスライダーとサムネイルのスライダーを連動させるために、`thumbs`オプションを使用し`thumbsSwiperEl`を指定します。このようにすることで連動させることが可能になります。

最後にサムネイルのスライダーの設定です。

```js [JavaScript]
const thumbsSwiper = new Swiper(thumbsSwiperEl, { 
  slidesPerView: 3,
  freeMode: true,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
})
```

サムネイルのスライダーは3枚表示させるようにするため、`slidesPerView`を3に設定します。`freeMode`を`true`にすることで、サムネイルのスライダーを自由にスクロールできるようにします。

スクロールバーを機能させるためには、`scrollbar`オプションを使用し、`el`にスクロールバーの要素(`.swiper-scrollbar`)を指定します。`draggable`を`true`にすることで、スクロールバーをドラッグしてスクロールできるようにします。

以上が、Swiperでサムネイル付きのスライダーの実装方法になります。
ぜひ、この実装方法を参考にして、サムネイル付きのスライダーを実装してみてください！