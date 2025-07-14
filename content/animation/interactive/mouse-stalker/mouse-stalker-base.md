---
title: "基本的なマウスストーカーの実装方法"
description: "素のJavaScriptでマウスストーカーを実装する方法を紹介します。基本的なマウスストーカーを実装することで、JavaScriptでのアニメーションの基礎を学びましょう。"
order: 1
update: 2025-07-15
group: "マウスストーカー"
image: "/images/animation/mouse-stalker-base.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/mouse-stalker-base/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/mouse-stalker-base.astro"
pointList:
  - "mousemoveイベントでマウスの座標を取得"
  - "translateプロパティで移動させる"
---

アニメーションライブラリーを使わずに素のJavaScriptを利用して、基本的なマウスストーカーの実装方法を紹介します。

## 実装の考え方

マウスストーカーを実装するには、マウスの座標を取得して、その座標に要素を移動させることで実現できます。マウスストーカー自体は、`div`タグで`.mouse-cursor`というクラスを付与して作成します。

マウス座標は、JavaScriptの`mousemove`イベントで取得します。
アニメーションは、`translate`プロパティを利用してマウスストーカーを移動させます。

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

```html [HTML]
<div class="mouse-cursor"></div>
```

先述の通り、マウスストーカーは`div`タグで`.mouse-cursor`というクラスを付与して作成します。

### CSS

```css [CSS]
.mouse-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #000;
}
```

マウスストーカーは、`position: fixed`で固定しておきます。このデモでは、マウスストーカーのサイズは`40px`に設定し、`border-radius`で丸にし、背景色は黒にしています。

CSSでマウスストーカーをマウスの中心に設定する方法もありますが、このデモではJavaScriptでマウスストーカーをマウスの中心に設定するようにしています。

### JavaScript

```js [JavaScript]
const mouseCursor = document.querySelector('.mouse-cursor');

document.addEventListener('mousemove', (e) => {
  const mouseRect = mouseCursor.getBoundingClientRect();
  const mouseX = e.clientX - mouseRect.width / 2;
  const mouseY = e.clientY - mouseRect.height / 2;

  mouseCursor.style.translate = `${mouseX}px ${mouseY}px`;
});
```

マウス座標は、JavaScriptの`mousemove`イベントで取得します。
マウスストーカーの中心にマウスを合わせるために、`mouseCursor.getBoundingClientRect()`でマウスストーカーの大きさを取得して、その半分の値をマウス座標から引きます。

![マウスストーカーを中心に設定するための説明](/images/animation/post/mouse-stalker-base-01.jpg)

この`mouseX`と`mouseY`の引き算の計算を行わないと、上記画像の左上を基準としてマウスストーカーが移動してしまいます。理解のために、`e.clientX`と`e.clientY`のみの実装も試してみてください。

最後にマウスストーカーを移動させるために、`translate`プロパティに`mouseX`と`mouseY`を設定して完成です！

## マウスストーカーを遅延させる方法

現状の実装ですと、`transition`プロパティが適用されていないため、マウス移動したらすぐにマウスストーカーが移動します。これを解消するためには、`.mouse-cursor`に`transition`プロパティを設定しましょう。

```css [CSS]
.mouse-cursor {
  transition: 0.3s;
}
```

デモでは、スライダーで`transition`の値を変更できるようにしているので、試してみてください！