---
title: "WebGLで立方体(Box)ジオメトリを作成する方法"
description: "今回は、Three.jsでいうBoxGeometry(立方体)の作成をWebGLで行っていきます。BoxGeometry同様にwidth、height、depthを設定できるのと、分割数も設定できるようにします。"
date: 2026-06-01
tags: 
  - "WebGL"
image: "/images/blog/webgl-box-geometry.jpg"
summaryList:  
  - "WebGLで立方体(Box)ジオメトリを描画する方法"
  - "平面ジオメトリを組み合わせて立方体を作成する方法"
---

## はじめに

前回は、WebGLで平面(Plane)ジオメトリを作成する方法について解説しました。

::recommend-link
---
items:
  - title: "WebGLで平面(Plane)ジオメトリを作成する方法"
    link: "/blog/webgl-plane-geometry/"
    image: "/images/blog/webgl-plane-geometry.jpg"
    description: "今回は、Three.jsでいうPlaneGeometry(平面)の作成をWebGLで行っていきます。widthとheightを設定できるのはもちろん、分割数も設定できるようにしていきます。"
---
::

今回は、前回作成した平面(Plane)ジオメトリを組み合わせて立方体(Box)ジオメトリを作成していきます。

コードはGitHubで公開しているので参考にしてみてください！

https://github.com/nono-k/webgl-study-note

### WebGLでの立方体の作成の考え方

前回で、平面ジオメトリのクラスを作成したので、この平面を6つ組み合わせて立方体を作成していきます。それぞれの平面は、left、right、top、bottom、front、backの6面となり、この平面を立方体になるように位置を計算して配置していきます。

それでは、`Box`クラスを作成していきましょう！

## 立方体(Box)クラスの作成

前回同様に、`extras`ディレクトリに`Box.ts`ファイルを作成していきます。`index.ts`ファイルも更新して、`Box`クラスをエクスポートするようにしておきましょう。

```ts [index.ts]
// Extras
export { Box } from './extras/Box';
```

この`Box`クラスの使い方は次のようになります。
引数のPARAMSはコメント通りになります。

```ts [render.ts]
import { Box } from '@/lib/webgl';

const PARAMS = {
  wireframe: false, // ワイヤーフレームモードで描画するかどうか
  width: 1, // 立方体の幅
  height: 1, // 立方体の高さ
  depth: 1, // 立方体の奥行き
  widthSegments: 1, // 幅の分割数
  heightSegments: 1, // 高さの分割数
  depthSegments: 1, // 奥行きの分割数
};

const boxGeometry = new Box(gl, PARAMS);
```

この前提を踏まえて、`Box`クラスを作成していきましょう！

```ts [Box.ts]
interface BoxOptions {
  width: number;
  height: number;
  depth: number;
  widthSegments: number;
  heightSegments: number;
  depthSegments: number;
  wireframe: boolean;
  attributes: AttributeMap;
}

export class Box extends Geometry {
  constructor(gl: WebGL2RenderingContext, options?: Partial<BoxOptions>) {
    const {
      width = 1,
      height = 1,
      depth = 1,
      widthSegments = 1,
      heightSegments = 1,
      depthSegments = 1,
      wireframe = false,
      attributes = {},
    } = options ?? {};
  }
}
```

`Box`も`Plane`と同様に、引数は全てオプショナルになります。例えば、`new Box(gl)`のようにオプションの引数が空の場合はデフォルトの値が適用されるようになります。

### 立方体の頂点数の計算

立方体の頂点数は、幅、奥行き、高さの分割数に基づいて計算されます。

```ts [頂点数の計算]
const wSegs = widthSegments;
const hSegs = heightSegments;
const dSegs = depthSegments;

const num = 
  (wSegs + 1) * (hSegs + 1) * 2   // front/back
  + (wSegs + 1) * (dSegs + 1) * 2 // top/bottom 
  + (hSegs + 1) * (dSegs + 1) * 2; // left/right
```

`Box`は6面あります。コメントに書いている通り、それぞれの面の頂点数を計算して合計しています。例えば、分割数が1の場合は、計算通りに24になります。分割数が増えると、頂点数も増えることになります。

### 立方体のインデックス数の計算

インデックス数も同様に、幅、奥行き、高さの分割数に基づいて計算されます。

```ts [インデックス数の計算]
const numIndices = 
  (wSegs * hSegs * 2
   + wSegs * dSegs * 2
    + hSegs * dSegs * 2) * 6;
```

分割数が1の場合は、計算通りに36になります。ここでも同様に、分割数が増えると、インデックス数も増えることになります。

