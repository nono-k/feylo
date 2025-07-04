---
title: "ホバーする位置で丸が大きくなるボタン"
description: "ホバーする位置に応じて丸が拡大するボタンの作り方を解説します。通常のホバー時にボタンの背景色が変わるのと違い、ホバーした位置から丸が拡大して色が変わるので、リンクなどに使用するとよりインタラクティブなボタンになるでしょう。このサイトでもTopページなどに使用しています。"
order: 1
update: 2025-07-01
group: "マウスホバー"
image: "/images/animation/mousehover-circle-button.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/hover-circle-button/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/hover-circle-button.astro"
pointList:
  - "JavaScriptで要素のホバーした位置と出た位置を取得する"
  - "取得した位置を元に丸を移動させ拡大させる"
---

## 実装の考え方

まず最初にボタンの中に丸い円を`position: absolute`で配置しておき`scale: 0`で非表示にしておきます。ホバーしたらその位置に丸い円を移動させてから、拡大することでホバーした場所から丸い円が拡大していくようになります。

### 注意事項

今回は便宜上、ボタンサイズは固定値にしていますので、実際に使用する際はデザインなどを加味してボタンサイズを調整してください。

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

```html [HTML]
<a href="" class="button">
  Button
  <span class="button__circle"></span>
</a>
```

今回はリンクを想定して`a`タグに`button`クラスを付与しています。拡大させる丸い円には`a`タグの中に`span`タグを入れ`button__circle`クラスを付与しています。

### SCSS

```scss [SCSS]
.button {
  --black: #000;
  --hover-color: #fff;
  --button-size:  280px;

  position: relative;
  display: inline-block;
  padding: 0.75rem 1rem;
  border: 1px solid var(--black);
  color: var(--black);
  overflow: hidden;
  width: 100%;
  max-width: var(--button-size);
  text-align: center;
  border-radius: 1.5rem;
  z-index: 1;
  transition-property: color;
  transition-duration: 0.3s;
  @include mixin.hover {
    color: var(--hover-color);
    .button__circle {
      scale: 2;
    }
  }
  &__circle {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--button-size);
    aspect-ratio: 1;
    background: var(--black);
    border-radius: 50%;
    scale: 0;
    // 中心を合わせるためにボタンサイズの半分のマイナス値を指定
    margin-top: calc(-1 * var(--button-size) / 2); 
    margin-left: calc(-1 * var(--button-size) / 2);
    transition-property: scale;
    transition-duration: 0.5s;
    z-index: -1;
  }
}
```

丸い円、ホバーしたときの文字色、ボタンサイズにcssのカスタムプロパティを使用しています。

親の`.button`には、丸い円がはみ出さないように`overflow: hidden`を指定し、丸い円の基準となるので`position: relative`を指定しています。

丸い円の`button__circle`は、中心を合わせるためにボタンサイズの半分のマイナス値を`margin-top`と`margin-left`に指定しています。また、ホバー前は`scale: 0`で非表示にしています。

また、cssでホバーしたら文字色を変えるようと、丸い円を拡大させるようにしています。ここでは、円を全て覆うようにするために、`scale: 2`を指定しましたが、この値は円の大きさによって調整してください。

### JavaScript

```js [JavaScript]
const button = document.querySelector('.button');
const buttonCircle = document.querySelector('.button__circle');

const mouseEnterLeave = (event) => {
  if (!button || !buttonCircle) return;

  const x = event.offsetX;
  const y = event.offsetY;
  buttonCircle.style.translate = `${x}px ${y}px`;
}

button?.addEventListener('mouseenter', mouseEnterLeave);
button?.addEventListener('mouseleave', mouseEnterLeave);
```

ボタン要素を`mouseenter`と`mouseleave`したときに実行する関数`mouseEnterLeave`の中で、ホバーした位置を取得しています。

offsetXとoffsetYは、要素内でのマウスの位置を取得するプロパティです。これを使うことで、ボタンの中でホバーした位置を取得することができます。

取得した位置を元に、`translate` プロパティを使って、丸い円を移動させています。
JavaScriptはこれだけになります。