---
title: "Swiperを使った基本的なスライダーの実装方法"
description: "スライダーライブラリのSwiperを使って基本的なスライダーの実装方法を紹介します。今回は表示されるスライダー枚数が1枚のスライダーを実装します。"
order: 1
update: 2025-08-12
group: "スライダー"
image: "/images/animation/swiper-base.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/swiper-base/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/swiper-base.astro"
pointList:
  - "Swiperでスライダーを実装する"
  - "スライダーの表示枚数を1枚に設定する"
---

## 実装の考え方

スライダーライブラリとして1番使われている[Swiper](https://swiperjs.com/)を使用して、基本的なスライダーの実装方法を紹介します。まずは基本的なSwiperの使い方として、スライダーの表示枚数が1枚の場合の実装方法を紹介します。

スライダーの表示枚数を1枚に設定するには、Swiperの設定で`slidesPerView`を1に設定します。また、ページネーションと矢印ボタンを機能させるには、Swiperの設定で`pagination`と`navigation`を設定します。

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
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="https://picsum.photos/640/360?random=1" alt="">
    </div>
    <!-- スライダー枚数分追加 -->
  </div>
  <!-- スライダーの矢印ボタンとページネーション -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  <div class="swiper-pagination"></div>
</div>
```

Swiperの使い方として、親要素に`swiper`クラスを設定し、子要素に`swiper-wrapper`クラスを設定します。さらに、スライダーの各要素に`swiper-slide`クラスを設定します。スライダーの枚数分を`swiper-slide`で`swiper-wrapper`の中に追加してください。

スライダーの矢印ボタンは、`swiper-button-prev`と`swiper-button-next`になり、ページネーションは`swiper-pagination`を`swiper`の中に入れましょう。スライダーの矢印ボタンとページネーションは、SwiperのCSSファイルでデフォルトのスタイルが設定されおり、機能はJavaScriptで設定します。

基本的なスライダーなのでCSSに関しては、SwiperのCSSファイルのみでデモのレイアウトになるので省略します。

### JavaScript

最後にJavaScriptを実装していきます。

```js [JavaScript]
new Swiper('.swiper', {
  slidesPerView: 1,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
```

スライダーの表示枚数を1枚に設定するには、Swiperの設定で`slidesPerView`を1に設定します。

スライダーの矢印とページネーションを機能させるために、矢印は`navigation`にprevとnextをHTMLで設定したクラス`swiper-button-prev`,`swiper-button-next`を設定します。

ページネーションは`pagination`に`el`をHTMLで設定したクラス`swiper-pagination`を設定します。ページネーションをクリックした時にスライダーを切り替えるため、`clickable`を`true`に設定します。

以上で、基本的なスライダーの実装が完了しました。