---
title: "Accordion"
description: "コンテンツを折りたたんで表示するコンポーネントです。details要素を使って作成します。ここではJavaScriptを使用したアニメーションの方法も紹介します。"
image: "/images/components/accordion.jpg"
---

## アコーディオンを作る前提

このページでは、アコーディオンをHTMLの`details`要素と`summary`要素で作る前提で説明します。`details`と`summary`を合わせて使えば、簡単にアコーディオンや折りたたみメニューを作ることができます。

## アコーディオンを作成する際にdetailsとsummaryで実装するメリット

`details`と`summary`はHTML5から追加された要素ですが、IEでは対応していませんでした。なので、IEサポート終了前までは、アコーディオンは`div`要素や`input`要素の`type="checkbox"`などを利用して作成されてました。

ですが、これらの要素ではアクセシビリティなどの問題がありますので、今後は`details`と`summary`を使ってアコーディオンを作成することが推奨されています。

アクセシビリティ面で、アコーディオンをdetailsとsummaryで実装するメリットに関しては、以下の通りです。

::content-list
---
title: "メリット"
list:
  - JavaScriptを使用しなくても、キーボード操作でアコーディオンを開閉できる。
  - サイト内検索で、ヒットした単語の含まれるアコーディオンが開く。
  - スクリーンリーダーが開閉状態について適切に読み上げてくれる。
backgroundColor: var(--green)
---
::

以上のように、アコーディオンを`details`と`summary`で実装することで、より良いアクセシビリティを実現することができます。それでは使い方を見ていきましょう。

## detailsとsummaryタグの使い方

`details`と`summary`を以下のように合わせて使うことで、簡単にアコーディオンを作ることができます。

::preview-iframe
---
html: |
  <details>
    <summary>アコーディオンのタイトル</summary>
    <p>アコーディオンの内容</p>
  </details>
css: |
  details {
    border: 1px solid #000;
    padding: 1rem;
  }
---
::

各要素の説明は以下の通りです。

| 要素 | 説明 |
| --- | --- |
| details | アコーディオン全体を囲む |
| summary | アコーディオンのタイトルを入れます。アイコンなどを設定する場合はこちらに入れます。 |
| p | アコーディオンの中身を入れます。段落(`p`)だけではなく、リスト(`ul`, `ol`)や`div`なども入れることができます。 |

### 初期状態を開いた状態にする

`details`要素に`open`属性を付けることで、アコーディオンの初期状態を開いた状態にすることができます。

::preview-iframe
---
html: |
  <details open>
    <summary>open属性を付与した場合</summary>
    <p>アコーディオンの内容</p>
  </details>
css: |
  details {
    border: 1px solid #000;
    padding: 1rem;
  }
---
::

## CSSでアコーディオンをカスタマイズ

`details`と`summary`で作ったアコーディオンは、デフォルトでは上記のようにタイトル(`summary`)の横に三角形の矢印が表示されます。これをそのまま使うことはないので、矢印を消したり、矢印のカスタマイズをしたり、開いた状態のスタイルを変更する方法を紹介します。

### 矢印を消す

三角形の矢印を消す方法は、Safari以外は`summary`要素に`display: block`を付けることで削除できますが、Safariでは消せません。

Safariでは、`summary::-webkit-details-marker`によって矢印が表示されているので、これを`display: none`することで矢印を消すことができます。

::preview-iframe
---
html: |
  <details >
    <summary>デフォルトの矢印を消す</summary>
    <p>アコーディオンの内容</p>
  </details>
css: |
  // デフォルトの三角形を消す
  summary {
    display: block;
  }

  // safari対策でデフォルトの三角形を消す
  summary::-webkit-details-marker {
    display: none;
  }

  details {
    border: 1px solid #000;
    padding: 1rem;
  }
active: css
---
::

### 矢印のカスタマイズ

矢印をカスタマイズします。矢印は、`summary`要素の中に`icon`クラスを使って作ります。ここでは、矢印は「+」の形にします。位置の設定には`grid`を使います。

::preview-iframe
---
html: |
  <details >
    <summary>
      アコーディオンタイトル
      <span class='icon'></span>
    </summary>
    <p>アコーディオンの内容</p>
  </details>
css: |  
  details {
    border: 1px solid #000;
    padding: 1rem;
  }

  summary {
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    column-gap: 1rem;    
  }

  .icon {
    width: 1rem;
    height: 1rem;
    position: relative;
    margin-left: auto;
    &::before, &::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      background: #000;
    }

    &::before {
      width: 1rem;
      height: 1px;
    }

    &::after {
      width: 1px;
      height: 1rem;
    }
  }

  // デフォルトの三角形を消す
  summary {
    display: block;
  }

  // safari対策でデフォルトの三角形を消す
  summary::-webkit-details-marker {
    display: none;
  }
active: css
---
::

「+」の形にするには、`icon`クラスの`before`要素と`after`要素を使って、`position: absolute`で位置を調整します。

