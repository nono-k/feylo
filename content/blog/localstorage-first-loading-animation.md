---
title: "JavaScriptのlocalStorageを利用して初回アクセスか24時間経過したらローディングアニメーションを実行する方法"
description: "ローディングアニメーションはWebサイトによく使用されているのを見たことがあるでしょう。初回アクセス時はいいのですが、二回目以降にも同様のローディングアニメーションが表示されてしまうと、ユーザー体験が悪くなるでしょう。そこで、JavaScriptのlocalStorageを利用して初回アクセスか24時間経過したらローディングアニメーションを実行する方法を解説します。"
date: 2025-08-04
tags: 
  - "JavaScript"
image: "/images/blog/localstorage-first-loading-animation.jpg"
summaryList:
  - "localStorageを利用して、初回アクセスだったらKeyとアクセスした時間を保存する。"
  - "差分の時間を見て訪問済みだったらアニメーションをスキップする"
---

## はじめに

再訪問時にローディングアニメーションを、何回も表示するとユーザー体験が悪くなるでしょう。そこで、JavaScriptのlocalStorageを利用して、初回アクセスか24時間経過した時のみローディングアニメーションを実行する方法を紹介します。

下記は今回のデモです！
(初回表示か、24時間経過した時のみローディングアニメーションを表示します)

::codepen-embed
---
id: yyYgwrV
title: Localstorage First Loading Animation
---
::

## localStorageとは？

`localStorage`はブラウザにデータを保存させるWebストレージAPIの1つです。WebストレージAPIには、`localStorage`と`sessionStorage`があり、それぞれの違いは下記の通りです。

::content-list
---
  title: WebストレージAPIの違い
  list: 
    - sessionStorageはブラウザを開いている間、使用可能であり、ブラウザを閉じるとデータが削除されます。
    - localStorageはブラウザを閉じても永続的にデータが残ります。
---
::

`localStorage`では、保存されたデータの削除処理を書かなければ、永続的に残り続けます。今回のローディングアニメーションの例だと、Topページにアクセスした時に頻繁にローディングアニメーションが表示されると、ユーザー体験を落とすのを防ぐために、24時間経過したかを判断にデータを書き換えることにします。

### localStorageの使い方

主なlocalStorageの基本的な使い方は下記になります。

#### 保存

`localStorage.setItem('key', 'value')`で保存することができます。

```js [localStorage.setItem]
localStorage.setItem('key', 'value');
```

#### 取得

`localStorage.getItem('key')`で`key`の`value`を取得することができます。

```js [localStorage.getItem]
localStorage.getItem('key');
```

#### 削除

`localStorage.removeItem('key')`で`key`の`value`を削除することができます。

```js [localStorage.removeItem]
localStorage.removeItem('key');
```

## デモの解説

デモのCodePenでは、<Marker>初回表示か、24時間経過した時のみ</Marker>「LOADING」の文字と帯が動くローディングアニメーションを表示します。ここでは、詳しいコードの説明はしないで、JavaScriptのlocalStorage部分を重視して解説します。

### Visitedクラスを作る

初回表示か、24時間経過したかを`localStorage`を使って判断する`Visited`クラスを作ります。`constructor`で`expire`を引数に取って、`expire`のデフォルト値を`86400`秒（24時間）に設定します。

```js [JavaScript]
class Visited {
  constructor(expire = 86400) {
    this.key = "visited";
    this.expire = expire;
  }

  isVisited() {
    let isVisited = true;
    let timelimit = this.expire;

    let now = Math.floor((new Date() * 1) / 1000);
    let visited = localStorage.getItem(this.key);
    let diffTime = (now - visited);

    if (!visited || timelimit < diffTime) {
      try {
        localStorage.setItem(this.key, now);
      } catch (e) {
        console.error(e);
      }
      isVisited = false;
    }
    return isVisited;
  }
}
```

それでは解説します。

#### constructor

```js [JavaScript]
class Visited {
  constructor(expire = 86400) {
    this.key = "visited";
    this.expire = expire;
  }
}
```

