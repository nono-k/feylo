---
title: "Bread"
description: "パンくずリストは、ページがサイトの階層内のどこに位置しているかを示します。構造化データを含むパンくずリストの作成方法を解説します。"
image: "/images/components/bread.jpg"
---

## パンくずリストとは？

Webサイトで、ページが「今どこにいるか」を示してくれるナビゲーションを<Marker>パンくずリスト</Marker>と呼びます。名前の由来は、童話「ヘンゼルとグレーテル」で森に落とした「パンくず」から取られています。ユーザーが迷わず戻れる道しるべという意味で、Webサイトでも同じ役割を果たします。

```bash [パンくずリストの例]
ホーム > カテゴリ > サブカテゴリ > ページ名
```

パンくずリストの利点は、ユーザーにとっては<Marker>サイト内での位置が分かりやすい</Marker>ことと、SEOにとっては、Google検索結果に表示される可能性があがり、<Marker>クリック率アップにつながる</Marker>ことができます。

![パンくずリストがGoogle検索結果に表示される可能性がある](https://res.cloudinary.com/dy8ftemi0/image/upload/v1756023524/bread-01_dzybpv.jpg)

## HTMLでのパンくずリストの実装

パンくずリストは`<nav>`タグ+`<ol>`タグで実装します。SEOに対応するために、検索結果にパンくずが出るようにするには、構造化データを追加します。

```html
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
      <span itemprop="name">記事タイトル</span>
      <meta itemprop="position" content="3" />
    </li>
  </ol>
</nav>
```

SEOに対応するために追加した構造化データを含めて解説します。

### nav

`nav`タグを使用することで、ナビゲーション領域であることを示します。
`aria-label="breadcrumb"`属性を追加することで、スクリーンリーダ向けの名前を指定しています。

### ol

通常、パンくずリストは順序があるので`ol`タグで実装しています。
`itemtype`に`https://schema.org/BreadcrumbList`を指定することで、検索エンジンにパンくずリストであることを伝えることができます。

### li

パンくずリストはリストになるので`li`タグで実装します。
`itemprop="itemListElement"`と`itemtype="https://schema.org/ListItem"`を指定することで、検索エンジンにパンくずリストの項目であることを伝えることができます。

### a

`<a>`タグはパンくずリストのリンクを表します。
`itemprop="item"`を指定することで、パンくずリストのリンク先であることを伝えることができます。

### span

`<span>`タグはパンくずリストのテキストを表します。
`itemprop="name"`を指定することで、ユーザーに見せるテキストを伝えることができます。

### meta

`<meta itemprop="position" content="1">`とすることで、パンくずリストの順番を伝えることができます。`content`には1,2,3...と連番で指定してください。

## パンくずリストの実装デモ

最後にCSSで見た目を整理したデモをお見せします。このサイトのパンくずリストのように、区切りには「＞」の文字をCSSの擬似要素で配置します。

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
        <span itemprop="name">記事タイトル</span>
        <meta itemprop="position" content="3" />
      </li>
    </ol>
  </nav>
css: |
  .breadcrumb__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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

パンくずリストの2個目以上のリストの左側に「＞」が配置するようにするので、`.breadcrumb__item`に`nth-child(n+2)`を適用して擬似要素として「＞」を配置します。

## パンくずリストのテキストが長い場合

パンくずリストのテキストが長い場合は、折り返すか「...」で省略するかをしましょう。
`text-overflow: ellipsis`を使用して、長いテキストを省略する方法を下記の記事を参照してください。

::recommend-link
---
items:
  - title: "パンくずリストで長いテキストを「...」で省略する方法"
    link: "/blog/bread-text-overflow-ellipsis"
    image: "/images/blog/no-image-sky-blue.jpg"
    description: "前回の記事で、CSSのtext-overflow: ellipsisを使って長いテキストを省略する方法を紹介しました。しかし、パンくずリストで使用する場合にハマりポイントがあるので今回はパンくずリストにも正しく適用されるようにする方法を解説します。"
---
::

## 参考サイト

- [パンくずリスト（BreadcrumbList）の構造化データ - Google for Developers](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb?hl=ja)