---
title: "WebGLで画像や動画を描画するテクスチャクラスを作成する"
description: "今回は、Three.jsでいうTextureに相当する、画像や動画を描画するテクスチャクラスをWebGLで作成する方法を解説します。デモサイトでは、平面に画像を、立方体に動画を貼り付けて表示しています。"
date: 2026-09-19
tags: 
  - "WebGL"
image: "/images/blog/webgl-image-video-texture.jpg"
summaryList:  
  - "WebGLで画像や動画を描画する方法"
---

## はじめに

前回は、WebGLで法線の可視化や座標確認のためのヘルパー関数を作成する方法について解説しました。

::recommend-link
---
items:
  - title: "WebGLで法線の可視化や座標確認のためのヘルパー関数を作成する"
    link: "/blog/webgl-helper-function/"
    image: "/images/blog/webgl-helper-function.jpg"
    description: "今回は、Three.jsでいうViewHelperやVertexNormalsHelperに相当する、法線の可視化や座標確認のためのヘルパー関数をWebGLで作成する方法を解説します。"
---
::

今回は、画像や動画を描画するテクスチャクラスを作成していきます。

コードはGitHubで公開しているので参考にしてみてください！

https://github.com/nono-k/webgl-study-note

## 実装の考え方

WebGLで画像や動画を表示するときには、**テクスチャ(Texture)**という仕組みを使います。Three.jsなどのライブラリを使っていると、画像を読み込んでマテリアルを設定するだけで簡単に表示できます。

しかし、その内部では、

- 画像を読み込む
- WebGLのテクスチャを作成する
- テクスチャのパラメータを設定する
- 画像データをGPUへ転送する
- シェーダーからテクスチャを参照する

といった処理が行われています。

今回はWebGL2.0を使って、まずは画像をテクスチャとして表示する方法を確認し、その後に動画をテクスチャとして扱う方法まで解説します。

## WebGLにおけるテクスチャとは

WebGLでは、画像そのものを直接シェーダーから参照することはできません。まず画像データをGPU側のメモリに転送し、WebGLが扱えるテクスチャオブジェクトにする必要があります。

シェーダー側では、uniform変数としてテクスチャを`sampler2D`として受け取り、次のように使用します。

```ts [fragment.glsl]
uniform sampler2D uTexture;

in vec2 vUv;
out vec4 fragColor;
void main() {
  fragColor = texture(uTexture, vUv);
}
```

それでは、実際にWebGLで画像をテクスチャとして表示する方法を見ていきましょう。

## Textureクラスの作成

`core`ディレクトリに`Texture.ts`ファイルを作成していきます。`index.ts`ファイルも更新して、`Texture`クラスをエクスポートするようにしておきましょう。

```ts [index.ts]
// Core
export { Texture } from './core/Texture';
```

まずは、テクスチャのソースとして扱える型とオプションの型を定義します。

```ts [Texture.ts]
export type TextureSource = 
  |string 
  | HTMLImageElement 
  | HTMLVideoElement 
  | HTMLCanvasElement 
  | OffscreenCanvas 
  | ImageBitmap 
  | ImageData;

export type TextureOptions = {
  wrapS?: number;
  wrapT?: number;
  minFilter?: number;
  magFilter?: number;
  generateMipmaps?: boolean;
  flipY?: boolean;
  premultiplyAlpha?: boolean;
  format?: number;
  internalFormat?: number;
  type?: number;
  width?: number;
  height?: number;
}
```

`TextureSource`にある通り、テクスチャのソースとしては文字列(URL)や画像、動画、キャンバスなど様々な型を扱うことができます。

`TextureOptions`は、WebGLのテクスチャを作成するときに設定できるオプションです。項目は次のようになります。

| プロパティ | 説明 | デフォルト値 |
| --- | --- | --- |
| wrapS | テクスチャの水平方向のラップモード | `gl.CLAMP_TO_EDGE` |
| wrapT | テクスチャの垂直方向のラップモード | `gl.CLAMP_TO_EDGE` |
| minFilter | テクスチャの縮小フィルタ | `gl.LINEAR` |
| magFilter | テクスチャの拡大フィルタ | `gl.LINEAR` |
| generateMipmaps | ミップマップを生成するかどうか | `true` |
| flipY | Y軸方向に反転するかどうか | `true` |
| premultiplyAlpha | アルファを乗算するかどうか | `false` |
| format | テクスチャのフォーマット | `gl.RGBA` |
| internalFormat | テクスチャの内部フォーマット | `gl.RGBA` |
| type | テクスチャのデータ型 | `gl.UNSIGNED_BYTE` |
| width | テクスチャの幅（ピクセル） | `0` |
| height | テクスチャの高さ（ピクセル） | `0` |

