---
title: "CSSで長いテキストを「...」で省略できるtext-overflow: ellipsisの紹介"
description: "JavaScriptで「今日の日付は何日？」や「何時何分？」などの時間を扱いたいときに使うのがDateオブジェクトです。この記事では、JavaScriptのDateオブジェクトの使い方を紹介します。"
date: 2025-08-27
tags: 
  - "CSS"
image: "/images/blog/css-text-overflow-ellipsis.jpg"
summaryList:
  - "CSSで長いテキストを「...」で省略する方法"
  - "text-overflow: ellipsisの利用シーンを紹介"
---

## はじめに

Webサイトをコーディングする際に、CMSなどで動的にコンテンツを表示する場面は多々あるかと思います。その際に、長いテキストの場合にテキスト行が多くなりデザインが崩れてしまう場合がよくあります。

この記事では、CSSの`text-overflow: ellipsis`を使って長いテキストを省略する方法を紹介します。

## 長いテキストを省略する方法

`text-overflow: ellipsis`を使用して長いテキストを省略するための基本のCSSは次のようになります。

```css
.ellipsis {
  white-space: nowrap; // テキストを折り返さない
  overflow: hidden; // はみ出した部分を非表示
  text-overflow: ellipsis; // はみ出した部分を「...」で表示
}
```

- `white-space: nowrap;`：テキストを折り返さないようにするため設定します。
- `overflow: hidden;`：はみ出した部分を非表示にします。
- `text-overflow: ellipsis;`：はみ出した部分を「...」で表示します。

### 「...」が表示されない場合のハマりポイント

`text-overflow: ellipsis`を指定していても、「...」で省略されない場合は、次の点を確認してみてください。

1. `width`などで幅が指定されてない
コンテンツの幅が決まってないと、<Marker>はみ出す状態</Marker>にならないので、幅を指定してみてください。
2. `white-space: nowrap;`が指定されていない
折り返されてしまうと、省略記号ではなく2行になるので忘れないようにしてください。
3. インライン要素では効かない
`span`などのインライン要素のままだと効かないことがあります。`inline-block`か`block`を指定しましょう。

### 1行の場合のデモ

次はテキストが1行の場合のデモになります。
テキストが長い場合に「...」で省略されるのが確認できるかと思います。

::preview-iframe
---
html: |
  <div class="flex center">
    <div class="box">
      <div class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nisl nisl aliquet nisl, eget aliquam nisl nisl eget aliquam.</div>
    </div>
  </div>
css: |  
  .text {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .box {
    padding: 1rem;
    border: 1px solid #ccc;
  }
active: css
---
::

## 複数行で省略する方法

`text-overflow: ellipsis`のみの指定だと、1行のみの省略になります。複数行に対応したい場合は、次のように記載しましょう。

```css
.multiline-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2; // 2行の場合
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

複数行で省略したい場合は、`-webkit-line-clamp`を指定しましょう。この数値で省略する行数を指定できます。また、`display: -webkit-box`と`-webkit-box-orient: vertical;`を指定する必要があります。

複数行になるので、`white-space: nowrap;`は指定しなくても大丈夫です！

## 2行で省略するデモ

テキストが2行で省略されるデモになります。

::preview-iframe
---
html: |
  <div class="flex center">
    <div class="box">
      <div class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nisl nisl aliquet nisl, eget aliquam nisl nisl eget aliquam.</div>
    </div>
  </div>
css: |  
  .text {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .box {
    padding: 1rem;
    border: 1px solid #ccc;
  }
active: css
---
::

## 実際の利用シーン

`text-overflow: ellipsis`を使用した、利用シーンは次のようになるでしょう。

::content-list
---
title: "利用シーン"
list: 
  - "記事一覧のカードのタイトルや説明文"
  - "商品名やレビュー"
  - "パンくずリストのテキスト"
---
::

## まとめ

CSSの`text-overflow: ellipsis`を使用して、テキストが長くなりすぎた場合に、省略記号「...」を表示する方法を紹介しました。

「テキストが長くて、デザイン通りにならない」ときに、ぜひ活用してみてください！

## 参考

- [text-overflow - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/text-overflow)