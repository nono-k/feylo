---
title: "マウスに画像が次々と追従してくるImage Trailの実装方法"
description: "マウスを動かしたら画像が次々と追従して表示され、一定時間後に消えるImage Trailという名のアニメーションの実装方法を解説します。画像の表示のアニメーションに関しては、GSAPを使用しています。"
order: 3
update: 2025-08-07
group: "マウスストーカー"
image: "/images/animation/mouse-stalker-image-trail.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/mouse-stalker-image-trail/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/mouse-stalker-image-trail.astro"
pointList:
  - "HTML上の画像を全て取得してから動作する。"
  - "画像の表示のアニメーションに関しては、GSAPを使用。"
  - "剰余演算で画像のループ対応。"
---

## 実装の考え方

マウスが動いたら画像を表示するので、`mousemove`イベントで画像の表示をするようにします。そのままだと、画像が即時に繰り返し表示されるので、差分時間を設定して画像の表示を遅らせるようにします。また、画像の表示のアニメーションに関しては、GSAPを使用します。

画像をループで繰り返し表示するために、剰余演算を用いて画像のインデックスを管理します。

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

```html [HTML]
<div class="container">
  <div class="content">
    <div class="content__img">
      <img src="https://picsum.photos/300/200?random=1" alt="">
    </div>
    <!-- 画像が続く -->
  </div>
</div>
```

画像は、`content`の中に`content__img`クラスとして配置します。`content`の中に繰り返し表示したい画像を配置してください。デモの場合は6枚の画像を配置しています。

### CSS

CSSは以下のようになります。

```css [CSS]
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden; /* 画像がはみ出さないように */
}

.content {
  width: 100%;
  height: 100%;
  position: relative;
}

.content__img {
  position: absolute;
  top: 0;
  left: 0;
  translate: -50% -50%;
  opacity: 0;
  pointer-events: none;
}
```

マウスの中心から、画像を表示するようにするために`translate: -50% -50%`を設定します。
最後にJavaScriptの実装になります。

### JavaScript

今回もクラスで書いていきます。`ImageTrail`クラスを作成しましょう。

```js [JavaScript]
import gsap from 'gsap';

class ImageTrail {
  constructor() {
    this.el = document.querySelector('.content');
    this.imgContainers = this.el.querySelectorAll('.content__img');
    this.images = Array.from(this.imgContainers).map(c => c.querySelector('img'));
    this.current = 0;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.lastTime = 0;
    this.showDelay = 200; // 画像の表示間隔(ms)

    // 画像の読み込みが完了したらinit()を実行
    this.waitForImagesToLoad().then(() => {
      this.init();
    })
  }

  waitForImagesToLoad() {
    return Promise.all(this.images.map(img => new Promise(resolve => img.onload = resolve)));
  }

  init() {
    this.imagesTotal = this.images.length;

    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseMove(e) {
    const now = performance.now();
    if (now - this.lastTime < this.showDelay) return;

    this.lastTime = now;

    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    this.showNextImage();
  }

  showNextImage() {
    const img = this.imgContainers[this.current];

    // 表示アニメーション
    gsap.set(img, {
      x: this.mouseX,
      y: this.mouseY,
      scale: 0.8,
      opacity: 1,
    });

    gsap.to(img, {
      duration: 0.4,
      opacity: 1,
      scale: 1,
    });

    // 一定時間後に非表示
    gsap.to(img, {
      duration: 0.4,
      opacity: 0,
      scale: 0.4,
      delay: 0.4,
      ease: 'power2.in'
    })

    this.current = (this.current + 1) % this.imagesTotal;
  }
}

new ImageTrail();
```

それでは、解説していきます。

#### constructor()

`constructor()`では、`.content`要素内の画像コンテンツ`.content__img`を取得し、`img`要素を`this.images`に格納します。

```js [JavaScript]
constructor() {
  this.el = document.querySelector('.content');
  this.imgContainers = this.el.querySelectorAll('.content__img');
  this.images = Array.from(this.imgContainers).map(c => c.querySelector('img'));
}
```

また、以下は初期状態を設定しています。

```js [JavaScript]
constructor() {
  // ...
  this.current = 0;
  this.mouseX = window.innerWidth / 2;
  this.mouseY = window.innerHeight / 2;
  this.lastTime = 0;
  this.showDelay = 200; // 画像の表示間隔(ms)
}
```

