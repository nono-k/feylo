---
title: "JavaScriptの文字列操作を紹介"
description: "JavaScriptの文字列操作を紹介をします。具体的には文字列の長さを取得・空白を削除・位置を調べる・含まれているか調べる・取り出す・置き換える・分割する・大文字・小文字に変換する・指定の長さになるように繰り返すについて紹介します。"
date: 2025-08-14
tags: 
  - "JavaScript"
image: "/images/blog/javascript-strings.jpg"
summaryList:
  - "JavaScriptの文字列操作の紹介"
  - "文字列の長さや含まれているかなどを紹介します。"
---

## はじめに

この記事ではJavaScriptの文字列操作を紹介します。文字列はJavaScriptにおける基本的なデータ型のひとつです。シングルクォート(')、ダブルクォート(")、バッククォート(`)で文字列を囲んで使用します。型はString型になります。

文字列を用いて以下のような操作を行うことができます。

| 内容 | 例 |
| --- | --- |
| 文字列の長さを取得する | "Hello".length |
| 文字列の空白を削除する | " Hello ".trim() |
| 文字列がどの位置にあるか調べる | "Hello".indexOf("l") |
| 文字列が含まれているか調べる | "Hello".includes("l") |
| 文字列を取り出す | "Hello".slice(0, 3) |
| 文字列を別の文字列に置き換える | "Hello".replace("l", "L") |
| 文字列を分割する | "Hello".split(" ") |
| 文字列を大文字・小文字に変換する | "Hello".toUpperCase() |
| 文字列を指定の長さになるように繰り返す | "5".padStart(3, "0") |

それでは、それぞれの操作について紹介していきます！

## 文字列の長さを取得する

::content-list
---
title: "利用シーン"
list: 
  - "入力フォームのバリデーション"
  - "残り文字数を表示する"
---
::

JavaScriptで文字列の長さを取得するには、`length`プロパティを使用します。使い方は次の通りになります。

```js
const str = "Hello";
console.log(str.length); // 5
```

## 文字列の空白を削除する

::content-list
---
title: "利用シーン"
list: 
  - "テキストの整形"
  - "クレジットカード番号、電話番号の入力処理"
---
::

JavaScriptで文字列の空白を削除するには、`trim()`メソッドを使用します。`trim()`メソッドでは、両端に空白がある場合にもその両端の空白を削除できます。取り除かれる空白の対象は、スペースとタブと改行文字です。注意点としては、`trim()`メソッドは、文字列の両端にある空白を削除しますが、<Marker>文字列の途中にある空白</Marker>は削除しないので注意してください。

使い方は次の通りになります。

```js
// 文字列の両端の空白を削除し、途中の空白は削除しない
const str = "  Hello World  ";
console.log(str.trim()); // "Hello World"
```

## 文字列がどの位置にあるか調べる

::content-list
---
title: "利用シーン"
list: 
  - "特定単語がどの位置に含まれているか"
---
::

`indexOf()`メソッドを使用すると、文字列がどの位置にあるか調べることができます。位置は0から始まります。例えば、1文字目は0で、5文字目は4です。文字列が含まれていない場合は、-1が返されます。また、検索対象の文字列が複数含まれている場合は、最初に見つかった位置が返されますし、大文字・小文字を区別します。

使い方は次の通りになります。

```js
// 最初に見つかった「l」の位置を返す
const str = "Hello World";
console.log(str.indexOf("l")); // 2
```

## 文字列が含まれているか調べる

::content-list
---
title: "利用シーン"
list: 
  - "入力文字列に特定キーワードが含まれているか調べる"
  - "URLやコマンドの先頭部分判定"
  - "ファイル拡張子をチェックする"
---
::

JavaScriptで文字列が含まれているかは`includes()`メソッドを使用します。また、先頭に含まれているか・末尾に含まれているかを調べるには、`startsWith()`・`endsWith()`メソッドを使用します。含まれていたら`true`を、含まれていなかったら`false`を返します。こちらも、大文字・小文字を区別します。

| メソッド | 説明 |
| --- | --- |
| includes() | 文字列が含まれているか調べる |
| startsWith() | 文字列が先頭に含まれているか調べる |
| endsWith() | 文字列が末尾に含まれているか調べる |

`includes()`の使い方は次の通りです。

```js
const str = "Hello World";
console.log(str.includes("l")); // true
```

`startsWith()`と`endsWith()`の使い方は次の通りです。

```js
// httpsか調べる
const url = "https://example.com";
console.log(url.startsWith("https://")); // true

// ファイル拡張子をチェックする
const filename = "phote.jpg";
console.log(filename.endsWith(".jpg")); // true
console.log(filename.endsWith(".png")); // false
```

## 文字列を取り出す

::content-list
---
title: "利用シーン"
list: 
  - "特定の文字を取り出す"
  - "ドメインの取得"
  - "拡張子の取得"
---
::

JavaScriptで文字列を範囲指定して取り出すには、`slice()`メソッドを使用します。範囲指定は、開始位置と終了位置を指定します。開始位置は0から始まり、終了位置は1から始まります。開始位置が終了位置よりも大きい場合は、空の文字列が返されます。

使い方は次の通りになります。

```js
const str = "Hello World";
console.log(str.slice(0, 5)); // "Hello"
```

## 文字列を別の文字列に置き換える

::content-list
---
title: "利用シーン"
list: 
  - "ファイル名の変換"
  - "改行文字を削除する"
  - "電話番号からハイフンを削除する"
---
::

JavaScriptで文字列を別の文字列に置き換えるには、`replace()`メソッドを使用します。使い方は次の通りです。

```js
// ファイル名の変換
const filename = "text01.txt";
console.log(filename.replace("text01", "text02")); // "text02.txt"

// 改行文字を削除する
const str = "Hello\nWorld";
console.log(str.replace("\n", "")); // "HelloWorld"
```

注意点として、`replace()`メソッドは、最初に見つかった文字列のみを置き換えます。複数の文字列を置き換えるには、`replaceAll()`メソッドを使用します。

```js
// 電話番号からハイフンを削除する
const phone = "090-1234-5678";
console.log(phone.replaceAll("-", "")); // "09012345678"
```

## 文字列を分割する

::content-list
---
title: "利用シーン"
list: 
  - "URLのハッシュ値を取得する"
  - "文字列を1文字ずつ分割する"
---
::

JavaScriptで文字列を分割するには、`split()`メソッドを使用します。`split()`メソッドを使用すると、区切り文字で文字列を分割し配列で返します。

使い方は次の通りです。

```js
// URLのハッシュ値を取得する
const url = "https://example.com/#hash";
console.log(url.split("#")); // ["https://example.com/", "hash"]
console.log(url.split("#")[1]); // "hash"
```

また、`split()`メソッドの第一引数に空文字列を渡すと、文字列を1文字ずつ分割することができます。文字を1文字ずつアニメーションをしたい時によく使用します。

```js
// 文字列を1文字ずつ分割する
const str = "Hello World";
console.log(str.split("")); // ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"]
```

## 文字列を大文字・小文字に変換する

::content-list
---
title: "利用シーン"
list: 
  - "小文字のアルファベット表記を大文字表記に変更する"
---
::

文字列を大文字に変換するには、`toUpperCase()`メソッドを使用します。小文字に変換するには、`toLowerCase()`メソッドを使用します。使い方は次の通りです。

```js
const str = "Hello World";
console.log(str.toUpperCase()); // "HELLO WORLD"
console.log(str.toLowerCase()); // "hello world"
```

## 文字列を指定の長さになるように繰り返す

::content-list
---
title: "利用シーン"
list: 
  - "10未満の数値を2桁になるように0を付ける"
---
::

`padStart()`、`padEnd()`メソッドを使用すると、文字列を指定の長さになるように繰り返すことができます。

使用例として、10未満の数値を2桁になるように0を付ける例は次の通りです。

```js
const num = 5;
console.log(num.toString().padStart(2, "0")); // "05"
```

こちらは、日付などを0埋めする時に使用するので覚えておきましょう。

## まとめ

JavaScriptの文字列操作を使用例と共に紹介しました。文字列を操作したい場面はよくあるので、ブラウザの開発者ツールで試しながら覚えておきましょう。

## 参考

- [String - MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String)
