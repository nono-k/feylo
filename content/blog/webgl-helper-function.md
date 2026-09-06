---
title: "WebGLで法線の可視化や座標確認のためのヘルパー関数を作成する"
description: "今回は、Three.jsでいうViewHelperやVertexNormalsHelperに相当する、法線の可視化や座標確認のためのヘルパー関数をWebGLで作成する方法を解説します。"
date: 2026-09-07
tags: 
  - "WebGL"
image: "/images/blog/webgl-helper-function.jpg"
summaryList:  
  - "WebGLで座標確認を行う方法"
  - "WebGLで法線を可視化する方法"
---

## はじめに

前回は、WebGLで平面(Plane)ジオメトリを作成する方法について解説しました。

::recommend-link
---
items:
  - title: "WebGLで立方体(Box)ジオメトリを作成する方法"
    link: "/blog/webgl-box-geometry/"
    image: "/images/blog/webgl-box-geometry.jpg"
    description: "今回は、Three.jsでいうBoxGeometry(立方体)の作成をWebGLで行っていきます。BoxGeometry同様にwidth、height、depthを設定できるのと、分割数も設定できるようにします。"
---
::

今回は、作成した立方体や平面の法線を可視化したり、座標を確認できるヘルパー関数を作成していきます。

コードはGitHubで公開しているので参考にしてみてください！

https://github.com/nono-k/webgl-study-note

## 実装の考え方

今回作成するヘルパー関数は次のようになります。

| ヘルパー関数 | 説明 |
| --- | --- |
| GridHelper | XZ平面上にグリッドを表示するヘルパー関数 |
| AxesHelper | 座標軸を表示するヘルパー関数 |
| VertexNormalsHelper | 頂点法線を可視化するヘルパー関数 |
| FaceNormalsHelper | 面法線を可視化するヘルパー関数 |

4つともMeshクラスを継承しており、Geometryに頂点情報とインデックス情報を渡して描画を行います。

それでは、各ヘルパー関数の実装を順に見ていきましょう。

## 座標確認のヘルパー関数の作成

まずは簡単な座標確認のヘルパー関数から作成していきます。

### GridHelperの作成

XZ平面上にグリッドを表示するヘルパー関数を作成します。
使い方としては、次のようになります。

```ts [render.ts]
import { GridHelper, Vec3 } from '@/lib/webgl';

const GRID_PARAMS = {
  size: 10,
  divisions: 10,
  color: new Vec3(0.5, 0.5, 0.5),
};

const grid = new GridHelper(gl, GRID_PARAMS);
scene.add(grid);
```

パラメータとしては、グリッドのサイズ(size)、分割数(divisions)、色(color)を指定できます。それでは、GridHelperの実装を見ていきましょう。

GridHelper.tsの全コードは次のようになります。

<details>
<summary>GridHelper.tsの全コード</summary>
<div>

