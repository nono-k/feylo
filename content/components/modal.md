---
title: "Modal"
description: "Web制作でモーダルを実装する機会は多いかと思います。この記事ではdialog要素でモーダルを実装する方法を解説します。"
image: "/images/components/modal.jpg"
---

## モーダルとは？

「モーダル(modal)」とは、ユーザーの操作を一時的に制限して特定のタスクや情報に集中させるUI要素です。代表的なモーダルの例としては、以下があります。

- 確認ダイアログ：「本当に削除しますか？」
- ログインフォーム：画面遷移せずに入力できるポップアップ
- 画像ビューア：画像クリックで拡大表示

モーダルの特徴は「モーダルが開いている間は、背後のコンテンツが操作できない」ことです。

## 従来のモーダル実装

これまでのモーダルの実装では、HTMLの`div`要素をベースにしてJavaScriptで開閉の制御をして作成することが多かったです。こうした実装では、以下のような機能を自前で作る必要があり、やや複雑でした。

- スクロール制御
- フォーカスの移動(アクセシビリティ)
- Escapeキーで閉じる

## dialog要素とは？

`dialog`要素はHTML5で追加されて、<Marker>モーダルダイアログを標準化して実装できる</Marker>仕組みです。機能としては次のようになります。

- `showModal()`でモーダルとして開く
- `close()`で閉じる
- `open`属性で開閉状態を確認できる
- フォーカス管理やEscapeキー対応も標準で組み込み済み

`dialog`要素を使用することで、これまで自前で実装していた「モーダルの基礎部分」をブラウザが担ってくれるようになりました。

## dialogを使った基本実装

もっとも基本的な`dialog`での実装を見てみましょう。

::codepen-embed
---
id: pvjBJEO
title: Simple Dialog
---
::

### HTML

HTMLは次のようになります。

```html [HTML]
<button id="openBtn">モーダルを開く</button>

<dialog id="myDialog">
  <p>これはモーダルです</p>
  <button id="closeBtn">閉じる</button>
</dialog>
```

### JavaScript

```js [JavaScript]
const dialog = document.getElementById("myDialog");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", () => {
  dialog.showModal(); // モーダルとして開く
});

closeBtn.addEventListener("click", () => {
  dialog.close(); // 閉じる
});
```

これだけで、モーダルの基本的な開閉機能が実装できましたがまだ、足りない部分もあるのでカスタマイズ例を見ていきましょう。

## カスタマイズ例

::codepen-embed
---
id: WbQBpNN
title: Multiple Dialog Modal
---
::

上記のCodePenのデモでは、以下の点を考慮して実装を追加しました。

- 複数の`dialog`要素に対応
- モーダルが開いている時は、背面のスクロールを抑制する
- モーダルの背面のオーバーレイをクリックするとモーダルが閉じられる
- モーダルの開閉にアニメーションを設定

それでは、実際に実装してみましょう。

### HTML

カスタマイズのデモのHTMLは次のようになります。

```html [HTML]
<!-- モーダルボタン -->
<div class="modal__btn-wrap">
  <button 
    class="modal__btn js-modal-trigger" 
    type="button" 
    data-modal-target="modal1">
    モーダル1を開く
  </button>
  <button 
    class="modal__btn js-modal-trigger" 
    type="button" 
    data-modal-target="modal2">
    モーダル2を開く
  </button>
</div>

<!-- モーダル -->
<dialog class="modal js-modal" id="modal1">
  <div class="modal__overlay js-modal-overlay"></div>
  <div class="modal__inner">
    <div class="modal__box">
      <h2>モーダル1です</h2>
      <button class="modal__btn js-modal-close" type="button">閉じる</button>
    </div>
  </div>
</dialog>

<dialog class="modal js-modal" id="modal2">  
  <!-- 中身省略 -->
</dialog>
```

ここでもJavaScriptで操作する要素には`js-`クラスを先頭に付けるようにしましょう。

モーダルを開くボタンには、対象のモーダルを指定できるように`data-modal-target`属性を追加します。ここには`dialog`要素に付与されたid属性の値を指定します。

```html [HTML]
<button 
  class="modal__btn js-modal-trigger" 
  type="button" 
  data-modal-target="modal1">
  モーダル1を開く
</button>

<dialog class="modal js-modal" id="modal1">
</dialog>
```

`dialog`内では、モーダル外をクリックした時に閉じられるように`js-modal-overlay`クラスを追加します。

```html [HTML]
<dialog class="modal js-modal" id="modal1">
  <div class="modal__overlay js-modal-overlay"></div>
</dialog>
```

`dialog`要素には、デフォルトで`::backdrop`疑似要素がありますが、これはJavaScriptの`click`イベントを発火させることができないので、自前で追加させています。`::backdrop`疑似要素はCSSで非表示するようにしましょう。

```css [CSS]
dialog::backdrop {
  display: none;
}
```

### CSS

ここでは、`dialog`要素のデフォルトのスタイルを打ち消す箇所のみ紹介します。`dialog`要素にはデフォルトでスタイルが付与されています。なので、次のようにスタイルを打ち消すようにしておきましょう。

