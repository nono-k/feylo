---
title: "JavaScriptの配列操作を紹介"
description: "JavaScriptの配列操作を紹介をします。具体的には配列の長さや検索などの基本的な操作を紹介します。"
date: 2025-08-19
tags: 
  - "JavaScript"
image: "/images/blog/javascript-array.jpg"
summaryList:
  - "JavaScriptの配列操作の紹介"
  - "利用シーンと共に紹介します。"
---

## はじめに

この記事ではJavaScriptの配列操作を紹介します。配列はJavaScriptにおける基本的なデータ型のひとつで、複数のデータを扱うことができます。型はArray型になります。配列を定義するには、[]で囲みます。

配列を用いて以下のような操作を行うことができます。

| 内容 | 例 |
| --- | --- |
| 配列の長さを取得する | `["バナナ", "リンゴ", "もも"].length` |
| 配列のループ処理 | `["バナナ", "リンゴ", "もも"].forEach((fruit) => console.log(fruit));` |
| 配列の要素を追加する | `["バナナ", "リンゴ", "もも"].push("いちご");` |
| 配列の要素を削除する | `["バナナ", "リンゴ", "もも"].pop();` |
| 配列の要素を置き換える | `["バナナ", "リンゴ", "もも"].splice(1, 1, "いちご");` |
| 複数の配列を一つに結合する | `["バナナ", "リンゴ", "もも"].concat(["いちご", "みかん"]);` |
| 配列の要素を結合する | `["バナナ", "リンゴ", "もも"].join(" / ");` |
| 配列の要素を検索する | `["バナナ", "リンゴ", "もも"].indexOf("リンゴ");` |
| 配列から条件を満たす要素を抽出する | `["バナナ", "リンゴ", "もも"].find((fruit) => fruit === "リンゴ");` |
| 配列の要素を並び順を変える | `[1, 2, 3].sort();` |
| ある配列から別の配列を作成する | `[1, 2, 3].map((num) => num * 2);` |

それでは、それぞれの操作について紹介していきます！

## 配列の長さを取得する

::content-list
---
title: "利用シーン"
list: 
  - "配列の数を調べる"
  - "記事数を表示する"
---
::

配列の長さを取得するには、文字列と同様に`length`プロパティを使用します。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
console.log(fruits.length); // 3
```

## 配列のループ処理

::content-list
---
title: "利用シーン"
list: 
  - "配列の全要素を表示する"
  - "複数の取得したHTML要素に処理を適用する"
---
::

配列のループ処理は、`forEach`や`for`文、`for...of`文を使用してできます。ここでは、使う機会の多い`forEach`について紹介します。以下は、`forEach`を使用して配列の全要素を表示する例です。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
fruits.forEach((fruit) => console.log(fruit));
// バナナ
// リンゴ
// もも
```

