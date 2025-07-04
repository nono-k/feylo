---
title: "VSCodeのユーザースニペットを登録して効率よくコーディングしよう！【Web製作爆速コーディング】"
description: "VSCodeではよく使うユーザーをスニペットとして登録しておくことで、コーディングを効率よく行うことができます。この記事では、VSCodeでのユーザースニペットの登録方法と私のユーザースニペットの紹介をします。"
date: 2025-07-04
tags: 
  - "VSCode"
image: "/images/blog/vs-code-snippets.jpg"
summaryList:
  - "VSCodeでのユーザースニペットの登録方法"
  - "私のVSCodeのユーザースニペットの紹介"
---

## ユーザースニペットとは？

ユーザースニペットとは、VSCodeでよく使うコードを登録しておくことで、<Marker>コーディングを効率よく行うことができる機能</Marker>です。Web製作では、HTML(Pug)やCSS(SCSS)、JavaScriptなどのコードをよく書くので、これらのコードをユーザースニペットとして登録しておくと、コーディングを効率よく行うことができます。

昨今ではエディターのAI補間機能が発達していたりしますが、自分がよく書いているコードをユーザースニペットとして登録しておくことで、全てを書かずにコーディングを効率よく行うことができます。

## ユーザースニペットの登録方法

ユーザースニペットの登録方法はいくつかありますが、ここではコマンドパレットから登録する方法を紹介します。

1. <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>を押してコマンドパレットを開きます。

2. コマンドパレットに`snippets`と入力して、「スニペット：スニペットの構成」を選択します。