それぞれの役割は以下の通りです。

- `current`: 現在表示している画像のインデックスを保持します。
- `mouseX`, `mouseY`: マウスの現在座標。
- `lastTime`: 最後に画像を表示した時間(ms)。
- `showDelay`: 次の画像を表示するまでの遅延時間(ms)。

次のコードは、画像読み込みのメソッド`waitForImagesToLoad()`で、画像の読み込みが完了したら、`init()`メソッドを呼び出します。

```js [JavaScript]
constructor() {
  // ...
  waitForImagesToLoad().then(() => {
    this.init();
  });
}

waitForImagesToLoad() {
  return Promise.all(this.images.map(img => new Promise(resolve => img.onload = resolve)));
}
```

#### 初期化処理 init()

`init()`メソッドでは、画像の総数を`this.imagesTotal`に格納します。
また、`mousemove`イベントを登録し、マウスが動いたら`showNextImage()`を呼び出します。

```js [JavaScript]
init() {
  this.imagesTotal = this.images.length;
  window.addEventListener('mousemove', this.onMouseMove.bind(this));
}
```

::note
---
title: '注意'
text: 'デモでは、windowオブジェクトに対してmousemoveイベントを登録しているので、常にmousemoveイベントが発生します。実案件では、アニメーションしたい要素に対してmousemoveイベントを登録してください。'
backgroundColor: 'var(--orange)'
---
::

#### マウス移動の処理 onMouseMove()

マウス移動の処理のメソッド`onMouseMove()`では、マウスの座標を取得し、`showNextImage()`を呼び出します。

```js [JavaScript]
onMouseMove(e) {
  this.mouseX = e.clientX;
  this.mouseY = e.clientY;

  this.showNextImage();
}
```

ここでそのままだと、画像が連続して表示されるので、差分時間を計算して、遅延時間を過ぎたら画像を表示するようにします。前回表示から、`showDelay(200ms)`未満ならreturnし抜け出します。

```js [JavaScript]
onMouseMove(e) {
  const now = performance.now();
  if (now - this.lastTime < this.showDelay) return;
  this.lastTime = now;

  this.mouseX = e.clientX;
  this.mouseY = e.clientY;

  this.showNextImage();
}
```

#### 次の画像を表示 showNextimage()

`showNextImage()`メソッドでは、`this.imageContainer`から現在の画像(`this.current`)を取得し、GSAPを使用して画像を表示させます。

```js [JavaScript]
showNextImage() {
  const image = this.images[this.current];

  // 表示アニメーション
  gsap.set(img, {
    x: this.mouseX,
    y: this.mouseY,
    scale: 0.8,
    opacity: 1,
  });

  gsap.to(img, {
    duration: 0.4,
    opacity: 1,
    scale: 1,
  });

  // 一定時間後に非表示
  gsap.to(img, {
    duration: 0.4,
    opacity: 0,
    scale: 0.4,
    delay: 0.4,
    ease: 'power2.in'
  })

  this.current = (this.current + 1) % this.imagesTotal;
}
```

GSAPのアニメーションではやっていることは、次のようになります。

```js [JavaScript]
// 画像の設定
gsap.set(img, {
  x: this.mouseX,
  y: this.mouseY,
  scale: 0.8,
  opacity: 0,
});

// 表示アニメーション
gsap.to(img, {
  duration: 0.4,
  opacity: 1,
  scale: 1,
});
```

このコードは、現在の画像をマウス位置に移動させ、少し縮小した状態にします。
そして、画像を0.4秒かけて元のサイズに拡大して表示させます。

```js [JavaScript]
// 一定時間後に非表示
gsap.to(img, {
  duration: 0.4,
  opacity: 0,
  scale: 0.4,
  delay: 0.4,
  ease: 'power2.in'
})
```

このコードは、表示から0.4秒後に画像を非表示と縮小します。

```js [JavaScript]
this.current = (this.current + 1) % this.imagesTotal;
```

画像のアニメーションが終わったら、次の画像を表示するために、画像の総数(`this.imagesTotal`)で割った余りを計算して、次の画像のインデックスを取得します。このようにすることで、画像をループさせることができます。

以上で、マウスに画像が次々と追従してくるImage Trailのアニメーションが完成しました。
ぜひ、このアニメーションを参考にして、自分なりのアニメーションを作成してみてください！