```ts [GridHelper.ts]
import { Geometry } from '../../core/Geometry';
import { Mesh } from '../../core/Mesh';
import { Program } from '../../core/Program';
import type { Color } from '../../math/Color';
import { Vec3 } from '../../math/Vec3';

export interface GridHelperOptions {
  size: number;
  divisions: number;
  color: Color;
}

export class GridHelper extends Mesh {
  constructor(gl: WebGL2RenderingContext, options?: Partial<GridHelperOptions>) {
    const { size = 10, divisions = 10, color = new Vec3(0.75, 0.75, 0.75) } = options || {};
    const numVertices = (divisions + 1) * 2 * 2;
    const vertices = new Float32Array(numVertices * 3);

    const hs = size / 2;
    for (let i = 0; i <= divisions; i++) {
      const t = i / divisions;
      const o = t * size - hs;

      vertices.set([o, 0, -hs, o, 0, hs], i * 12);
      vertices.set([-hs, 0, o, hs, 0, o], i * 12 + 6);
    }

    const index = new Uint16Array(numVertices);
    for (let i = 0; i < numVertices; i++) {
      index[i] = i;
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: vertices },
      index: { data: index },
      wireframe: {},
    });

    const program = new Program(gl, {
      vertex: `
      attribute vec3 position;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      fragment: `
      precision mediump float;
      uniform vec3 color;

      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
      `,
      uniforms: {
        color: { value: color },
      },
    });

    super(gl, { geometry, program });
  }
}
```
</div>
</details>

オプションのデフォルトは、サイズと分割数がそれぞれ10で、色がグレーになります。それでは、WebGLでのグリッド表示の計算部分を見ていきましょう。

#### 頂点数を計算

```ts
const numVertices = (divisions + 1) * 2 * 2;
const vertices = new Float32Array(numVertices * 3);
```

グリッドは縦方向の線と横方向の線から構成されています。分割数に+1を加えた線が必要なのと、線は2つの頂点で構成されるため2を掛け、さらに縦横の両方の線があるのでさらに2を掛けています。

`vertices`には、xyzの3つの座標が格納され、`Float32Array`として扱います。

### グリッドの頂点を生成

```ts
const hs = size / 2;
for (let i = 0; i <= divisions; i++) {
  const t = i / divisions;
  const o = t * size - hs;

  vertices.set([o, 0, -hs, o, 0, hs], i * 12);
  vertices.set([-hs, 0, o, hs, 0, o], i * 12 + 6);
}
```

`hs`はグリッドの半分のサイズになり、グリッドを原点中心に配置するために使用します。

分割数に応じてループし、`t`で0から1の範囲に正規化した値を使用し、`o`で-size/2からsize/2までの位置を計算しています。

最初のsetではz方向の線を、次のsetではx方向の線を設定しています。第2引数の12の値は、6頂点分のデータ（xyzが2つ分で6）をスキップするために使用しています。

### インデックスの生成

```ts
const index = new Uint16Array(numVertices);
for (let i = 0; i < numVertices; i++) {
  index[i] = i;
}
```

`numVertices`の数だけインデックスを作成し、各頂点に対応するインデックスを設定すれば良いでしょう。

GeometryとProgramを使用して、次のようなグリッドを描画することができるようになります。

![Gridの表示](https://res.cloudinary.com/dy8ftemi0/image/upload/v1788600080/webgl-helper-function-01_j0fvk5.jpg "Gridの表示")

### AxesHelperの作成

続いては、XYZ軸を表示するためのAxesHelperを作成していきます。
使い方としては、次のようになります。

```ts [render.ts]
import { AxesHelper, Vec3 } from '@/lib/webgl';

const AXES_PARAMS = {
  size: 6,
  symmetric: true,
  xColor: new Vec3(0.96, 0.21, 0.32),
  yColor: new Vec3(0.44, 0.64, 0.11),
  zColor: new Vec3(0.18, 0.52, 0.89),
};

const axes = new AxesHelper(gl, AXES_PARAMS);
scene.add(axes);
```

パラメータとしては、座標軸のサイズ(size)、対称表示(symmetric)、各軸の色(xColor, yColor, zColor)を指定できます。それでは、AxesHelperの実装を見ていきましょう。

AxesHelper.tsの全コードは次のようになります。

<details>
<summary>AxesHelper.tsの全コード</summary>
<div>

```ts [AxesHelper.ts]
import { Geometry } from '../../core/Geometry';
import { Mesh } from '../../core/Mesh';
import { Program } from '../../core/Program';
import type { Color } from '../../math/Color';
import { Vec3 } from '../../math/Vec3';

export interface AxesHelperOptions {
  size: number;
  symmetric: boolean;
  xColor: Color;
  yColor: Color;
  zColor: Color;
}

