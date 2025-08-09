---
title: "JavaScriptのMathオブジェクトの紹介【四捨五入、切り上げ、切り捨て、ランダム、数学的な計算】"
description: "JavaScriptの組み込み関数の1つのMathオブジェクトの紹介をします。Mathオブジェクトは様々な種類がありますが、この記事では四捨五入、切り上げ、切り捨て、ランダム、数学的な計算について紹介します。"
date: 2025-08-10
tags: 
  - "JavaScript"
image: "/images/blog/javascript-math-object.jpg"
summaryList:
  - "JavaScriptのMathオブジェクトの紹介"
  - "JavaScriptで四捨五入、切り上げ、切り捨て、ランダム、数学的な計算をする方法"
---

## はじめに

JavaScriptの組み込み関数の1つの<ColorText color="var(--blue)">Mathオブジェクト</ColorText>の紹介をします。Mathオブジェクトを使用することで、JavaScriptで数値計算を行うことができます。この記事では、四捨五入、切り上げ、切り捨て、ランダム、数学的な計算について紹介します。

## JavaScriptで四捨五入、切り上げ、切り捨てを行う

::content-list
---
title: "利用シーン"
list: 
  - "価格の計算時の表記"
  - "ページネーションのページ数"
  - "時間(分や秒)の切り捨て"
---
::

四捨五入や切り捨てには、`Math.round()`,`Math.floor()`,`Math.ceil()`,`Math.trunc()`メソッドを使用します。各メソッドの意味は下記のようになります。

| メソッド | 説明 |
| --- | --- |
| Math.round() | 数値を四捨五入する |
| Math.floor() | 数値を切り捨てる |
| Math.ceil() | 数値を切り上げる |
| Math.trunc() | 数値の整数部分を返す |

### Math.round()

`Math.round()`メソッドは、数値を四捨五入します。挙動としては、以下のようになります。

- 少数点部分が0.5以上の場合は、次の整数に切り上げ
- 少数点部分が0.5以上の場合は、次の整数に切り上げ
- 少数点部分が0.5未満の場合は、前の整数に切り下げ

```js [JavaScript]
Math.round(4.24); // 4
Math.round(4.5); // 5
Math.round(4.74); // 5
```

### Math.floor()、Math.ceil()

`Math.floor()`,`Math.ceil()`メソッドの挙動は以下のようになります。

- `Math.floor()`メソッドは、数値以下の最大の整数を返す
- `Math.ceil()`メソッドは、数値以上の最小の整数を返す

```js [JavaScript]
Math.floor(4.24); // 4
Math.ceil(4.24); // 5

Math.floor(4.74); // 4
Math.ceil(4.74); // 5
```

負の数値の場合は、以下のようになります。

```js [JavaScript]
Math.floor(-4.24); // -5
Math.ceil(-4.24); // -4
```

### Math.trunc()

`Math.trunc()`メソッドは、値の正負にかかわらず数値の整数部分を返します。

```js [JavaScript]
Math.trunc(4.24); // 4
Math.trunc(-4.24); // -4
```

## JavaScriptでランダムを扱う

::content-list
---
title: "利用シーン"
list: 
  - "ランダムな記事の選択"
  - "アニメーションでランダムな効果を付与したい時"
---
::

`Math.random()`メソッドを使うことで、0から1の間のランダムな小数を生成することができます。`Math.random()`メソッドを使うことで、このブログの下にあるランダム記事のように、すでにある記事からランダムに表示することができるようになります。

```js [JavaScript]
Math.random(); // 0以上1未満のランダムな小数
```

### ランダムの値の範囲を指定したい

通常は0から1の間のランダムな小数値を生成しますが、値の範囲を指定したい場合は、`Math.floor()`などを用いて次のようにします。

```js [JavaScript]
Math.floor(Math.random() * 100); // 0以上100未満の間のランダムな整数
10 + Math.floor(Math.random() * 10); // 10以上20未満の間のランダムな整数
```

ランダムの値の範囲を指定したい場合はよくあるので、覚えておくと便利です。

## JavaScriptで数学的な計算を行う

::content-list
---
title: "利用シーン"
list: 
  - "数値の絶対値を扱いたい時"
  - "数値のべき乗を扱いたい時"
---
::

Mathオブジェクトには数学的な計算メソッドが用意されています。それぞれ例としては以下になります。

| メソッド | 説明 |
| --- | --- |
| Math.abs() | 数値の絶対値を計算する |
| Math.pow() | 数値のべき乗を計算する |
| Math.sign() | 数値の符号を返す |
| Math.sqrt() | 数値の平方根を計算する |
| Math.log() | 数値の自然対数を計算する |
| Math.exp() | 数値の指数関数を計算する |

これらの例の使い方としては次の通りになります。

```js [JavaScript]
Math.abs(-4); // -4の絶対値。4
Math.pow(2, 3); // 2の3乗。8
Math.sign(4); // 4が正なので1
Math.sign(-4); // -4が負なので-1
Math.sqrt(4); // 4の平方根。2
Math.log(Math.E); // eの自然対数。1
Math.log2(8); // 2の3乗なので3
Math.exp(1); // eの1乗。2.718281828459045
```

## まとめ

JavaScriptのMathオブジェクトとして、四捨五入、切り上げ、切り捨て、ランダム、数学的な計算について紹介しました。ブラウザの開発者ツールでも簡単に試すことができるので、ぜひ試してみてください。

## 参考

- [Math - MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math)