### 開いた状態のスタイルを変更する

アコーディオンが開いた状態が分かるように、「+」のアイコンを「-」に変更します。アコーディオンが開いた状態のスタイルは、`details[open]`を使って指定することができます。

```css [CSS]
.icon {
  &::after {
    // ...
    transition-property: rotate;
    transition-duration: 0.3s;
  }
}

details[open] .icon {
  &::after {
    rotate: 90deg;
  }
}
```

↓のようになります。

::preview-iframe
---
html: |
  <details >
    <summary>
      アコーディオンタイトル
      <span class='icon'></span>
    </summary>
    <p>アコーディオンの内容</p>
  </details>
css: |  
  details {
    border: 1px solid #000;
    padding: 1rem;
  }

  summary {
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    column-gap: 1rem;    
  }

  .icon {
    width: 1rem;
    height: 1rem;
    position: relative;
    margin-left: auto;
    &::before, &::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      background: #000;
    }

    &::before {
      width: 1rem;
      height: 1px;
    }

    &::after {
      width: 1px;
      height: 1rem;
      transition-property: rotate;
      transition-duration: 0.3s;
    }
  }
  
  details[open] .icon {
    &::after {
      rotate: 90deg;
    }
  }

  // デフォルトの三角形を消す
  summary {
    display: block;
  }

  // safari対策でデフォルトの三角形を消す
  summary::-webkit-details-marker {
    display: none;
  }
active: css
---
::

## アコーディオンに開閉アニメーションを付ける

そのまま`details`と`summary`で作ったアコーディオンには、開閉の時にアニメーションがなく即時に開閉してしまいます。そこで、開閉のアニメーションを付けてみましょう。

