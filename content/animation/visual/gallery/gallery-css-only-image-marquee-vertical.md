---
title: "CSSのみで画像が上下に縦に流れ続ける無限ループのアニメーション"
description: "画像が縦に流れ続けるアニメーションをCSSのみで実装する方法を解説します。今回も、CSSのみで実現できるので、ぜひ試してみてください。"
order: 3
update: 2025-07-31
group: "ギャラリー"
image: "/images/animation/gallery-css-only-image-marquee-vertical.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/gallery-css-only-image-marquee-vertical/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/gallery-css-only-image-marquee-vertical.astro"
pointList:
  - "CSS Keyframes Animationを使用して画像を縦に流れ続けるようにする。"
  - "gridを使用して自動的にサイズが調整され流れが途切れないようにする。"
  - "カスタムプロパティを使用して汎用的に実装できるようにする。"
---

## 実装の考え方

基本的な考え方は、以前紹介した画像が左右に横に流れ続けるアニメーションと同じになります。

::recommend-link
---
items:
  - title: CSSのみで画像が左右に横に流れ続ける無限ループのアニメーション
    link: /animation/visual/gallery/gallery-css-only-image-marquee-horizontal/
    image: /images/animation/gallery-css-only-image-marquee-horizon.jpg
    description: Webサイトでよく見かける画像が横に流れ続けるアニメーションをCSSのみで実装する方法を解説します。よく紹介されている事例は、画像のサイズに応じて手動で調整しなければ流れが途切れてしまいますが、今回紹介する実装では、gridを使用して自動的に調整されるので、流れが途切れないで実現できます。
---
::

以前紹介したように、CSS Keyframes Animationを使用して画像を縦に流れ続けるようします。
今回は縦方向に流れ続けるようにするので、`grid-auto-rows`と`grid-auto-flow-row`を使用してサイズを自動で調整できるようにします。

それでは見ていきましょう！

## HTML

HTMLは以下のようになります。
画像が縦に流れ続ける要素のみを抜粋します。

```html [HTML]
<div class="box">
  <!-- 上方向に流れる -->
  <div class="marquee" data-direction="up">
    <div class="marquee__wrap">
      <div class="marquee__img">
        <img src="https://picsum.photos/300/200?random=1" alt="">
      </div>
      <div class="marquee__img">
        <img src="https://picsum.photos/300/200?random=2" alt="">
      </div>
      <div class="marquee__img">
        <img src="https://picsum.photos/300/200?random=3" alt="">
      </div>

      <!-- 無限ループを実現するために、同じ要素を複製 -->
      <div class="marquee__img">
        <img src="https://picsum.photos/300/200?random=1" alt="">
      </div>
      <div class="marquee__img">
        <img src="https://picsum.photos/300/200?random=2" alt="">
      </div>
      <div class="marquee__img">
        <img src="https://picsum.photos/300/200?random=3" alt="">
      </div>
    </div>
  </div>

  <!-- 下方向に流れる -->
  <div class="marquee" data-direction="down">
    <!-- 省略 -->
  </div>
</div>
```

ここでも前回同様に、画像の無限ループの要素を`marquee`クラスとしてます。移動させる要素は、その子の`marquee__wrap`となり、その中に画像を入れます。

上下の画像が流れる方向も、`data-direction`属性で指定し、`up`か`down`を指定します。

## CSS

`marquee`要素に関するCSSを抜粋すると以下のようになります。

```css [CSS]
.marquee {
  --count: 4;
  --marquee-image-max-height: 300px;
  --marquee-image-height: max(var(--marquee-image-max-height), 100cqb / var(--count));
  --gap: 1rem;
  --animation-duration: 40s;
  overflow: hidden;
}

.marquee[data-direction="up"] {
  --animation-direction: initial;
}

.marquee[data-direction="down"] {
  --animation-direction: reverse;
}

.marquee__wrap {
  display: grid;
  grid-auto-rows: var(--marquee-image-height);
  grid-auto-flow: row;
  row-gap: var(--gap);

  --translate-up-to: calc(
    var(--marquee-image-height) * var(--count) + var(--gap) * var(--count)
  );

  animation-name: marquee;
  animation-duration: var(--animation-duration);
  animation-timing-function: linear;
  animation-direction: var(--animation-direction);
  animation-iteration-count: infinite;  
}

img {
  height: 100%;
}

@keyframes marquee {
  to {
    translate: 0 calc(var(--translate-up-to) * -1);
  }
}
```

先述の通り、縦方向に並べるために`grid-auto-rows`と`grid-auto-flow: row;`を指定しています。詳しいコードは、[デモのリポジトリのコード](https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/gallery-css-only-image-marquee-vertical.astro)をご確認ください。