`forEach`の第2引数には、ループ処理の現在のインデックスが渡されます。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
fruits.forEach((fruit, index) => console.log(index, fruit));
// 0 バナナ
// 1 リンゴ
// 2 もも
```

Web制作では、複数のHTML要素に処理を適用する際に`forEach`が便利でよく使用されます。

```js [JavaScript]
const items = document.querySelectorAll(".item");
items.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item.textContent);
  });
});
```

## 配列の要素を追加する

::content-list
---
title: "利用シーン"
list: 
  - "新しいデータを配列の最後に追加していく(ログ履歴、メッセージの追加など)"
  - "新しいデータを配列の最初に挿入する（優先度の高いタスクを前に入れるなど）"
---
::

配列の要素を追加するには、`push`や`unshift`メソッドを使用します。

| メソッド | 説明 |
| --- | --- |
| `push` | 配列の最後に要素を追加する |
| `unshift` | 配列の最初に要素を追加する |

- `push`メソッドは、配列の最後に要素を追加します。
- `unshift`メソッドは、配列の最初に要素を追加します。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
fruits.push("いちご");
console.log(fruits); // ["バナナ", "リンゴ", "もも", "いちご"]
```

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
fruits.unshift("いちご");
console.log(fruits); // ["いちご", "バナナ", "リンゴ", "もも"]
```

## 配列の要素を削除する

::content-list
---
title: "利用シーン"
list: 
  - "最新の要素を削除したい時"
  - "古いデータを削除したい時"
---
::

配列の要素を削除するには、`pop`や`shift`メソッドを使用します。

| メソッド | 説明 |
| --- | --- |
| `pop` | 配列の最後の要素を削除する |
| `shift` | 配列の最初の要素を削除する |

- `pop`メソッドは、配列の最後の要素を削除します。
- `shift`メソッドは、配列の最初の要素を削除します。

戻り値には削除された要素が返されます。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
const removedFruit = fruits.pop();
console.log(removedFruit); // "もも"
console.log(fruits); // ["バナナ", "リンゴ"]
```

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
const removedFruit = fruits.shift();
console.log(removedFruit); // "バナナ"
console.log(fruits); // ["リンゴ", "もも"]
```

## 配列の要素を置き換える

::content-list
---
title: "利用シーン"
list: 
  - "特定の位置の要素を別の要素に変更したいとき"
---
::

配列内の要素を別の要素に置き換えるには、`splice`メソッドを使用します。
第1引数は置き換える要素のインデックス、第2引数は置き換える要素の数、第3引数以降は置き換える要素になります。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
fruits.splice(1, 1, "いちご"); // リンゴをいちごに置き換える
console.log(fruits); // ["バナナ", "いちご", "もも"]
```

## 複数の配列を一つに結合する

::content-list
---
title: "利用シーン"
list: 
  - "複数の配列をまとめて1つにする"
---
::

複数の配列を一つに結合するには、`concat`メソッドを使用します。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
const vegetables = ["トマト", "きゅうり", "なす"];
const combined = fruits.concat(vegetables);
console.log(combined); // ["バナナ", "リンゴ", "もも", "トマト", "きゅうり", "なす"]
```

## 配列の要素を結合する

::content-list
---
title: "利用シーン"
list: 
  - "配列を単純に文字列に変換したいとき"
  - "表示用に見やすく区切りたいとき"
  - "複数行テキストやログ形式の文字列を作成する"
---
::

配列の要素を結合するには、`join`メソッドを使用します。戻り値は結合された文字列になります。引数に何も指定しない場合は、カンマで結合されます。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
const joined = fruits.join();
console.log(joined); // "バナナ,リンゴ,もも"
```

引数には、結合する文字列を指定できます。次の例はスラッシュで区切った文字列にします。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
const joined = fruits.join(" / ");
console.log(joined); // "バナナ / リンゴ / もも"
```

## 配列の要素を検索する

::content-list
---
title: "利用シーン"
list: 
  - "配列から特定の要素の位置を調べたいとき"
  - "配列に特定の要素が含まれているかどうかを調べたいとき"
---
::

配列の要素を検索するには、`indexOf`メソッドと`includes`メソッドを使用します。

`indexOf`メソッドは、配列から特定の要素の位置を検索します。戻り値は要素のインデックスになります。要素が見つからない場合は、-1が返されます。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
console.log(fruits.indexOf("リンゴ")); // 1
console.log(fruits.indexOf("いちご")); // 要素が見つからない場合は、-1が返される。
```

