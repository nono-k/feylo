---
title: "GSAPのScrollTriggerとclip-pathを使って要素が見えたら画像をかっこよく出現させるアニメーション"
description: "Web制作で要素が見えたら画像が出現する表現はよくあります。今回はGSAPのScrollTriggerとclip-pathを使って、要素が見えたら画像をかっこよく出現させるアニメーションを実装します。1つ目は普通に画像が出現する方法と、2つ目は黒い帯が出現してから画像が表示するデモを紹介します。"
date: 2025-07-21
tags: 
  - "GSAP"
image: "/images/blog/scrolltrigger-inview-image-clip-path.jpg"
summaryList:
  - "ScrollTriggerを利用したInviewアニメーション"
  - "GSAPとclip-pathを使ったアニメーション"
  - "複数の要素に対応したアニメーション"
---

## はじめに

GSAPのScrollTriggerとclip-pathを使って要素が見えたら画像がぬるっとフェードしながら出現させるアニメーションの実装方法を紹介します。クラス構文とdata属性を使って実装しているので汎用的に使えると思いますので、ぜひ参考にしてみてください。

### バージョン情報

この記事で使用しているGSAPのバージョンは以下の通りです。

::version-info
---
libs:
  - icon: 
      name: twemoji:four-leaf-clover
    name: GSAP
    version: 3.13.0
---
::

## デモ1 - clip-pathを利用して画像が出現する方法

::codepen-embed
---
id: EaVPaPg
title: Scrolltrigger Inview Image Clip Path01
---
::

アニメーションを再度見たい場合はリロードしてみてください。

::note
---
text: デモでは、慣性スクロールライブラリーのLenisを使用してますが、解説は省略してますので気になる方はCodePenのコードをご覧ください。
backgroundColor: var(--orange)
---
::

### 実装の考え方

初期状態では、画像を`clip-path`で非表示にし、画像を縮小して表示されるようにしたいので、`scale`で画像を大きくしておきます。また、`data`属性を利用して、上下左右から出現するようにします。

### HTML

HTMLは以下のようになります。

```html [HTML]
// 左から出現する場合
<div class="content" data-inview="left">
  <div class="content__empty"></div>
  <div class="content__image"><img src="https://picsum.photos/300/300?random=0" alt=""></div>
</div>
```

`clip-path`で非表示にする要素は、`contnet`クラスとし、`data-inview`属性を付与します。表示する方向としては、`left`、`right`、`top`、`bottom`の4つを用意します。

### CSS

全てのコードはCodePenを参考にしてください。
最初の非表示の状態は、GSAPの`set()`を使用します。初期状態で画像を`scale`で大きくするので、画像が要素からはみ出してしまうので、`overflow: hidden`を指定するのを忘れないようにしてください。

```css [CSS]
.content__image {
  overflow: hidden;
}
```

### JavaScript

JavaScriptは、クラス構文で実装していきます。
まずは、`constructor()`を見ていきます。

```js [JavaScript]
class Inview {
  constructor() {
    this.els = document.querySelectorAll('[data-inview]');
    if (!this.els.length) return;

    this.clipPathStart = {
      left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    };

    this.clipPathEnd = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

    this.init();
  }
}
```

複数の要素に対応するため、`querySelectorAll`で`data-inview`の要素を全て取得しています。clip-pathで上下左右から出現させるために、`clipPathStart`を用意しています。また、`clipPathEnd`は最終的に表示するclip-pathを指定します。

