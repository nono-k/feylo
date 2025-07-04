---
title: "Checkbox"
description: "フォームで使われることが多いチェックボックスについて紹介します。実装しだいでアクティビティに影響するので気を付けて実装しましょう。"
image: "/images/components/checkbox.jpg"
---

## チェックボックスの使用方法

チェックボックスは、HTMLの`<input type="checkbox">`で作ります。

::preview-iframe
---
html: |
  <input type="checkbox" name="checkbox" value="チェックボックス">
css: |
---
::

チェックボックスを設置するときには、`name`属性と、`value`属性を設定します。

| 属性名 | 説明 |
| --- | --- |
| name | チェックボックスの名前を設定 |
| value | 1つ1つのチェックボックスの値を設定 |

## labelタグとの組み合わせ

通常は、チェックボックスだけの場合は稀で、横にテキストなどがあるかと思います。その際に、`<label>`タグと組み合わせて使用することで、テキストをクリックしたときにもチェックボックスが選択できるようになります。

::preview-iframe
---
html: |
  <label>
    <input type="checkbox" name="checkbox" value="チェックボックス">
    Checkbox
  </label>
css: |
---
::

## checked属性でデフォルトでチェックされた状態にする

初期状態でチェックボックスがチェックされた状態にしたい場合は、`checked`属性を使用します。

::preview-iframe
---
html: |
  <div class='flex' gap='1rem'>
    <label>
      <input 
        type="checkbox" 
        name="checkbox" 
        value="チェックボックス"
      >
      Checkbox
    </label>
    <label>
      <input 
        type="checkbox" 
        name="checkbox" 
        value="チェックボックス"
        checked
      >
      Checked
    </label>
  </div>
css: |
---
::

## キーボード操作でチェックボックス選択する

チェックボックスは、キーボード操作で選択できます。フォーカスの切り替えには<kbd>Tab</kbd>キーと<kbd>Shift</kbd>キーを使います。チェックボックスを選択するには<kbd>Space</kbd>キーを押します。

## CSSでチェックボックスのスタイルを変更する

チェックボックスの見た目はブラウザによって異なります。各ブラウザで見ても統一した見た目にするためには、CSSでチェックボックスのスタイルを変更します。

CSSでスタイルを変更するうえでの注意点は、inputタグを`display: none`で非表示にしないことです。`display: none`にすると、先述のキーボード操作で選択ができなくなるのでスタイルを変更する際は注意しましょう。

::preview-iframe
---
html: |
  <div class='flex center'>
    <label class="c-checkbox">
      <input 
        class="c-checkbox__input"
        type="checkbox" 
        name="checkbox" 
        value="チェックボックス"
      >
      Checkbox
    </label>
  </div>
css: |
  .c-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer    
  }
  .c-checkbox__input {
    position: relative;
    width: 24px;
    height: 24px;
    appearance: none;
    border: solid 1px #000;
    border-radius: 4px;
    transition-duration: 0.3s;
    transition-property: border-color, box-shadow, background;

    &:checked {
      background: #53C197;
    }    

    /* チェックマーク */
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      mask-image: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M4%2010.8889L10.0714%2017L21%206%22%20stroke%3D%22white%22%20stroke-width%3D%224%22/%3E%3C/svg%3E");
      mask-repeat: no-repeat;
      mask-size: contain;
      background: #FFF;
      transition: opacity 0.3s;
    }

    &:checked::before {
      opacity: 1;
    }
  }
  @media (any-hover: hover) {
    .c-checkbox:hover {
      .c-checkbox__input:not(:checked) {
        border-color: #2E9F6F;
        box-shadow: 0 0 0 4px #D3F0E2; 
      }
    }
  }
---
::

以下で、実装のポイントを解説します。

### ブラウザごとの見た目とCSSの制御を除去する

`appearance`プロパティを`none`にすることで、ブラウザごとの見た目とCSSの制御を除去します。
`width`と`height`でチェックボックスのサイズを調整します。

```css [CSS]
.c-checkbox__input {
  position: relative;
  width: 24px;
  height: 24px;
  appearance: none;
  border: solid 1px #000;
  border-radius: 4px;
}
```

ここで、チェックマークの位置を調整するために、`position: relative`を設定しています。

### チェックマークを疑似要素で作る

チェックマークは、疑似要素で設定します。
ここでは、`mask`プロパティを使って、チェックマークのSVG画像を設定します。

```css [CSS]
.c-checkbox__input {
  /* チェックマーク */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    mask-image: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M4%2010.8889L10.0714%2017L21%206%22%20stroke%3D%22white%22%20stroke-width%3D%224%22/%3E%3C/svg%3E");
    mask-repeat: no-repeat;
    mask-size: contain;
    background: #FFF;
    transition: opacity 0.3s;
  }
}
```

チェックが入ってから表示するために、初期状態では`opacity`を0にして非表示にしておきます。

### チェックボックスを選択したときのスタイルを設定する

選択された状態は、CSSでは`:checked`という疑似クラスを使って設定します。

```css [CSS]
.c-checkbox__input {

  &:checked {
    background: #53C197;
  }

  &:checked::before {
    opacity: 1;
  }
}
```

`:checked`の時に、チェックボックスの背景を緑にし、チェックマークの`opacity`を1にして表示します。

## 参考サイト

- [フォームへの高度なスタイル設定 - MDN](https://developer.mozilla.org/ja/docs/Learn_web_development/Extensions/Forms/Advanced_form_styling)

- [コピペで使える! HTMLのチェックボックスを独自のデザインで実装する方法 - ICS MEDIA](https://ics.media/entry/241004/)