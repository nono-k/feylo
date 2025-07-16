---
title: "基本的なハンバーガーメニューの実装方法"
description: "Web制作で必ずといっていいほど実装する機会のあるハンバーガーメニューの実装方法を解説します。まずは、基本的なハンバーガーメニューの実装で、クリックしたらメニューが左から右にスライドして表示されるアニメーションを実装します。"
order: 1
update: 2025-07-17
group: "ハンバーガーメニュー"
image: "/images/animation/hamburger-menu-base.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/hamburger-menu-base/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/hamburger-menu-base.astro"
pointList:
  - "初期状態ではメニューは左に移動して非表示にする"
  - "クリックしたらtranslateプロパティで左から右にスライドして表示されるようにする"
  - "アニメーションはJavaScriptでクラスを付与して実装する"
  - "実装しやすいように、JavaScriptはクラス構文で実装する"
---

## 実装の考え方

ハンバーガーメニューの基本的な実装の考え方は、初期状態ではメニューを`translate`プロパティで移動させて非表示にし、クリックしたら`translate`プロパティを0にして表示させます。

今回のデモでは、JavaScriptでクリックしたときにクラスを付与してアニメーションさせます。
また、そのままだとハンバーガーメニューが表示されていても、スクロールが可能になってしまい、コンテンツが動いてしますので、bodyに`overflow: hidden`を指定してスクロールを禁止します。

## 実装方法

それでは、実際に実装していきましょう。
まずは、HTMLを記述します。

### HTML

header部分のみ抜粋します。

```html [HTML]
<header class="header js-header">
  <button class="hamburger js-menu-trigger">
    <span class="hamburger__line"></span>
  </button>

  <div class="hamburger-menu js-menu">
    <ul class="hamburger-menu__list">
      <li class="hamburger-menu__item">Home</li>
      <li class="hamburger-menu__item">About</li>
      <li class="hamburger-menu__item">Work</li>
      <li class="hamburger-menu__item">Contact</li>
    </ul>
    <button class="hamburger-menu__close js-menu-close"></button>
  </div>
</header>
```

JavaScriptで操作する要素は、`js-`で始まるクラスを付与しています。
ここで、ハンバーガーメニューを開閉するボタン(`js-menu-trigger`と`js-menu-close`)は、`div`タグではなく`button`タグか`a`タグで実装するようにしてください。理由としては、<Marker>アクセシビリティやセマンティクスの観点から相応しくないからです。</Marker>

#### divタグで実装するのを避けるべき理由

##### キーボード操作に対応していない

`div`はデフォルトでフォーカスを受けてれなく、<Marker>EnterやTabキーなどのキーボード操作に対応していません</Marker>。そのため、ユーザーがハンバーガーメニューを開くためには、マウスを使う必要があります。これは、ユーザビリティに影響を与える可能性があります。

その点、`button`タグや`a`タグでは、キーボード操作が可能ですので、ユーザーが操作する箇所には`button`タグや`a`タグを使いましょう。

##### セマンティクスがない

`div`は汎用的な「コンテナ」であり、<Marker>「これはボタンです」といった意味を持っていません。</Marker>そのため、スクリーンリーダなどの支援技術ではそれがクリック可能なメニューであることが認識できないので、クリックする要素を`div`で実装するのは避けましょう。

### CSS

続きまして、CSSを記述していきます。

```scss [SCSS]
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 1rem 1.5rem;
}

.hamburger {
  position: relative;
  margin-left: auto;
  width: 56px;
  aspect-ratio: 1;
  background: #000;
  border-radius: 50%;
  cursor: pointer;
  &__line {
    &::before, &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: calc(100% - 24px);
      height: 2px;
      background: #fff;
    }
    &::before {
      translate: -50% calc(-50% - 4px);
    }
    &::after {
      translate: -50% calc(-50% + 4px);
    }
  }
}

.hamburger-menu {
  position: fixed;
  inset: 0;
  translate: 100% 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem;
  background: #F0A15E;
  color: #fff;
  display: flex;
  align-items: center;
  transition: 0.6s;
  &.is-menu-open {
    translate: 0 0;
  }
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
  }
  &__item {
    font-size: 3.5rem;
    font-weight: 700;
  }
  &__close {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    width: 56px;
    aspect-ratio: 1;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    &::before, &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      width: calc(100% - 24px);
      height: 2px;
      background: #000;
    }
    &::before {
      rotate: -45deg;
    }
    &::after {
      rotate: 45deg;
    }
  }
}
```

長くなりましたが、解説していきます。

#### fixedでヘッダーを固定する

