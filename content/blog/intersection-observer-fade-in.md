---
title: "JavaScriptのIntersection Observer APIを利用してフェードインアニメーションを実装する"
description: "JavaScriptのIntersection Observer APIを利用してフェードインアニメーションを実装する方法を解説します。従来のフェードインアニメーションとIntersection Observer APIを使った利点などを解説します。"
date: 2025-07-23
tags: 
  - "JavaScript"
image: "/images/blog/intersection-observer-fade-in.jpg"
summaryList:
  - "Intersection Observer APIの使用方法"
  - "Intersection Observer APIを利用したフェードインアニメーション"
  - "複数の要素に対応したアニメーション"
---

## はじめに

Web制作でスクロール連動のアニメーションを作る際は、GSAPのScrollTriggerを使うほうが簡単に実装することができます。ですが、JavaScriptの標準にあるIntersection Observer APIを使っても実装できるので、この記事ではIntersection Observer APIを使ったフェードインアニメーションの実装方法を紹介します。

下記は今回のデモです！

::codepen-embed
---
id: XJmXZaZ
title: Intersection Observer API Fade In
---
::

## Intersection Observer APIとは

Intersection Observer APIは、日本語に訳すと「交差オブザーバー API」という名前になります。この名前の通り、Intersection Observer APIは、<Marker>特定の要素が指定領域内に入ったかどうかを監視する</Marker>ことができます。

このAPIを使用して、要素が指定領域内に入ったらふわっと表示するフェードインアニメーションを実装することができます。具体的には、表示用のクラスを付与してふわっと表示させます。

### 従来のフェードインアニメーションの問題点

従来、JavaScriptで特定の位置で要素を操作するには`scroll`イベントを利用していました。`scroll`イベントで実装する際の問題点は、常にスクロールする度にイベントが発火してしまうため、パフォーマンスが悪くなりますし、ビューポートが変わると再度必要スクロール量を計算するなどの問題がありました。

この問題点を解決するために、Intersection Observer APIを使ってフェードインアニメーションを実装していきます。

## Intersection Observer APIを使ったフェードインアニメーションの実装方法

それでは、CodePenのデモのフェードインアニメーションの実装方法を解説します！このデモでは、JavaScriptでIntersection Observer APIを使って、要素が画面に見えたら`is-visible`クラスを付与してCSSでふわっと表示するようにします。

### HTML

フェードインするbox要素のHTMLは以下のようになります。
あとでJavaScriptで取得したいため、フェードインさせたい要素に`data-inview="fade-in"`という属性を付与します。

```html [HTML]
<div class="box" data-inview="fade-in">
  <div class="box__text">
    <h2>タイトル1</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur obcaecati nam dolore consequuntur cumque et veritatis nesciunt beatae eos rem magnam, vero exercitationem rerum perspiciatis omnis accusantium ipsum distinctio. Esse.</p>
  </div>
  <div class="box__img"><img src="https://picsum.photos/640/360?random=0" alt=""></div>
</div>
```

### CSS

CSSは、`box`要素に`is-visible`クラスが付与されたらアニメーションさせるようにするので、その部分だけ抜粋します。

```css [CSS]
.box {
  // ...
  opacity: 0;
  translate: 0 100px;
  transition-property: opacity, translate;
  transition-duration: 0.6s;
}

.box.is-visible {
  opacity: 1;
  translate: 0 0;
}
```

初期状態では、`opacity`を0、`translate`を100pxにして下に位置しておいて非表示にします。そして、`is-visible`クラスが付与されたら`opacity`を1、`translate`を0にすることでふわっと上から表示されるようになります。

### JavaScript

最後にJavaScriptになります。

```js [JavaScript]
class Inview {
  constructor() {
    this.els = document.querySelectorAll('[data-inview]');
    if (!this.els.length) return;

    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(this.inviewFadeIn.bind(this), this.options);
    this.els.forEach(el => this.observer.observe(el));
  }

  inviewFadeIn(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        this.observer.unobserve(entry.target);
      }
    });
  }
}

const inview = new Inview();
```

それでは、解説していきます。

#### constructor

ここでは、クラス構文で書いているので、`constructor`では`querySelectorAll`で`data-inview`属性を持つ要素を全て取得しています。

また、`IntersectionObserver`のオプションを下記のように設定しています。

