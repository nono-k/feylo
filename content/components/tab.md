---
title: "Tab"
description: "コンテンツを切り替えて表示できるタブコンポーネントについての実装方法を紹介します。JavaScriptを用いての操作と、アクセシビリティに考慮した実装を解説します。"
image: "/images/components/tab.jpg"
---

## アクセシブルなタブUIを実装する方法

Webサイトでよく見かけるUIパターンのひとつに<Marker>タブ切り替え</Marker>があります。複数のコンテンツ・パネルをクリックなどで切り替えて表示する仕組みですが、単純に`display: none`で非表示にしたり、クリックイベントだけで制御すると、スクリーンリーダーやキーボード操作のユーザーにとっては使いにくいタブUIになってしまいます。

この記事では、以下の要素を取り入れた<Marker>アクセシブルなタブUI</Marker>の実装方法について解説します。

- WAI-ARIAロール・属性による状態管理
- キーボード操作の対応（矢印キーで移動可能）
- `hidden="until-found"`と`beforematch`イベントで検索時の非表示コンテンツの表示に対応

## アクセシブルなタブUIのCodePenデモ

今回紹介するタブUIのCodePenデモは下記になります。
矢印キーのキーボード操作や、検索で表示する機能にも対応していますので試してみてください！

::codepen-embed
---
id: WbQPYYG
title: Accessibility Tab
---
::

## HTML

タブの基本的なHTMLは次のようになります。

```html [HTML]
<div class="tab js-tab">
  <div class="tab__list" role="tablist">
    <a class="tab__trigger js-tab-trigger -active" href="#tabpanel1" role="tab" aria-controls="tabpanel1" aria-selected="true" tabindex="0">Tab 1</a>
    <a class="tab__trigger js-tab-trigger" href="#tabpanel2" role="tab" aria-controls="tabpanel2" aria-selected="false" tabindex="-1">Tab 2</a>
    <a class="tab__trigger js-tab-trigger" href="#tabpanel3" role="tab" aria-controls="tabpanel3" aria-selected="false" tabindex="-1">Tab 3</a>
  </div>

  <div class="tab__contnet">
    <div class="tab__panel js-tab-panel" id="tabpanel1" role="tabpanel" aria-labelledby="tab1" tabindex="0">
      <h2>Tab 1 Content</h2>
      <p>Tab 1のコンテンツです。<br>Tab 1のコンテンツです。</p>
    </div>
    <div class="tab__panel js-tab-panel" id="tabpanel2" role="tabpanel" aria-labelledby="tab2" hidden="until-found">
      <h2>Tab 2 Content</h2>
      <p>Tab 2のコンテンツです。<br>Tab 2のコンテンツです。</p>
    </div>
    <div class="tab__panel js-tab-panel" id="tabpanel3" role="tabpanel" aria-labelledby="tab3" hidden="until-found">
      <h2>Tab 3 Content</h2>
      <p>Tab 3のコンテンツです。<br>Tab 3のコンテンツです.</p>
    </div>
  </div>
</div>
```

JavaScriptで操作する要素には`js-`を先頭に付与しています。タブの全体には`js-tab`クラスを付与します。

### タブリスト

タブリストの要素には`role="tablist"`を付与し、タブの要素には`role="tab"`を付与します。

```html [HTML]
<div class="tab__list" role="tablist">
  <a class="tab__trigger js-tab-trigger -active" href="#tabpanel1" role="tab" aria-controls="tabpanel1" aria-selected="true" tabindex="0">Tab 1</a>
  <a class="tab__trigger js-tab-trigger" href="#tabpanel2" role="tab" aria-controls="tabpanel2" aria-selected="false" tabindex="-1">Tab 2</a>
  <a class="tab__trigger js-tab-trigger" href="#tabpanel3" role="tab" aria-controls="tabpanel3" aria-selected="false" tabindex="-1">Tab 3</a>
</div>
```

`role="tablist"`と`role="tab"`は親子関係である必要があります。現在選択されているタブには`-active`クラスを付与してスタイルを当てます。また、`aria-selected="true"`を付与して、現在選択されているタブをアクセシビリティ的に認識できるようにします。

また、選択中のタブの`tabindex`の値を`0`に設定し、非アクティブのタブの`tabindex`の値を`-1`に設定します。このようにすることでタブの中身にフォーカスを移すことができます。

タブの中身との対応関係は`aria-controls`属性と`href`属性で対応付けています。

### タブの中身

タブの中身には`role="tabpanel"`を付与します。`id`と`aria-labelledby`属性でタブとの関連を付けます。

