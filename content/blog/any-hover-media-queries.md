---
title: "CSSでhoverを実装するならany-hoverメディアクエリを使おう"
description: "Web制作でCSSでhoverを実装する上での最適解を紹介します！また、SCSSのmixinを使って楽に記述する方法も紹介します。"
date: 2025-07-14
tags: 
  - "CSS"
image: "/images/blog/any-hover-media-queries.jpg"
summaryList:
  - "hover / any-hoverメディアクエリについて"
  - "従来のメディアクエリを使用したhoverの実装の問題点"
  - "SCSSSのmixinを使ってhoverを実装する方法"
---

## はじめに

Web制作でCSSでhoverを実装することはよくあります。単純に`:hover`を使用してホバーのアニメーションは付けられますが、モバイル端末でもホバーアニメーションが動いてしまうなど、ユーザビリティが悪くなってしまいます。

そこで、この問題を解決するhover / any-hoverメディアクエリを紹介します！

## hover / any-hoverメディアクエリとは

hover / any-hoverメディアクエリは、ユーザーの入力デバイスが「ホバー操作」に対応しているかどうかを判定するメディアクエリです。

それぞれの仕様の違いと判定の仕組みは下記の通りです。

| メディアクエリ | 判定対象 | 例(タッチ+マウス) |
| ----------- | ------- | ------------------- |
| `hover: hover` | 主入力デバイスのみ | 主がタッチならfalse |
| `any-hover: hover` | どれか一つでもOK | マウスがあればtrue |

`hover`は主な入力デバイスがホバー操作に対応している場合に適用します。
`any-hover`は入力デバイスのどれか一つでもホバー操作に対応していれば適用します。

基本的には、`any-hover`を利用したほうが、カバー範囲が広いので`any-hover`を使用するようにしています。

### hover / any-hoverメディアクエリを使用したhoverの実装

hover / any-hoverメディアクエリを使用したhoverの実装例は下記の通りです。

```css
/* hoverメディアクエリを使用したhoverの実装例 */
@media (hover: hover) {
  .link:hover {
    color: #000;
  }
}

/* any-hoverメディアクエリを使用したhoverの実装例 */
@media (any-hover: hover) {
  .link:hover {
    color: #000;
  }
}
```

## 従来のメディアクエリを使用したhoverの実装の問題点

従来のメディアクエリを使用したhoverの実装の問題点について見ていきます。
PCとモバイルでのホバーアニメーションの分岐のやり方で、下記のように紹介されていることがあるかと思います。

```css [NG 🙅‍♂️]
@media (max-width: 767px) {
  .link:hover {
    color: #000;
  }
}
```

この実装ですと、iPhoneなどのモバイル端末だとホバーアニメーションは動かないのでよいのですが、PCで767px以下の場合にマウス操作なのにホバーアニメーションが動かないという問題があります。

以上の理由より、ホバーアニメーションを実装する場合は、`any-hover`を使用するようにしましょう。

## SCSSのmixinを使ってhoverを実装する方法

最後に通常のCSSでメディアクエリを書くのは大変なので、SCSSのmixinを使ってhoverを実装する方法を紹介します。

mixin.scssのようなファイルを作成して、mixinを書いていきます。

```scss [mixin.scss]
@mixin hover {
  @media (any-hover: hover) {
    &:hover {
      @content;
    }
  }
}
```

これで、`@include mixin.hover`とすることで、`any-hover`を使用したhoverの実装ができます。
以下はリンクのカラーをホバーで黒色に変更する例です。

```scss [SCSS]
.link {
  color: #fff;
  transition-property: color;
  transition-duration: 0.3s;

  @include mixin.hover {
    color: #000;
  }
}
```

これをCSSにコンパイルすると、下記のようになります。

```css [CSS]
.link {
  color: #fff;
  transition-property: color;
  transition-duration: 0.3s;
}

@media (any-hover: hover) {
  .link:hover {
    color: #000;
  }
}
```

SCSSを使っているかたは、ぜひmixinを使用して楽にhoverを実装してみてください！

## 参考

- [Media Queries Level 4 - 7.2 Hover Capability](https://www.w3.org/TR/mediaqueries-4/#hover)