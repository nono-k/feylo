---
title: "Swiper × GSAPで作る円形で切り替わるスライダーの実装方法"
description: "スライダーライブラリのSwiperとGSAPを使ってclip-pathのcircleを使用して、スライド切り替わり時に円形で切り替わるスライダーの実装方法を解説します。"
order: 4
update: 2025-09-27
group: "スライダー"
image: "/images/animation/swiper-clip-path-circle.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/swiper-clip-path-circle/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/swiper-clip-path-circle.astro"
pointList:
  - "SwiperとGSAPを使用してリッチなアニメーションを実装する"
  - "Swiperでスライド切り替わり時のイベントを理解する"
---

## 実装の考え方

SwiperとGSAPを使用してWebサイトのキービジュアルに使用できそうなリッチなアニメーションの作り方を解説します。Swiperでは、スライドが切り替わる瞬間に呼び出せるイベントとして`slideChangeTransitionStart`が用意されてます。このイベントを使い、スライドが切り替わる瞬間にGSAPでアニメーションを実装します。

円形に切り替わる処理は、CSSの`clip-path`プロパティの`circle()`関数を使用します。`clip-path`で最初は非表示にしておいて、表示する際は円形で表示するようにすることで、今回のデモのようなアニメーションを実装できます。

## バージョン情報

この記事で使用しているSwiperとGSAPのバージョンは以下の通りです。

::version-info
---
libs:
  - icon: 
      name: simple-icons:swiper
      color: "#00AFFF"
    name: Swiper
    version: 11.2.10
  - icon: 
      name: twemoji:four-leaf-clover
    name: GSAP
    version: 3.13.0
---
::

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

```html [HTML]
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <div class="swiper-slide-img">
        <img src="https://picsum.photos/640/360?random=1" alt="">
      </div>
      <!-- スライダー枚数分追加 -->
    </div>
  </div>
</div>
```

HTMLでは基本的なSwiperの構造になります。今回のデモでは画像が縮小されながら表示するので、画像を`swiper-slide-img`クラスで囲っておきます。

### CSS

円形に切り替わる実装はJavaScript側で実装するので、ここでは画像が縮小されながら表示する箇所のみを紹介します。

```css [CSS]
.swiper-slide.swiper-slide-active .swiper-slide-img {
  z-index: 1;
  transform-origin: center;
  animation: img-scale 5s linear;
}

@keyframes img-scale {
  0% {
    scale: 1.1;
  }
  100% {
    scale: 1;
  }
}
```

スライドがアクティブになったときは、Swiper側でアクティブなスライドにクラス(`swiper-slide-active`)が付与されるので、このクラスに画像を縮小表示されるキーアニメーションを設定します。

キーアニメーションでは、最初に`scale: 1.1`して拡大しておき、`scale`を元に戻すことで画像を縮小されながら表示されることになります。

### JavaScript

最後にJavaScriptを実装していきましょう。
次はこのデモの全コードになります。

```js [JavaScript]
new Swiper('.swiper', {
  slidesPerView: 1,
  effect: 'fade',
  loop: true,
  loopAdditionalSlides: 1,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  on: {
    slideChangeTransitionStart: (swiper) => {
      const activeSlide = swiper.slides[swiper.activeIndex];

      gsap.fromTo(activeSlide, {
        clipPath: 'circle(0% at 50% 50%)',
      }, {
        clipPath: 'circle(70.7% at 50% 50%)',
        duration: 1,
        ease: 'power3.in',
      })
    },
  }
});
```

#### スライド画像を重ねる

このデモでは、通常のSwiperのようにスライド画像が横から表示されるのではなく、画像が重なった状態からアニメーションで切り替わります。Swiperではスライドを重ねるには`effect: 'fade'`を設定することでスライドを重なった状態にできます。

```js [JavaScript]
new Swiper('.swiper', {
  effect: 'fade',
})
```

#### スライドを円形に切り替える

先述の通りにスライドの切り替わりの瞬間のイベント`slideChangeTransitionStart`にGSAPとclip-pathを使用して円形に切り替えるようにしましょう。

```js [JavaScript]
new Swiper('.swiper', {
  // ...
  on: {
    slideChangeTransitionStart: (swiper) => {
      const activeSlide = swiper.slides[swiper.activeIndex];

      gsap.fromTo(activeSlide, {
        clipPath: 'circle(0% at 50% 50%)',
      }, {
        clipPath: 'circle(70.7% at 50% 50%)',
        duration: 1,
        ease: 'power3.in',
      })
    },
  }
})
```

円形のアニメーションはアクティブなスライドに対して行うので、アクティブなスライドを取得します。これは`slideChangeTransitionStart`のコールバック関数の引数にある`activeIndex`から取得できます。

このアクティブなスライドに対してGSAPの`fromTo`メソッドを使用してアニメーションさせます。`fromTo`メソッドは、アニメーションの開始状態と終了状態を指定することができます。

開始状態では、`clipPath: 'circle(0% at 50% 50%)'`とし円形の状態で非表示にし、終了状態では`clipPath: 'circle(70.7% at 50% 50%)'`とします。

この`clipPath`の値は[こちら](https://bennettfeely.com/clippy/)から確認できるので確認してみてください

![円形の状態で全表示](https://res.cloudinary.com/dy8ftemi0/image/upload/v1758772114/swiper-clip-path-circle_uvp6uq.jpg)

先ほどのサイトで、`clip-path: circle()`での画像が全表示する際の値が`70.7%`であるので、この値を終了状態に設定しています。

## 注意事項

このデモでは、Webサイトのキービジュアルに使用できるようにループで自動再生するデモを作成しました。もし`clip-path`での円形で切り替わるアニメーションをスライドの前後で切り替わるようにする場合は、次のスライドの切り替わりは上手くいくのですが、前のスライドに切り替える際にはアニメーションがうまくいかないことがあります。

原因は、Swiperの`effect: 'fade'`が設定されているため、切り替える時のスライドの`opacity`が0になるためです。なので、その点も考慮して実装してみてください！