`constructor`では、`localStorage`に使うキー(`visited`)と有効期限(秒数)を設定します。デフォルトでは、86400秒（24時間）に設定します。

`Visited`クラスを使う時に、`new Visited(3600)`のように有効期限を設定すると、この場合は1時間以内の訪問は「訪問済み」と判断します。

#### isVisited

```js [JavaScript]
isVisited() {
  let isVisited = true;
  let timelimit = this.expire;
}
```

`isVisited()`は、訪問済みかを`true/false`で返します。
`timelimit`は期限（秒数）を保持します。

```js [JavaScript]
let now = Math.floor((new Date() * 1) / 1000);
let visited = localStorage.getItem(this.key);
let diffTime = (now - visited);
```

`localStorage.getItem()`で最後の訪問時間を取得します。
`(now - visited)`で差分時間（前回からの経過秒数）を計算して、`diffTime`に入れます。

```js [JavaScript]
if (!visited || timelimit < diffTime) {
  try {
    localStorage.setItem(this.key, now);
  } catch (e) {
    console.error(e);
  }
  isVisited = false;
}
```

以下の条件を満たす場合に、`isVisited`を`false`に設定し「初回表示か、24時間経過した」と判断します。

- `visited`が存在しない（初回アクセス）
- 最終訪問から`timelimit`秒以上経過している（24時間経過した）

これで`localStorage`を使用した初回表示か、24時間経過したかを判断するクラスを作成しました。これをローディングアニメーションをするJavaScriptコードに組み込みましょう！

### Loadingクラスに組み込む

先ほど作成した`Visited`クラスを`Loading`クラスに組み込んでいきます。

```js [JavaScript]
class Loading {
  constructor() {
    this.el = document.querySelector('.js-loading');
    const visited = new Visited();
    const isVisited = visited.isVisited();

    if (!this.el || isVisited) return;

    this.init();
  }

  init() {
    this.el.style.display = 'block';
    gsap.set(this.textUp, { y: 300, opacity: 0 });
    this.loadingAnimation();
  }
}
```

`Loading`クラスの`constructor`で`Visited`クラスのインスタンスを作成し、`isVisited()`メソッドを呼び出し、訪問済みかを判断します。訪問済みだったら`return`で返してローディングアニメーションを実行しないようになります。

以上がJavaScriptの説明になります。

### CSSの説明

最後にCSSの説明です。
「初回アクセスか、24時間経過したか」を判断するのはJavaScriptの処理を待ってからになるので、このままだとローディングの画面が見えてしまいます。

なので、最初にローディングの画面を`display: none`で非表示にしておき、JavaScript側でローディングの画面を表示するようにしましょう。

```css [CSS]
.loading {
  display: none;
}
```

以上がデモの解説になります。

## localStorageの値を削除する方法

最後に`localStorage`の値を削除する方法を紹介します。開発の時に、`localStorage`の値を削除できないと、ローディングアニメーションが表示されず不便です。

実は、`localStorage`の値は手動で削除することができます。ブラウザの開発者ツールを確認しましょう。Applicationタブを開いたら、左側のStorageの中のLocal Storageを見てください。

CodePenの場合は、「cdpn.io」の中に、今回のデモの場合は、`visited`というkeyがあるので、右クリックしてDeleteを押したら削除できます！

![開発者ツールでlocalStorageを削除する](https://res.cloudinary.com/dy8ftemi0/image/upload/v1754123053/localstorage-first-loading-animation-01_bbfloy.jpg)

今回のデモのローディングアニメーションを何度も見たい方は、上記の方法で`localStorage`を削除して見てみてください！

## まとめ

JavaScriptの`localStorage`を使用して、初回表示か、24時間経過したかを判断するしてローディングアニメーションを表示する方法を紹介しました。

他にもWebストレージAPIには、`sessionStorage`があり、`localStorage`との違いを意識して使い分けてみてください！

## 参考

- [Window: localStorage プロパティ - MDN](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)
- [ウェブストレージ API の使用 - MDN](https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