[この記事](https://developer.chrome.com/blog/styling-details?hl=ja)によると、`::details-content`疑似要素を利用することで、JavaScriptを使わずにCSSのみでアニメーションを付けることができます。

ですがSafariとFirefoxでは、記事作成時(2025/07)で`::details-content`を利用したアニメーションが動作しないので、ここではJavaScriptを使ってアニメーションを付ける方法を紹介します。

全ブラウザーで動作するようになったら、`:::details-content`を使ったアニメーションも紹介します。

### JavaScriptで開閉アニメーションを付ける方法

JavaScriptでアコーディオンの開閉アニメーションを付ける方法を紹介します。ここでは、複数のアコーディオンに対しても対応できるようにします。CodePenのデモは下記になります。

::codepen-embed
---
id: ZYbbmwz
title: Accordion Slide Toggle Animation With JavaScript
---
::

アニメーションではJavaScriptでアコーディオンの中身の高さを取得して、Web Animations APIを使ってアニメーションを付けています。

#### HTML

このデモのHTMLは以下のようになります。

```html [HTML]
<div class="accordion js-accordion">
  <details class="accordion__details js-details">
    <summary class="js-summary">
      Sample01
      <span class="accordion__icon"></span>
    </summary>
    <div class="accordion__content js-content">
      <div class="accordion__content-inner">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <ul>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
        </ul>
      </div>
    </div>
  </details>
</div>

// ...
```

JavaScriptで操作する要素には、`js-`から始まるクラスを付けておきます。

#### CSS

CSSに関しては長くなるので、全てのコードはCodePenの方を確認ください。
ここでは、先ほどの説明から変更があった箇所として、アコーディオンが開いた時に「+」から「-」に変わるアニメーションについてだけ説明します。

JavaScriptで時間差のアニメーションを付ける影響で、`details`要素の`open`属性だけを見ると、アコーディオンが閉じる際のアニメーションは、全て閉じ終わってから「+」に変わるアニメーションが始まります。

これを回避するために、アコーディオンの開閉の際に、`is-opened`クラスを付け外すようにします。なので、`details`要素に`is-opened`クラスが付いたらアニメーションするようにCSSを記述しましょう。

```scss [SCSS]
.accordion__details.is-opened {
  .accordion__icon {
    &::after {
      rotate: 90deg;
    }
  }
}
```

#### JavaScript

最初にJavaScriptの全コードを下記に示します。

```js [JavaScript]
class Accordion {
  constructor() {
    this.elms = document.querySelectorAll('.js-accordion');
    if (this.elms.length) {
      this.elms.forEach(elm => this.init(elm))
    }
  }

  init(_elm) {
    const elm = _elm;
    this.setAnimTiming(400, 'ease-out');
    this.defaultAccordion(elm);
  }

  setAnimTiming(_duration, _easing) {
    this.animTiming = {
      duration: _duration,
      easing: _easing
    };
  }

  defaultAccordion(_elm) {
    this.RUNNING_VALUE = 'running';
    this.IS_OPENED_CLASS = 'is-opened';
    this.options = this.animTiming;

    const details = _elm.querySelector('.js-details');
    const content = _elm.querySelector('.js-content');

    details.addEventListener('click', (e) => {
      e.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターン
      if (details.dataset.animStatus === this.RUNNING_VALUE) {
        return;
      }

      details.open ? this.close(details, content) : this.open(details, content);
    })
  }

  close(details, content) {
    details.classList.toggle(this.IS_OPENED_CLASS);
    const closingAnim = content.animate(this.closingAnimKeyframes(content), this.options);
    details.dataset.animStatus = this.RUNNING_VALUE;

    closingAnim.onfinish = () => {
      details.open = false;
      details.dataset.animStatus = '';
    }
  }

  open(details, content) {
    details.open = true;
    details.classList.toggle(this.IS_OPENED_CLASS);
    const openingAnim = content.animate(this.openingAnimKeyframes(content), this.options);
    details.dataset.animStatus = this.RUNNING_VALUE;

    openingAnim.onfinish = () => {
      details.dataset.animStatus = '';
    }
  }

  closingAnimKeyframes(content) {
    return [
      { height: content.offsetHeight + 'px' },
      { height: 0 }
    ];
  }

  openingAnimKeyframes(content) {
    return [
      { height: 0 },
      { height: content.offsetHeight + 'px' }
    ];
  }
}

new Accordion();
```

先述の通り、Web Animations APIを使ってアニメーションを付けています。
それでは、コードの解説をしていきます。

#### constructor()

`constructor()`では、複数のアコーディオンに対応できるように、`querySelectorAll`を使って全てのアコーディオンを取得し、`init()`に渡しています。

```js [JavaScript]
constructor() {
  this.elms = document.querySelectorAll('.js-accordion');
  if (this.elms.length) {
    this.elms.forEach(elm => this.init(elm))
  }
}
```

#### init()

`init()`では、アニメーションのタイミングを設定して、`defaultAccordion()`に渡しています。

```js [JavaScript]
init(_elm) {
  const elm = _elm;
  this.setAnimTiming(400, 'ease-out');
  this.defaultAccordion(elm);
}
```

#### setAnimTiming()

`setAnimTiming()`では、Web Animations APIで使用するオプションを設定しています。

```js [JavaScript]
setAnimTiming(_duration, _easing) {
  this.animTiming = {
    duration: _duration,
    easing: _easing
  };
}
```

#### defaultAccordion()

`defaultAccordion()`では、アコーディオンのクリックイベントなどを設定しています。
また連打防止用に、アニメーション中だったらクリックイベントを受け付けないように`details`要素の`dataset.animStatus`の値をチェックしています。

```js [JavaScript]
defaultAccordion(_elm) {
  this.RUNNING_VALUE = 'running';
  this.IS_OPENED_CLASS = 'is-opened';
  this.options = this.animTiming;

  const details = _elm.querySelector('.js-details');
  const content = _elm.querySelector('.js-content');

  details.addEventListener('click', (e) => {
    e.preventDefault();

    // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターン
    if (details.dataset.animStatus === this.RUNNING_VALUE) {
      return;
    }

    details.open ? this.close(details, content) : this.open(details, content);
  })
}
```

`details`要素の`open`プロパティの値によって、`open()`か`close()`を呼び出しています。

#### open()・close()

`open()`と`close()`では、Web Animation APIでアニメーションを実行しています。

```js [JavaScript]
close(details, content) {
  details.classList.toggle(this.IS_OPENED_CLASS);
  const closingAnim = content.animate(this.closingAnimKeyframes(content), this.options);
  details.dataset.animStatus = this.RUNNING_VALUE;

  closingAnim.onfinish = () => {
    details.open = false;
    details.dataset.animStatus = '';
  }
}

open(details, content) {
  details.open = true;
  details.classList.toggle(this.IS_OPENED_CLASS);
  const openingAnim = content.animate(this.openingAnimKeyframes(content), this.options);
  details.dataset.animStatus = this.RUNNING_VALUE;

  openingAnim.onfinish = () => {
    details.dataset.animStatus = '';
  }
}
```

それぞれ連打防止用のクラスを付けたり、アニメーションのオプションを設定したりしています。

`animate()`の第1引数には、アニメーションのキーフレームを配列で渡します。`close`と`open`のそれぞれのアニメーションキーフレームは`closingAnimKeyframes()`と`openingAnimKeyframes()`で設定しています。ここで、アコーディオンの中身の高さを取得するので、`content`を渡しています。

```js [JavaScript]
closingAnimKeyframes(content) {
  return [
    { height: content.offsetHeight + 'px' },
    { height: 0 }
  ];
}

openingAnimKeyframes(content) {
  return [
    { height: 0 },
    { height: content.offsetHeight + 'px' }
  ];
}
```

## 参考サイト

- [`<details>: 詳細折りたたみ要素 - MDN`](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/details)

- [`<summary>: 概要明示要素 - MDN`](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/summary)

- [`More options for styling <details> - chrome for developers`](https://developer.chrome.com/blog/styling-details)