```html [HTML]
<div class="tab__contnet">
  <div class="tab__panel js-tab-panel" id="tabpanel1" role="tabpanel" aria-labelledby="tab1" tabindex="0">
    <h2>Tab 1 Content</h2>
    <p>Tab 1のコンテンツです。<br>Tab 1のコンテンツです。</p>
  </div>
  <div class="tab__panel js-tab-panel" id="tabpanel2" role="tabpanel" aria-labelledby="tab2" hidden="until-found">
    <h2>Tab 2 Content</h2>
    <p>Tab 2のコンテンツです。<br>Tab 2のコンテンツです。</p>
  </div>
  <div class="tab__panel js-tab-panel" id="tabpanel3" role="tabpanel" aria-labelledby="tab3" hidden="until-found">
    <h2>Tab 3 Content</h2>
    <p>Tab 3のコンテンツです。<br>Tab 3のコンテンツです.</p>
  </div>
</div>
```

隠しているタブの中身には`hidden="until-found"`属性を付与します。これにより、タブの中身を非表示にできるのとページ内検索で検出することが可能になります。

`hidden="until-found"`は、2025年9月現在ではSafariではサポートされていませんが、従来の`hidden`属性として扱われるため非表示にはなるため、全モダンブラウザの対応を待たずとも問題ないかと思います。

::baseline-status
---
featureId: hidden-until-found
---
::

https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Global_attributes/hidden

## JavaScript

JavaScriptの実装は次のようになります。

```js [JavaScript]
class Tab {
  constructor() {
    this.tab = document.querySelector('.js-tab');
    if(!this.tab) return
    this.init();
  }

  init() {
    this.triggers = document.querySelectorAll('.js-tab-trigger');
    this.panels = document.querySelectorAll('.js-tab-panel');

    // クリックでタブ切り替え
    this.triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.activateTab(trigger);
      });

      // キーボード操作対応
      trigger.addEventListener('keydown', (e) => this.onKeydown(e, index));
    });

    // 検索表示時に対応
    this.panels.forEach(panel => {
      panel.addEventListener('beforematch', () => this.handleBeforeMatch(panel));
    });
  }

  // タブをアクティブ化
  activateTab(trigger) {
    const targetId = trigger.getAttribute('aria-controls');
    const targetPanel = this.tab.querySelector(`#${targetId}`);
    if (!targetPanel) return;

    // タブの状態更新
    this.triggers.forEach(t => {
      const isSelected = t === trigger;
      t.setAttribute('aria-selected', String(isSelected));
      t.setAttribute('tabindex', isSelected ? '0' : '-1');
      t.classList.toggle('-active', isSelected);
    });

    // パネルの表示更新
    this.panels.forEach(panel => {
      if (panel !== targetPanel) {
        panel.setAttribute('hidden', 'until-found');
        panel.removeAttribute('tabindex');
      } else {
        panel.removeAttribute('hidden');
        panel.setAttribute('tabindex', '0');
      }
    });
  }

  // キーボード操作 (左右キー)
  onKeydown(e, index) {
    const { key } = e;
    let newIndex = index;

    switch(key){
      case 'ArrowRight':
        newIndex = (index + 1) % this.triggers.length;
        this.triggers[newIndex].focus();
        this.activateTab(this.triggers[newIndex]);
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + this.triggers.length) % this.triggers.length;
        this.triggers[newIndex].focus();
        this.activateTab(this.triggers[newIndex]);
        break;
    }
  }

  // 検索からパネルが表示されたときの処理
  handleBeforeMatch(panel) {
    const tabId = panel.getAttribute('id');
    const trigger = this.tab.querySelector(`[aria-controls="${tabId}"]`);
    this.activateTab(trigger);
  }
}

