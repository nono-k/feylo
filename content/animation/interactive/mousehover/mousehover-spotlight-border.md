---
title: "スポットライトのようにボーダーがマウスに追従するカードコンポーネント"
description: "最近、よく見かけるカードコンポーネントが並べられていて、ホバーするとスポットライトのようにボーダーがマウスに追従するアニメーションを解説します。実装ではmask-imageを利用して実現しています。"
order: 3
update: 2025-07-11
group: "マウスホバー"
image: "/images/animation/hover-spotlight-border.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/hover-spotlight-border/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/hover-spotlight-border.astro"
pointList:
  - "mask-imageを使用してスポットライトのようなボーダーを作成する"
  - "JavaScriptでマウス位置を取得してボーダーをマウスに追従させる"
---

## 実装の考え方

カードコンポーネントの中に、`card__border`というクラスを作成し、`position: absolute;`でカードの幅・高さを合わせるようにします。この`card__border`クラスに対して、表示したいボーダーを作成します。

このままだと、ボーダーが全て表示されているので、`mask-image`で<Marker>放射状グラデーションマスク</Marker>を適用し、マウスがある位置にボーダーを表示するようにします。

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

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
    <div class="card__border"></div>
  </div>
  // カードの数だけ繰り返す
</div>
```

先述の通り、`card`クラスの中に`card__border`クラスを入れます。

### SCSS

CSSは以下のようになります。

```scss [SCSS]
.card {
  position: relative;
  padding: 1rem;
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  &__wrapper {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(3, 1fr);
  }
  &__border {
    --border-x: 0px;
    -border-y: 0px;
    position: absolute;
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background: transparent;
    border-radius: 0.5rem;
    pointer-events: none;
    border: 1px solid #2B80FF;
    mask-image: radial-gradient(30% 50px at var(--border-x) var(--border-y), black 45%, transparent);
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.4s;
  }
}
```

先述の通り、ボーダーは`card__border`としています。このクラスに対して、`position: absolute;`でカードの幅・高さを合わせるようにします。

ここで下記のコードで、topとleftを-1pxにしているのは、`card`クラスのボーダーが1px外側についているので、その分をずらすためです。またその影響で、widthとheightを2pxずつ増やしています。

```scss [SCSS]
.card__border {
  position: absolute;
  top: -1px;
  left: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
}
```

#### mask-image

![](https://res.cloudinary.com/dy8ftemi0/image/upload/v1751900056/hover-spotlight-border-01_yijnnm.jpg)

ここで、`mask-image`について説明します。
まずは、`radial-gradient`についてですが、これは放射状グラデーションマスクを作成するために利用しています。第1引数に30%を、第2引数に50pxを指定することで、上記画像のように楕円形のグラデーションマスクを作成され、ボーダーの横幅が多く表示されるようになります。

```scss [SCSS]
.card__border {
  border: 1px solid #2B80FF;
  mask-image: radial-gradient(30% 50px at var(--border-x) var(--border-y), black 45%, transparent);
}
```

`--border-x`と`--border-y`は、JavaScriptで取得したマウスの位置を代入するための変数になります。この値を中心に楕円形のグラデーションマスクが移動することになります。

`mask-image`でこのグラデーションマスクを指定することで、黒い部分のみ表示されることで、マウスの位置がボーダー付近にある場合のみ、ボーダーが表示されるようになります。

また、初期状態で`opacity: 0;`で非表示にしておいて、JavaScriptでホバーした時に表示するようにします。

### JavaScript

```js [JavaScript]
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  const border = card.querySelector('.card__border');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    border.style.setProperty('--border-x', `${x}px`);
    border.style.setProperty('--border-y', `${y}px`);
  })

  card.addEventListener('mouseenter', () => {
      border.style.opacity = '1';
    });

  card.addEventListener('mouseleave', () => {
    border.style.opacity = '0';
  });
});
```

JavaScriptでは、`mousemove`イベントでカード内をマウスが移動した時に、マウスの位置を取得して、`--border-x`と`--border-y`に`setProperty`で代入しています。

`mouseenter`イベントでは、マウスがカードに入った時に、`opacity: 1;`で表示させ、`mouseleave`イベントでは、マウスがカードから出た時に、`opacity: 0;`で非表示にしています。