---
title: "スクロールで要素が入ったらふわっと表示（フェードイン）"
description: "GSAP・ScrollTriggerを使用して、スクロールで要素が入ったらふわっと表示するアニメーションの実装方法を解説します。"
order: 1
update: 2025-07-01
group: "スクロール"
image: "/images/animation/scroll-fadein.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/fade-in/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/fade-in.astro"
pointList:
  - "GSAP・ScrollTriggerの使用方法"
  - "gsap.set()で要素を非表示にしておく"
  - "要素が見えたらgsap.to()でアニメーションさせる"
---

## 実装の考え方

GSAP・ScrollTriggerを使用して、スクロールで要素が入ったらふわっと表示するアニメーションを実装していきます。ふわっと表示させるためには、最初に要素を`opacity: 0`と`transform: translateY(100px)`で非表示にしておき、要素が見えたら`opacity: 1`と`transform: translateY(0)`で表示させます。

このアニメーションをGSAP・ScrollTriggerを使用して実装していきます。

## バージョン情報

この記事で使用しているライブラリのバージョンは以下の通りです。

::version-info
---
libs:
  - icon: 
      name: twemoji:four-leaf-clover
    name: GSAP
    version: 3.13.0
---
::

## GSAPをインストールする

まずはGSAPをインストールします。
下記のコマンドを実行し、プロジェクトにインストールしてください。

```bash
npm install gsap
```

## HTML

フェードインするbox要素のHTMLは以下のようになります。
あとでJavaScriptで取得したいため、フェードインさせたい要素に`data-inview="fade-in"`という属性を付与します。

```html [HTML]
<div class="box" data-inview="fade-in">
  <div class="box__text">
    <h2>タイトル00</h2>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci possimus dolor pariatur rerum! Hic consequatur laboriosam accusantium consequuntur magni impedit reprehenderit exercitationem iste est, mollitia nesciunt blanditiis quas perspiciatis ea.</p>
  </div>
  <div class="box__img">
    <img src=`https://picsum.photos/640/360?random=1` alt="">
  </div>
</div>
```

HTMLはこれだけです。
CSSに関しては特に重要ではないので、ここでは割愛します。

## JavaScript

最後にJavaScriptを実装していきます。
まずは、GSAPとScrollTriggerをインポートし、ScrollTriggerを登録します。

```js [JavaScript]
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

続いて、フェードインアニメーションさせるInviewクラスを作成します。
JavaScriptのクラス構文で記述していきます。

```js [JavaScript]
class Inview {
  constructor() {
    this.els = document.querySelectorAll('[data-inview="fade-in"]');
    if (!this.els) return;
    this.init();
  }
  init() {
    this.els.forEach(el => {
      const type = el.dataset.inview;
      switch(type) {
        case 'fade-in':
          this.inviewFadeIn(el);
          break;
      }
    })
  }
  inviewFadeIn(el) {
    gsap.set(el, { y: 100, opacity: 0 });

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
      },
      onStart: () => {
        gsap.to(el, {
          y: 0, opacity: 1, duration: 0.8,
          ease: "sine.out",
        })
      }
    })
  }
}

const inview = new Inview();
```

それでは、解説していきます。

### switch文で分岐させる

今回は、ふわっと下から表示させるアニメーションですが、上下左右から表示されても大丈夫なように汎用的にクラス構文で記述してみました。

下から表示される場合以外のときは、HTMLの`data-inview`属性に`fade-in`以外の値を指定し`switch`文で分岐させれば対応できるでしょう。

```js [JavaScript]
this.els.forEach(el => {
  const type = el.dataset.inview;
  switch(type) {
    case 'fade-in':
      this.inviewFadeIn(el);
      break;
  }
})
```

### ふわっと下から表示させる

ふわっと下から表示させる部分は、`inviewFadeIn`メソッドに記述しています。`gsap.set()`を使用すると、初期状態を指定できます。ここでは、`y: 100`と`opacity: 0`を指定し、初期状態では非表示の状態で100px下にずらしておきます。

```js [JavaScript]
gsap.set(el, { y: 100, opacity: 0 });
```

スクロールして要素が入ったかを判別するために、`ScrollTrigger`を使用します。ここでは、`start`に`top 70%`を指定しています。これは、要素が画面の上から70%の位置に入ったらアニメーションが始まるという意味になります。

要素が入ったら、`onStart`でアニメーションさせます。`gsap.to()`を使用して、`y: 0`と`opacity: 1`を指定し、要素を表示させます。`duration: 0.8`でアニメーションの時間を指定し、`ease: "sine.out"`でイージングを指定しています。

```js [JavaScript]
gsap.to(el, {
  scrollTrigger: {
    trigger: el,
    start: "top 70%",
  },
  onStart: () => {
    gsap.to(el, {
      y: 0, opacity: 1, duration: 0.8,
      ease: "sine.out",
    })
  }
})
```
これでふわっと下から表示されるアニメーションが完成しました。
durationやeaseの値、要素の出現方法などいろいろ試してみてください！