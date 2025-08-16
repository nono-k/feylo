---
title: "ホバーした方向で180度回転するカードコンポーネント"
description: "CSSのrotateプロパティでY軸方向に180度回転するカードコンポーネントを作成する方法を紹介します。今回はホバーした方向によって右回りか左回りに回転するようにするので、JavaScriptでどちらからホバーされたかを判定してアニメーションさせます。"
order: 3
update: 2025-08-17
group: "カード"
image: "/images/animation/card-frip.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/card-frip/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/card-frip.astro"
pointList:
  - "rotateプロパティでY軸方向に180度回転させる。"
  - "JavaScriptでホバーした方向を判定してアニメーションさせる。"
---

## 実装の考え方

カードコンポーネントをY軸方向に180度回転させるには、CSSの`rotate: y 180deg`を使用します。また、そのままだと機能しないので、親の`card-frip`に`perspective`を設定し、回転させる子要素の`card-frip__inner`に`transform-style: preserve-3d`を設定することでY軸方向に回転させることが可能になります。

カードの表面と裏面は、`position: absolute`で固定配置し、`inset: 0`で親要素の幅と高さを合わせます。

左右のホバーした方向を判定するには、CSSのみではできないので、JavaScriptを使用して判定します。左方向からホバーした時は、時計回りの`180deg`を、右方向からホバーした時は、反時計回りの`-180deg`を設定します。

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

```html [HTML]
<div class="card-frip">
  <div class="card-frip__inner">
    <div class="card-frip__face -front">
      <h2>Front</h2>
    </div>
    <div class="card-frip__face -back">
      <h2>Back</h2>
    </div>
  </div>
</div>
```

親要素には`card-frip`クラスと命名して、回転させる子要素には`card-frip__inner`クラスと命名します。カード表面には`card-frip__face`を、白背景の表面は`-front`クラス、黒背景の表面は`-back`クラスと命名します。

### CSS

今回のデモのCSSは次の通りになります。

```css [CSS]
.card-frip {
  --rotate: 0deg;
  width: 200px;
  height: 300px;
  perspective: 1000px; // 3D空間を定義
}

.card-frip__inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d; // 子要素を3D空間に固定
  transition-property: rotate;
  transition-duration: 0.5s;
  rotate: y var(--rotate);
}

.card-frip__face {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  backface-visibility: hidden; // 背面を非表示にする
  border-radius: 1rem;
  border: 1px solid #000;
}

.card-frip__face.-front {
  background-color: #fff;
  color: #000;
}

// 裏面は180度回転して見えないようにする
.card-frip__face.-back {
  background-color: #000;
  color: #fff;
  rotate: y 180deg;
}
```

このままだと、裏側の`card-frip__face.-back`が見えてしまうので、`card-frip__face`に`backface-visibility: hidden`を設定して非表示にするのを忘れないでください。

CSSのカスタムプロパティ(ここでは`--rotate`)で時計回りか逆回りかをJavaScriptを使用してアニメーションさせます。回転させる要素は`card-frip__inner`になるので、この要素に`transition`を設定してください。

### JavaScript

最後にJavaScriptになります。

```js [JavaScript]
const fripCard = document.querySelector('.card-frip');

fripCard.addEventListener('mouseenter', (e) => {
  const rect = fripCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const half = rect.width / 2;

  if (x > half) {
    fripCard.style.setProperty('--rotate', '180deg');
  } else {
    fripCard.style.setProperty('--rotate', '-180deg');
  }
});

fripCard.addEventListener('mouseleave', () => {
  fripCard.style.setProperty('--rotate', '0deg');
});
```

JavaScriptでは、カード(`card-frip`)の左方向からホバーしたのか、右方向からホバーしたのかを判定します。CSSのカスタムプロパティに、左方向の場合は`180deg`、右方向の場合は`-180deg`を設定します。

`mouseleave`イベントで、カードのホバーを外れたら、`--rotate`を`0deg`に設定して表面を表示するようにします。