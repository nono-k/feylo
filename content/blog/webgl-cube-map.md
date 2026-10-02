---
title: "WebGLでキューブ環境マッピングを作成する"
description: "今回は、Three.jsでいうCubeTextureLoaderに相当するキューブ環境マッピングをWebGLで作成する方法を解説します。実装では新たにCubeTextureクラスを作成します。デモサイトでは、立方体にキューブ環境マッピングを適用し、球体には反射マッピングを表示しています。"
date: 2026-10-03
tags: 
  - "WebGL"
image: "/images/blog/webgl-cube-map.jpg"
summaryList:  
  - "WebGLでキューブ環境マッピングを描画する方法"
  - "GLSLでの反射マッピングの実装方法"
---

## はじめに

前回は、WebGLで画像や動画を描画するテクスチャクラスを作成する方法について解説しました。

::recommend-link
---
items:
  - title: "WebGLで画像や動画を描画するテクスチャクラスを作成する"
    link: "/blog/webgl-image-video-texture/"
    image: "/images/blog/webgl-image-video-texture.jpg"
    description: "今回は、Three.jsでいうTextureに相当する、画像や動画を描画するテクスチャクラスをWebGLで作成する方法を解説します。デモサイトでは、平面に画像を、立方体に動画を貼り付けて表示しています。"
---
::

今回は応用として、WebGLでキューブ環境マッピングを作成するCubeTextureクラスを作成していきます。

コードはGitHubで公開しているので参考にしてみてください！

https://github.com/nono-k/webgl-study-note

::link-btn
---
href: https://nono-k.github.io/webgl-study-note/webgl/cube-map/
---
::

## 実装の考え方

キューブ環境マッピングは、レンダリングされるオブジェクトやカメラを、一つの大きな立方体の中におき、その立方体の6面にそれぞれ異なるテクスチャを貼り付けることで、周囲の環境を反映させる技法です。