デフォルト値は、オプションに値が指定されなかった場合に使用される値になります。これはコンストラクタ内で`??`演算子を使って設定されています。

```ts [Texture.ts]
export class Texture {
  // ...
  constructor(gl: WebGL2RenderingContext, source: TextureSource, options: TextureOptions = {}) {
    this.gl = gl;
    const isVideo = source instanceof HTMLVideoElement;
    this.wrapS = options.wrapS ?? gl.CLAMP_TO_EDGE;
    this.wrapT = options.wrapT ?? gl.CLAMP_TO_EDGE;
    this.minFilter = options.minFilter ?? gl.LINEAR;
    this.magFilter = options.magFilter ?? gl.LINEAR;
    this.generateMipmaps = options.generateMipmaps ?? !isVideo;
    this.flipY = options.flipY ?? true;
    this.premultiplyAlpha = options.premultiplyAlpha ?? false;
    this.format = options.format ?? gl.RGBA;
    this.internalFormat = options.internalFormat ?? gl.RGBA;
    this.type = options.type ?? gl.UNSIGNED_BYTE;
    this.width = options.width ?? 0;
    this.height = options.height ?? 0;
  }
}
```

### コンストラクタでテクスチャを作成する

`Texture`クラスのコンストラクタでは、`gl.createTexture()`を使ってWebGLのテクスチャオブジェクトを作成し、`gl.bindTexture(gl.TEXTURE_2D, tex)`でバインドする処理を行います。

```ts [Texture.ts]
export class Texture {
  // ...
  constructor(gl: WebGL2RenderingContext, source: TextureSource, options: TextureOptions = {}) {
    // ...    
    const tex = gl.createTexture();
    this.texture = tex;

    gl.bindTexture(gl.TEXTURE_2D, tex);
  }
}
```

その後に、`gl.texParameteri`を使って各種設定を行います。

### MIN_FILTERとMAG_FILTER

`MIN_FILTER`はテクスチャを縮小して表示するときのフィルタリング方法を指定します。`MAG_FILTER`はテクスチャを拡大して表示するときのフィルタリング方法を指定します。

```ts [Texture.ts]
export class Texture {
  // ...
  constructor(gl: WebGL2RenderingContext, source: TextureSource, options: TextureOptions = {}) {
    // ...    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
  }
}
```

デフォルト値では、どちらも`gl.LINEAR`が使用されます。これは、周囲のピクセルを補間して滑らかに表示するフィルタリング方法です。

他に`gl.NEAREST`というフィルタリング方法もあります。これは、最も近いピクセルの値をそのまま使用する方法で、ドット絵のような表現に適しています。

### WRAP_SとWRAP_T

`WRAP_S`はテクスチャの水平方向のラップ方法を指定し、`WRAP_T`はテクスチャの垂直方向のラップ方法を指定します。

```ts [Texture.ts]
export class Texture {
  // ...
  constructor(gl: WebGL2RenderingContext, source: TextureSource, options: TextureOptions = {}) {
    // ...

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
  }
}
```

デフォルト値では、どちらも`gl.CLAMP_TO_EDGE`が使用されます。これは、テクスチャの端のピクセルを繰り返し使用してラップする方法です。

他に`gl.REPEAT`というラップ方法もあります。これは、テクスチャを繰り返して表示する方法で、パターン状のテクスチャに適しています。また、`gl.MIRRORED_REPEAT`というラップ方法もあり、テクスチャを反転させながら繰り返して表示する方法です。

### URLから画像を読み込む

`source`が文字列だった場合は、その文字列をURLとして画像を読み込みます。

```ts [Texture.ts]
if (typeof source === 'string') {
  this.source = source;
  this.load(source);
  return;
}
```

例えば、次のようにした場合です。

```ts
const texture = new Texture(gl, '/images/image.png');
```

画像読み込みの処理は次のようになります。

```ts [Texture.ts]
private loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = e => reject(e);
  });
}
```