```css [CSS]
dialog {
  width: unset;
  max-width: unset;
  height: unset;
  max-height: unset;
  padding: 0;
  border: none;
}
```

### JavaScript

複数のモーダルがある場合のJavaScriptになります。詳しくはコメントを参照ください。

```js [JavaScript]
class Modal {
  constructor() {
    this.els = document.querySelectorAll('.js-modal');
    if(!this.els.length) return
    this.init();
  }
  init() {
    this.triggers = document.querySelectorAll('.js-modal-trigger');

    this.event();
  }

  event() {
    this.triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.activateModal(trigger)
      });
    });
  }

  // クリックされたボタンに対応するモーダルを開く
  activateModal(trigger) {
    // ボタンに指定されている対象のモーダルのIDを取得
    const targetId = trigger.dataset.modalTarget;
    // IDから対象のモーダルを取得
    const targetModal = document.querySelector(`#${targetId}`);
    // モーダルを開く処理
    this.openModal(targetModal)

    // モーダル外をクリックしたときの処理
    const overlay = targetModal.querySelector('.js-modal-overlay');
    overlay.addEventListener('click', () => {
      this.closeModal(targetModal)
    });

    // モーダル内の閉じるボタンをクリックしたときの処理
    const closeBtn = targetModal.querySelector('.js-modal-close');
    closeBtn.addEventListener('click', () => {
      this.closeModal(targetModal)
    });

    // ESCキーを押したときの処理
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') {
        this.closeModal(targetModal)
      }
    });
  }

  openModal(targetModal) {
    // スクロール固定の処理
    this.bodyOffsetY = window.scrollY;
    document.body.style.top = `-${this.bodyOffsetY}px`;
    document.body.classList.add('is-scrollLock');

    // モーダルを表示
    targetModal.showModal();
  }

  closeModal(targetModal) {
    // スクロール固定の解除
    document.body.style.top = '';
    document.body.classList.remove('is-scrollLock');
    window.scrollTo(0, this.bodyOffsetY);

    // モーダルを閉じる処理
    targetModal.close();
  }
}

const modal = new Modal();
```

#### モーダルが開いたときのスクロール抑制

コンテンツがスクロールできるときに、`dialog`要素でモーダルを開いてもスクロールすると、裏側のコンテンツがスクロールできるようになってしまいます。これを解消するためにモーダルを開く処理(`openModal()`)の中でスクロールを抑制できるようにしましょう。

ここでは、モーダルを開いたときに`body`要素に次のようなスタイルを設定している`is-scrollLock`クラスを付与します。

```css [CSS]
body.is-scrollLock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}
```

このCSSでは、`position: fixed`で固定し、`overflow-y: scroll`を設定します。通常、固定する場合は`overflow: hidden`を設定しますが、その場合スクロールバーが削除されガタツキが起きてしまうので、`overflow-y: scroll`を使用することでスクロールバーを常時表示されガタツキが起きないように固定することができます。

`position: fixed`で固定するため`openModal`の処理では、モーダルを開いたときのスクロール量を取得し、`body`要素の`top`プロパティに設定します。

```js [JavaScript]
openModal(targetModal) {
  // スクロール固定の処理
  this.bodyOffsetY = window.scrollY;
  document.body.style.top = `-${this.bodyOffsetY}px`;
  document.body.classList.add('is-scrollLock');
}
```

これで、モーダルを開いたときにスクロールを抑制することができました。モーダルを閉じるときはスクロール固定の処理を削除することを忘れないようにしましょう。

```js [JavaScript]
closeModal(targetModal) {
  // スクロール固定の解除
  document.body.style.top = '';
  document.body.classList.remove('is-scrollLock');
  window.scrollTo(0, this.bodyOffsetY);

  // モーダルを閉じる処理
  targetModal.close();
}
```

#### ESCキーを押したときの処理

`dialog`要素では、<kbd>esc</kbd>キーを押すとモーダルを閉じることができますが、先述の通りスクロールを抑制する処理を書いているので、<kbd>esc</kbd>キーを押したときに`closeModal()`を呼び出すようにするのを忘れないようにしましょう。

```js [JavaScript]
// ESCキーを押したときの処理
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    this.closeModal(targetModal)
  }
});
```

#### モーダルを開いたときのアニメーション

最後にモーダルを開いたときのアニメーションについて解説します。`dialog`要素ではデフォルトで`display: none`が設定されて非表示になっているので、`display: none`の状態からアニメーションさせるために、`transition-behavior`と`@starting-style`を指定するようにします。

```css [CSS]
.modal {
  opacity: 0;
  transition-property: display, overlay, opacity;
  transition-duration: 0.3s;
  transition-behavior: allow-discrete;

  &[open] {
    opacity: 1;
    @starting-style {
      opacity: 0;
    }
  }
}
```

ここでは、`opacity`に対してアニメーションを設定することでフェードのアニメーションを実装しました。

## 参考サイト

- [dialog: ダイアログ要素 - MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/dialog)