---
title: "パンくずリストで長いテキストを「...」で省略する方法"
description: "前回の記事で、CSSのtext-overflow: ellipsisを使って長いテキストを省略する方法を紹介しました。しかし、パンくずリストで使用する場合にハマりポイントがあるので今回はパンくずリストにも正しく適用されるようにする方法を解説します。"
date: 2025-08-30
tags: 
  - "CSS"
image: "/images/blog/no-image-sky-blue.jpg"
summaryList:
  - "パンくずリストでの長いテキストを「...」で省略する方法"
  - "widthとmax-widthを使用していない場合でも適用できる方法"
---

## はじめに

前回の記事では、CSSの`text-overflow: ellipsis`を使って長いテキストを省略する方法を紹介しました。

::recommend-link
---
items:
  - title: "CSSで長いテキストを「...」で省略できるtext-overflow: ellipsisの紹介"
    link: "/blog/css-text-overflow-ellipsis"
    image: "/images/blog/css-text-overflow-ellipsis.jpg"
    description: "JavaScriptで「今日の日付は何日？」や「何時何分？」などの時間を扱いたいときに使うのがDateオブジェクトです。この記事では、JavaScriptのDateオブジェクトの使い方を紹介します。"
---
::

しかし、パンくずリストで使用する場合にハマりポイントがあるので今回はパンくずリストにも正しく適用されるようにする方法を解説します。

## パンくずリストでのハマりポイント

`text-overflow: ellipsis`を使用して、正しく長いテキストが省略されるようにするには、要素に`width`や`max-width`を設定して幅を決める必要があります。

ですが、パンくずリストでは通常動的にテキストが入り、`width`などで幅を決めることができません。

![タイトル部分の幅は事前に設定できない](https://res.cloudinary.com/dy8ftemi0/image/upload/v1756112900/bread-text-overflow-ellipsis-01_cdzjem.jpg)

そこで、この記事では、幅を決めないでも`text-overflow: ellipsis`が適用できる方法を解説します。

## パンくずリストでの実装方法

### HTML

まずは、HTMLの構造を示します。

```html [HTML]
<nav class="breadcrumb" aria-label="breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="breadcrumb__list">
    <li
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem"
      class="breadcrumb__item"
    >
      <a itemprop="item" href="/" class="breadcrumb__link">
        <span itemprop="name">HOME</span>
      </a>
      <meta itemprop="position" content="1" />
    </li>
    <li
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem"
      class="breadcrumb__item"
    >
      <a itemprop="item" href="/components" class="breadcrumb__link">
        <span itemprop="name">Components</span>
      </a>
      <meta itemprop="position" content="2" />
    </li>
    <li
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem"
      class="breadcrumb__item"
    >
      <span itemprop="name">長いテキストが入ります長いテキストが入ります長いテキストが入ります長いテキストが入ります長いテキストが入ります</span>
      <meta itemprop="position" content="3" />
    </li>
  </ol>
</nav>
```

パンくずリストの実装方法が不明な方は、以下の記事を参考にしてみてください。

::recommend-link
---
items:
  - title: "Bread"
    link: "/components/bread"
    image: "/images/components/bread.jpg"
    description: "パンくずリストは、ページがサイトの階層内のどこに位置しているかを示します。構造化データを含むパンくずリストの作成方法を解説します。"
---
::

### CSS

パンくずリストは横並びになるので、`ol`要素に`display: flex`を設定します。
ここで、`text-overflow: ellipsis`を適用する要素は、最後の`li`要素のテキスト部分(`span`)に適用します。

また、テキストがはみ出さないように、`nav`と最後の`li`要素に`overflow: hidden`を設定します。

```css [CSS]
/* テキストがはみ出さないようにoverflow: hiddenを設定 */
.breadcrumb {
  overflow: hidden;
}

.breadcrumb__list:last-child {
  overflow: hidden;
}

/* 最後のliのテキスト部分(span)にtext-overflow: ellipsisを適用 */
.breadcrumb__list:last-child span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

このようにすることで、`width`などの幅を指定しない場合でも、「...」で省略することができました。

## デモ

最後に、パンくずリストに`text-overflow: ellipsis`を適用して、長いテキストを省略したデモを見てみましょう。

::preview-iframe
---
html: |
  <nav class="breadcrumb" aria-label="breadcrumb">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="breadcrumb__list">
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
        class="breadcrumb__item"
      >
        <a itemprop="item" href="/" class="breadcrumb__link">
          <span itemprop="name">HOME</span>
        </a>
        <meta itemprop="position" content="1" />
      </li>
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
        class="breadcrumb__item"
      >
        <a itemprop="item" href="/components" class="breadcrumb__link">
          <span itemprop="name">Components</span>
        </a>
        <meta itemprop="position" content="2" />
      </li>
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
        class="breadcrumb__item"
      >
        <span itemprop="name">長いテキストが入ります長いテキストが入ります長いテキストが入ります長いテキストが入ります長いテキストが入ります</span>
        <meta itemprop="position" content="3" />
      </li>
    </ol>
  </nav>
css: |
  .breadcrumb {
    overflow: hidden;
  }

  .breadcrumb__list {
    display: flex;
    align-items: center;
    row-gap: 0.5rem;
  }

  .breadcrumb__item {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
  }

  .breadcrumb__item:nth-child(n+2)::before {
    content: '>';
    display: block;
    margin-inline: 1rem;
  }

  .breadcrumb__item:last-child {
    overflow: hidden;
  }

  .breadcrumb__item:last-child span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .breadcrumb__link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: underline;
    color: #000;
  }
active: css
---
::

## まとめ

たまに、実装する際に上手く適用しなくって悩んでしまったので、備忘録として記事を書きました。上手く適用しなくても、devToolsで1つずつ調整していけば原因や解決策が見つかるかと思いますので、ぜひ試してみてください。