clip-pathの値は、[このサイト](https://bennettfeely.com/clippy/)で確認できるので、実際に値を確かめてみてください。

続いて、`init()`を見ていきます。

```js [JavaScript]
class Inview {
  // ...
  init() {
    this.els.forEach(el => {
      const direction = el.dataset.inview;
      this.inviewClipSlide(el, direction);
    })
  }
}
```

`init()`では、`data-inview`の要素を`forEach`で全て`inviewClipSlide()`に渡しています。
`direction`変数は、`data-inview`の値(`left`、`right`、`top`、`bottom`)を取得して、`inviewClipSlide()`の第2引数に渡しています。

続いて、`inviewClipSlide()`を見ていきます。

```js [JavaScript]
class Inview {
  // ...
  inviewClipSlide(el, direction = 'left') {
    if (!this.clipPathStart[direction]) return;

    const img = el.querySelector('img');

    // 初期状態の設定
    gsap.set(img, {
      clipPath: this.clipPathStart[direction],
      scale: 1.2
    });

    // スクロールして要素が見えたらアニメーションを実行
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        onEnter: () => {
          gsap.to(img, {
            clipPath: this.clipPathEnd,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
          });
        }
      }
    })
  }
}
```

`inviewClipSlide()`では、`direction`の初期値は`left`にしているので、HTMLで`data-inview`の値がないときは、左から出現します。

初期状態は`gsap.set()`で画像に対して、`clipPath`と`scale`を設定しています。`this.clipPathStart[direction]`は、`direction`の値に応じて、先ほど定義した`left`、`right`、`top`、`bottom`の値を取得しています。

スクロールして要素が見えたらアニメーションを実行するので、`scrollTrigger`の`onEnter`で、`gsap.to()`でアニメーションを実行しています。

これで、要素が見えたら画像がぬるっとフェードしながら出現するアニメーションが実装できました！


## デモ2 - 黒い帯が出現してから画像が表示する方法

::codepen-embed
---
id: JoYGoGW
title: Scrolltrigger Inview Image Clip Path02
---
::

2つ目のデモは、黒い帯が出現してから左からだけ画像が表示されるアニメーションです。
このデモでは、GSAPではアニメーションさせずにScrollTriggerで要素が入ったら、`is-visible`クラスを付与してCSSでアニメーションを実装します。

### HTML

HTMLは以下のようになります。

```html [HTML]
<div class="content" data-inview>
  <div class="content__empty"></div>
  <div class="content__image"><img src="https://picsum.photos/300/300?random=0" alt=""></div>
</div>
```

左から出現するだけなので、`data-inview`のみ付与しています。

### CSS

CSSでアニメーションさせるので、その部分のみ抜粋します。

```css [CSS]
.content__image {
  position: relative;
  overflow: hidden;
}

.content__image img {
  position: relative;
  scale: 1.2;
  clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
  transition: 1.2s cubic-bezier(.16, 1.08, .38, .98);
  transition-delay: 0.4s;
  z-index: 2;
}

.content__image::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--black);
  clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
  transition: 1.2s cubic-bezier(.16, 1.08, .38, .98);
  z-index: 1;
}

.content__image.is-visible img {
  scale: 1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.content__image.is-visible img::before {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

`clip-path`の値は、1つ目のデモの左から出現するときと同じです。
黒い帯に関しては、`.content__image`の`before`疑似要素を使って`position: absolute`で画像全体を覆うように配置しています。

ここで、先に黒い帯が出現するので、`img`に`transition-delay`を設定し、`img`の`clip-path`と`scale`のアニメーションを遅らせています。

### JavaScript

最後にJavaScriptを見ていきましょう。全コードを載せます。

```js [JavaScript]
class Inview {
  constructor() {
    this.els = document.querySelectorAll('[data-inview]');
    if (!this.els.length) return;

    this.init();
  }

  init() {
    this.els.forEach(el => {
      this.inviewClipSlide(el);
    });
  }

  inviewClipSlide(el) {

    const img = el.querySelector('.content__image');

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        onEnter: () => {
          img.classList.add('is-visible');
        }
      }
    });
  }
}
```

ここでは単純にScrollTriggerを使用して、スクロールで要素が見えたら`is-visible`クラスを付与しているだけになります。これで、黒い帯が出現してから画像が表示されるアニメーションが実装できました！

## まとめ

GSAPのScrollTriggerとclip-pathを使用して、要素が見えたら画像が出現するアニメーションのデモを2つ紹介しました。GSAP・ScrollTriggerとclip-pathの組み合わせは、アニメーションの表現の幅が広がるので、ぜひ使ってみてください。