`includes`メソッドは、配列に特定の要素が含まれているかどうかを検索します。戻り値は真偽値になります。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
console.log(fruits.includes("リンゴ")); // true
console.log(fruits.includes("いちご")); // false
```

## 配列から条件を満たす要素を抽出する

::content-list
---
title: "利用シーン"
list: 
  - "特定の条件に一致する1つ目の値を取得したいとき"
  - "データベースやAPIから取得した配列から特定のデータを探す"
---
::

配列から特定の条件を満たす要素を抽出するには、`find`メソッドを使用します。`find`メソッドは条件を満たす最初の要素を返します。見つからない場合は、`undefined`が返されます。

```js [JavaScript]
const fruits = ["バナナ", "リンゴ", "もも"];
console.log(fruits.find((fruit) => fruit === "リンゴ")); // "リンゴ"
console.log(fruits.find((fruit) => fruit === "いちご")); // undefined
```

データベースやAPIから取得したオブジェクト配列から特定のデータを探す用途にも使用できます。

```js [JavaScript]
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const user = users.find((user) => user.id === 2);
console.log(user); // { id: 2, name: "Bob" }
```

## 配列の要素を並び順を変える

::content-list
---
title: "利用シーン"
list: 
  - "データを逆順に並べたいとき"
  - "アルファベット順や数字順に並べたいとき"
---
::

配列の並び順を変えるには、`reverse`メソッドと`sort`メソッドを使用します。

### 配列の並び順を逆にする

`reverse`メソッドは、配列の要素の順序を逆に並べ替えます。注意点として、<Marker>元の配列自体を変更(破壊的メソッド)</Marker>します。

```js [JavaScript]
const numbers = [1, 2, 3, 4];
numbers.reverse();
console.log(numbers); // [4, 3, 2, 1]
```

### 配列をソートする

`sort`メソッドは、配列を比較関数に従って並び替えます。比較関数は、比較のためのふたつの要素(a,b)を受け取り、戻り値の大小によって順番を決定します。

以下は、数値の昇順に並べ替える例です。

```js [JavaScript]
const numbers = [3, 1, 4, 2];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 3, 4]
```

次の例は、数値を降順に並べ替える例です。

```js [JavaScript]
const numbers = [3, 1, 4, 2];
numbers.sort((a, b) => b - a);
console.log(numbers); // [4, 3, 2, 1]
```

## ある配列から別の配列を作成する

::content-list
---
title: "利用シーン"
list: 
  - "各要素を加工して新しい配列を作成したいとき"
  - "条件に合う要素を抽出したいとき"
  - "配列の合計値を計算したいとき"
---
::

ある配列から別の配列を作成するには、`map`、`filter`、`reduce`などのメソッドを使用します。

### map

`map`メソッドは、配列の各要素に対して処理を行い、その結果を新しい配列として返します。`forEach`メソッドと似てますが、`forEach`メソッドは戻り値がなく実行するだけなのに対して、`map`メソッドは処理を行った後に、新しい配列を返すのが特徴です。

例では、APIから取得したデータをもとにメンバーの名前リストの配列を作成しています。

```js [JavaScript]
const members = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const memberNames = members.map((member) => member.name);
console.log(memberNames); // ["Alice", "Bob", "Charlie"]
```

### filter

`filter`メソッドは、配列の各要素に対して条件を満たすかどうかを判定し、条件に一致する要素のみを新しい配列として返します。

例では、APIから取得したデータをもとに、有効ユーザーだけの条件で抽出しています。

```js [JavaScript]
const users = [
  { id: 1, name: "Alice", isActive: true },
  { id: 2, name: "Bob", isActive: false },
  { id: 3, name: "Charlie", isActive: true },
];
const activeUsers = users.filter((user) => user.isActive);
console.log(activeUsers); 
// [{ id: 1, name: "Alice", isActive: true }, { id: 3, name: "Charlie", isActive: true }]
```

### reduce

`reduce`メソッドは、配列の各要素に対して処理を行い、その結果を一つの値として返します。例では、配列の数値の合計値を計算しています。

```js [JavaScript]
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 10
```


## まとめ

JavaScriptの配列操作を使用例と共に紹介しました。配列を操作したい場面はよくあるので、ブラウザの開発者ツールで試しながら覚えておきましょう。

## 参考

- [Array - MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array)
