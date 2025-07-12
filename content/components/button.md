---
title: "Button"
description: "Web制作において必須のボタンのコンポーネントです。汎用的に使い回せるよう作りましょう。"
image: "/images/components/button.jpg"
---

## ボタンを作る前提

このページでは、ボタンを`a`タグで作る前提で説明します。
なので、`text-decoration: none;`を付けておきましょう。

```css
a {
  text-decoration: none;
}
```

## ボタンの基本形

ボタンは`a`タグに`.c-button`というクラスを付けて紹介します。
まずは、ボタンの基本形の背景があるだけのボタンを作り、ホバー時に色が反転するようにします。

::preview-iframe
---
html: |
  <a href='/' class='c-button'>ボタン</a>
css: |
  .c-button {
    background: #000;
    border: 1px solid #000;
    padding: 0.375rem 1rem;
    color: #fff;
    text-align: center;
    transition: background 0.3s, color 0.3s;
  }
  @media (any-hover: hover) {
    .c-button:hover {
      background: #fff;
      color: #000;
    }
  }
---
::

全体の背景が白の場合、ホバー時にボタンの背景が白だと見えなくなるので`border`を付けておきましょう。ホバーした時の操作は、`:hover`を使います。`any-hover`については、下記の記事で紹介しているので、そちらを参照してください。

## ボタンのサイズ

要件にもよりますが、ここではボタンのサイズは、`width`で調整します。
`.-small`,`.-medium`,`.-large`というクラスを作り、それぞれのサイズを設定します。

::preview-iframe
---
html: |
  <div class='flex' gap='1rem'>
    <a href='/' class='c-button -small'>ボタン</a>
    <a href='/' class='c-button -medium'>ボタン</a>
    <a href='/' class='c-button -large'>ボタン</a>
  </div>
css: |
  .c-button { 
    background: #000;
    border: 1px solid #000;    
    padding: 0.375rem 1rem;
    color: #fff;
    text-align: center;
    transition: background 0.3s, color 0.3s;
    &.-small {
      width: 6rem;
    }
    &.-medium {
      width: 10rem;
    }
    &.-large {
      width: 15rem;
    }
  }
  @media (any-hover: hover) {
    .c-button:hover {
      background: #fff;
      color: #000;
    }
  }
active: css
---
::

サイズの値に関しては、サイトの要件に合わせて調整し汎用的に使えるようにしましょう。

## Outlineと角丸ボタン

背景色がなく枠線のみのOutlineと、角丸のボタンを作ります。

::preview-iframe
---
html: |
  <div class='flex' gap='1rem'>
    <a href='/' class='c-button -outline'>ボタン</a>
    <a href='/' class='c-button -rounded-sm'>ボタン</a>
    <a href='/' class='c-button -rounded-md'>ボタン</a>
    <a href='/' class='c-button -rounded-lg'>ボタン</a>
  </div>
css: |
  .c-button { 
    background: #000;
    border: 1px solid #000;    
    padding: 0.375rem 1rem;
    color: #fff;
    text-align: center;
    transition: background 0.3s, color 0.3s;
    &.-outline {
      background: transparent;
      color: #000;
    }
    &.-rounded-sm {
      border-radius: 0.25rem;
    }
    &.-rounded-md {
      border-radius: 0.5rem;
    }
    &.-rounded-lg {
      border-radius: 1rem;
    }
  }
  @media (any-hover: hover) {
    .c-button:hover {
      background: #fff;
      color: #000;
    }
  }
active: css
---
::

Outlineボタンは、`background`を`transparent`にして、`color`を`#000`にします。

角丸は、`border-radius`を使って調整します。角丸のサイズは、`rounded-sm`, `rounded-md`, `rounded-lg`というクラスを作り、それぞれのサイズを設定します。こちらも、サイトの要件に合わせて調整し汎用的に使えるようにしましょう。

## アイコン付きのボタン

`display: grid`を使って、アイコン付きのボタンを作ります。ここではアイコンは、疑似要素を使って表現してみます。また、2行になってもアイコンが中央にくるように`align-items: center`を付けておきます。

::preview-iframe
---
html: |
  <div class="stack">
    <div class='flex' gap='1rem'>
      <a href='/' class='c-button -medium -icon-arrow'>
        <span class="c-button__text">ボタン</span>
      </a>
      <a href='/' class='c-button -medium -icon-arrow -icon-left'>
        <span class="c-button__text">ボタン</span>
      </a>
    </div>
    <div class='flex' gap='1rem'>
      <a href='/' class='c-button -medium -icon-arrow'>
        <span class="c-button__text">2行のボタン<br>ボタン</span>
      </a>
    </div>
  </div>
css: |
  .c-button { 
    background: #000;
    border: 1px solid #000;    
    padding: 0.375rem 1rem;
    color: #fff;
    text-align: center;
    transition: background 0.3s, color 0.3s;
    &.-medium {
      width: 12rem;
    }
    &.-icon-arrow {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 0.5rem;
      &::before {
        content: '';
      }
      &::after {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-top: 1px solid currentColor;
        border-right: 1px solid currentColor;
        rotate: 45deg;
        margin-left: auto;
      }
    }
    &.-icon-left {
      .c-button__text {
        order: 1
      }
      &::before {
        order: 2;
      }
      &::after {
        order: 0;
        rotate: -135deg;
        margin-right: auto;
        margin-left: 0;
      }
    }
  }
  @media (any-hover: hover) {
    .c-button:hover {
      background: #fff;
      color: #000;
    }
  }
active: css
height: 160px
---
::

アイコン付きのボタンは、`.-icon-arrow`というクラスを付けて、`display: grid`を使ってアイコンを配置します。gridの間隔を`grid-template-columns: 1fr auto 1fr`とすることで、テキストが中央にくるようにします。

デフォルトは、アイコンが右側に来るように設定してます。`before`要素を空にし、`after`でアイコンを作ることで右側にアイコンが来るボタンができます。アイコンが左側に来るようにするには、`.-icon-left`というクラスを付けて、`order`を使って調整します。ここで、`order`を使って調整するために、テキストは`span`要素で`c-button__text`というクラスを付けています。