![settings.jsonを開く](https://res.cloudinary.com/dy8ftemi0/image/upload/v1751501870/vs-code-snippets-01_jx2mtv.jpg)

3. 選択したら、HTML,CSS,JavaScriptなどのJSONファイルを開くことができるので、スニペットを登録したい言語を選択します。

## ユーザースニペットを登録する

ユーザースニペットは以下のようなフォーマットで記述していきます。

```json
// ここから
"スニペット名": {
  "prefix": "呼び出すワード",
  "body": [
    "登録したいコード"
  ],
  "description": "スニペットの説明"
},
// ここまでがワンセット
```

- `スニペット名`：スニペットの名称(重複しないように)

- `呼び出すワード`：スニペットを呼び出すためのワード

- `登録したいコード`：このbody内に記述したコードがスニペットとして登録されます

- `スニペットの説明`：スニペットの説明になります(省略可)

## 私のユーザースニペットの紹介

ここでは、雑にですが私がWeb製作で爆速でコーディングするためのVSCodeのユーザースニペットを紹介します。

私は開発では、HTMLではPugを、CSSではSCSSで書いているので、そちらのユーザースニペットを載せます。

### Pugのユーザースニペット

VSCodeでPugを登録するには、`jade.json(Pug)`を開きます。

```json [jade.json]
{
	"[picsum]": {
		"prefix": "pics",
		"body": [
			"https://picsum.photos/",
		]
	},
	"dummy": {
		"prefix": "dummy",
		"body": [
			"https://placehold.jp/150x150.png",
		]
	},
	"copy": {
		"prefix": "copy",
		"body": [
			"&copy;",
		]
	},
  "[for]": {
    "prefix": "for",
    "body": [
      "- for (var i = 0; i < $1; i++)",
    ]
  },
  "each": {
    "prefix": "each",
    "body": [
      "- const list = ['$1','$2']",
      "\teach item in list",
    ]
  },
  "blank": {
    "prefix": "blank",
    "body": [
      "target=\"_blank\""
    ]
  },
  "for-mobile": {
    "prefix": "fm",
    "body": [
      "class=\"for-mobile\""
    ]
  },
  "for-large": {
    "prefix": "fl",
    "body": [
      "class=\"for-large\""
    ]
  },
  ".swiper": {
    "prefix": ".swiper",
    "body": [
        ".__swiper(data-slider=\"\")",
        "  .swiper",
        "    .swiper-wrapper",
        "      .swiper-slide",
    ],
  },
  "title-link": {
    "prefix": "title-link",
    "body": [
        "{ title: '', link: '' },",
    ],
  },
  // コンポーネント
  ".c-list": {
    "prefix": "lis",
    "body": [
      "ul.c-list",
      "\teach val in data",
      "\t\tli.c-list__item",
      "\t\t\ta(href=`${val.link}`).c-list__link",
      "\t\t\t\t|!{val.${1:text}}",
    ],
  },
}
```

### SCSSのユーザースニペット

VSCodeでSCSSを登録するには、`scss.json(SCSS)`を開きます。

```json [scss.json]
{
  "centerY": {
    "prefix": "cy",
    "body": [
        "position: absolute;",
        "top: 50%;",
        "translate: 0 -50%;"
    ],
  },
  "centerX": {
    "prefix": "cx",
    "body": [
        "position: absolute;",
        "left: 50%;",
        "translate: -50% 0;"
    ],
  },
  "positionXYCenter": {
    "prefix": "cxy",
    "body": [
        "position: absolute;",
        "left: 50%;",
        "top: 50%;",
        "translate: -50% -50%;"
    ],
  },
  "absoluteTopLeft0": {
    "prefix": "atl",
    "body": [
      "position: absolute;",
      "top: 0;",
      "left: 0;"
    ],
  },
  "absoluteTopRight0": {
    "prefix": "atr",
    "body": [
      "position: absolute;",
      "top: 0;",
      "right: 0;"
    ],
  },
  "flexCenter": {
    "prefix": "fc",
    "body": [
        "display: flex;",
        "justify-content: center;",
        "align-items: center;",
    ],
  },
  "flex column": {
    "prefix": "fxc",
    "body": [
      "display: flex;",
      "flex-direction: column;"
    ]
  },
  "before": {
    "prefix": "before",
    "body": [
      "&::before {",
      " \tcontent: '';",
      "\t$1",
      "}"
    ],
  },
  "after": {
    "prefix": "after",
    "body": [
      "&::after {",
      " \tcontent: '';",
      "\t$1",
      "}"
    ],
  },
  "wh100%": {
    "prefix": "wh100",
    "body": [
      "width: 100%;",
      "height: 100%;"
    ]
  },
  "wh100vh": {
    "prefix": "wh100vh",
    "body": [
      "width: 100%;",
      "height: 100vh;"
    ]
  },
  "circle": {
    "prefix": "ci",
    "body": [
      "width: $1;",
      "height: $1;",
      "background: $2;",
      "border-radius: 50%;",
    ]
  },
  "media-mobile": {
    "prefix": "@mobile",
    "body": [
      "@media (--mobile) {",
      "\t$1",
      "}"
    ]
  },
  "media-large": {
    "prefix": "@large",
    "body": [
      "@media (--large) {",
      "\t$1",
      "}"
    ]
  },
  "media-tablet": {
    "prefix": "@tablet",
    "body": [
      "@media (--tablet) {",
      "\t$1",
      "}"
    ]
  },
  "media-phone": {
    "prefix": "@phone",
    "body": [
      "@media (--phone) {",
      "\t$1",
      "}"
    ]
  },
  "breakpoint-tablet": {
    "prefix": "bta",
    "body": [
      "@include bp.breakpoint('tablet') {",
      "\t$1",
      "}"
    ]
  },
  "breakpoint-sp": {
    "prefix": "bs",
    "body": [
      "@include bp.breakpoint('sp') {",
      "\t$1",
      "}"
    ]
  },
  "hover": {
    "prefix": "ho",
    "body": [
      "&:hover {",
      "\t$1",
      "}"
    ]
  },
  "object-fit-cover": {
    "prefix": "objc",
    "body": [
      "object-fit: cover;"
    ]
  },
  "width-height": {
    "prefix": "wh",
    "body": [
      "width: $1;",
      "height: $2;",
    ]
  },
  "translate": {
    "prefix": "tl",
    "body": [
      "translate: $1 $2;"
    ]
  },
  "scale": {
    "prefix": "sc",
    "body": [
      "scale: $1;"
    ]
  },
  "rotate": {
    "prefix": "ro",
    "body": [
      "rotate: $1deg;"
    ]
  },
  "place-items": {
    "prefix": "pic",
    "body": [
      "place-items: center;"
    ]
  },
  "border-radius": {
    "prefix": "bdr50",
    "body": [
      "border-radius: 50%;"
    ]
  },
  "padding-inline": {
    "prefix": "pai",
    "body": [
      "padding-inline: $1;"
    ]
  },
  "padding-block": {
    "prefix": "pab",
    "body": [
      "padding-block: $1;"
    ]
  },
  "margin-inline": {
    "prefix": "mai",
    "body": [
      "margin-inline: $1;"
    ]
  },
  "margin-inline auto": {
    "prefix": "maia",
    "body": [
      "margin-inline: auto;"
    ]
  },
  "margin-block": {
    "prefix": "mab",
    "body": [
      "margin-block: $1;"
    ]
  },
  "left calc 50%": {
    "prefix": "lcalc",
    "body": [
      "left: calc(50% - $1);"
    ]
  },
  "background var": {
    "prefix": "bgv",
    "body": [
      "background: var(--$1);"
    ]
  },
  "color_white": {
    "prefix": "co",
    "body": [
      "color: #fff;"
    ]
  },
  "owl": {
    "prefix": "ow",
    "body": [
      "> * + * {",
      "\t$1",
      "}",
    ]
  },
  "clip-path": {
    "prefix": "cl",
    "body": [
      "clip-path: $1;"
    ]
  },
  "clip-path0": {
    "prefix": "cl0",
    "body": [
      "clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);"
    ]
  },
  "clip-path100": {
    "prefix": "cl100",
    "body": [
      "clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);"
    ]
  },
  "clip-pathl0": {
    "prefix": "cll0",
    "body": [
      "clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);"
    ]
  },
  "clip-pathr0": {
    "prefix": "clr0",
    "body": [
      "clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);"
    ]
  },
  "list": {
    "prefix": "list",
    "body": [
      "> * + * {",
      "\tmargin-top: $1;",
      "}",
      "&__item {",
      "\t$2",
      "}",
      "&__list {",
      "\t$3",
      "}",
    ]
  },
}
```

### JavaScriptのユーザースニペット

VSCodeでJavaScriptを登録するには、`javascript.json(JavaScript)`を開きます。

```json [javascript.json]
{
  // import関連
	"import three": {
    "prefix": "imthree",
    "body": [
        "import * as THREE from 'three';",
    ],
  },
	"import dat": {
    "prefix": "imdat",
    "body": [
        "import dat from 'dat.gui';",
    ],
  },
	"import shader": {
    "prefix": "imshader",
    "body": [
        "import vertexShader from './shaders/vertex.glsl';",
        "import fragmentShader from './shaders/fragment.glsl';",
    ],
  },
	"class": {
    "prefix": "cl",
    "body": [
        "class $1 {",
        "  constructor($2) {",
        "    this.${3:el} = document.querySelector('');",
        "    if(!this.${3:el}) return",
        "    this.init();",
        "  }",
        "  init() {",
        "  }",
        "}"
    ],
  },
	"log": {
    "prefix": "lo",
    "body": [
        "console.log($1);",
    ],
  },
	"querySelector": {
    "prefix": "dqs",
    "body": [
        "document.querySelector('$1');",
    ],
  },
	"querySelectorAll": {
    "prefix": "dqsa",
    "body": [
        "document.querySelectorAll('$1');",
    ],
  },
  "window.innerWidth": {
    "prefix": "wiw",
    "body": [
      "window.innerWidth"
    ]
  },
  "window.innerHeight": {
    "prefix": "wih",
    "body": [
      "window.innerHeight"
    ]
  },
  "clientX": {
    "prefix": "clx",
    "body": [
      "clientX"
    ]
  },
  "clientY": {
    "prefix": "cly",
    "body": [
      "clientY"
    ]
  },
  "const": {
    "prefix": "c",
    "body": [
      "const $1 = $2;"
    ]
  },
  "let": {
    "prefix": "l",
    "body": [
      "let $1 = $2;"
    ]
  },
  "color": {
    "prefix": "col",
    "body": [
      "color"
    ]
  },
  "position": {
    "prefix": "po",
    "body": [
      "position"
    ]
  },
  "length": {
    "prefix": "len",
    "body": [
      "length"
    ]
  },
  "classNameModule": {
    "prefix": "cn",
    "body": [
      "className={styles.$1}$2"
    ]
  },
  "for": {
    "prefix": "fo",
    "body": [
			"for (let ${1:i} = 0; ${1:i} < ${2:count}; ${1:i}++) {",
			"  ${3}",
			"}"
		],
  },
  "map": {
    "prefix": "map",
    "body": [
      "{$1:[]}.map(($2) => $3);"
    ],
  },
  "return": {
    "prefix": "re",
    "body": [
      "return $1"
    ]
  },
  "async": {
    "prefix": "asy",
    "body": [
      "async"
    ]
  },
  "mousemove": {
    "prefix": "mousemove",
    "body": [
      "${1:document}.addEventListener('mousemove', (e) => {",
      "  const pos = { x: e.clientX, y: e.clientY };",
      "})"
    ]
  },
  "resize": {
    "prefix": "resi",
    "body": [
      "window.addEventListener('resize', () => {",
      "\t$1",
      "})"
    ]
  },
  //数学
  "Math random": {
    "prefix": "ran",
    "body": [
      "Math.random()"
    ]
  },
  "Math PI": {
    "prefix": "pi",
    "body": [
      "Math.PI"
    ]
  },
  "2PI": {
    "prefix": "2pi",
    "body": [
      "Math.PI * 2"
    ]
  },
  "abs": {
    "prefix": "abs",
    "body": [
      "Math.abs($1)"
    ]
  },
  "sin": {
    "prefix": "sin",
    "body": [
      "Math.sin($1)"
    ]
  },
  "cos": {
    "prefix": "cos",
    "body": [
      "Math.cos($1)"
    ]
  },
  "tan": {
    "prefix": "tan",
    "body": [
      "Math.tan($1)"
    ]
  },
  "atan": {
    "prefix": "atan",
    "body": [
      "Math.atan($1)"
    ]
  },
  "atan2": {
    "prefix": "atan2",
    "body": [
      "Math.atan2($1)"
    ]
  },
  "floor": {
    "prefix": "floor",
    "body": [
      "Math.floor($1)"
    ]
  },
  "ceil": {
    "prefix": "ceil",
    "body": [
      "Math.ceil($1)"
    ]
  },
  "fround": {
    "prefix": "fround",
    "body": [
      "Math.fround($1)"
    ]
  },
  "max": {
    "prefix": "max",
    "body": [
      "Math.max($1)"
    ]
  },
  "min": {
    "prefix": "min",
    "body": [
      "Math.min($1)"
    ]
  },
  "pow": {
    "prefix": "pow",
    "body": [
      "Math.pow($1)"
    ]
  },
  "round": {
    "prefix": "round",
    "body": [
      "Math.round($1)"
    ]
  },
  "sqrt": {
    "prefix": "sqrt",
    "body": [
      "Math.sqrt($1)"
    ]
  },
  "sign": {
    "prefix": "sign",
    "body": [
      "Math.sign($1)"
    ]
  },
  // three.js
  "WebGLRenderer": {
    "prefix": "wglr",
    "body": [
      "new THREE.WebGLRenderer($1)"
    ]
  },
  "WebGLRenderTarget": {
    "prefix": "wwglrt",
    "body": [
      "new THREE.WebGLRenderTarget(${1:width}, ${2:height}, {",
      "  ${3:magFilter}: THREE.$4",
      "  ${5:minFilter}: THREE.$6",
      "  ${7:format}: THREE.$8",
      "  ${9:wrapS}: THREE.$10",
      "  ${11:wrapT}: THREE.$12",
      "})"
    ]
  },
  "Vector2": {
    "prefix": "v2",
    "body": [
      "new THREE.Vector2($1)"
    ]
  },
  "Vector3": {
    "prefix": "v3",
    "body": [
      "new THREE.Vector3($1)"
    ]
  },
  "Vector4": {
    "prefix": "v4",
    "body": [
      "new THREE.Vector4($1)"
    ]
  },
  "TextureLoader": {
    "prefix": "tl",
    "body": [
      "new THREE.TextureLoader()$1"
    ]
  },

  //Canvas
  "clearRect": {
    "prefix": "cr",
    "body": [
      "clearRect(0, 0, canvas.width, canvas.height);"
    ]
  },
  "canvas width": {
    "prefix": "cw",
    "body": [
      "canvas.width"
    ]
  },
  "canvas height": {
    "prefix": "ch",
    "body": [
      "canvas.height"
    ]
  },
  "fillRect": {
    "prefix": "fillR",
    "body": [
      "fillRect($1, $2, $3, $4)"
    ]
  },
  "strokeRect": {
    "prefix": "strokeR",
    "body": [
      "strokeRect($1, $2, $3, $4)"
    ]
  },
  "beginPath": {
    "prefix": "beginP",
    "body": [
      "beginPath();"
    ]
  },
  "moveTo": {
    "prefix": "moveT",
    "body": [
      "moveTo($1, $2);"
    ]
  },
  "closePath": {
    "prefix": "closeP",
    "body": [
      "closePath();"
    ]
  },
  "lineTo": {
    "prefix": "lineT",
    "body": [
      "lineTo($1, $2);"
    ]
  },
  "strokeStyle": {
    "prefix": "strokeS",
    "body": [
      "strokeStyle = '$1';"
    ]
  },
  "fillStyle": {
    "prefix": "fillS",
    "body": [
      "fillStyle = '$1';"
    ]
  },
  "lineWidth": {
    "prefix": "lineW",
    "body": [
      "lineWidth = "
    ]
  },
  "globalAlpha": {
    "prefix": "globalA",
    "body": [
      "globalAlpha = "
    ]
  },
}
```

## まとめ

VSCodeのユーザースニペットについて紹介しました。
また雑ではありますが、私が普段使っているユーザースニペットを紹介しました。

みなさんもぜひ、自分なりのユーザースニペットを登録して効率よくコーディングしてみてください！

## 参考

- [Snippets in Visual Studio Code](https://code.visualstudio.com/docs/editing/userdefinedsnippets)