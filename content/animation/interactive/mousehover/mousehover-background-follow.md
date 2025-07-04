---
title: "背景がホバーで追従するカードコンポーネント"
description: "Anchor Positioningを使用してJavaScriptを使わずにCSSのみで背景がホバーで追従させる作り方を解説します。カードコンポーネントなどで使用するとよりインタラクティブなホバーエフェクトになるでしょう。"
order: 2
update: 2025-07-03
group: "マウスホバー"
image: "/images/animation/hover-background-follow.jpg"
demoUrl: "https://nono-k.github.io/feylo-demo/demo/animation/hover-background-follow/"
demoCode: "https://github.com/nono-k/feylo-demo/blob/main/src/pages/demo/animation/hover-background-follow.astro"
pointList:
  - "Anchor Positioningを使用してJavaScriptを使わずにCSSのみで背景をホバーで追従させる"
  - "Anchor Positioningをサポートしていないブラウザでは背景色を表示するだけのフォールバックを行う"
---

## 実装の考え方

デモにあるような、カードの背景をホバーで追従させるアニメーションは、従来JavaScriptを使用しないと実装できませんでした。現在では、<Marker>Anchor Positioning</Marker>を使用してJavaScriptを使わずにCSSのみで実装できるようになりましたので、その実装方法を解説します。

Anchor Positioningは、執筆時点(2025/07)ではChromeとEdge、Safariが26.0以上からサポートしており、Firefoxではまだサポートされておりません。そこで、Anchor Positioningをサポートしていないブラウザではホバーしたら背景色を表示するだけのフォールバックを行うようにします。

::baseline-status
---
featureId: anchor-positioning
---
::

## 実装方法

それでは実際に実装していきましょう。
まずはHTMLになります。

### HTML

```html [HTML]
<div class="card__wrapper">
  <div class="card__bg"></div>
  <div class="card">
    <div class="card__img">
      <img src="https://picsum.photos/300/200?random=0" alt="">
    </div>
    <div class="card__body">
      <h2>タイトル01</h2>
      <p>Lorem ipsum dolor sit amet consectetur.</p>
    </div>
  </div>
  // カードの数だけ繰り返す
</div>
```

カードを並べるために`card__wrapper`クラスを付与した`div`タグを作成し、その中にカードを作成します。ホバーで追従する背景は`card__bg`クラスとし、`card__wrapper`の中に配置します。

### SCSS

CSSは以下のようになります。

```scss [CSS]
:root {
  --background: #F0A15EDD;
}

.card {
  padding: 1rem;
  position-anchor: --card;
  @include mixin.hover {
    anchor-name: --card;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    position: relative;
  }
  &__bg {
    position: absolute;
    background: var(--background);
    pointer-events: none;
    transition: 0.3s;
    z-index: -1;

    /* anchorの位置・サイズに従って追従させる */
    left: anchor(--card left);
    top: anchor(--card top);
    width: anchor-size(--card width);
    height: anchor-size(--card height);
  }
}
```

それでは、解説します。

#### .card

```scss [SCSS]
.card {
  position-anchor: --card;
}
```

Anchor Positioningを使用するために`position-anchor`プロパティを使用します。ここでは、`--card`という名前のAnchorを作成します。

```scss [SCSS]
.card {
  @include mixin.hover {
    anchor-name: --card;
  }
}
```

`.card`をホバーしたら、この要素を「アンカー」として扱うために`anchor-name`プロパティに`--card`を指定します。

#### .card__bg

```scss [SCSS]
.card__bg {
  position: absolute;
  background: var(--background);
  pointer-events: none;
  transition: 0.3s;
  z-index: -1;

  left: anchor(--card left);
  top: anchor(--card top);
  width: anchor-size(--card width);
  height: anchor-size(--card height);
}
```

`card__bg`は、`.card`をアンカーとして、その<Marker color="var(--orange)">位置・サイズにぴったり追従します。</Marker>

ぴったり追従するために、`left`、`top`、`width`、`height`に`anchor`関数を使用して、それぞれの値をアンカーの位置・サイズに合わせています。

#### Anchor Positioningのプロパティの説明

ここで今回使用した、Anchor Positioningのプロパティの役割については以下の通りです。

| プロパティ                     | 役割                     |
| ------------------------- | ---------------------- |
| `position-anchor: --xxx;` | この要素はアンカー候補になる（位置を与える） |
| `anchor-name: --xxx;`     | 実際にアンカーとして参照される名前      |
| `anchor(--xxx left)` など   | アンカー要素の位置を参照       |
| `anchor-size(--xxx width)` など   | アンカー要素のサイズを参照       |


## Anchor Positioningをサポートしていないブラウザの対応

Anchor Positioningをサポートしていないブラウザに対しては、`@supports`を使用して、ホバーしたら背景色を表示するだけのフォールバックを行いましょう。

```scss [SCSS]
.card {
  @supports not (anchor-name: --card) {
    transition: 0.3s;
    @include mixin.hover {
      background: var(--background);
    }
  }
}
```

## 注意事項

今回のようにカードコンポーネントを並べる場合、`grid`を使用しますが、ここで`gap`プロパティを使用して間隔を調整すると、ホバー要素が途切れてしまい、うまく機能しなくなります。

なので、カードコンポーネントの間隔は、`padding`プロパティで調整しましょう。