画像は[こちら](https://www.humus.name/index.php?page=Textures&start=0)のサイトからダウンロードして使用しました。6枚の展開図のような画像になっているのが分かるかと思います。

![6面のテクスチャ](https://res.cloudinary.com/dy8ftemi0/image/upload/v1790784630/webgl-cube-map-01_fkqpbe.jpg "6面のテクスチャ")

フラグメントシェーダーで通常のテクスチャを扱う場合は、uniform変数として`sampler2D`を使用しUV(2次元)で色を取得します。キューブ環境マッピングの場合は、`samplerCube`を使用し、方向ベクトル(3次元)で色を取得します。

デモの場合、立方体と球体では同じテクスチャを使用しますが、立方体には環境画像を貼り、球体には中心から見た方向の色を返すことでガラスの反射みたいな表現ができます。

| オブジェクト | 方向の意味 |
| --- | --- |
| 立方体 | 「その頂点が向いている方向」 = 周囲の景色 |
| 球体 | 「視線が法線で跳ね返った方向」 = 映り込み |

それでは、キューブ環境マッピングを実装するために、新しくCubeTextureクラスを作成していきましょう。

## CubeTextureクラスの作成

`extras`ディレクトリに`CubeTexture.ts`ファイルを作成していきます。`index.ts`ファイルも更新して、`CubeTexture`クラスをエクスポートするようにしておきましょう。

```ts [index.ts]
// Extras
export { CubeTexture } from './extras/CubeTexture';
```

まずは、立方体に貼る画像のソースの型を定義しておきましょう。

```ts [CubeTexture.ts]
export type CubeTextureSource = {
  px: string;
  nx: string;
  py: string;
  ny: string;
  pz: string;
  nz: string;
};
```

pは正の方向、nは負の方向を表します。x, y, zはそれぞれの軸を意味しています。例えば、`px`はx軸の正の方向に貼るテクスチャのソースを指定します。

### 初期化

コンストラクタまでは以下のようになります。

```ts [CubeTexture.ts]
export class CubeTexture {
  gl: WebGLRenderingContext;
  texture: WebGLTexture;
  source: CubeTextureSource;

  width = 0;
  height = 0;
  needsUpdate = false;

  minFilter: number;
  magFilter: number;
  generateMipmap: boolean;

  constructor(
    gl: WebGL2RenderingContext,
    source: CubeTextureSource,
    options: {
      minFilter?: number;
      magFilter?: number;
      generateMipmap?: boolean;
    } = {},
  ) {
    this.gl = gl;
    this.source = source;
    this.minFilter = options.minFilter ?? gl.LINEAR;
    this.magFilter = options.magFilter ?? gl.LINEAR;
    this.generateMipmap = options.generateMipmap ?? true;
    this.texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.minFilter);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, this.magFilter);

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);

    this.load();
  }
}
```

ほとんど前回の`Texture`クラスで解説した内容と同じですが、違う点は、`TEXTURE_2D`ではなく`TEXTURE_CUBE_MAP`を使用していること、ラップモードに`gl.TEXTURE_WRAP_R`を追加しています。

```ts [CubeTexture.ts]
gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.minFilter);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, this.magFilter);

gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
```

つまりGPUに立方体マップ用のテクスチャとして認識させ、各方向に対応する画像を貼り付けることを伝えています。また、先述の通り`samplerCube`は3方向使用するので、Z方向である`gl.TEXTURE_WRAP_R`も設定しておく必要があります。

### 6枚画像の読み込んで、textImage2DでGPUに転送する

6枚の画像を読み込み、`texImage2D`でGPUに転送するのは`load`メソッドで行います。画像は、次のように`Promise.all`を使って非同期に読み込みます。


```ts [CubeTexture.ts]
export class CubeTexture {
  // ...
  async load() {
    const gl = this.gl;

    const images = await Promise.all([
      this.loadImage(this.source.px),
      this.loadImage(this.source.nx),
      this.loadImage(this.source.py),
      this.loadImage(this.source.ny),
      this.loadImage(this.source.pz),
      this.loadImage(this.source.nz),
    ]);

    const [positiveX, negativeX, positiveY, negativeY, positiveZ, negativeZ] = images;

    this.width = positiveX.width;
    this.height = positiveX.height;

    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);

    const faces = [
      { target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, image: positiveX },
      { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, image: negativeX },
      { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, image: positiveY },
      { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, image: negativeY },
      { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, image: positiveZ },
      { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, image: negativeZ },
    ];

    for (const face of faces) {
      gl.texImage2D(face.target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, face.image);
    }

    if (this.generateMipmap) {
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    }

    this.needsUpdate = false;
  }
  
  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }
}
```

配列を分割代入して、各方向の画像を個別の変数に格納しています。これにより、`texImage2D`で各方向に対応する画像を簡単に指定できるようになります。

各立方体の面を定義するには、`gl.TEXTURE_CUBE_MAP_POSITIVE_X`のように各方向の定数を使用して`texImage2D`で指定します。

```ts [CubeTexture.ts]
const faces = [
  { target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, image: positiveX },
  { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, image: negativeX },
  { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, image: positiveY },
  { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, image: negativeY },
  { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, image: positiveZ },
  { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, image: negativeZ },
];

for (const face of faces) {
  gl.texImage2D(face.target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, face.image);
}
```

通常の2Dテクスチャですと下記のようになりますが、

```ts
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
```

Cube Mapの場合は、`textImage2D`の第1引数に各立方体の面を指定する必要があります。例えば、`gl.TEXTURE_CUBE_MAP_POSITIVE_X`のように指定します。

```ts
gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, positiveX);
```

もしオプションのミップマップを生成したい場合は、`gl.generateMipmap(gl.TEXTURE_CUBE_MAP)`を呼び出す必要があります。デフォルトは生成しない仕様になっています。

### 更新処理

Cube Mapテクスチャを更新するには、`update`メソッドを呼び出して、アクティブなテクスチャユニットにバインドする必要があります。これにより、シェーダーで使用する際に正しいテクスチャが参照されます。

```ts [CubeTexture.ts]
export class CubeTexture {
  // ...
  update(uint = 0) {
    const gl = this.gl;

    gl.activeTexture(gl.TEXTURE0 + uint);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
  }
}
```

これでCubeTextureクラスの基本的な実装が完了しました。次に、このCubeTextureを使用してキューブ環境マッピングを作成する方法について説明します。

## キューブ環境マッピングの作成

![キューブ環境マッピング](https://res.cloudinary.com/dy8ftemi0/image/upload/v1790872747/webgl-cube-map-02_rxg8gg.jpg "キューブ環境マッピング")

::link-btn
---
href: https://nono-k.github.io/webgl-study-note/webgl/cube-map/
---
::

デモの`render.ts`のコードは次のようになります。

<details>
<summary>キューブ環境マッピングのrender.ts</summary>
<div>

```ts [render.ts]
import nx from '@/assets/images/environment/Maskonaive/negx.jpg';
import ny from '@/assets/images/environment/Maskonaive/negy.jpg';
import nz from '@/assets/images/environment/Maskonaive/negz.jpg';
import px from '@/assets/images/environment/Maskonaive/posx.jpg';
import py from '@/assets/images/environment/Maskonaive/posy.jpg';
import pz from '@/assets/images/environment/Maskonaive/posz.jpg';
import { Box, Camera, CubeTexture, Mesh, Orbit, Program, Render, Scene, Sphere } from '@/lib/webgl';

import boxFragment from './box.frag?raw';
import boxVertex from './box.vert?raw';

import sphereFragment from './sphere.frag?raw';
import sphereVertex from './sphere.vert?raw';

export const onload = () => {
  const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
  const render = new Render(canvas);
  render.fitScreen();
  const gl = render.gl;
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  const camera = new Camera(gl, { fov: 45, near: 0.1, far: 100 });
  camera.position.set(-2, 1, -3);
  camera.lookAt([0, 0, 0]);

  const controls = new Orbit(camera);

  const scene = new Scene();

  const environmentTexture = new CubeTexture(gl, {
    px: px.src,
    nx: nx.src,
    py: py.src,
    ny: ny.src,
    pz: pz.src,
    nz: nz.src,
  });

  const boxGeometry = new Box(gl);

  const boxProgram = new Program(gl, {
    vertex: boxVertex,
    fragment: boxFragment,
    uniforms: {
      uEnvironment: { value: environmentTexture },
    },
  });

  const box = new Mesh(gl, {
    geometry: boxGeometry,
    program: boxProgram,
  });

  box.scale.set(20);
  scene.add(box);

  const sphereGeometry = new Sphere(gl, {
    widthSegments: 32,
    heightSegments: 32,
  });

  const sphereProgram = new Program(gl, {
    vertex: sphereVertex,
    fragment: sphereFragment,
    uniforms: {
      uEnvironment: { value: environmentTexture },
    },
  });

  const sphere = new Mesh(gl, {
    geometry: sphereGeometry,
    program: sphereProgram,
  });

  sphere.scale.set(2);
  scene.add(sphere);

  const update = () => {
    render.render({ scene, camera });

    controls.update();

    requestAnimationFrame(update);
  };

  update();

  const resize = () => {
    render.setSize(window.innerWidth, window.innerHeight);
    camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
  };
  window.addEventListener('resize', resize);
  resize();
};
```
</div>
</details>

ここでは立方体と球体のコードを見ていきましょう。

### 立方体の描画

先述の通り、キューブ環境マッピングで使用する立方体と球体には、同じテクスチャを使用します。シェーダーは別に用意する必要があります。

```ts [render.ts]
const environmentTexture = new CubeTexture(gl, {
  px: px.src,
  nx: nx.src,
  py: py.src,
  ny: ny.src,
  pz: pz.src,
  nz: nz.src,
});

const boxGeometry = new Box(gl);

const boxProgram = new Program(gl, {
  vertex: boxVertex,
  fragment: boxFragment,
  uniforms: {
    uEnvironment: { value: environmentTexture },
  },
});

const box = new Mesh(gl, {
  geometry: boxGeometry,
  program: boxProgram,
});

box.scale.set(20);
scene.add(box);
```

キューブ環境マッピングは、大きい立方体の中にカメラを配置するので、立方体のスケールを20と拡大して描画するようにしています。

#### 立方体の頂点シェーダー

立方体の頂点シェーダー(box.vert)は、次のようになります。

```ts [box.vert]
#version 300 es
precision mediump float;

in vec3 position;
in vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec3 vDirection;

void main() {
  vDirection = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

立方体では、その頂点が向いている方向をそのまま環境マッピングに使用します。なので、varying変数として頂点シェーダーからフラグメントシェーダーに渡すのは、頂点の位置ベクトルそのものになります。

#### 立方体のフラグメントシェーダー

立方体のフラグメントシェーダー(box.frag)は、次のようになります。

```ts [box.frag]
#version 300 es
precision mediump float;

uniform samplerCube uEnvironment;

in vec3 vDirection;
out vec4 fragColor;

void main() {
  vec3 direction = normalize(vDirection);
  vec4 texture = texture(uEnvironment, direction);

  fragColor = texture;
}
```

キューブ環境マッピングでは、`samplerCube`を使用し、方向ベクトルに基づいてテクスチャを描画します。

頂点シェーダーから渡されてきた頂点の方向ベクトル(vDirection)を正規化し、`texture`関数の第2引数として使用するだけで、立方体に環境マッピングを適用できることになります。

最後に反射マッピングする球体を見ていきましょう

### 球体の描画

球体を描画する`render.ts`のコードは、次のようになります。

```ts [render.ts]
const sphereGeometry = new Sphere(gl, {
  widthSegments: 32,
  heightSegments: 32,
});

const sphereProgram = new Program(gl, {
  vertex: sphereVertex,
  fragment: sphereFragment,
  uniforms: {
    uEnvironment: { value: environmentTexture },
  },
});

const sphere = new Mesh(gl, {
  geometry: sphereGeometry,
  program: sphereProgram,
});

sphere.scale.set(2);
scene.add(sphere);
```

球体が滑らかに描画されるように、セグメント数を多めに設定しています。

#### 球体の頂点シェーダー

球体の頂点シェーダー(sphere.vert)は、次のようになります。

```ts [sphere.vert]
#version 300 es
precision mediump float;

in vec3 position;
in vec3 normal;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec3 vWorldPosition;
out vec3 vWorldNormal;

void main() {
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

フラグメントシェーダーに渡すのは、`vWorldPosition`と`vWorldNormal`になります。`vWorldPosition`はワールド座標系での頂点位置を表し、`vWorldNormal`はワールド座標系での法線ベクトルを表します。

`vWorldNormal`では、normalが三次元なので、3x3の行列に変換してワールド座標系に変換しています。また反射の計算では単位ベクトルとして扱うので`normalize`で正規化しています。

#### 球体のフラグメントシェーダー

球体のフラグメントシェーダー(sphere.frag)は、次のようになります。

```ts [sphere.frag]
#version 300 es
precision mediump float;

uniform samplerCube uEnvironment;
uniform vec3 cameraPosition;

in vec3 vWorldPosition;
in vec3 vWorldNormal;
out vec4 fragColor;

void main() {
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  vec3 normal = vWorldNormal;

  vec3 reflectionDirection = reflect(-viewDir, normal);
  vec4 texture = texture(uEnvironment, reflectionDirection);

  fragColor = texture;
}
```

`cameraPosition`は、`Camera`クラスで設定したカメラのワールド座標系での位置を表します。この値と頂点シェーダーから渡された`vWorldPosition`を引くことで、視線方向ベクトル(viewDir)を求めています。視線方向ベクトルは、球面表面からカメラへ向かう方向を表します。また方向だけ欲しいので、正規化しています。

この視線方向ベクトルと法線ベクトルを使って反射方向を計算し、その方向に対応する環境マップの色を取得しています。

GLSLの`reflect`関数は次のように使います。

```ts [reflect]
reflect(I, N)
```

- I: 入射ベクトル（視線方向ベクトル）
- N: 法線ベクトル（単位ベクトル）
- 戻り値: 反射ベクトル（単位ベクトル）

ここで`-viewDir`としているのは、カメラから球面表面への入射ベクトルが必要なので反転しています。

反射ベクトルを`texture`関数の第2引数として渡すことで、その方向に対応する環境マップの色を取得することができ、球体を反射マッピングで描画することができます。

以上が球体の反射マッピングの実装方法になります。
ぜひデモで動かしながら確認してみてください！

## まとめ

今回は`Texture`クラスを応用して、キューブ環境マッピングを実装しました。WebGLの標準機能である`gl.TextureCubeMap`などを使用するだけで、簡単に立方体の6面にテクスチャを貼り付けることができることが分かるかと思います。

反射マッピングのコードは、法線などを利用して描画するので難しいと思いますが、実際に図にして考えれば理解できるかと思います！

次回はより簡単に実装できる、球体にマッピングするスカイドームの作成方法を解説したいと思います。