---
title: "JavaScriptのnew Dateで日付や時間の扱い方を紹介"
description: "JavaScriptで「今日の日付は何日？」や「何時何分？」などの時間を扱いたいときに使うのがDateオブジェクトです。この記事では、JavaScriptのDateオブジェクトの使い方を紹介します。"
date: 2025-08-28
tags: 
  - "JavaScript"
image: "/images/blog/javascript-new-date.jpg"
summaryList:
  - "JavaScriptのDateオブジェクトの使い方の紹介"
  - "現在の日付や時間を取得する方法"
---

## はじめに

JavaScriptのDateオブジェクトは、日付や時間を扱うためのオブジェクトです。この記事では、初心者の方でも分かりやすいように、JavaScriptのDateオブジェクトの使い方を順番に解説していきます。

## Dateオブジェクトの基本の使い方

JavaScriptで`new Date()`を呼び出すだけで、現在の日時を表すオブジェクトが作成されます。

```js [JavaScript]
const now = new Date();
console.log(now); // 例: Tue Aug 28 2025 00:00:00 GMT+0900 (日本標準時)
```

引数なしで`new Date()`を呼ぶことで、現在の日付が入ったDateオブジェクトが作成されます。
作成したDateオブジェクトから「年」や「月」などの情報を取得することができます。

| メソッド名 | 説明 |
| --- | --- |
| getFullYear() | 西暦を取得する。 |
| getMonth() | 月を取得する。 |
| getDate() | 日を取得する。 |
| getHours() | 時を取得する。 |
| getMinutes() | 分を取得する。 |
| getSeconds() | 秒を取得する。 |
| getDay() | 曜日を取得する。 |

それぞれのメソッドについて詳しく説明します。

### 西暦を取得する

西暦を取得するには、`getFullYear()`メソッドを使います。
西暦なので4桁の数値が返ります。

```js [JavaScript]
const now = new Date();
const year = now.getFullYear();
console.log(year); // 例: 2025
```

### 日付を取得する

月を取得するには、`getMonth()`メソッドを、日を取得するには、`getDate()`メソッドを使います。月を取得する`getMonth()`メソッドは0から始まるので、1を足して月を取得する必要があります。日を取得する`getDate()`メソッドはそのまま日を取得するので加工する必要はありません。

```js [JavaScript]
const now = new Date();
const month = now.getMonth() + 1; // 0から始まるので1を足す
const date = now.getDate();
console.log(month); // 例: 8
console.log(date); // 例: 28
```

### 時刻を取得する

時間を取得するには`getHours()`メソッドを、分を取得するには`getMinutes()`メソッドを使い、秒を取得するには、`getSeconds()`メソッドを使います。

`getHours()`メソッドは、0〜23の整数を返します。`getMinutes()`と`getSeconds()`メソッドは、0〜59の整数を返します。`getHours()`メソッドを使う場合は、24時の場合は0が返ってくるので気をつけましょう。

```js [JavaScript]
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
console.log(hours); // 例: 17
console.log(minutes); // 例: 20
console.log(seconds); // 例: 50
```

### 曜日を取得する

曜日を取得するには、`getDay()`メソッドを使用します。`getDay()`メソッドは、0~6の整数を返します。0は日曜日、1は月曜日、2は火曜日、3は水曜日、4は木曜日、5は金曜日、6は土曜日です。

実際に使用するときには、配列で曜日の文字列を用意して、`getDay()`メソッドの返り値をインデックスとして使用します。日曜日が0になるので、配列は日曜日始まりにしましょう。

```js [JavaScript]
const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
const now = new Date();
const dayOfWeek = daysOfWeek[now.getDay()]; // 例: 4
console.log(dayOfWeek); // 例: 木
```

## ユーザーの環境に合わせて日付と時刻を文字列で表示する

`toLocaleString()`メソッドを使用すると、ユーザーの環境(ロケール=言語や地域設定)に合わせて日付と時刻を文字列で表示することができます。

日本の環境だと、「2025/8/28 17:20:50」のように年月日で表示され、アメリカだと「8/28/2025 5:20:50 PM」のように月日年の順で表示されます。

```js [JavaScript]
const now = new Date();
console.log(now.toLocaleString("ja-JP")); // 例: 2025/8/28 17:20:50
console.log(now.toLocaleString("en-US")); // 例: 8/28/2025 5:20:50 PM
```

引数に`ja-JP`のようにロケールを指定すると、その国の形式で表示されます。

`toLocaleDateString()`メソッドを使用すると、日付だけを表示することができ、`toLocaleTimeString()`メソッドを使用すると、時刻だけを表示することができます。

```js [JavaScript]
const now = new Date();
console.log(now.toLocaleDateString()); // 例: 2025/8/28
console.log(now.toLocaleTimeString()); // 例: 17:20:50
```

## Dateオブジェクトの応用例

`Date`オブジェクトの基本の使い方を見てきたので、ここからは応用の使い方を紹介します。

### 日付と時刻の差分を計算する

比較したい日付と時間を`Date`オブジェクトに変換してから、`getTime()`メソッドを使用してミリ秒を取得します。このミリ秒を引き算することで、日付と時刻の差分を計算することができます。

日数として知りたい場合は、`24 * 60 * 60 * 1000`で差分を除算します。

```js [JavaScript]
const date1 = new Date('2025/8/1');
const date2 = new Date('2025/8/28');
const diff = date2.getTime() - date1.getTime();
const diffDay = diff / (24 * 60 * 60 * 1000);
console.log(`${diffDay}日の差があります`); // 28日の差があります
```

時間として知りたい場合は、`60 * 60 * 1000`で差分を除算します。

```js [JavaScript]
const date1 = new Date('2025/8/28 07:00:00');
const date2 = new Date('2025/8/28 10:00:00');
const diff = date2.getTime() - date1.getTime();
const diffHour = diff / (60 * 60 * 1000);
console.log(`${diffHour}時間の差があります`); // 3時間の差があります
```

分として知りたい場合は、`60 * 1000`で差分を除算します。

```js [JavaScript]
const date1 = new Date('2025/8/28 10:00:00');
const date2 = new Date('2025/8/28 10:30:00');
const diff = date2.getTime() - date1.getTime();
const diffMinute = diff / (60 * 1000);
console.log(`${diffMinute}分の差があります`); // 30分の差があります
```

## まとめ

JavaScriptでDateオブジェクトを使用した、日付や時間の扱い方を紹介しました。
Dateオブジェクトは、よく使用するのでいろいろ試しながら覚えていきましょう！

## 参考

- [Date() コンストラクター - MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)