Bufferの作成に関しては、`Plane`と同様になりますので省略します。

### 立方体の6面の頂点座標、uv、インデックスの計算

`Plane`クラスで使用した、`buildPlane`メソッドを使用して立方体の6面の頂点座標、uv、インデックスの計算を次のように行います。`Plane`クラスの`buildPlane`メソッドの引数は次のようになっていました。

```ts [Plane.buildPlane]
static buildPlane(
  position: Float32Array,
  normal: Float32Array,
  uv: Float32Array,
  index: Uint32Array | Uint16Array,
  width: number,
  height: number,
  depth: number,
  wSegs: number,
  hSegs: number,
  u = 0,
  v = 1,
  w = 2,
  uDir = 1,
  vDir = -1,
  i = 0,
  ii = 0,
)
```

ここでは、立方体のleft、rightについて見てみます。全ての面はコードを参照してください。

```ts [立方体の6面の頂点座標、uv、インデックスの計算]
let i = 0;
let ii = 0;

// left
Plane.buildPlane(position, normal, uv, index, depth, height, width, dSegs, hSegs, 2, 1, 0, -1, -1, i, ii);
i += (dSegs + 1) * (hSegs + 1);
ii += dSegs * hSegs;

// right
Plane.buildPlane(position, normal, uv, index, depth, height, -width, dSegs, hSegs, 2, 1, 0, 1, -1, i, ii);
```

leftは、YZ平面に配置されるので、横(width)をdepthにして、奥行き(depth)をwidthにしています。rightは、left面の反対側に配置されるので、横(width)を-depthにしています。

軸の指定は、leftとrightは、u=2、v=1、w=0となっていますが、これは以下を意味します。

```ts
u = z;
v = y;
w = x;
```

つまり、YZ平面に配置されることになります。

#### Offset更新

`i`と`ii`は次のPlaneを書き込む位置を指定するための変数になります。

```ts
i += (dSegs + 1) * (hSegs + 1);
ii += dSegs * hSegs;
```

上記はright面に書き込むための更新になります。left面は、`(dSegs + 1) * (hSegs + 1)`個の頂点があるので、次の面はこの分だけ書き込む位置を更新する必要があります。インデックスも同様になります。

## Wireframe

Wireframeモードで描画する場合は、Planeの`buildWireframeIndex`メソッドを使用して、別のインデックス値を計算します。

```ts [Box.ts]
if (wireframe) {
  index = Plane.buildWireframeIndex(index);
}
```

これで、Wireframeモードで描画するようになります。

## Geometryへ渡す

最後に、計算した頂点座標、uv、インデックスをGeometryクラスのコンストラクタに渡して、Boxクラスを完成させましょう。

```ts [Box.ts]
export class Box extends Geometry {
  constructor(gl: WebGL2RenderingContext, options?: Partial<BoxOptions>) {
    // ...

    Object.assign(attributes, {
      position: { size: 3, data: position },
      normal: { size: 3, data: normal },
      uv: { size: 2, data: uv },
      index: { data: index },
      wireframe,
    });

    super(gl, attributes);
  }
}
```

このBoxクラスを使用して、立方体を描画できるようになりました。

```ts [render.ts]
const PARAMS = {
  wireframe: false,
  width: 1,
  height: 1,
  depth: 1,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
};

const boxGeometry = new Box(gl, PARAMS);

const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    uTime: { value: 0 },
  },
});

const box = new Mesh(gl, { geometry: boxGeometry, program });
scene.add(box);
```

![Boxの描画](https://res.cloudinary.com/dy8ftemi0/image/upload/v1780213577/webgl-box-geometry-01_fvdq2a.jpg "Boxの描画")

::link-btn
---
href: https://nono-k.github.io/webgl-study-note/webgl/box/
---
::

## まとめ

今回は、WebGLで立方体(Box)ジオメトリを描画する方法を解説しました。前回作成した平面(Plane)ジオメトリを組み合わせて、立方体を作成していることが分かったかと思います。

次回は、作成した立方体や平面の法線を可視化したり、座標を確認できるヘルパー関数を作成する方法を解説しようと思います。

::recommend-link
---
items:
  - title: "WebGLで法線の可視化や座標確認のためのヘルパー関数を作成する"
    link: "/blog/webgl-helper-function/"
    image: "/images/blog/webgl-helper-function.jpg"
    description: "今回は、Three.jsでいうViewHelperやVertexNormalsHelperに相当する、法線の可視化や座標確認のためのヘルパー関数をWebGLで作成する方法を解説します。"
---
::