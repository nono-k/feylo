---
title: "JavaScriptのsetIntervalを使用して経過時間とカウントダウンを実装する方法"
description: "JavaScriptのsetIntervalとDateオブジェクトを使って経過時間を調べる方法とカウントダウンを実装する方法を紹介します。"
date: 2025-09-03
tags: 
  - "JavaScript"
image: "/images/blog/javascript-time-elapsed-countdown.jpg"
summaryList:
  - "JavaScriptで経過時間を調べる方法"
  - "カウントダウンを実装する方法"
---

## はじめに

Webサイトで「公開から○日が経過しました」や「セール終了まで○日」などの表示をみたことはありますか？これらの表示はJavaScriptの`Date`オブジェクトを使って簡単に実装することができます。

この記事では、初心者向けに<Marker>経過時間の計算方法</Marker>と<Marker>カウントダウンの作り方</Marker>をサンプルコードとCodePenのデモ付きで解説します。

JavaScriptの`Date`オブジェクトを使用した、日付や時間の扱い方は以前紹介しているのでこちらも参考にしてください。

::recommend-link
---
items:
  - title: "JavaScriptのnew Dateで日付や時間の扱い方を紹介"
    link: "/blog/javascript-new-date"
    image: "/images/blog/javascript-new-date.jpg"
    description: "JavaScriptで「今日の日付は何日？」や「何時何分？」などの時間を扱いたいときに使うのがDateオブジェクトです。この記事では、JavaScriptのDateオブジェクトの使い方を紹介します。"
---
::

## 経過時間を調べる方法

ボタンを押してからの経過時間を表示するデモを作成します。
実装の考え方は次の通りになります。

1. 開始時間を保存する
  ボタンを押したときに「基準となる時刻」を`Date`で記録する。
2. 現在時刻と比較する
  ボタンを押したときに`new Date()`で現在時刻を取得し、開始時刻との差分を計算する。
3. 差分を整形して表示する
  差分はミリ秒になるので、この差を「秒」に変換して画面に表示します。

::codepen-embed
---
id: PwPBMjX
title: JavaScript Time Elapsed
---
::

```js [JavaScript]
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const result = document.querySelector('.result');

let timerId = null;
let startTime = null;

const startTimer = () => {
  if (timerId) return; // 連打防止

  startTime = new Date();

  timerId = setInterval(() => {
    const currentTime = new Date();
    const diff = currentTime - startTime;
    const sec = Math.floor(diff / 1000);
    result.textContent = `${sec}秒経過`;
  })
};

const resetTimer = () => {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
  result.textContent = '';
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
```

Startボタンを押した時に、`new Date()`で開始時刻を取得し、その時刻を`startTime`に保存します。その後、`setInterval`で開始時刻と`currentTime`の差分を計算しすることで、経過時間が得られます。

`new Date()`で取得する時刻は、ミリ秒になります。これを秒数で表示したいので、1000で割って`floor`で小数点を切り捨てます。

```js [JavaScript]
const diff = currentTime - startTime;
const sec = Math.floor(diff / 1000); // 秒数に変換
```

このように、経過時間を計算することで、ボタンを押した時からの経過時間を表示することができます。

## カウントダウンの作り方

次は、ボタンを押したらカウントダウンするデモになります。
実装の考え方は次の通りになります。

1. カウントダウンの残り時間の初期値を決める
  残り10秒からカウントダウンするなら、`let remaining = 10;`とする
2. `setInterval`で1秒ごと減らす
  `remaining`を1秒ごとに減らして、残り時間を表示する
3. 残り時間が0になったら終了
  `remaining`が0になったら、カウントダウンを終了する
  メッセージ(「終了！」)を表示する

::codepen-embed
---
id: pvjxYpV
title: JavaScript CountDown Time
---
::

```js [JavaScript]
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const result = document.querySelector('.result');

let timerId = null;
let remaining = 10; // 初期値(秒)

const startTimer = () => {
  if (timerId) return; // 連打防止

  timerId = setInterval(() => {
    result.textContent = `残り${remaining}秒`;

    if (remaining <= 0) {
      clearInterval(timerId);
      timerId = null;
      result.textContent = '終了！';
      return;
    }

    remaining--;
  }, 1000);
};

const resetTimer = () => {
  clearInterval(timerId);
  timerId = null;
  remaining = 10;
  result.textContent = `残り${remaining}秒`;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
```

## まとめ

この記事では、JavaScriptで時間経過を表示する方法と、カウントダウンを実装する方法を解説しました！実装の考え方は、`setInterval`で1秒ごとに時間を更新して表示させました。

この記事が参考になれば幸いです。