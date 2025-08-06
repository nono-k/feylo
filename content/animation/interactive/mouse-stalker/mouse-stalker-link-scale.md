---
title: "リンクをホバーしたら大きくなるマウスストーカーの実装方法"
description: "素のJavaScriptでリンクをホバーしたら大きくなるマウスストーカーを実装する方法を紹介します。また、ホバーしたリンクの種類によってマウスストーカーの色も変化するような実装にします。"
order: 2
update: 2025-08-06
group: "マウスストーカー"
image: "/images/animation/mouse-stalker-link-scale.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/mouse-stalker-link-scale/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/mouse-stalker-link-scale.astro"
pointList:
  - "mouseenter,mouseleaveでリンク内に入ったかを判断。"
  - "マウスストーカーの色はdata属性で管理"
---

## 実装の考え方

リンクをホバーしたかを判断するために、JavaScriptの`mouseenter`と`mouseleave`イベントを利用します。`mouseenter`でリンク内に入ったら、`scale`プロパティで大きくなるようにします。`mouseleave`でリンク外に出たら、`scale`プロパティを`1`にし、元の大きさに戻します。

リンクをホバーした際のマウスストーカーの色は、HTML内のリンクにdata属性(`data-color`)を付与して色を管理しホバーしたらその色に変化するようにします。

マウスストーカー自体の解説はしないので、基本的なマウスストーカーの実装方法を知りたい方は下記を確認してください

::recommend-link
---
items:
  - title: "基本的なマウスストーカーの実装方法"
    link: "/animation/interactive/mouse-stalker/mouse-stalker-base"
    image: "/images/animation/mouse-stalker-base.jpg"
    description: "素のJavaScriptでマウスストーカーを実装する方法を紹介します。基本的なマウスストーカーを実装することで、JavaScriptでのアニメーションの基礎を学びましょう。"
---
::

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

```html [HTML]
<div class="container">
  <div class="grid">
    <ul class="links">
      <li><a href="#" data-color="green">緑リンク01</a></li>
    </ul>
    <!-- リンク続く -->
  </div>
  <div class="mouse-cursor"></div>
</div>
```

前回同様にマウスストーカーは、`mouse-cursor`というクラスを付与して作成します。
また先述の通り、リンクをホバーした際のマウスストーカーの色は、HTML内のリンクにdata属性(`data-color`)を付与しています。

今回のデモでは、`green`,`blue`,`yellow`,`orange`の4色を用意しています。

### CSS

マウスストーカーに関係があるCSSは下記のようになります。

```css [CSS]
:root {
  --green: #53C197;
  --blue: #7A9AC9;
  --yellow: #F3E84D;
  --orange: #F0A15E;
}

.mouse-cursor {
  --mouse-cursor-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  opacity: 0.8;
  background-color: var(--mouse-cursor-color);
  pointer-events: none;
  translate: -50% -50%;
  transition-property: background-color, scale;
  transition-duration: 0.3s;
}
```

ホバーした際の色は4色必要なので、`root`に変数を定義しておきます。マウスストーカーの色は`--mouse-cursor-color`という変数で管理します。

マウスストーカーのCSSは前回と変更しています。その理由として、scaleで大きくした際に中心から大きくなるようにしたいため、初期状態では`translate: -50% -50%`として位置しており、JavaScriptでは`top`と`left`を変更することでマウスストーカーの位置を更新します。

急な変化にならないように、`transition-property`で`background-color`と`scale`を指定しておくのを忘れないようにしましょう。

### JavaScript

最後にJavaScriptになります。前回のマウスストーカーと実装が異なるので、マウスストーカー部分のコードを見ていきましょう。

#### マウスストーカーの実装

```js [JavaScript]
const mouseCursor = document.querySelector('.mouse-cursor');

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  mouseCursor.style.left = `${mouseX}px`;
  mouseCursor.style.top = `${mouseY}px`;
});
```

先述の通りに、`scale`で大きくした際に、中心から大きくするため、`left`と`top`を変更することでマウスストーカーの位置を更新します。続いて、リンクをホバーした際のコードを実装しましょう。

#### リンクをホバーしたら、色と大きさを変更する

```js [JavaScript]
const links = document.querySelectorAll('a');

links.forEach(link => {
  // リンク内にマウスが入った時の処理
  link.addEventListener('mouseenter', () => {
    const color = link.dataset.color;
    mouseCursor.style.setProperty('--mouse-cursor-color', `var(--${color})`);
    mouseCursor.style.scale = '2';
  });

  // リンクからマウスが離れた時の処理
  link.addEventListener('mouseleave', () => {
    mouseCursor.style.setProperty('--mouse-cursor-color', '#000');
    mouseCursor.style.scale = '1';
  });
});
```

ここでは簡易的に、`a`タグを全て取得しています。取得したリンクを`forEach`で回して、それぞれ`mouseenter`だったらリンク内に入った処理、`mouseleave`だったらリンクから出た処理を記述しています。

`mouseenter`の場合は、`link.dataset.color`でリンクのデータ属性から色を取得し、`mouseCursor.style.setProperty`でマウスストーカーの色(`--mouse-cursor-color`)を変更しています。そして、`mouseCursor.style.scale`でマウスストーカーの大きさを2倍にしています。

`mouseleave`の場合は、マウスストーカーの色と大きさを元に戻しています。
