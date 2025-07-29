---
title: "CSSのみで画像が左右に横に流れ続ける無限ループのアニメーション"
description: "Webサイトでよく見かける画像が横に流れ続けるアニメーションをCSSのみで実装する方法を解説します。よく紹介されている事例は、画像のサイズに応じて手動で調整しなければ流れが途切れてしまいますが、今回紹介する実装では、gridを使用して自動的に調整されるので、流れが途切れないで実現できます。"
order: 2
update: 2025-07-30
group: "ギャラリー"
image: "/images/animation/gallery-css-only-image-marquee-horizon.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/gallery-css-only-image-marquee-horizon/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/gallery-css-only-image-marquee-horizon.astro"
pointList:
  - "CSS Keyframes Animationを使用して画像を横に流れ続けるようにする。"
  - "gridを使用して自動的にサイズが調整され流れが途切れないようにする。"
  - "カスタムプロパティを使用して汎用的に実装できるようにする。"
---

## 実装の考え方

画像が横に流れ続けるアニメーションを作るには、CSS Keyframes Animationを使用します。CSS Keyframes Animationの中で`translate`プロパティを使用して画像を横に移動させるようにします。

また、無限ループで流れが途切れずに横に流れ続けるには、画像全体のサイズを調整して`translate`プロパティに渡す必要があります。今回の実装では、`grid-auto-columns`と`grid-auto-flow`を使用して自動的にサイズが調整され流れが途切れないようにします。

さらに、カスタムプロパティを使用して、実装の計算式などが分かるようにすることで、汎用的に実装できるようにします。

## HTML

HTMLは以下のようになります。

```html [HTML]
<!-- 左方向に流れる -->
<div class="marquee" data-direction="left">
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
```

ここでは、画像の無限ループの要素を`marquee`クラスとしてます。移動させる要素は、その子の`marquee__wrap`となり、その中に画像を入れます。

コードが長くなるので、例では画像の種類が3種類だと仮定しています。また、無限ループを実現するためには、同じ要素を複製する必要があるので後ろに3つ追加します。

画像が流れる方向は、`data-direction`属性で指定します。`left`か`right`を指定しましょう。右に流れる例は下記のようになります。

```html [画像を右に流れるようにしたい場合]
<!-- 右方向に流れる -->
<div class="marquee" data-direction="right">
  <div class="marquee__wrap">
    // ...
  </div>
</div>
```
## CSS

CSSの全コードは以下のようになります。

```css [CSS]
.marquee {
  --count: 5; /* 画像の個数 */  
  --marquee-image-max-width: 300px; /* 画像の最小幅 */
  --marquee-image-width: max(var(--marquee-image-max-width), 100cqi / var(--count));
  --gap: 1rem;
  --animation-duration: 50s;

  overflow-x: hidden;
}

.marquee[data-direction="left"] {
  --animation-direction: initial;
}

.marquee[data-direction="right"] {
  --animation-direction: reverse;
}

.marquee__wrap {
  display: grid;
  grid-auto-columns: var(--marquee-image-width);
  grid-auto-flow: column;
  column-gap: var(--gap);

  --translate-left-to: calc(
    var(--marquee-image-width) * var(--count) + var(--gap) * var(--count)
  );

  animation-name: marquee;
  animation-duration: var(--animation-duration);
  animation-timing-function: linear;
  animation-direction: var(--animation-direction);
  animation-iteration-count: infinite;
}

@keyframes marquee {
  to {
    translate: calc(var(--translate-left-to) * -1);
  }
}
```

それでは、解説していきます！

### 画像サイズを自動で調整する

画像のサイズを自動で調整するために、`grid-auto-columns`と`grid-auto-flow`を使用しています。`grid-auto-columns`は、暗黙的なグリッドを作成することができます。ここでは列が、指定したサイズで並べられます。