export class AxesHelper extends Mesh {
  constructor(gl: WebGL2RenderingContext, options?: Partial<AxesHelperOptions>) {
    const {
      size = 1,
      symmetric = false,
      xColor = new Vec3(0.96, 0.21, 0.32),
      yColor = new Vec3(0.44, 0.64, 0.11),
      zColor = new Vec3(0.18, 0.52, 0.89),
    } = options || {};

    const a = symmetric ? -size : 0;
    const b = size;

    const vertices = new Float32Array([a, 0, 0, b, 0, 0, 0, a, 0, 0, b, 0, 0, 0, a, 0, 0, b]);

    const colors = new Float32Array([...xColor, ...xColor, ...yColor, ...yColor, ...zColor, ...zColor]);

    const index = new Uint16Array([0, 1, 2, 3, 4, 5]);

    const geometry = new Geometry(gl, {
      position: { size: 3, data: vertices },
      index: { size: 1, data: index },
      color: { size: 3, data: colors },
      wireframe: {},
    });

    const program = new Program(gl, {
      vertex: `
      attribute vec3 position;
      attribute vec3 color;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;

      varying vec3 vColor;

      void main() {
        vColor = color;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      fragment: `
      precision highp float;
      varying vec3 vColor;

      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
      `,
    });

    super(gl, { geometry, program });
  }
}
```
</div>
</details>

デフォルトでは、サイズが1で、対称表示は無効、xyz軸の色はそれぞれ赤、緑、青に設定されています。それでは、WebGLでの座標軸の作成方法を見ていきましょう。

#### 軸の始点と終点

```ts
const a = symmetric ? -size : 0;
const b = size;
```

`symmetric`が`true`の時、すなわち対称表示の際には、軸の始点が負のサイズとなります。一方、`symmetric`が`false`の時は、軸の始点は原点となります。

#### 頂点、色、インデックスの設定

頂点、色、インデックスの配列を作成します。

```ts
const vertices = new Float32Array([
  a, 0, 0, 
  b, 0, 0, 

  0, a, 0, 
  0, b, 0, 

  0, 0, a, 
  0, 0, b
]);

const colors = new Float32Array([
  ...xColor, 
  ...xColor, 

  ...yColor, 
  ...yColor, 

  ...zColor, 
  ...zColor
]);

const index = new Uint16Array([0, 1, 2, 3, 4, 5]);
```

XYZ軸の頂点を作成、それぞれに対応する色を設定し、インデックスを用いて描画順序を指定しています。

設定したデータをGeometryに渡してジオメトリを作成します。

```ts
const geometry = new Geometry(gl, {
  position: { size: 3, data: vertices },
  index: { size: 1, data: index },
  color: { size: 3, data: colors },
  wireframe: {},
});
```

各軸の色は、フラグメントシェーダーで設定する`vColor`によって反映されます。

```ts
const program = new Program(gl, {
  vertex: `
  // ...
  attribute vec3 color;

  varying vec3 vColor;

  void main() {
    vColor = color;
  }
  `,
  fragment: `
  precision highp float;
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
  `,
});
```

これでXYZ軸の作成は完了です。

![XYZ軸の表示](https://res.cloudinary.com/dy8ftemi0/image/upload/v1788600080/webgl-helper-function-02_dx8hrp.jpg "XYZ軸の表示")

## 法線可視化のヘルパー関数の作成

ここからは、Boxなどのジオメトリを持つメッシュに対して法線を可視化する方法を見ていきます。

### VertexNormalsHelperの作成

各頂点から法線方向へ短い線を表示するヘルパー関数を作成します。
例としてBoxに対して使用する場合、次のようになります。

```ts [render.ts]
import { VertexNormalsHelper, Vec3 } from '@/lib/webgl';

const VERTEX_NORMALS_PARAMS = {
  size: 0.1,
  color: new Vec3(0.86, 0.16, 0.86),
};

const box = new Mesh(gl, { geometry: boxGeometry, program });
scene.add(box);

const boxVertexNormals = new VertexNormalsHelper(box, VERTEX_NORMALS_PARAMS);
scene.add(boxVertexNormals);
```

第1引数には法線を表示したいメッシュオブジェクトを指定します。第2引数には法線のサイズや色を指定するオプションを渡すことができます。

パラメータとしては、法線のサイズ(size)、色(color)を指定できます。それでは、VertexNormalsHelperの実装を見ていきましょう。

VertexNormalsHelper.tsの全コードは次のようになります。

<details>
<summary>VertexNormalsHelper.tsの全コード</summary>
<div>

```ts [VertexNormalsHelper.ts]
import { Geometry } from '../../core/Geometry';
import { Mesh } from '../../core/Mesh';
import { Program } from '../../core/Program';
import type { Color } from '../../math/Color';
import { Mat3 } from '../../math/Mat3';
import { Vec3 } from '../../math/Vec3';

export interface VertexNormalsHelperOptions {
  size: number;
  color: Color;
}

export class VertexNormalsHelper extends Mesh {
  constructor(object: Mesh, options?: Partial<VertexNormalsHelperOptions>) {
    const { size = 0.1, color = new Vec3(0.86, 0.16, 0.86) } = options || {};
    const gl = object.gl;
    const normalAttr = object.geometry.attributes.normal;
    const normalData = normalAttr.data as Float32Array;
    const nNormals = normalAttr.count ?? normalData.length / (normalAttr.size ?? 3);
    const positionsArray = new Float32Array(nNormals * 2 * 3);
    const normalsArray = new Float32Array(nNormals * 2 * 3);
    const sizeArray = new Float32Array(nNormals * 2);

    const positionData = object.geometry.attributes.position.data as Float32Array;
    const sizeData = new Float32Array([0, size]);

    for (let i = 0; i < nNormals; i++) {
      const i6 = i * 6;
      const i3 = i * 3;

      const pSub = positionData.subarray(i3, i3 + 3);
      positionsArray.set(pSub, i6);
      positionsArray.set(pSub, i6 + 3);

      const nSub = normalData.subarray(i3, i3 + 3);
      normalsArray.set(nSub, i6);
      normalsArray.set(nSub, i6 + 3);

      sizeArray.set(sizeData, i * 2);
    }

    const index = new Uint16Array(nNormals * 2);
    for (let i = 0; i < index.length; i++) {
      index[i] = i;
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positionsArray },
      normal: { size: 3, data: normalsArray },
      size: { size: 1, data: sizeArray },
      index: { size: 1, data: index },
      wireframe: {},
    });

    const program = new Program(gl, {
      vertex: `
      attribute vec3 position;
      attribute vec3 normal;
      attribute float size;

      uniform mat4 viewMatrix;
      uniform mat4 projectionMatrix;
      uniform mat4 objectWorldMatrix;
      uniform mat3 worldNormalMatrix;

      void main() {
        vec3 n = normalize(worldNormalMatrix * normal) * size;
        vec3 p = (objectWorldMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * viewMatrix * vec4(p + n, 1.0);
      }
      `,
      fragment: `
      precision highp float;
      uniform vec3 color;

      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
      `,
      uniforms: {
        color: { value: color },
        worldNormalMatrix: { value: new Mat3() },
        objectWorldMatrix: { value: object.worldMatrix },
      },
    });

    super(gl, { geometry, program });
  }
}
```
</div>
</details>

実装の方針としては、法線そのものを描画しているのではなく、法線の始点と終点の2つの頂点を使って線を描画しています。

それでは実装を見ていきましょう。

#### 法線の数を取得

```ts
const gl = object.gl;
const normalAttr = object.geometry.attributes.normal;
const normalData = normalAttr.data as Float32Array;
const nNormals = normalAttr.count ?? normalData.length / (normalAttr.size ?? 3);
```

`normalAttr`ではジオメトリの法線属性を取得しています。この法線属性から法線が何個存在するかを取得します。`count`がある場合はそのまま取得して、無い場合は、`normalData.length`から`normalAttr.size`か`3`を割って法線の数を計算しています。

#### 法線1本につき2つの頂点を作成

```ts
const positionsArray = new Float32Array(nNormals * 2 * 3);
const normalsArray = new Float32Array(nNormals * 2 * 3);
const sizeArray = new Float32Array(nNormals * 2);
```

法線を線として描画するためには2つの頂点が必要です。そのために2を掛けています。`positionsArray`や`normalsArray`はxyzの3成分を持つため、さらに3を掛けています。

#### 各法線についてデータを作成

```ts
const positionData = object.geometry.attributes.position.data as Float32Array;
const sizeData = new Float32Array([0, size]);

for (let i = 0; i < nNormals; i++) {
  const i6 = i * 6;
  const i3 = i * 3;

  const pSub = positionData.subarray(i3, i3 + 3);
  positionsArray.set(pSub, i6);
  positionsArray.set(pSub, i6 + 3);

  const nSub = normalData.subarray(i3, i3 + 3);
  normalsArray.set(nSub, i6);
  normalsArray.set(nSub, i6 + 3);

  sizeArray.set(sizeData, i * 2);
}
```

法線を1個ずつ処理しています。`i3`は元の頂点データの開始インデックス、`i6`は法線用の頂点データの開始インデックスになります。`pSub`と`nSub`はそれぞれ元の頂点座標と法線ベクトルの部分配列となり元のデータを参照しています。

`positionsArray`には法線の始点と終点の両方の頂点座標を設定し、`normalsArray`には法線の方向を設定しています。`sizeArray`には法線の長さを設定しています。

#### インデックスの生成

インデックス情報は次のようになります。

```ts
const index = new Uint16Array(nNormals * 2);
for (let i = 0; i < index.length; i++) {
  index[i] = i;
}
```

こちらも法線1本につき2つの頂点を持つことになります。

#### Geometryの作成

これら計算した値を使用してGeometryを作成します。

```ts
const geometry = new Geometry(gl, {
  position: { size: 3, data: positionsArray },
  normal: { size: 3, data: normalsArray },
  size: { size: 1, data: sizeArray },
  index: { size: 1, data: index },
  wireframe: {},
});
```

attributeを準備したので、vertexシェーダーで線として描画しましょう。

#### vertexシェーダーでの頂点法線の表示

attributeのpositionとnormalとsizeを使用して、vertexシェーダーで法線の始点と終点を計算し、線として描画します。

```ts [vertex]
attribute vec3 position;
attribute vec3 normal;
attribute float size;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 objectWorldMatrix;
uniform mat3 worldNormalMatrix;

void main() {
  vec3 n = normalize(worldNormalMatrix * normal) * size;
  vec3 p = (objectWorldMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(p + n, 1.0);
}
```

`Program`のuniformsは次のようになっています。

```ts
const program = new Program(gl, {
  // ...
  uniforms: {
    color: { value: color },
    worldNormalMatrix: { value: new Mat3() },
    objectWorldMatrix: { value: object.worldMatrix },
  },
});
```

やっていることは、`n`は法線をワールド空間へ変換しサイズを掛け、`p`は頂点をワールド空間へ変換しています。`gl_Position`には法線の終点の座標を設定しているため、線として描画されます。

これで、マゼンタの頂点法線が表示されるようになります。

![頂点法線の表示](https://res.cloudinary.com/dy8ftemi0/image/upload/v1788600080/webgl-helper-function-03_msyn4k.jpg "頂点法線の表示")

### FaceNormalsHelperの作成

最後に、面の法線を表示するヘルパー関数を作成します。
同じようにBoxに対して使用する場合、次のようになります。

```ts [render.ts]
import { FaceNormalsHelper, Vec3 } from '@/lib/webgl';

const FACE_NORMALS_PARAMS = {
  size: 0.1,
  color: new Vec3(0.15, 0.86, 0.86),
};

const box = new Mesh(gl, { geometry: boxGeometry, program });
scene.add(box);

const boxFaceNormals = new FaceNormalsHelper(box, FACE_NORMALS_PARAMS);
scene.add(boxFaceNormals);
```

同様に第1引数には法線を表示したいメッシュオブジェクトを指定します。第2引数には法線のサイズや色を指定するオプションを渡すことができます。

こちらもパラメータとしては、法線のサイズ(size)、色(color)を指定できます。それでは、FaceNormalsHelperの実装を見ていきましょう。

FaceNormalsHelper.tsの全コードは次のようになります。

<details>
<summary>FaceNormalsHelper.tsの全コード</summary>
<div>

```ts [FaceNormalsHelper.ts]
import { Geometry } from '../../core/Geometry';
import { Mesh } from '../../core/Mesh';
import { Program } from '../../core/Program';
import type { Color } from '../../math/Color';
import { Mat3 } from '../../math/Mat3';
import { Vec3 } from '../../math/Vec3';

export interface FaceNormalsHelperOptions {
  size: number;
  color: Color;
}

export class FaceNormalsHelper extends Mesh {
  constructor(object: Mesh, options?: Partial<FaceNormalsHelperOptions>) {
    const { size = 0.1, color = new Vec3(0.15, 0.86, 0.86) } = options || {};
    const gl = object.gl;
    const positionData = object.geometry.attributes.position.data as Float32Array;
    const sizeData = new Float32Array([0, size]);

    const indexAttr = object.geometry.attributes.index as { data: Uint16Array } | undefined;
    const getIndex = indexAttr ? (i: number) => indexAttr.data[i] : (i: number) => i;
    const numVertices = indexAttr ? indexAttr.data.length : Math.floor(positionData.length / 3);

    const nNormals = Math.floor(numVertices / 3);
    const positionsArray = new Float32Array(nNormals * 2 * 3);
    const normalsArray = new Float32Array(nNormals * 2 * 3);
    const sizeArray = new Float32Array(nNormals * 2);

    const vA = new Vec3();
    const vB = new Vec3();
    const vC = new Vec3();
    const vCenter = new Vec3();
    const vNormal = new Vec3();

    for (let i = 0; i < numVertices; i += 3) {
      vA.fromArray(positionData, getIndex(i + 0) * 3);
      vB.fromArray(positionData, getIndex(i + 1) * 3);
      vC.fromArray(positionData, getIndex(i + 2) * 3);

      vCenter
        .add(vA, vB)
        .add(vC)
        .multiply(1 / 3);
      vA.sub(vA, vB);
      vC.sub(vC, vB);
      vNormal.cross(vC, vA).normalize();

      const i2 = i * 2;
      positionsArray.set(vCenter, i2);
      positionsArray.set(vCenter, i2 + 3);

      normalsArray.set(vNormal, i2);
      normalsArray.set(vNormal, i2 + 3);
      sizeArray.set(sizeData, (i / 3) * 2);
    }

    const index = new Uint16Array(nNormals * 2);
    for (let i = 0; i < index.length; i++) {
      index[i] = i;
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positionsArray },
      normal: { size: 3, data: normalsArray },
      size: { size: 1, data: sizeArray },
      index: { size: 1, data: index },
      wireframe: {},
    });

    const program = new Program(gl, {
      vertex: `
      attribute vec3 position;
      attribute vec3 normal;
      attribute float size;

      uniform mat4 viewMatrix;
      uniform mat4 projectionMatrix;
      uniform mat4 objectWorldMatrix;
      uniform mat3 worldNormalMatrix;

      void main() {
        vec3 n = normalize(worldNormalMatrix * normal) * size;
        vec3 p = (objectWorldMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * viewMatrix * vec4(p + n, 1.0);
      }
      `,
      fragment: `
      precision highp float;
      uniform vec3 color;

      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
      `,
      uniforms: {
        color: { value: color },
        worldNormalMatrix: { value: new Mat3() },
        objectWorldMatrix: { value: object.worldMatrix },
      },
    });

    super(gl, { geometry, program });
  }
}
```
</div>
</details>

VertexNormalHelperと同様に法線を描画するには、始点と終点を計算して、それを線として描画する必要があります。

WebGLでは、面は三角形で構成されているため、各三角形の法線を計算して描画する必要があります。三角形の数としては、`nNormals`として次のように計算してます。

```ts
const nNormals = Math.floor(numVertices / 3);
```

これは、1つの三角形が3つの頂点で構成されているため、全頂点数を3で割ることで三角形の数を求めています。

#### 面法線の計算

途中までは、VertexNormalHelperと同様なのでそちらを見ていただき、面法線の計算部分を解説します。

```ts
const getIndex = indexAttr ? (i: number) => indexAttr.data[i] : (i: number) => i;

const vA = new Vec3(); // 三角形の頂点A
const vB = new Vec3(); // 三角形の頂点B
const vC = new Vec3(); // 三角形の頂点C
const vCenter = new Vec3(); // 三角形の中心
const vNormal = new Vec3(); // 三角形の法線

for (let i = 0; i < numVertices; i += 3) {
  vA.fromArray(positionData, getIndex(i + 0) * 3);
  vB.fromArray(positionData, getIndex(i + 1) * 3);
  vC.fromArray(positionData, getIndex(i + 2) * 3);

  vCenter
    .add(vA, vB)
    .add(vC)
    .multiply(1 / 3);

  vA.sub(vA, vB);
  vC.sub(vC, vB);
  vNormal.cross(vC, vA).normalize();

  const i2 = i * 2;
  positionsArray.set(vCenter, i2);
  positionsArray.set(vCenter, i2 + 3);

  normalsArray.set(vNormal, i2);
  normalsArray.set(vNormal, i2 + 3);
  sizeArray.set(sizeData, (i / 3) * 2);
}
```

3頂点ずつ処理して各三角形の中心と法線を計算しています。

三角形の中心の計算式は、(A + B + C) / 3となります。
三角形の法線の計算式は、((C - B) × (A - B)) / ||(C - B) × (A - B)||です。

コードでは、`Vec3`クラスにある`add`や`sub`、`cross`、`normalize`メソッドを使用して計算しています。

これら計算した三角形の中心と法線を使用して、`positionsArray`や`normalsArray`にデータを格納しています。

#### Geometryの作成

attributeを準備できたので、これを使ってGeometryを作成します。

```ts
const geometry = new Geometry(gl, {
  position: { size: 3, data: positionsArray },
  normal: { size: 3, data: normalsArray },
  size: { size: 1, data: sizeArray },
  index: { size: 1, data: index },
  wireframe: {},
});
```

VertexNormalHelperと同様に、vertexシェーダーで面の法線を描画します。

#### vertexシェーダーでの面法線の表示

```ts [vertex]
attribute vec3 position;
attribute vec3 normal;
attribute float size;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 objectWorldMatrix;
uniform mat3 worldNormalMatrix;

void main() {
  vec3 n = normalize(worldNormalMatrix * normal) * size;
  vec3 p = (objectWorldMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(p + n, 1.0);
}
```

vertexシェーダーはVertexNormalHelperと同様なことが分かるでしょう。
これで、シアンの面法線が表示されるようになりました！

![面法線の表示](https://res.cloudinary.com/dy8ftemi0/image/upload/v1788600080/webgl-helper-function-04_lir70o.jpg "面法線の表示")

## まとめ

今回作成したヘルパー関数の表示と、Box・Plane・Sphereに対しての確認は次のようになります。ぜひデモサイトでも確認してみてください！

![今回作成したヘルパー関数のすべて](https://res.cloudinary.com/dy8ftemi0/image/upload/v1788600080/webgl-helper-function-05_pf98jp.jpg "今回作成したヘルパー関数のすべて")

::link-btn
---
href: https://nono-k.github.io/webgl-study-note/webgl/helper/
---
::

今回は、WebGLでデバックとして使用するヘルパー関数の作成方法について解説しました。Three.jsでも同様なものがありますが、実装がどのようになっているのか参考になればと思います。

次回は、WebGLで画像や動画を表示させるTextureクラスの作成方法を解説したいと思います。