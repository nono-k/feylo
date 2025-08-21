---
title: "JavaScriptのオブジェクト操作を紹介"
description: "JavaScriptのオブジェクト操作を紹介をします。JavaScriptにおけるオブジェクトの基本から解説します！"
date: 2025-08-21
tags: 
  - "JavaScript"
image: "/images/blog/javascript-object.jpg"
summaryList:
  - "JavaScriptのオブジェクト操作の紹介"
  - "オブジェクトの基本から応用まで紹介"
---

## はじめに

この記事ではJavaScriptにおけるオブジェクトの基本から解説します。配列や関数もオブジェクトとして扱われるため、基本を押さえておくとコードの理解が一気に進みます。

オブジェクトの基本操作から応用的なテクニックまでを、サンプルコード多めで解説します。

## JavaScriptにおけるオブジェクトの基本

オブジェクトはJavaScriptにおける基本的なデータ型のひとつです。複数のプロパティを持つことが可能で、オブジェクトのプロパティはキーと値のペアで表現されます。

例えば、次のコードは3つのプロパティを持ちます。

```js [JavaScript]
const person = {
  name: "John",
  age: 30,
  city: "New York"
};
```

ここで各プロパティ、キー、値は次のようになります。

- プロパティ: name: "John", age: 30, city: "New York"
- キー: name, age, city
- 値: "John", 30, "New York"

また、値として格納できるデータ型に制限はありません。配列、関数、オブジェクトも格納できます。

```js [JavaScript]
const person = {
  name: "John",
  hobbies: ["reading", "swimming"],
  address: { street: "123 Main St", city: "New York" },
  greet: function() {
    console.log("Hello!");
  }
};
```

## オブジェクトの定義と値の取得、更新をする

続いては、オブジェクトの定義と値の取得、更新をする方法を解説します。

オブジェクトを定義するには、`{}`(波括弧)で囲み、オブジェクトに格納したいデータを指定します。値の取得には、「ドット記法」と「ブラケット記法」が利用できます。更新するには、取得と同様にして代入することで更新できます。

```js [JavaScript]
// オブジェクトの定義
const user = { name: "John", age: 30 };

// ドット記法
console.log(user.name); // "John"

// ブラケット記法
console.log(user["age"]); // 30

// 値の更新
user.age = 31;
user["name"] = "Bob";

console.log(user); // { name: "Bob", age: 31 }
```

存在しないプロパティを取得しようとすると、`undefined`が返されます。

オブジェクトの値の型は任意なので、配列やオブジェクトを格納するなど多階層に定義できます。多階層の場合でも、ドット記法やブラケット記法でアクセスできます。

```js [JavaScript]
const data = {
  list: [
    { id: 1, name: "John" },
    { id: 2, name: "Bob" }
  ]
};

//値の取得
console.log(data.list[0].name); // "John"
console.log(data.list[1].name); // "Bob"
```

## オブジェクトのループ処理

続いてはオブジェクトの応用的なテクニックとしてループ処理を紹介します。

| メソッド | 説明 |
| --- | --- |
| `for...in` | オブジェクトのプロパティをループ処理する |
| `Object.keys()` | オブジェクトのキーを配列で取得する |
| `Object.values()` | オブジェクトの値を配列で取得する |
| `Object.entries()` | オブジェクトのキーと値のペアを配列で取得する |

上記のメソッドを使用することで、オブジェクトの中身をすべて取り出すことができます。それでは、それぞれ説明します。

### for ... in

`for ... in`はオブジェクトのプロパティをループ処理するための構文です。オブジェクトのプロパティ名を順番に取得し、そのプロパティ名を変数に代入して処理を行います。

```js [JavaScript]
const user = { name: "John", age: 30 };

for (const key in user) {
  console.log(key, user[key]); // name John, age 30
}
```

### Object.keys()

`Object.keys()`はオブジェクトのキーを配列で取得するためのメソッドです。オブジェクトのキーを配列に変換して、その配列を返します。

```js [JavaScript]
const user = { name: "John", age: 30 };

const keys = Object.keys(user);
console.log(keys); // ["name", "age"]
```

### Object.values()

`Object.values()`はオブジェクトの値を配列で取得するためのメソッドです。オブジェクトの値を配列に変換して、その配列を返します。

```js [JavaScript]
const user = { name: "John", age: 30 };

const values = Object.values(user);
console.log(values); // ["John", 30]
```

### Object.entries()

`Object.entries()`はオブジェクトのキーと値のペアを配列で取得するためのメソッドです。オブジェクトのキーと値のペアを配列に変換して、その配列を返します。

```js [JavaScript]
const user = { name: "John", age: 30 };

const entries = Object.entries(user);
console.log(entries); // [["name", "John"], ["age", 30]]
```

## 分割代入

分割代入は、<Marker>配列やオブジェクトから値を取り出して変数にまとめて代入できる構文</Marker>です。コードをスッキリ書けるので、現代のJavaScriptではよく使用されます。

### オブジェクトの分割代入

オブジェクトの分割代入を行うには、変数名をプロパティ名と一致させる必要があり、`{}`で囲います。分割代入を使わない場合と分割代入を使った場合の違いを比較してみましょう。

```js [JavaScript]
const user = { name: "John", age: 30 };

//分割代入を使わない場合
const name = user.name;
const age = user.age;

//分割代入を使った場合
const { name, age } = user;
```

上記のコード例のように分割代入を使うと、ドット記法でアクセスする必要がなくなり簡潔に書くことができます。

### 変数名を変更する

通常、分割代入を行うには変数名をプロパティ名と一致させる必要があります。しかし、コロン(:)を使うことで変数名を別の名前にすることができます。

```js [JavaScript]
const user = { name: "John", age: 30 };

const { name: userName, age: userAge } = user;
console.log(userName, userAge); // John 30
```

### デフォルト値を設定する

通常、オブジェクトに存在しないプロパティを分割代入する場合、`undefined`になります。しかし、デフォルト値を設定することで、そのような場合でもエラーを回避することができます。

```js [JavaScript]
const user = { name: "John" };

const { name: userName, gender = "male" } = user;
console.log(userName); // John
console.log(gender); // male(プロパティがないのでデフォルトが使われる)
```

### ネストしたオブジェクトの分割代入

入れ子構造のオブジェクトでも同様に分割代入で値を取り出すことができます。

```js [JavaScript]
const user = {
  name: "John",
  age: 30,
  address: {
    city: "Tokyo",
    country: "Japan",
  },
};

const { address: { city, country } } = user;
console.log(city, country); // Tokyo Japan
```

## まとめ

JavaScriptにおけるオブジェクトについて解説しました。Web制作においてもAPIからのデータを扱う際に、オブジェクト操作の知識は必須になりますので、ぜひ手を動かして学んでください。

## 参考

- [Object - MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object)