ここでは`Promise`を使って非同期に画像を読み込んでいるので、次のように`await`を使って、画像の読み込み完了を待つことができます。

```ts [Texture.ts]
this.source = await this.loadImage(source);
```

なので`load`メソッドは次の通りです。

```ts [Texture.ts]
async load(source: TextureSource) {
  if (typeof source === 'string') {
    this.source = await this.loadImage(source);
  } else {
    this.source = source;
  }

  this.needsUpdate = true;
  this.update();
}
``` 

読み込みが完了すると、`needsUpdate`を`true`に設定し、`update`メソッドを呼び出してGPUへ転送します。それでは、`update`メソッドの内容を見てみましょう。

### update()で画像をGPUへ送る

`update`メソッドは、次のようになります。

```ts [Texture.ts]
update(uint = 0) {
  this.bind(uint);

  const src = this.source;
  if (!src || typeof src === 'string') return;

  // ...
}
```

まず、`bind`メソッドを呼び出します。`bind`メソッドは次のようにしてます。

```ts [Texture.ts]
bind(uint = 0) {
  const gl = this.gl;
  gl.activeTexture(gl.TEXTURE0 + uint);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
}
```

これは、テクスチャユニットを指定して、そのテクスチャをバインドする処理です。たとえば、`texture.bind(0)`なら`TEXTURE0`を使用します。

#### flipY

続いて、`flipY`の設定について説明します。`flipY`は、テクスチャの垂直方向を反転させるかどうかを指定するオプションです。WebGLでは、画像の座標系とテクスチャの座標系が異なるため、通常は`flipY`を`true`に設定して反転させます。

```ts [Texture.ts]
update(uint = 0) {
  // ...
  const gl = this.gl;
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
}
```

#### premultiplyAlpha

`premultiplyAlpha`は、テクスチャのアルファ値を事前に乗算するかどうかを指定するオプションです。デフォルトで`false`にしているので、今回の実装では無効になっています。

```ts [Texture.ts]
update(uint = 0) {
  // ...
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
}
```

#### 画像サイズを取得する

画像のサイズは次のように取得しています。

```ts [Texture.ts]
const { width, height } = this.getSize(src);
```

`getSize`メソッドは次のように実装されています。

```ts [Texture.ts]
private getSize(src: Exclude<TextureSource, string>) {
  if (src instanceof HTMLVideoElement) {
    return { width: src.videoWidth, height: src.videoHeight };
  }

  return { width: src.width, height: src.height };
}
```

画像と動画では、サイズの取得方法が異なるため、`getSize`メソッドでそれぞれに対応しています。この`width`と`height`を使って、2種類のAPIを使い分けます。

#### texImage2DとtexSubImage2D

画像をGPUへ転送するとき、コードでは2種類のAPIを使い分けています。

```ts [Texture.ts]
if (width !== this.width || height !== this.height) {
  this.width = width;
  this.height = height;
  gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, this.format, this.type, src);
} else {
  gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.format, this.type, src);
}
```

`texImage2D`は、テクスチャの画像データを新しく設定するときに使用します。この判定は、画像のサイズが前回と異なる場合に行われます。

一方、`texSubImage2D`は、既存のテクスチャの一部を更新するときに使用します。サイズが変わらない場合は、`texSubImage2D`を使うことで効率的にGPUのメモリを更新できます。特に動画テクスチャの更新では、この方法が有効になります。

#### 画像ではMipmapを生成する

画像テクスチャの場合、通常はMipmapを生成して、異なる解像度での描画を効率化します。Mipmapは、テクスチャの縮小版を自動的に生成する仕組みです。

```ts [Texture.ts]
if (this.generateMipmaps && !isVideo) {
  gl.generateMipmap(gl.TEXTURE_2D);
}
```

動画の場合は、毎フレーム画像が変化するので、Mipmapを生成するとパフォーマンスに影響を与える可能性があります。そのため、動画テクスチャでは通常Mipmapを生成しません。

