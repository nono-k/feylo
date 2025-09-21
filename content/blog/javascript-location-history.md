---
title: "JavaScriptでページ遷移や履歴操作の方法を紹介！locationとhistoryの使い方"
description: "JavaScriptでのブラウザ操作について紹介します。ブラウザ操作の中でもlocationとhistoryの使い方を説明し、ページ遷移や履歴操作の方法を紹介します。"
date: 2025-09-22
tags: 
  - "JavaScript"
image: "/images/blog/javascript-location-history.jpg"
summaryList:
  - "JavaScriptのlocationとhistoryの説明"
---

## はじめに

Web開発では「ページ遷移」や「履歴操作」を扱う場面がよくあるかと思います。これらの操作はJavaScriptの`location`オブジェクトと`history`オブジェクトを使うことで簡単に行うことができます。この記事では、これらの基本的な使い方を紹介します。

## URLを取得・ページを遷移する

::content-list
---
title: "利用シーン"
list: 
  - "現在のURLを取得する"
  - "aタグ以外の方法でページ遷移したいとき"
---
::

`location.href`プロパティを使用すると、現在のURLを取得することができます。また、このプロパティに新しいURLを設定することで、ページを遷移することができます。このプロパティは読み取りも書き込みの両方に対応しています。

```js [JavaScript]
// 読み取りの場合
console.log(location.href); // 現在のURLを取得

// 書き込みの場合
location.href = "https://example.com"; // 別のページに遷移する
```
## ページをリロードする

::content-list
---
title: "利用シーン"
list: 
  - "更新があるページで再読み込みしたいとき"
---
::

現在のウェブページをリロード（再読み込み）するには`location.reload()`メソッドを実行します。このメソッドを呼び出すと、その瞬間にリロードします。これはブラウザのリロードボタンを押したときと同じ挙動になります。

```js [JavaScript]
// ページをリロードする
location.reload();
```

## 履歴操作を行う

::content-list
---
title: "利用シーン"
list: 
  - "ブラウザの戻る・進むボタンと同じ挙動をさせたいとき"
---
::

ブラウザの「戻る・進む」をJavaScriptで操作したいときには、`history`オブジェクトを使用します。`history.back()`は履歴をひとつ戻すメソッドで、`history.forward()`は履歴をひとつ進めるメソッドです。

```js [JavaScript]
// 1つ前のページに戻る
history.back();

// 1つ進む
history.forward();
```

履歴を任意の位置まで操作するには、`history.go()`メソッドを使用します。引数には進みたい数を指定します。前のページに戻るには負の数を、次のページに進むには正の数を指定します。

```js [JavaScript]
// 任意の位置に移動(-1で1つ前のページに戻る、1で1つ進む)
history.go(-1);
```

## ハッシュ値を取得・設定を行う

::content-list
---
title: "利用シーン"
list: 
  - "JavaScriptでページ内リンクの挙動を実現させたいとき"
  - "ハッシュに状態を保持したいとき"
---
::

URLの#(ハッシュ)の値を扱うには`location.hash`プロパティを使用します。このプロパティは読み取りと書き込みの両方に対応しています。

```js [JavaScript]
// 読み取りの場合
const hash = location.hash;
console.log(hash); // 例：#section1

// ハッシュを変更するとidの位置に自動でスクロール
location.hash = "#section1";
```

`location.hash`に新しいハッシュ値を設定すると、対象のid値が付いた要素を確認し、その要素に自動でスクロールします。これにより、ページ内リンクの挙動を実現することができます。

### ハッシュの変更を検知する

最後に、URLのハッシュが変更されたときに処理をする方法を紹介します。
URLの#(ハッシュ)が変更されたときに処理をしたい時は、windowオブジェクトの`hashchange`イベントを利用します。#(ハッシュ)が変化するタイミングの例としては次のタイミングがあります。

- ページ内のリンクをクリックしたとき
- ブラウザの戻る・進むボタンを押したとき
- ユーザーがURLのハッシュを書き換えたとき

コードの例としては次のようになります。

```js [JavaScript]
// ハッシュの変更を監視
window.addEventListener("hashchange", () => {
  console.log("ハッシュが変更されました", location.hash);
});
```

このように`hashchange`イベントを使うと、ハッシュの変化に応じて画面表示を切り替えたりできます。

## まとめ

この記事では、JavaScriptの`location`オブジェクトと`history`オブジェクトを使うことでページ遷移や履歴操作の方法などを紹介しました。

`location`と`history`を使いこなすと、ページ遷移やスクロール管理、履歴操作が簡単に実現できます。SPAや動的ページを作る上で非常に便利な機能なので、ぜひ覚えておきましょう！