```js [JavaScript]
this.options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}
```

`root`は、`IntersectionObserver`の監視対象となる要素を指定します。ここでは、`null`を指定しているので、ビューポート全体を監視対象とします。

`rootMargin`は、交差を検知する`root`からの距離になります。CSSの`margin`プロパティに似た値を指定することができます。ここでは、`0px`を指定しています。

`threshold`は、監視対象の要素(`.box`)が画面に入ったかどうかを判定するしきい値を設定します。ここでは、`0.5`を指定しているので、監視対象の要素が画面に50%以上入ったら、`isIntersecting`が`true`になります。

![thresholdが0.5の場合](https://res.cloudinary.com/dy8ftemi0/image/upload/v1753027093/intersection-observer-fade-in-01_l7ppdi.jpg)

#### init

`init`メソッドでは、`IntersectionObserver`のインスタンスを生成しています。

```js [JavaScript]
init() {
  // IntersectionObserverを作成し、画面内に入ったときのコールバックを設定
  this.observer = new IntersectionObserver(this.inviewFadeIn.bind(this), this.options);

  // 対象となる全要素を1つずつ監視対象にする
  this.els.forEach(el => this.observer.observe(el));
}  
```

`IntersectionObserver`には、第1引数には画面内に入ったときのコールバック関数を、第2引数は先ほど設定したオプションを渡しています。

`observe`メソッドでは、対象となる全要素を1つずつ監視対象にしています。

#### inviewFadeIn

`inviewFadeIn`メソッドでは、画面内に入ったときのコールバック関数を設定しています。

```js [JavaScript]
inviewFadeIn(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      this.observer.unobserve(entry.target);
    }
  });
}
```

`entries`は、監視対象の要素が画面に入ったかどうかを判定するオブジェクトの配列です。複数の監視対象があるため、画面に入った/出た要素ごとに1つずつ`entry`が入っています。

`entry.isIntersecting`が`true`の場合は、画面内に入ったと判定されます。その場合に、`is-visible`クラスを付与することでフェードインアニメーションが実行されます。

そして、`unobserve`メソッドでは、一度アニメーションを発火させた要素は、監視対象から削除します。これにより、「一度だけアニメーションを実行」することになります。無駄な再検出を防げるため、<Marker>パフォーマンスを向上</Marker>させることができます。

#### 補足：繰り返しアニメーションさせたい場合

もし繰り返しスクロール連動でアニメーションさせたい場合は、画面外に出たら`is-visible`クラスを削除するようにします。

```js [JavaScript]
inviewFadeIn(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
}
```

以上で、Intersection Observer APIを使ったフェードインアニメーションの実装方法を解説しました！

## その他のIntersection Observer APIの使い方

この記事ではIntersection Observer APIを使ってフェードインアニメーションの実装方法を紹介しましたが、その他にもIntersection Observer APIを使った使い方はたくさんあります。下記はIntersection Observer APIを使った使い方の一部です。

::content-list
---
  title: その他のIntersection Observer APIの使い方
  list: 
    - ブログ記事などで、記事の表示中のコンテンツに合わせて目次を強調する。
    - 要素が画面に入ってからの画像などの遅延読み込み。
    - 「無限スクロール」などの、スクロールに従ってコンテンツを次々と表示する。
---
::

このサイトでも紹介する機会があれば紹介していきます！

## まとめ

Intersection Observer APIを使ったフェードインアニメーションの実装方法を解説しました。標準のJavaScriptで実装できるため、ライブラリを使わなくても実装できることが理解できたかと思います。

同様のフェードインアニメーションをGSAP・ScrollTriggerを使った実装方法は下記の記事で紹介しているので、違いを知りたい方はぜひご覧ください。

::recommend-link
---
items:
  - title: "スクロールで要素が入ったらふわっと表示（フェードイン）"
    link: "/animation/interactive/visual/scroll/scroll-fadein"
    image: "/images/animation/scroll-fadein.jpg"
    description: "GSAP・ScrollTriggerを使用して、スクロールで要素が入ったらふわっと表示するアニメーションの実装方法を解説します。"
---
::

## 参考

- [交差オブザーバー API - MDN](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API)

- [IntersectionObserver - MDN](https://developer.mozilla.org/ja/docs/Web/API/IntersectionObserver)