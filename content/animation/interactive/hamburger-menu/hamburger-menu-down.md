---
title: "上から表示するハンバーガーメニューの実装方法"
description: "上から表示されるハンバーガーメニューの実装方法を解説します。今回はメニューの高さ分を表示されるようにし、メニュー外をクリックしたらハンバーガーメニューが閉じるようにします。"
order: 2
update: 2025-07-18
group: "ハンバーガーメニュー"
image: "/images/animation/hamburger-menu-down.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/hamburger-menu-down/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/hamburger-menu-down.astro"
pointList:
  - "初期状態ではメニューは上に位置してclip-pathで非表示にする"
  - "クリックしたらclip-pathで上から表示されるようにする"
  - "メニュー外をクリックしたらハンバーガーメニューが閉じるようにする"
  - "アニメーションはJavaScriptでクラスを付与して実装する"
---

## 実装の考え方

今回のハンバーガーメニューのアニメーションの実装の考え方は、初期状態ではメニューを`clip-path`プロパティで非表示にし、クリックしたら`clip-path`で上から表示されるようにします。

また、`position: fixed`でヘッダーを固定しています。メニュー分の高さ分を表示させるようにするので、下にメニュー外のエリアができるので、そのエリアをクリックしたらハンバーガーメニューが閉じるようにします。また、ハンバーガーメニューが開いたら、☓になるようなアニメーションにします。

基本的なハンバーガーメニューの実装方法は下記をご覧ください

::recommend-link
---
items:
  - title: "基本的なハンバーガーメニューの実装方法"
    link: "/animation/interactive/hamburger-menu/hamburger-menu-base"
    image: "/images/animation/hamburger-menu-base.jpg"
    description: "Web制作で必ずといっていいほど実装する機会のあるハンバーガーメニューの実装方法を解説します。まずは、基本的なハンバーガーメニューの実装で、クリックしたらメニューが左から右にスライドして表示されるアニメーションを実装します。"
---
::


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
    <div class="hamburger-menu__overlay js-menu-overlay"></div>
    <ul class="hamburger-menu__list">
      <li class="hamburger-menu__item">Home</li>
      <li class="hamburger-menu__item">About</li>
      <li class="hamburger-menu__item">Work</li>
      <li class="hamburger-menu__item">Contact</li>
    </ul>
  </div>
</header>
```

ハンバーガーメニュー外の要素は、`hamburger-menu__overlay`というクラスを付与した`div`タグで作成します。こちらも、JavaScriptで操作するので、`js-menu-overlay`というクラスも追加しています。

### CSS

続きまして、CSSを記述していきます。

```scss [SCSS]
.header {
  --header-size: 56px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  background: #fff;
  border-bottom: 1px solid #000;
  &.js-active {
    .hamburger__line {
      &::before, &::after {
        translate: -50% -50%;
      }
      &::before {
        rotate: 45deg;
      }
      &::after {
        rotate: -45deg;
      }
    }
  }
}

.hamburger {
  position: relative;
  margin-left: auto;
  width: var(--header-size);
  aspect-ratio: 1;
  background: #000;
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
      transition-property: rotate;
      transition-duration: 0.3s;
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
  top: var(--header-size);
  left: 0;
  width: 100%;
  height: calc(100vh - var(--header-size));
  color: #fff;
  &.is-menu-open {
    .hamburger-menu__overlay {
      opacity: 1;
    }
    .hamburger-menu__list {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
  }
  &__overlay {
    position: fixed;
    top: var(--header-size);
    left: 0;
    width: 100%;
    height: calc(100vh - var(--header-size));
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.3s;
  }
  &__list {
    padding: 1.5rem 2rem;
    background: #000;
    display: flex;
    column-gap: 1.5rem;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0% 0);
    transition-property: clip-path;
    transition-duration: 0.3s;
  }
}
```

長くなりましたが、解説していきます。

#### 初期状態でメニューを上に位置してclip-pathで非表示にする

まずは、初期状態でメニューを上に位置してclip-pathで非表示にします。

```scss [SCSS]
.header {
  --header-size: 56px;
  position: fixed;
  top: 0;
  left: 0;
  // ...
}

.hamburger-menu {
  position: fixed;
  top: var(--header-size);
  left: 0;
  width: 100%;
  height: calc(100vh - var(--header-size));
  // ...
}

.hamburger-menu__overlay {
  position: fixed;
  top: var(--header-size);
  left: 0;
  width: 100%;
  height: calc(100vh - var(--header-size));
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.3s;
}

.hamburger-menu__list {
  // ...
  clip-path: polygon(0 0, 100% 0, 100% 0, 0% 0);
  transition-property: clip-path;
  transition-duration: 0.3s;
}
```

headerの高さを`--header-size`というカスタムプロパティで定義しています。この値を、`hamburger-menu`の`top`プロパティと`hamburger-menu__overlay`の`top`プロパティに適用しています。

ハンバーガーメニューが開いた時に、headerと被らないように`hamburger-menu`と`hamburger-menu__overlay`の`height`プロパティを`calc(100vh - var(--header-size))`にしています。

メニュー外の`.hamburger-menu__overlay`は、`opacity`プロパティを`0`にして非表示にしています。

#### メニューが開いた状態

##### メニューが開いたら☓になるようにする

ハンバーガーメニューが開いたら、☓になるようにします。JavaScriptで`header`に`js-active`クラスを付与して、`hamburger__line`の`rotate`プロパティを`45deg`にしています。

```scss [SCSS]
.header.js-active .hamburger__line {
  &::before, &::after {
    translate: -50% -50%;
  }
  &::before {
    rotate: 45deg;
  }
  &::after {
    rotate: -45deg;
  }
}
```

##### メニューが開いたアニメーション

また、JavaScriptで`hamburger-menu`に`is-menu-open`クラスを付与して下記のアニメーションにします。

- `.hamburger-menu__list`の`clip-path`プロパティで、メニューを表示する

- `.hamburger-menu__overlay`の`opacity`プロパティを1にして、メニュー外を表示する

```scss [SCSS]
.hamburger-menu.is-menu-open .hamburger-menu__list {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.hamburger-menu.is-menu-open .hamburger-menu__overlay {
  opacity: 1;
}
```

clip-pathのプロパティは、[このサイト](https://bennettfeely.com/clippy/)が便利なので、こちらで確認して設定しましょう。

![clip-pathのプロパティ](/images/animation/post/hamburger-menu-down-01.jpg)


### JavaScript

最後にJavaScriptを記述していきます。今回も、クラス構文で実装していきます。

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

    this.overlay = document.querySelector('.js-menu-overlay');
    this.overlay?.addEventListener('click', () => this.close());
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

おおよそは、[基本的なハンバーガーメニューの実装](/animation/interactive/hamburger-menu/hamburger-menu-base)と同じになります。

今回は、メニュー外をクリックしたら閉じるようにしたいので、下記のように記述しています。

```js [JavaScript]
event() {
  this.overlay = document.querySelector('.js-menu-overlay');
  this.overlay?.addEventListener('click', () => this.close());
}
```

これで、メニュー外をクリックしたら閉じるようになりました！

## まとめ

ハンバーガーメニューが上から表示するようなアニメーションの実装方法を解説しました。
ぜひ、参考にしてみてください。