---
title: "モーダルの中にSwiperで実装したスライダーがある場合の実装方法"
description: "モーダルの中にSwiperで実装したスライダーがある場合の実装方法を解説します。デモでは画像のギャラリーがあり、クリックするとその画像のモーダルが開き、スライダーで操作できるようにします！"
date: 2025-08-29
tags: 
  - "JavaScript"
  - "Swiper"
image: "/images/blog/no-image-yellow.jpg"
summaryList:
  - "パンくずリストでの長いテキストを「...」で省略する方法"
  - "widthとmax-widthを使用していない場合でも適用できる方法"
---

## はじめに

この記事では、モーダルの中にSwiperで実装したスライダーがある場合の実装方法を解説します。モーダルは`dialog`要素を使用して実装します。

## バージョン情報

この記事で使用しているSwiperのライブラリのバージョンは以下の通りです。

::version-info
---
libs:
  - icon: 
      name: simple-icons:swiper
      color: "#00AFFF"
    name: Swiper
    version: 11.2.10
---
::

Swiperの読み込みに関しては、[公式サイト](https://swiperjs.com/get-started)を参考に`import`かCDNでCSSファイルとJSファイルを読み込んでください。

## モーダルの中にSwiperで実装したスライダーがある場合の実装方法

それでは、モーダルの中にSwiperで実装したスライダーがある場合の実装方法について解説します。
デモのCodePenは下記になります。

::codepen-embed
---
id: WbQgNRJ
title: Swiper Slider Inside a Dialog Modal
---
::

モーダルは、画面外をクリックした時や、<kbd>Esc</kbd>キーを押したときに閉じることができます。
それでは、実装方法を見ていきましょう！

### HTML

HTMLは次の通りになります。モーダルは`dialog`要素で実装するようにします。なので、Swiperのコードは`dialog`の中に書きましょう。

```html [HTML]
<!-- ギャラリー画像 -->
<div class="grid">
  <a class="grid__img js-modal-trigger" href="">
    <img src="https://picsum.photos/800/450?random=1" alt="">
  </a>
  <a class="grid__img js-modal-trigger" href="">
    <img src="https://picsum.photos/800/450?random=2" alt="">
  </a>
  <!-- ギャラリー画像が続く -->
</div>

<!-- モーダル -->
<dialog class="modal js-modal">
  <div class="modal__overlay js-modal-overlay"></div>
  <div class="modal__inner">
    <div class="swiper modal__swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="modal__title">スライダー1</div>
          <div class="modal__img">
            <img src="https://picsum.photos/800/450?random=1" alt="">
          </div>
        </div>
        <div class="swiper-slide">
          <div class="modal__title">スライダー2</div>
          <div class="modal__img">
            <img src="https://picsum.photos/800/450?random=2" alt="">
          </div>
        </div>
        <!-- ギャラリー画像と同じ画像が続く -->
      </div>
      <!-- Swiperの矢印 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <!-- 閉じるボタン -->
    <button class="modal__close js-modal-close">モーダルを閉じる</button>
  </div>
</dialog>
```

JavaScriptで操作する要素に関しては、クラスの先頭に`js-`をつけています。これにより、JavaScriptで操作する要素を特定しやすくなります。

モーダルを開くトリガーになる画像には`a`タグで実装し、`js-modal-trigger`を付けます。モーダルの`dialog`には`js-modal`を、モーダルの外側には`js-modal-overlay`を付けます。また、モーダルを閉じるボタンには`js-modal-close`を付けましょう。

### CSS

CSSは、モーダル部分に関してのみ解説します。
全てのスタイルはCodePenを参照してください。

```css [CSS]
.modal {
  /* モーダルのスタイルのリセット */
  margin: 0;
  padding: 0;
  border: none;
  max-width: unset;
  max-height: unset;

  width: 100vw;
  height: 100dvh;
}

.modal::backdrop {
  display: none;
}

.modal__overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(255, 255, 0, 0.4);
}
```

`dialog`要素にはデフォルトで`margin`や`padding`や`border`のスタイルが付いてるのでリセットしておきましょう。

`dialog`要素には、モーダルの外側(`::backdrop`)が付いていますが、これはJavaScriptで操作できないので、`display: none;`で非表示にしてます。

モーダルの外側としては`modal__overlay`を使用してるので、これを`position: fixed`にして固定しておきましょう。

### JavaScript

最後にJavaScriptの実装について解説します。
全コードは次の通りになります。

```js [JavaScript]
class Modal {
  constructor() {
    this.modal = document.querySelector('.js-modal');
    if(!this.modal) return
    this.init();
  }
  init() {
    this.triggers = document.querySelectorAll('.js-modal-trigger');
    this.overlay = document.querySelector('.js-modal-overlay');
    this.closeBtn = document.querySelector('.js-modal-close');

    // Swiperの設定
    this.setSwiper();

    // クリックイベントなどの設定
    this.event()
  }
  setSwiper() {
    this.swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  event() {
    // ギャラリーの画像をクリックしたとき
    this.triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal(index);
      } );
    });

    // 閉じるボタンをクリックしたとき
    this.closeBtn.addEventListener('click', () => {
      this.closeModal();
    });

    // モーダルの外側をクリックしたとき
    this.overlay.addEventListener('click', () => {
      this.closeModal();
    });

    // Escキーを押したとき
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  openModal(index) {
    // モーダルを開いた時に固定にするための設定
    this.bodyOffsetY = window.scrollY;
    document.body.style.top = `-${this.bodyOffsetY}px`;
    document.body.classList.add('is-scrollLock');

    // クリックしたindexのスライダーを表示
    this.swiper.slideToLoop(index, 0);
    // モーダルを開く
    this.modal.showModal();
  }

  closeModal() {
    // 固定解除
    document.body.classList.remove('is-scrollLock');
    document.body.style.top = '';
    window.scrollTo(0, this.bodyOffsetY);

    // モーダルを閉じる
    this.modal.close();
  }
}

const modal = new Modal();
```

それでは解説していきます！

#### init

```js [JavaScript]
class Modal {
  constructor() {
    this.modal = document.querySelector('.js-modal');
    if(!this.modal) return
    this.init();
  }
  init() {
    this.triggers = document.querySelectorAll('.js-modal-trigger');
    this.overlay = document.querySelector('.js-modal-overlay');
    this.closeBtn = document.querySelector('.js-modal-close');

    // Swiperの設定
    this.setSwiper();

    // クリックイベントなどの設定
    this.event()
  }
}
```

`constructor`では、モーダルを`.js-modal`クラスで設定したので取得しています。

`init`では、モーダルを開くトリガーとモーダルの外側、閉じるボタンを取得しておきます。また、Swiperの設定を行う`setSwiper()`と、イベントを設定する`event()`を呼び出しています。

#### setSwiper

`setSwiper`では、Swiperの設定を行います。

```js [JavaScript]
setSwiper() {
  this.swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
```

ここでは、スライダーを1枚表示し、ループ機能をオンにしています。
また、スライダーの矢印(`.swiper-button-next`, `.swiper-button-prev`)を`navigation`で設定するようにしましょう。

#### event

`event`では、クリックイベントやキーボードイベントを設定します。

```js [JavaScript]
event() {
  // ギャラリーの画像をクリックしたとき
  this.triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModal(index);
    } );
  });

  // 閉じるボタンをクリックしたとき
  this.closeBtn.addEventListener('click', () => {
    this.closeModal();
  });

  // モーダルの外側をクリックしたとき
  this.overlay.addEventListener('click', () => {
    this.closeModal();
  });

  // Escキーを押したとき
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      this.closeModal();
    }
  });
}
```

ギャラリーの画像は、`a`タグで実装しているのでリンク遷移を防ぐために`e.preventDefault()`を呼び出しています。

モーダルを開く処理は`openModal()`メソッドで、閉じる処理は`closeModal()`メソッドで行います。
`openModal()`にクリックした要素の`index`を渡すことで、表示するスライダーを指定することができます。

#### openModal

`openModal`では、モーダルを開く処理を書いています。

##### モーダルのガタツキを防ぐ

そのままだと、スクロールするとモーダルの裏側にあるコンテンツがスクロールしてしまうので、`body`要素に`is-scrollLock`クラスを追加してスクロールを固定します。

```js [JavaScript]
openModal(index) {
  // モーダルを開いた時に固定にするための設定
  this.bodyOffsetY = window.scrollY;
  document.body.style.top = `-${this.bodyOffsetY}px`;
  document.body.classList.add('is-scrollLock');
}
```

`window.scrollY`などのコードは、モーダルを開いた際にガタつかないようにするためのコードになります。

`is-scrollLock`のCSSは以下のように設定してます。

```css [CSS]
body.is-scrollLock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}
```

##### 表示するスライダーの指定

```js [JavaScript]
openModal(index) {
  // クリックしたindexのスライダーを表示
  this.swiper.slideToLoop(index, 0);  
}
```

クリックした画像は、引数の`index`になるので、`this.swiper.slideToLoop(index, 0)`で表示するスライダーを指定します。

ここで、Swiperの設定を`loop`にしているので`slideToLoop()`でスライドの移動をするようにしてください。`slideToLoop()`の第2引数は、スライドのスピードを設定できます。これを0にすることで、スライドの移動が瞬時に終わるようになり、モーダルを開いた際の違和感を無くすことができます。

##### モーダルの表示

```js [JavaScript]
openModal(index) {
  // モーダルを開く
  this.modal.showModal();
}
```

`dialog`要素のモーダルを開くには、`showModal()`メソッドを使用することで、モーダルを表示することができます。


#### closeModal

`closeModal`では、モーダルを閉じる処理を書いています。

```js [JavaScript]
closeModal() {
  // 固定解除
  document.body.classList.remove('is-scrollLock');
  document.body.style.top = '';
  window.scrollTo(0, this.bodyOffsetY);

  // モーダルを閉じる
  this.modal.close();
}
```

スクロールを固定しているので、`is-scrollLock`クラスを外すなどで固定を解除します。
モーダルを閉じるには、`close()`メソッドを使用することで、モーダルを閉じることができます。

以上が、モーダルとSwiperの組み合わせの実装方法の解説になります。

## まとめ

Web制作でよくある実装の、モーダルの中にスライダーがある実装方法を解説しました。
このデモでは、モーダルが1つの場合の実装方法でしたが、実際には複数のモーダルを組み合わせることがあるでしょう。その場合は、このデモの実装方法を参考に対応してみてください！