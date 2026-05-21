---
title: "【WebGL】WebGLで平面(Plane)ジオメトリを描画する方法"
description: "今回は、Three.jsでいうPlaneGeometry(平面)の作成をWebGLで行っていきます。widthとheightを設定できるのはもちろん、分割数も設定できるようにしていきます。"
date: 2026-05-22
tags: 
  - "WebGL"
image: "/images/blog/webgl-plane-geometry.jpg"
summaryList:  
  - "WebGLで平面(Plane)ジオメトリを描画する方法"
  - "wireframeモードの描画方法"
---

## はじめに

前回は、MVP行列の紹介をしてCameraクラスを作成し、複数の三角形を描画する方法を解説しました。

::recommend-link
---
items:
  - title: "【WebGL】MVP行列の理解と複数の三角形を描画する"
    link: "/blog/webgl-multiple-triangle/"
    image: "/images/blog/webgl-multiple-triangle.jpg"
    description: "今回は、WebGLやCGでの3次元描画をする上で必要な知識となるMVP行列を紹介します。そしてCameraクラスを作成し、一つの頂点バッファでサムネの画像にあるような複数の三角形を描画する方法まで解説します。"
---
::

今回は、Three.jsでいうPlaneGeometry(平面)の作成をWebGLで行っていきます。Three.jsと同様にwidthとheightを設定できるのと、分割数も設定できるようにします。

コードはGitHubで公開しているので参考にしてみてください！

https://github.com/nono-k/webgl-study-note