```css
.marquee {
  --count: 5;
  --marquee-image-max-width: 300px;
  --marquee-image-width: max(var(--marquee-image-max-width), 100cqi / var(--count));
  --gap: 1rem;
}

.marquee__wrap {
  display: grid;
  grid-auto-columns: var(--marquee-image-width);
  grid-auto-flow: column;
  column-gap: var(--gap);
}
```

`grid-auto-columns`の値をカスタムプロパティ(`--marquee-image-width`)で定義しています。ここで、`max()`関数を使用しているのは、モバイルなどデバイスが小さい場合に画像が小さくなりすぎないようにするためです。このデモでは、最小で300pxになるようにしてます。

`100cqi / var(--count)`は、コンテナ幅(ここでは、画面幅いっぱい)を画像の個数で割ることで、画像が均等に並ぶようにしています。`grid-auto-flow`はデフォルトが`row`なので、`column`を指定することで、画像が横に並ぶようにしています。

また、はみ出さないように`overflow-x: hidden`を指定するのを忘れないようにしましょう。

```css [CSS]
.marquee {
  overflow-x: hidden;
}
```

### 無限ループを実現する

画像を横に流し続けるために、`marquee__wrap`をコンテンツ幅分動かします。
下記画像は、画像が3つある場合の例になります。画像は、`grid-auto-columns`で均等に並べてるので、赤枠で囲った部分(`.marquee__wrap`)をコンテンツ端分まで動かせば、無限ループが実現します。

![無限ループの考え方](https://res.cloudinary.com/dy8ftemi0/image/upload/v1753689200/gallery-css-only-image-marquee-01_qan9jx.jpg)

コンテンツ幅を求める式の部分が下記になります。

```css [CSS]
.marquee__wrap {
  --translate-left-to: calc(
    var(--marquee-image-width) * var(--count) + var(--gap) * var(--count)
  );
}
```

ここでは、`var(--marquee-image-width) * var(--count)`で画像の幅の合計を求め、`var(--gap) * var(--count)`で画像間の隙間の合計を求めています。

具体的に画像が3つある場合で考えましょう。画像が300px、gapが10pxの場合、`300 * 3 + 10 * 3 = 930px`となります。この`930px`を`translate`で動かすことで、無限ループが実現できます！

### アニメーションの指定

最後に求めたコンテンツ幅でアニメーションを指定します。

```css [CSS]
.marquee {
  --animation-duration: 50s;
}

.marquee__wrap {
  --translate-left-to: calc(
    var(--marquee-image-width) * var(--count) + var(--gap) * var(--count)
  );

  animation-name: marquee;
  animation-duration: var(--animation-duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes marquee {
  to {
    translate: calc(var(--translate-left-to) * -1);
  }
}
```

ここでは、`animation-name`に`marquee`を指定し、アニメーションの時間を`var(--animation-duration)`で指定しています。Keyframes Animationのデフォルトのイージングは`ease`になっているので、一定の速度で動かすために`linear`を指定しています。

`@keyframes marquee`では、`to`でアニメーションの終点を指定しています。ここでは、先ほど求めたコンテンツ幅を`translate`で動かすことで、無限ループのアニメーションを実現しています。

### アニメーションの流れる方向

左右どちらに流れるかは、HTMLの`data-direction`属性で判断します。デフォルトは左方向に流れるので、右方向に流れるようにするには、`animation-direction`を`reverse`に指定します。

```css [CSS]
.marquee[data-direction="left"] {
  --animation-direction: initial;
}

.marquee[data-direction="right"] {
  --animation-direction: reverse;
}

.marquee__wrap {
  animation-direction: var(--animation-direction);
}
```

以上で、CSSのみで画像を横に流し続けるアニメーションを実現しました！

## 注意事項

今回の実装は、`grid`で画像のサイズを自動で調整できるようにしているので、画像のみを対象にしています。このサイトでも使用しているように、テキストの無限ループに対応するためには、手動でコンテンツ幅を調整するか、以前技術ブログで紹介したJavaScriptを使用して対応する必要があることに注意してください。


https://hypb.dev/articles/marquee-js-01