const tab = new Tab();
```

それでは順番に解説していきます。

### init

`init`では、初期化処理を行います。

```js [JavaScript]
init() {
  this.triggers = document.querySelectorAll('.js-tab-trigger');
  this.panels = document.querySelectorAll('.js-tab-panel');

  // クリックでタブ切り替え
  this.triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.activateTab(trigger);
    });

    // キーボード操作対応
    trigger.addEventListener('keydown', (e) => this.onKeydown(e, index));
  });

  // 検索表示時に対応
  this.panels.forEach(panel => {
    panel.addEventListener('beforematch', () => this.handleBeforeMatch(panel));
  });
}
```

JavaScriptで操作する要素には`.js-`を付与しているので取得します。`this.triggers`はタブ（クリックして切り替えるボタン部分）になり、`this.panels`はパネル（タブの内容部分）になります。

`this.triggers`は複数あるので、`forEach`で回します。個別のタブにクリックイベントとキーボードイベントを追加します。タブは、`a`タグで実装しているのでリンク挙動を防ぐために`e.preventDefault()`を実行します。クリックしたタブを`activeTab()`に渡してアクティブ化します。

キーボードイベントは、矢印キー入力を受け取るために`keydown`を監視します。そしてどのタブから押されたかが分かるように`onkeydown()`に`index`を渡します。

#### 検索で表示された場合の対応

先述のように`hidden="until-found"`が付いた要素は、検索でヒットしたときに自動的に表示されます。この直前に発火するのが`beforematch`イベントになります。

このイベントを用いて、検索で表示された場合の処理(`handleBeforeMatch()`)を実行します。

### activateTab

`activateTab()`では、タブとパネルの状態を更新します。アクセシビリティに対応するために諸々の属性を更新します。

#### 更新するタブの取得

```js [JavaScript]
// タブをアクティブ化
activateTab(trigger) {
  const targetId = trigger.getAttribute('aria-controls');
  const targetPanel = this.tab.querySelector(`#${targetId}`);
  if (!targetPanel) return;
}
```

クリックやキー操作で渡された`trigger`から`aria-controls`の値を取得し、その値に一致するパネルを取得します。ここで「どのパネルを表示するか」が決まります。

#### タブの状態更新

```js [JavaScript]
// タブの状態更新
this.triggers.forEach(t => {
  const isSelected = t === trigger;
  t.setAttribute('aria-selected', String(isSelected));
  t.setAttribute('tabindex', isSelected ? '0' : '-1');
  t.classList.toggle('-active', isSelected);
});
```

選択されたタブかどうかを`===`で比較して`isSelected`とします。選択されたタブだけに`aria-selected="true"`と`tabindex="0"`を設定します。選択されていないタブは`aria-selected="false"`と`tabindex="-1"`を設定します。

これで「スクリーンリーダにも正しく選択状態が伝わり」「Tabキーで余計なタブに移動しない」状態になります。

現在選択されたタブの見た目には`-active`クラスでスタイルしているので、`toggle`でクラスを付け外します。

#### パネルの表示更新

```js [JavaScript]
// パネルの表示更新
this.panels.forEach(panel => {
  if (panel !== targetPanel) {
    panel.setAttribute('hidden', 'until-found');
    panel.removeAttribute('tabindex');
  } else {
    panel.removeAttribute('hidden');
    panel.setAttribute('tabindex', '0');
  }
});
```

アクティブなパネルだけ表示し、他は`hidden="until-found"`で非表示にします。アクティブなバネルには`tabindex="0"`を設定しキーボードでフォーカス可能にしています。


### onKeydown

`onKeydown()`では、キーボード操作を処理します。左右キーが押されたときにタブを移動します。そして、タブが移動したときに`activateTab()`を呼び出して、タブとパネルの状態を更新します。

```js [JavaScript]
// キーボード操作 (左右キー)
onKeydown(e, index) {
  const { key } = e;
  let newIndex = index;

  switch(key){
    case 'ArrowRight':
      newIndex = (index + 1) % this.triggers.length;
      this.triggers[newIndex].focus();
      this.activateTab(this.triggers[newIndex]);
      break;
    case 'ArrowLeft':
      newIndex = (index - 1 + this.triggers.length) % this.triggers.length;
      this.triggers[newIndex].focus();
      this.activateTab(this.triggers[newIndex]);
      break;
  }
}
```

`% this.triggers.length`とすることで、タブの範囲をループさせることが可能です。これにより、最後のタブから次のタブに移動したときに、最初のタブに戻ることができます。

`focus()`で選択したタブにフォーカスを移し、同時に`activateTab()`でパネルを切り替えます。これでキーボードの左右キーで直感的にタブ移動ができるようになります。

### handleBeforeMatch

`handleBeforeMatch()`では、検索で見つかった処理を実行します。

```js [JavaScript]
// 検索からパネルが表示されたときの処理
handleBeforeMatch(panel) {
  const tabId = panel.getAttribute('id');
  const trigger = this.tab.querySelector(`[aria-controls="${tabId}"]`);
  this.activateTab(trigger);
}
```

この処理を入れることで、検索で見つかったバネル以外は非表示にできるようになりました。

## 参考サイト

- [折りたたまれたコンテンツを hidden=until-found でアクセスできるようにする - chrome for developers](https://developer.chrome.com/docs/css-ui/hidden-until-found?hl=ja)
- [アクセシビリティに配慮したタブメニューの実装例 - TAKLOG](https://www.tak-dcxi.com/article/accessibility-conscious-tab-menu)