スクロールしても追従するように、ヘッダーとハンバーガーメニューを`position: fixed`で固定します。

```scss [SCSS]
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 1rem 1.5rem;
}

.hamburger-menu {
  position: fixed;
  inset: 0;

}
```

#### 初期状態では、ハンバーガーメニューを右端に移動させて非表示にする

ハンバーガーメニューは、初期状態では右端に移動させて非表示にします。

```scss [SCSS]
.hamburger-menu {
  translate: 100% 0;
}
```

#### クリックしたら、ハンバーガーメニューを左から右にスライドして表示する

JavaScriptでクリックしたら、`is-menu-open`クラスを付与して、`translate`プロパティを0にすることで、ハンバーガーメニューを左から右にスライドして表示します。

```scss [SCSS]
.hamburger-menu.is-menu-open {
  translate: 0 0;
}
```

CSSは以上です。
最後に、JavaScriptを記述していきます。

### JavaScript

JavaScriptを記述していきます。
今回は、クラス構文で実装していきます。

```js [JavaScript]
class Hamburger {
  constructor() {
    this.header = document.querySelector('.js-header');
    if (!this.header) return;
    this.init();
  }

  init() {
    this.trigger = document.querySelector('.js-menu-trigger');
    this.menu = document.querySelector('.js-menu');
    this.event();
  }

  event() {
    this.trigger.addEventListener('click', (e) => {
      this.toggle();
    })

    this.closeBtn = document.querySelector('.js-menu-close');
    this.closeBtn?.addEventListener('click', () => this.close());
  }

  toggle() {
    this.header.classList.contains('js-active') ? this.close() : this.open();
  }

  open() {
    this.header?.classList.add('js-active');
    this.menu?.classList.add('is-menu-open');

    document.body.style.overflow = 'hidden';
  }

  close() {
    this.header?.classList.remove('js-active');
    this.menu?.classList.remove('is-menu-open');
    document.body.style.overflow = 'auto';
  }
}

const hamburger = new Hamburger();
```

#### event()

`event()`メソッドでは、ハンバーガーメニューを開閉するためのイベントを設定します。
`trigger`と`closeBtn`には、それぞれハンバーガーメニューを開閉するためのボタンと、ハンバーガーメニューを閉じるためのボタンになります。これに対して、`click`イベントを設定して、`toggle()`メソッドを呼び出します。

```js [JavaScript]
event() {
  this.trigger.addEventListener('click', (e) => {
    this.toggle();
  })

  this.closeBtn = document.querySelector('.js-menu-close');
  this.closeBtn?.addEventListener('click', () => this.close());
}
```

#### toggle()

`toggle()`メソッドでは、ハンバーガーメニューを開閉する処理を行います。
ハンバーガーメニューを開いた時に、状態が分かるように`this.header`に`js-active`クラスを付与しています。

それに対して、`contains()`メソッドで`js-active`クラスが付与されているかどうかを判定して、付与されている場合は`close()`メソッドを呼び出し、付与されていない場合は`open()`メソッドを呼び出します。

```js [JavaScript]
toggle() {
  this.header.classList.contains('js-active') ? this.close() : this.open();
}
```

#### open()

`open()`メソッドでは、ハンバーガーメニューを開く処理を行います。
先述の通り、開閉の状態が分かるように`this.header`に`js-active`クラスを付与しています。また、`this.menu`に`is-menu-open`クラスを付与して、ハンバーガーメニューを開く処理を行います。

```js [JavaScript]
open() {
  this.header?.classList.add('js-active');
  this.menu?.classList.add('is-menu-open');

  document.body.style.overflow = 'hidden';
}
```

##### ハンバーガーメニューを開いた時に、ボディのスクロールを固定する

ここで、`body`に`overflow: hidden`を設定してるのは、ハンバーガーメニューを開いた時に、スクロールでコンテンツが動かないようにするために設定しています。

#### close()

最後に、、`close()`メソッドでは、ハンバーガーメニューを閉じる処理を行います。
`this.header`から`js-active`クラスを削除して、`this.menu`から`is-menu-open`クラスを削除して、ハンバーガーメニューを閉じる処理を行います。

また、このままだと`body`に`overflow: hidden`が設定されたままになっていて、スクロールできないので、`auto`に設定して戻しています。

```js [JavaScript]
close() {
  this.header?.classList.remove('js-active');
  this.menu?.classList.remove('is-menu-open');
  document.body.style.overflow = 'auto';
}
```

## まとめ

基本的なハンバーガーメニューの実装方法を紹介しました。
基本的な実装を応用して、いろいろなハンバーガーメニューを作ろうと思いますので、ぜひ理解しておいてください。