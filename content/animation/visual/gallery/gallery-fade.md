---
title: "GSAPのstaggerを使って時間差で表示されるカードコンポーネント(ギャラリー・グリッド・フェードイン)"
description: "GSAPのstaggerを使用して、時間差で表示されるようなカードコンポーネントの実装方法を解説します。今回のデモでは再生ボタンをクリックしたら時間差で表示されますが、実際にはScrollTriggerで要素が入ったら時間差で表示するパターンが多いでしょう。最後にScrollTriggerを使った例も紹介します。"
order: 1
update: 2025-07-27
group: "ギャラリー"
image: "/images/animation/gallery-fade.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/gallery-fade/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/gallery-fade.astro"
pointList:
  - "gsap.set()で要素を非表示にしておく"
  - "staggerを使って時間差で表示させる"
---

## 実装の考え方

GSAPを使用して、時間差で表示されるようなカードコンポーネントを実装していきます。フェードで表示させるためには、`gsap.set()`の中で`opacity`と`y`で下に移動させ非表示にしておき、再生ボタンを押したらGSAPの<Marker>stagger</Marker>を使用して時間差で表示させます。

## バージョン情報

この記事で使用しているライブラリのバージョンは以下の通りです。

::version-info
---
libs:
  - icon: 
      name: twemoji:four-leaf-clover
    name: GSAP
    version: 3.13.0
---
::

## HTML

時間差で表示させるカードコンポーネントのHTMLは以下のようになります。

```html [HTML]
<div class="card__wrapper">
  <div class="card">
    <div class="card__img">
      <img src="https://picsum.photos/300/200?random=1" alt="">
    </div>
    <div class="card__body">
      <h2>タイトル01</h2>
      <p>Lorem ipsum dolor sit amet consectetur.</p>
    </div>
  </div>
  // カードの数だけ繰り返す
</div>
```

## CSS

初期状態はJavaScript側でGSAPで非表示にするので、CSSは`grid`で並べるだけなので省略します。

## JavaScript

最後にJavaScriptになります。

```js [JavaScript]
import { gsap } from 'gsap';

const btn = document.querySelector('.btn');
const cards = document.querySelectorAll('.card');

btn.addEventListener('click', () => {
  showFadeAnimation();
});

const showFadeAnimation = () => {
  cards.forEach(card => {
    gsap.set(card, { opacity: 0, y: 40 });
  });

  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.2,
  });
};
```

再生ボタンをクリックしたら、時間差で表示されるアニメーション`showFadeAnimation`関数を実行します。
それでは、解説していきます！

### gsap.set()で非表示にする

ボタンをクリックされたらアニメーションするようにするので、`showFadeAnimation`関数の中に、`gsap.set()`でカード要素全てを非表示にしておきます。ここでは、`opacity`を`0`にし見えなくして、`y`を`40`にし下に40px移動させ下から表示されるようにします。

```js [JavaScript]
const showFadeAnimation = () => {
  cards.forEach(card => {
    gsap.set(card, { opacity: 0, y: 40 });
  });
};
```

### GSAPのstaggerを使用して時間差で表示する

最後に非表示にしたカード要素を全て時間差で表示させましょう。

```js [JavaScript]
const showFadeAnimation = () => {
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.2, // 1個ごとに0.2秒ずつ遅延させる
  });
};
```
`gsap.to()`の第1引数には、`querySelectorAll()`で取得した要素の配列を渡すことができます。この全てのカード要素に対して、`stagger`を使用して時間差で表示させます。`stagger`に渡す値によって、カード要素1個ずつに0.2秒ずつ遅延させることができます。

これはイメージとしては、CSSだと`transition-delay`で遅延させているのと同じ感じになります。

```css [staggerをCSSで表現した例]
/* 0.2秒ずつ遅延 */
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.4s; }
.card:nth-child(4) { animation-delay: 0.6s; }
```

以上で、時間差で表示されるアニメーションを解説しました！

## ScrollTriggerを使った例

実際にはScrollTriggerで要素が入ったら時間差で表示するパターンが多いでしょう。最後にScrollTriggerを使った例も紹介します。

```js [JavaScript]
gsap.to(cards, {
  scrollTrigger: {
    trigger: el,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(cards, {
        duration: 0.6,
        opacity: 1,
        stagger: 0.2,
      });
    }
  }
})
```

スクロールで要素が入ったらアニメーションさせるので、`scrollTrigger`を使います。あとは、普段通りに`onEnter`で要素が入ったら、`gsap.to()`で`stagger`を使用して時間差で表示させるだけになります。

`scrollTrigger`を使ったフェードインアニメーションの実装方法は以前紹介していますので、そちらもぜひご覧ください！

::recommend-link
---
items:
  - title: "スクロールで要素が入ったらふわっと表示（フェードイン）"
    link: "/animation/visual/scroll/scroll-fadein"
    image: "/images/animation/scroll-fadein.jpg"
    description: "GSAP・ScrollTriggerを使用して、スクロールで要素が入ったらふわっと表示するアニメーションの実装方法を解説します。"
---
::