これで`Texture`クラスは一通り説明しました。全コードは[リポジトリ](https://github.com/nono-k/webgl-study-note/blob/main/src/lib/webgl/core/Texture.ts)を参照してください。

## Program.tsへ追加

シェーダーのユニフォームにテクスチャを設定できるように、`Program`クラスの`setUniforms`メソッドを次のように追加しましょう。

```ts [Program.ts]
export class Program {
  // ...
  setUniforms() {
    // ...
    if (uniform.value.texture) {
      textureUint = textureUint + 1;
      uniform.value.update(textureUint);
      return this.setUniform(gl, location, textureUint, 'init');
    }
  }
}
```

画像と動画を描画する準備はこれで整いました。次に、実際に描画するコードを見ていきましょう。

## 画像と動画を描画する

![画像と動画の描画](https://res.cloudinary.com/dy8ftemi0/image/upload/v1789718677/webgl-image-video-texture-01_hgqv2g.jpg "画像と動画の描画")

::link-btn
---
href: https://nono-k.github.io/webgl-study-note/webgl/texture/
---
::

デモの全コードは次のようになります。

<details>
<summary>画像と動画の描画方法</summary>
<div>

```ts [render.ts]
import image from '@/assets/images/autumn.jpg';
import video from '@/assets/video/video-01.mp4';
import { Box, Camera, Mesh, Orbit, Plane, Program, Render, Scene, Texture } from '@/lib/webgl';
import fragment from './index.frag?raw';
import vertex from './index.vert?raw';

export const onload = () => {
  const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
  const render = new Render(canvas);
  render.fitScreen();
  const gl = render.gl;
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  const camera = new Camera(gl, { fov: 45, near: 0.1, far: 100 });
  camera.position.set(1, 1, 4);
  camera.lookAt([0, 0, 0]);

  const controls = new Orbit(camera);

  const scene = new Scene();

  const planeGeometry = new Plane(gl, { width: 3, height: 2 });
  const imageTexture = new Texture(gl, image.src);

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTexture: { value: imageTexture },
    },
  });

  const plane = new Mesh(gl, { geometry: planeGeometry, program });
  plane.position.set(-2, 0, 0);
  scene.add(plane);

  const boxGeometry = new Box(gl, { width: 1.5, height: 1.5, depth: 1.5 });

  const videoElement = document.createElement('video') as HTMLVideoElement;
  videoElement.src = video;
  videoElement.loop = true;
  videoElement.muted = true;
  videoElement.setAttribute('playsinline', 'playsinline');
  videoElement.play();

  const videoTexture = new Texture(gl, videoElement);

  const videoProgram = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTexture: { value: videoTexture },
    },
  });

  const box = new Mesh(gl, { geometry: boxGeometry, program: videoProgram });
  box.rotation.set(-Math.PI / 4, Math.PI / 4, 0);
  box.position.set(1.5, 0, -2);
  scene.add(box);

  const update = () => {
    box.rotation.y += 0.005;
    box.rotation.x += 0.005;

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

デモでは、平面(Plane)に画像を、立方体(Box)に動画をテクスチャとして貼り付けて描画しています。

平面(Plane)に画像を貼り付けるコードは次のようになります。

```ts [render.ts]
const planeGeometry = new Plane(gl, { width: 3, height: 2 });
const imageTexture = new Texture(gl, image.src);

const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    uTexture: { value: imageTexture },
  },
});

const plane = new Mesh(gl, { geometry: planeGeometry, program });
scene.add(plane);
```

画像読み込みの処理は、解説したとおり`Texture`の内部で行っているので、画像のパスを指定するだけでテクスチャとして利用できます。

立方体(Box)に動画を貼り付けるコードは次のようになります。

```ts [render.ts]
const boxGeometry = new Box(gl, { width: 1.5, height: 1.5, depth: 1.5 });

const videoElement = document.createElement('video') as HTMLVideoElement;
videoElement.src = video;
videoElement.loop = true;
videoElement.muted = true;
videoElement.setAttribute('playsinline', 'playsinline');
videoElement.play();

const videoTexture = new Texture(gl, videoElement);

const videoProgram = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    uTexture: { value: videoTexture },
  },
});

const box = new Mesh(gl, { geometry: boxGeometry, program: videoProgram });
scene.add(box);
```

動画の場合は、`HTMLVideoElement`を作成して再生し、その要素を`Texture`に渡すことでテクスチャとして利用できます。

ぜひデモサイトでも確認してみてください！

## まとめ

今回は、WebGLでの画像と動画を描画する`Texture`クラスを作成しました。これにより、画像や動画を簡単にテクスチャとして利用できるようになりました。

次回は、この`Texture`クラスを使用してキューブマップの作成方法を解説したいと思います。