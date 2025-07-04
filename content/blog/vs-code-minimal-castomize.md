---
title: "VSCodeをカスタマイズして自分好みの環境でコードを書こう！【ミニマリスト必見】"
description: "デフォルトのVSCodeの設定だと、アイコンなどの無駄な領域が多く、エディター部分の領域が狭いと感じます。この記事では、VSCodeをカスタマイズして見た目をすっきりさせ、コードに集中できる環境の作り方を解説します。"
date: 2025-07-03
tags: 
  - "VSCode"
image: "/images/blog/vs-code-minimal-castomize.jpg"
summaryList:
  - "VSCodeのカスタマイズ方法"
  - "私のVSCodeの設定の紹介"
---

## はじめに

VSCodeは、多くのプログラマーや開発者に使用されているエディターです。エディターはプログラマーにとって1日の中で最も多く使っているツールでしょう。エディターの見た目を自分好みにカスタマイズすることで、コードに集中できる環境を作ることができるでしょう。

そこでこの記事では、VSCodeの見た目をシンプルにカスタマイズする方法を私のVSCodeの設定を元に解説します！VSCodeの見た目は下記画像の通りとなります。

![私のVSCode](https://res.cloudinary.com/dy8ftemi0/image/upload/v1751347124/vs-code-minimal-castomize-01_jprvga.jpg)

## VSCodeのカスタマイズ方法

VSCodeでは、`settings.json`に設定を書き込むことで、例えば以下のように自分好みにカスタマイズすることができます。

::content-list
---
title: "カスタマイズの例"
list:
  - フォントやサイズ、行間などのフォント関連の設定
  - サイドバーの表示・非表示の設定
  - アイコン類の設定 
backgroundColor: var(--sky-blue)
---
::

### settings.jsonの開き方

`settings.json`の開き方はいろいろありますが、ここではVSCodeのコマンドパレットから開く方法を紹介します。

1. <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>を押してコマンドパレットを開きます。

2. コマンドパレットに`settings`と入力して、「基本設定：ユーザー設定を開く（JSON）」を選択します。

![settings.jsonを開く](https://res.cloudinary.com/dy8ftemi0/image/upload/v1751352595/vs-code-minimal-castomize-02_zhgwnd.jpg)

それでは、私のVSCodeの設定を例に、カスタマイズの方法を紹介していきます！

## カスタマイズの例

ここでは、私のVSCodeの設定を例に、紹介していきますので参考にしてみてください。

### 配色テーマ

VSCodeのテーマはたくさんありますが、有名なものは使ってみてどれもしっくりこなかったのですが、この「Night Shift」は配色が美しくコードも見やすいので気に入ってます。

https://marketplace.visualstudio.com/items?itemName=jean.desaturated

### ファイルアイコンテーマ

ファイルアイコンはしっくりくるものがなく、妥協して「vscode-seedling-icon-theme-plus」を使っています。なるべく、インデントがなく、アイコンが小さいのが好みです。なので、インデントも最小の「4」を選択しています。
```json
"workbench.iconTheme": "vscode-seedling-icon-theme-plus",
"workbench.tree.indent": 4
```

### フォント関連の設定

#### フォント

エディターのフォントには「Fira Code」を使用しています。このフォントはリガチャにも対応しているので、コードを書くときにとても見やすいです。

```json
"editor.fontFamily": "Fira Code",
"editor.fontLigatures": true // リガチャを有効にする
```

#### フォントサイズと行間、文字間

フォントサイズや行間などが小さく狭いとエディターで見える範囲が広くなります。自分はこの環境が好きなので、なるべく小さくしてます。参考までに`settings.json`には以下のように設定しています。

```json
"editor.fontSize": 13, // フォントサイズ
"editor.lineHeight": 1.3, // 行間
"editor.letterSpacing": -0.8, // 文字間
```

### 必要ない領域の非表示

#### アクティビティバーの移動

デフォルトだと画面の左側にアイコンが並んでいる領域をアクティビティバーと呼びます。アイコンなどが大きくて邪魔だと感じるので上側に移動させましょう。もっとも、マウスでクリックして移動するのも面倒なので基本的にはショートカットで切り替えられるようにしておきましょう。

```json
"workbench.activityBar.location": "top"
```

![アクティビティバーを上に移動](https://res.cloudinary.com/dy8ftemi0/image/upload/v1751357033/vs-code-minimal-castomize-03_m0pw56.jpg)

#### ミニマップの非表示

エディターの右側にあるミニマップは特に見ることもないので非表示にしましょう。

```json
"editor.minimap.enabled": false
```

#### ブレークポイントの領域の削除

行番号が表示される左側に、ブレークポイント用に使用される領域があります。しかし、デバックを実行しない限り、この領域は邪魔になるので非表示にしておきましょう。

```json
"editor.glyphMargin": false
```

## まとめ

ミニマルで使えるVSCodeのカスタマイズ方法を自分の環境を元に紹介しました！
みなさんもぜひ自分好みのVSCodeの環境を作ってみてください！