前回からの差分は[こちら](https://github.com/nono-k/webgl-study-note/commit/701f787c8a5a19410e88697d33b2d66871e36965)になります。

::note
---
text: '今回の記事で作成するPlaneクラスでは、法線ベクトルは作成しません。ライティングなどを作成する際に、法線ベクトルについて解説しようかと思います。'
---
::

## WebGLでの平面の作成の考え方

WebGLで平面を作成するには、2つの三角形で四角形を作成することになります。ここでは、分割数を1として考えてみます。

最初に頂点座標を考えてみましょう。次のような中央に平面を配置する場合を考えます。

```bash [平面の頂点座標とインデックス]
(-1, 1)      (1, 1)
    0 ------ 1
    |      / |
    |    /   |
    2 ------ 3
(-1,-1)     (1,-1)
```

頂点は4つ必要になるので、次のようなx,y,zの頂点座標になります。

```ts [頂点座標]
const vertices = [
  -1, 1, 0, // 頂点0
  1, 1, 0, // 頂点1
  -1, -1, 0, // 頂点2
  1, -1, 0, // 頂点3
];
```

次に、インデックスを考えてみましょう。三角形は2つ必要になるので、次のようなインデックスになります。

```ts [インデックス]
const indices = [
  0, 2, 1, // 三角形1
  2, 3, 1, // 三角形2
];
```

このように2つの三角形を使用することで、平面を作成することができます。分割数を増やす場合は、頂点座標とインデックスの数が増えることになります。それでは、平面を作成する`Plane`クラスを実装していきましょう。

## 平面(Plane)ジオメトリの作成

OGLに倣って、今回の平面(Plane)ジオメトリは、ライブラリのコアではないので、新たに`extras`ディレクトリを作成し、その中に`Plane.ts`というファイルを作成していきます。`index.ts`でエクスポートするのも忘れないようにしましょう。

```ts [index.ts]
// Extras
export { Plane } from './extras/Plane';
```

作成する前に、このPlaneクラスの使い方を見てみましょう。
引数のPARAMSはコメント通りになります。

```ts [render.ts]
import { Plane } from '@/lib/webgl';

const PARAMS = {
  wireframe: false, // ワイヤーフレームモードで描画するかどうか
  width: 1, // 平面の幅
  height: 1, // 平面の高さ
  widthSegments: 10, // 幅方向の分割数
  heightSegments: 10, // 高さ方向の分割数
};

const planeGeometry = new Plane(gl, PARAMS);
```

この前提を踏まえて、Planeクラスを作成していきましょう。

```ts [Plane.ts]
interface PlaneOptions {
  width: number;
  height: number;
  widthSegments: number;
  heightSegments: number;
  wireframe: boolean;
  attributes: AttributeMap;
}

export class Plane extends Geometry {
  constructor(gl: WebGL2RenderingContext, options?: Partial<PlaneOptions>) {
    const { width = 1, height = 1, widthSegments = 1, heightSegments = 1, wireframe = false, attributes = {} } = options ?? {};
  }
}
```

`Partial<PlaneOptions>`となるので、引数は全てオプショナルになります。例えば、`new Plane(gl)`のようにオプションの引数が空の場合はデフォルトの値が適用されるようになります。

### 頂点数の計算

頂点数は、幅方向の分割数と高さ方向の分割数に基づいて計算されます。例えば、幅方向に`widthSegments`、高さ方向に`heightSegments`の分割がある場合、頂点数は次のように計算されます。

```ts [頂点数の計算]
const wSegs = widthSegments;
const hSegs = heightSegments;

const num = (wSegs + 1) * (hSegs + 1);
```

ここで、分割数が1の場合は、計算通りに4になることが分かるでしょう。分割数が増えると、頂点数も増えることになります。

### index数

インデックス数も同様に、幅方向の分割数と高さ方向の分割数に基づいて計算されます。例えば、幅方向に`widthSegments`、高さ方向に`heightSegments`の分割がある場合、インデックス数は次のように計算されます。

```ts [インデックス数の計算]
const num = wSegs * hSegs * 6;
```

分割数が1の場合は、計算通りに6になることが分かるでしょう。ここでも同様に、分割数が増えると、インデックス数も増えることになります。

### Bufferの作成

頂点座標とインデックスとuvのBufferを作成します。

```ts [Bufferの作成]
const position = new Float32Array(num * 3);
const uv = new Float32Array(num * 2);
let index = numIndices > 65535 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
```

ここで、頂点座標は3つの値(x,y,z)が必要になるので、`num * 3`になります。uvは2つの値(u,v)が必要になるので、`num * 2`になります。インデックスは、65535を超える場合はUint32Arrayを使用し、それ以外の場合はUint16Arrayを使用します。

また、インデックスはwireframeモードで描画する場合は、変える必要があるので、`let`で宣言しています。

これらのBufferを使用して、頂点座標、uv、インデックスを計算する`buildPlane`関数を作成していきましょう。

```ts [buildPlane]
Plane.buildPlane({ position, uv, index, width, height, depth: 0, wSegs, hSegs });
```

### 頂点座標、uv、インデックスの計算

分割数も考慮するので、頂点座標、uv、インデックスの計算は少し複雑になります。`buildPlane`関数の全コードは次のようになります。

```ts [buildPlane]
static buildPlane(options: BuildPlaneOptions) {
  const { position, uv, index, width, height, depth, wSegs, hSegs } = options;
  const u = 0;
  const v = 1;
  const w = 2;
  const uDir = 1;
  const vDir = 1;
  let i = 0;
  const io = i;
  let ii = 0;

  const segW = width / wSegs;
  const segH = height / hSegs;

  for (let iy = 0; iy <= hSegs; iy++) {
    const y = iy * segH - height / 2;
    for (let ix = 0; ix <= wSegs; ix++, i++) {
      const x = ix * segW - width / 2;

      position[i * 3 + u] = x * uDir;
      position[i * 3 + v] = y * vDir;
      position[i * 3 + w] = depth / 2;

      uv[i * 2] = ix / wSegs;
      uv[i * 2 + 1] = 1 - iy / hSegs;

      if (iy === hSegs || ix === wSegs) continue;

      const a = io + ix + iy * (wSegs + 1);
      const b = io + ix + (iy + 1) * (wSegs + 1);
      const c = io + ix + (iy + 1) * (wSegs + 1) + 1;
      const d = io + ix + iy * (wSegs + 1) + 1;

      index[ii * 6] = a;
      index[ii * 6 + 1] = b;
      index[ii * 6 + 2] = d;
      index[ii * 6 + 3] = b;
      index[ii * 6 + 4] = c;
      index[ii * 6 + 5] = d;

      ii++;
    }
  }
}
```

それでは、個々に見ていきましょう。

#### 1マスの幅と高さの計算

1マスの幅と高さは、平面の幅と高さを分割数で割ることで計算されます。

```ts [1マスの幅と高さの計算]
const segW = width / wSegs;
const segH = height / hSegs;
```

例えば、幅が1で、分割数が4の場合、1マスの幅は0.25になります。

#### 頂点座標とインデックスとuvの計算

頂点座標とインデックスとuvの計算は、二重ループを使用して行います。外側のループは高さ方向の分割数を、内側のループは幅方向の分割数をループします。

```ts [頂点座標とインデックスとuvの計算]
for (let iy = 0; iy <= hSegs; iy++) {
  const y = iy * segH - height / 2;
  for (let ix = 0; ix <= wSegs; ix++, i++) {
    const x = ix * segW - width / 2;

    position[i * 3 + u] = x * uDir;
    position[i * 3 + v] = y * vDir;
    position[i * 3 + w] = depth / 2;

    uv[i * 2] = ix / wSegs;
    uv[i * 2 + 1] = 1 - iy / hSegs;

    if (iy === hSegs || ix === wSegs) continue;

    const a = io + ix + iy * (wSegs + 1);
    const b = io + ix + (iy + 1) * (wSegs + 1);
    const c = io + ix + (iy + 1) * (wSegs + 1) + 1;
    const d = io + ix + iy * (wSegs + 1) + 1;

    index[ii * 6] = a;
    index[ii * 6 + 1] = b;
    index[ii * 6 + 2] = d;
    index[ii * 6 + 3] = b;
    index[ii * 6 + 4] = c;
    index[ii * 6 + 5] = d;

    ii++;
  }
}
```

頂点座標は、中心を原点として計算しています。uvは、幅方向と高さ方向の分割数に基づいて計算されます。インデックスは、頂点の順序に基づいて計算されます。

言葉で説明するのが難しいので、実際に値を入れてみて計算してみると分かりやすいと思います。

widthが1で、heightが1で、widthSegmentsが1で、heightSegmentsが1の場合、次のようになります。

```ts
position = [
  -0.5, 0.5, 0,
  0.5, -0.5, 0,
  -0.5, 0.5, 0,
  0.5, 0.5, 0,
];

uv = [
  0, 1,
  1, 1,
  0, 0,
  1, 0,
];

index = [
  0, 2, 1,
  2, 3, 1,
];
```

## wireframeモードの描画方法

wireframeモードで描画する場合は、インデックスの計算を変更する必要があります。

```ts
if (wireframe) {
  index = Plane.buildWireframeIndex(index);
}
```

`buildWireframeIndex`メソッドは、次のようになります。

```ts [buildWireframeIndex]
static buildWireframeIndex(index: Uint16Array | Uint32Array) {
  const edges: number[] = [];

  for (let i = 0; i < index.length; i += 3) {
    const a = index[i];
    const b = index[i + 1];
    const c = index[i + 2];

    edges.push(a, b, b, c, c, a);
  }

  return index instanceof Uint32Array ? new Uint32Array(edges) : new Uint16Array(edges);
}
```

wireframeモードで描画するには、`drawElements`の第一引数を`gl.LINES`に変更する必要があるので、`Mesh`クラスの`draw`メソッドを次のように変更します。

```ts [Mesh.ts]
export class Mesh extends Scene {
  // ...
  draw({ camera }: { camera?: Camera }) {
    // ...
    const mode = geometry.attributes.wireframe ? gl.LINES : gl.TRIANGLES;

    // ...
    gl.drawElements(mode, geometry.indexCount, gl.UNSIGNED_SHORT, 0);
  }
}
```

これで、wireframeモードで描画することができるようになります。

## Geometryへ渡す

最後に、作成した頂点座標、uv、インデックスをGeometryクラスへ渡していきましょう。

```ts [Plane.ts]
export class Plane extends Geometry {
  constructor(gl: WebGL2RenderingContext, options?: Partial<PlaneOptions>) {
    // ...
    Object.assign(attributes, {
      position: { size: 3, data: position },
      uv: { size: 2, data: uv },
      index: { data: index },
      wireframe,
    });

    super(gl, attributes);
  }
}
```

このPlaneクラスを使用して、平面を描画することができるようになりました。

```ts [render.ts]
const PARAMS = {
  wireframe: false,
  width: 1,
  height: 1,
  widthSegments: 1,
  heightSegments: 1,
};

const planeGeometry = new Plane(gl, PARAMS);

const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    uTime: { value: 0 },
  },
});

const plane = new Mesh(gl, { geometry: planeGeometry, program });
scene.add(plane);
```

![Plane](https://res.cloudinary.com/dy8ftemi0/image/upload/v1779322569/webgl-plane-geometry-01_konw5b.jpg "Plane")

::link-btn
---
href: https://nono-k.github.io/webgl-study-note/webgl/plane/
---
::

## まとめ

今回は、WebGLで平面(Plane)ジオメトリを描画する方法を解説しました。分割数を設定できるようにすることで、より細かい平面を作成することができるようになりました。また、wireframeモードで描画する方法も解説しました。

次回は、作成したPlaneクラスを使用して立方体の作成を解説していきます。