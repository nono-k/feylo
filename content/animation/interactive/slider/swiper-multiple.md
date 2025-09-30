---
title: "Swiperでレイアウト形状が異なる複数のスライダーを連動して動かす方法"
description: "スライダーライブラリのSwiperを使用して、Topページのブログ記事一覧に使用されていそうな、レイアウト形状が異なる複数のスライダーを連動して動かす方法を解説します。"
order: 3
update: 2025-10-01
group: "スライダー"
image: "/images/animation/swiper-multiple.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/swiper-multiple/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/swiper-multiple.astro"
pointList:
  - "複数のスライダーを連動して動かす方法"
---

## 実装の考え方

このデモのような、メイン画像とサブ画像に分かれているデザインのレイアウトは、1つの`swiper`要素では実現できないので、親の`swiper`要素を2つ用意して、スライダーが動いたら連動して動くように実装します。

その処理はスライダーが変化した際に発火するイベント`slideChange`内で書きます。このデモではループを`true`にしているので、スライダーを動かすには`slideToLoop()`を使用して動かします。

## バージョン情報

この記事で使用しているSwiperのバージョンは以下の通りです。

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

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

```html [HTML]
<div class="wrap">
  <!-- メインのスライダー -->
  <div class="swiper swiper-main">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="swiper-slide-img">
          <img src="https://picsum.photos/640/360?random=1" alt="" fetchpriority="high">
        </div>
        <div class="swiper-slide-content">
          <div class="swiper-slide-title">Title 01</div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate optio nihil delectus magnam, quaerat est.</p>
        </div>
      </div>
      <!-- スライダー枚数分追加 -->
    </div>
  </div>

  <!-- サブのスライダー -->
  <div class="swiper swiper-sub">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="swiper-slide-img">
          <img src="https://picsum.photos/640/360?random=1" alt="" fetchpriority="high">
        </div>
        <div class="swiper-slide-content">
          <div class="swiper-slide-title">Title 01</div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. .</p>
        </div>
      </div>
      <!-- スライダー枚数分追加 -->
    </div>
  </div>
</div>
```

先述のとおりに、メインのスライダーとサブのスライダーの2つ用意します。このデモでは、メインのスライダーは左側に1枚配置し、サブのスライダーは右側に2.5枚見えるように配置しています。

JavaScriptでそれぞれ取得するために、クラスは`swiper-main`と`swiper-sub`を設定しています。
CSSに関しては解説することがないので、気になる方はコードを参照ください。

## JavaScript

最後にJavaScriptの実装になります。
まずは、メインのスライダーの設定になります。

```js [メインスライダーの設定]
const mainSwiperEl = document.querySelector('.swiper-main');

const mainSwiper = new Swiper(mainSwiperEl, {
  loop: true,
  loopAdditionalSlides: 1,
  slidesPerView: 1,
});
```

メインのスライダーは、1枚のみ表示されるので`slidesPerView: 1`と設定します。また今回のデモではループさせるので、ループの設定をしておきます。

連動は次のようにサブのスライダーの方で設定します。

```js [サブスライダーの設定]
const subSwiperEl = document.querySelector('.swiper-sub');

const subSwiper = new Swiper(subSwiperEl, {
  loop: true,
  loopAdditionalSlides: 1,
  initialSlide: 1,
  slidesPerView: 2.5,
  spaceBetween: 8,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  on: {
    slideChange: (swiper) => {
      const index = swiper.realIndex === 0 ? swiper.slides.length : swiper.realIndex;
      mainSwiper.slideToLoop(index - 1);
    }
  }
});
```

サブのスライダーは右側で見切れるように見せるため、`slidesPerView: 2.5`と小数点の値を設定します。また、1枚ずれて表示させるために`initialSlide: 1`と設定し、2枚目がサブのスライダーの一番左にくるように初期設定で表示します。

スライダーの変更は`slideChange`イベントで検知し、`realIndex`でサブスライダーの現在のスライダーを取得します。メインスライダーは1枚ずれているので、`slideToLoop(index - 1)`と1引くことで、サブスライダーとメインスライダーが連動します。
