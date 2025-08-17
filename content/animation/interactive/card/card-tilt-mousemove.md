---
title: "マウスの位置に応じて傾くカードコンポーネント"
description: "マウスの位置に応じてカードコンポーネントを傾かせる方法を紹介します。マウス位置はJavaScriptで取得して、その場所に応じて計算して傾けるようにします。"
order: 4
update: 2025-08-18
group: "カード"
image: "/images/animation/card-tilt-mousemove.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/card-tilt-mousemove/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/card-tilt-mousemove.astro"
pointList:
  - "マウス位置をJavaScriptで取得する。"
  - "その位置に応じて計算してカードを傾ける。"
---

## 実装の考え方

マウスの位置に応じてカードを傾けるには、マウスの位置をJavaScriptで取得し、その位置に応じて計算して傾けるようにします。傾きに関しては、CSSの`transform: rotateX() rotateY()`を使用します。

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

```html [HTML]
<div class="card-hover-range">
  <div class="card">
    <div class="card__img">
      <img src="https://picsum.photos/320/180?random=1" alt="" width="320" height="180">
    </div>
    <div class="card__text">
      <h2 class="card__title">Card Tilt</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum consequatur aliquid quo vel dolor, possimus asperiores optio quas expedita rem inventore cum voluptatibus sed, labore enim, a quidem iste aspernatur.</p>
    </div>
  </div>
</div>
```

傾くカードは`card`クラスになります。`card-hover-range`はカードが傾くマウスの範囲を広げるために、親要素として使用します。

### CSS

CSSは次の通りになります。

```css [CSS]
.card-hover-range {
  padding: 5rem;
}

.card {
  width: 400px;
  background-color: #fff;
  border-radius: 1rem;
  border: 1px solid #000;
  transition: transform 0.3s linear;
}
```

`card-hover-range`はカードが傾くマウスの範囲を広げるために、`padding`で広げます。`card`が`transform`で傾くので、`transition`を設定しておきます。デフォルトではイージングが`ease`なので、`linear`に変更し、直ぐに傾くようにします。

### JavaScript

最後にJavaScriptになります。

```js [JavaScript]
const cardMouseRange = document.querySelector(".card-hover-range");
const card = document.querySelector(".card");

const MaxRotate = 30;

cardMouseRange.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  const rotateX = (0.5 - y) * MaxRotate;
  const rotateY = (0.5 - x) * MaxRotate;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${-rotateY}deg)`;
});

cardMouseRange.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
```

それでは解説します。

#### 要素の取得

```js [JavaScript]
const cardMouseRange = document.querySelector(".card-hover-range");
const card = document.querySelector(".card");
```

`cardMouseRange`は、マウス移動を検知する範囲になります。後にこの要素に対して`mousemove`イベントを設定します。
`card`は、実際に傾けたいカード要素になります。

#### 最大回転角度

```js [JavaScript]
const MaxRotate = 30;
```

`MaxRotate`は、後の計算で使用するカードが傾く最大の角度を設定してます。この値を変更することで、カードが傾く範囲を変更できます。このデモでは30度に設定しています。

#### イベントの設定

```js [JavaScript]
cardMouseRange.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  const rotateX = (0.5 - y) * MaxRotate;
  const rotateY = (0.5 - x) * MaxRotate;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${-rotateY}deg)`;
});

cardMouseRange.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
```

`cardMouseRange`に`mousemove`イベントを設定して、マウスが動くたびにカードを傾けます。`mouseleave`イベントでカードを元に戻します。

```js [JavaScript]
const x = (e.clientX - rect.left) / rect.width;
const y = (e.clientY - rect.top) / rect.height;
```

`x`と`y`は、マウスの位置をカードの中心からの相対位置に変換しています。

- `e.clientX` / `e.clientY` : マウスの現在のX/Y座標
- `rect.left` / `rect.top` : カードの左上の座標
- `rect.width` / `rect.height` : カードの幅/高さ

このように計算することで、カード内のマウスの位置を<Marker>0~1の範囲</Marker>に変換します！

```js [JavaScript]
const rotateX = (0.5 - y) * MaxRotate;
const rotateY = (0.5 - x) * MaxRotate;
```

中心(0.5, 0.5)からどれだけ離れているかで傾き度合いを決めます。

- `(0.5 - y)` ; 上に行くと正になり、下に行くと負の値になる。
- `(0.5 - x)` ; 左に行くと正になり、右に行くと負の値になる。

計算したものに`MaxRotate`をかけて、角度に変換します。

```js [JavaScript]
card.style.transform = `rotateX(${rotateX}deg) rotateY(${-rotateY}deg)`;
```

最後に計算した角度を、カードに適用します。`rotateY`にマイナスをつけているのは、マウス移動と回転方向が一致するようにするためです。

ホバーが外れたら、`mouseleave`イベントで`rotate`を0にして、カードの角度を元に戻しましょう！