---
title: "WebGLで三角形を描画する"
description: "今回から、ライブラリなどを使わない素のWebGLの解説を行っていきます。目標は、シリーズを通して自作のWebGLライブラリを作っていく方針です。初回は、WebGLで三角形を描画するまでをみていきます。"
date: 2025-12-01
tags: 
  - "WebGL"
image: "/images/blog/webgl-triangle.jpg"
summaryList:  
  - "WebGLで三角形を描画するまでの手順を理解する"
  - "WebGLの定型的なコアの実装をクラスに分ける方法"
---

## このシリーズの目標

ふだんは、Three.jsなどのWebGLライブラリを使用してましたが、もう少し深いところまで理解したいと思い素のWebGLの勉強をしていました。このシリーズを通して、自作のオレオレWebGLライブラリを作りあげていきたいと思います。

この自作のWebGLライブラリは、[OGL](https://github.com/oframe/ogl/tree/master)を参考にしてます。定型的なWebGLコードはライブラリ側で行って、それ以外の部分はなるべく触っていけるような方針です。

また、WebGLのコードをエディタの予測変換なしに書いていくのはつらいので、TypeScriptを導入しています。著者はTypeScriptの知識はあまりないので、もっといい方法などがありましたら教えていただきたいです。

コードはGitHubで公開しているので参考にしてみてください！

https://github.com/nono-k/webgl-study-note

## ディレクトリ構成

Three.jsやOGLを参考にし、ディレクトリ構成の例は次のようにしてます。

```bash [ディレクトリ構成]
webgl
├── core
│   ├── Camera.ts
│   ├── Geometry.ts
│   ├── Mesh.ts
│   ├── Program.ts
│   ├── Renderer.ts
│   ├── Scene.ts
│   ├── Texture.ts
│   └── Transform.ts
├── extras (拡張)
├── math (数学演算)
└── index.ts
```

`webgl/index.ts`ですべてエクスポートしているので、使用する場合は次のように`webgl`からインポートするだけで大丈夫です。

```ts
import { Geometry, Mesh, Program, Render, Scene } from 'webgl';
```

## WebGLで三角形を描画するコード

WebGLのコアな部分は後で解説するとして、三角形を描画する全コードは次のようになります。Three.jsやOGLを参考にしているので、似ている部分はあるでしょう。
このシリーズではシェーダーのコードは別ファイルで管理してインポートすることとします。

```ts
import { Geometry, Mesh, Program, Render, Scene } from '@/lib/webgl';

import fragment from './index.frag?raw';
import vertex from './index.vert?raw';

const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
const render = new Render(canvas);
render.fitScreen();
const gl = render.gl;
gl.clearColor(1.0, 1.0, 1.0, 1.0);

const scene = new Scene();

const positions = new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0, 0.5, 0]);
const uvs = new Float32Array([0, 0, 1, 0, 1, 1]);
const indices = new Uint16Array([0, 1, 2]);

const geometry = new Geometry(gl, {
  position: { size: 3, data: positions },
  uv: { size: 2, data: uvs },
  index: { size: 1, data: indices },
});

const program = new Program(gl, { vertex, fragment });

const mesh = new Mesh(gl, { geometry, program });

scene.add(mesh);

const update = () => {
  render.render({ scene });

  requestAnimationFrame(update);
};

update();

const resize = () => {
  render.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', resize);
```

それでは、WebGLレンダリングコンテキストを取得したりする`Render`クラスから説明していきます。

## Renderクラス

`Render`クラスでは、WebGLレンダリングコンテキストを取得したり、画面のサイズを調整したりする機能を提供しています。引数に`canvas`を渡すことで、レンダリングコンテキストを取得することができます。

```ts [Render]
export class Render {
  readonly canvas: HTMLCanvasElement;
  readonly gl: WebGL2RenderingContext;

  constructor(canvas: HTMLCanvasElement, options?: WebGLContextAttributes) {
    this.canvas = canvas;
    const gl = canvas.getContext('webgl2', options);

    if (!gl) {
      throw new Error('WebGL2 not supported');
    }

    this.gl = gl;
  }

  setSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  // canvasを画面サイズに合わせる
  fitScreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
```

`getContext`に引数を与えることで、WebGLレンダリングコンテキストを取得できます。このシリーズではWebGL2を対象にしているので、`webgl2`を指定しています。取得に失敗した場合はコンソールにエラーを出力してプログラムを停止します。

### 使い方

`Render`クラスは、`canvas`要素をコンストラクタに渡して使用します。変数を`render`として、`fitScreen()`メソッドを呼び出して画面サイズに合わせます。また、`.gl`がWebGLレンダリングコンテキストになるので、変数`gl`として使用します。

```ts
// canvas要素を取得
const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;

const render = new Render(canvas);
// 画面サイズいっぱいにする
render.fitScreen();
// レンダリングコンテキストを取得
const gl = render.gl;
// 画面をクリアする
gl.clearColor(0, 0, 0, 1);
```

続いては、WebGLのシーンを管理する`Scene`クラスについて説明します。

## Sceneクラス

このクラスの役割は、Three.jsを考えれば分かりやすいでしょう。Three.jsと同等に、シーンに物体などのメッシュを`scene.add()`で追加できるようにします。また、`scene.remove()`でメッシュを削除することもできます。

```ts [Scene]
export class Scene {
  parent: Scene | null = null;
  children: Scene[] = [];

  // 追加
  add(child: Scene) {
    if (child.parent) child.parent.remove(child);
    child.parent = this;
    this.children.push(child);
  }

  // 削除
  remove(child: Scene) {
    const i = this.children.indexOf(child);
    if (i !== -1) {
      child.parent = null;
      this.children.splice(i, 1);
    }
  }
}
```

使い方としては、変数`scene`を`Scene`クラスのインスタンスとして使用し、`add()`メソッドでメッシュを追加します。

```ts
const scene = new Scene();
scene.add(mesh);
```

## Geometryクラス

`Geometry`クラスは、バッファの生成などを行います。このクラスは、Three.jsと同等に、頂点データやインデックスデータ、uvを管理できます。使用例としては次のようになります。

```ts
const geometry = new Geometry(gl, {
  position: { size: 3, data: positions },
  uv: { size: 2, data: uvs },
  index: { size: 1, data: indices },
});
```

第1引数にWebGLレンダリングコンテキストを渡し、第2引数に頂点データやインデックスデータ、uvをサイズを指定して、dataに`Float32Array`または`Uint16Array`で指定します。

`Geometry`クラスは次のようになります。

```ts [Geometry]
interface Attribute {
  size: number;
  data: Float32Array | Uint16Array;
}

export class Geometry {
  gl: WebGL2RenderingContext;
  attributes: Record<string, Attribute>;
  vao: WebGLVertexArrayObject;
  vbos: Record<string, WebGLBuffer> = {};
  ibo: WebGLBuffer | null = null;
  indexCount = 0;
  vertexCount = 0;

  constructor(gl: WebGL2RenderingContext, attributes: Record<string, Attribute>) {
    this.gl = gl;
    this.attributes = attributes;

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    for (const name in attributes) {
      const attr = attributes[name];
      const { data } = attr;

      if (name === 'index') {
        // --- index buffer (EBO) ---
        this.ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        this.indexCount = (data as Uint16Array).length;
      } else {
        // --- vertex attribute buffer ---
        const buf = gl.createBuffer();
        this.vbos[name] = buf;
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      }
    }

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
}
```

ひとまず第2引数には、頂点データとインデックスデータ、uvの`size`と`data`が含まれるので、interfaceで`Attribute`を定義します。ここに入る型は、`size`は`number`、`data`は`Float32Array`または`Uint16Array`です。

```ts [Attributeの定義]
interface Attribute {
  size: number;
  data: Float32Array | Uint16Array;
}
```

### バッファの作成

続いてバッファの作成をみていきます。
最初に頂点配列オブジェクト(Vertex Array Object: **VAO**)を作成します。

```ts [VAOの作成]
this.vao = gl.createVertexArray();
gl.bindVertexArray(this.vao);
```

`createVertexArray()`でVAOインスタンスを作成し、`bindVertexArray()`でバインドすることができます。VAOは、頂点属性の設定を一括で管理するためのもので、一度設定すれば、同じ設定を複数の描画コールで使用することができます。

次に、頂点バッファオブジェクト(Vertex Buffer Object: **VBO**)とインデックスバッファオブジェクト(Index Buffer Object: **IBO**)を作成します。これは`attributes`に含まれているのでループして作成します。

```ts [VBOとIBOの作成]
for (const name in attributes) {
      const attr = attributes[name];
      const { data } = attr;

      if (name === 'index') {
        // --- index buffer (EBO) ---
        this.ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        this.indexCount = (data as Uint16Array).length;
      } else {
        // --- vertex attribute buffer ---
        const buf = gl.createBuffer();
        this.vbos[name] = buf;
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      }
    }
```

このデモの場合、nameは`position`,`uv`,`index`のいずれかになるので、`name`が`index`の場合はIBOを作成し、それ以外の場合はVBOを作成します。

最後に利用が終わったバッファはバインドを削除したほうがいいので、次のように削除します。

```ts [バッファの削除]
gl.bindVertexArray(null);
gl.bindBuffer(gl.ARRAY_BUFFER, null);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
```

作成したバッファの使用は`Mesh`クラスで行うので、あとで解説します。
次は`Program`クラスの作成について説明します。

## Programクラス

`Program`クラスでは、頂点シェーダーとフラグメントシェーダーのソースコードを読み込み、コンパイルし、リンクします。使い方としては次のようになります。

```ts
// シェーダーのインポート
import fragment from './index.frag?raw';
import vertex from './index.vert?raw';

---

const program = new Program(gl, { 
  vertex, 
  fragment,
  uniforms: {
    uResolution: { value: [canvas.width, canvas.height ]}
  }
});
```

先述のとおり、頂点シェーダーとフラグメントシェーダーは別ファイルで用意するので、importで読み込みます。読み込んだシェーダーコードを`Program`クラスの第2引数に渡して使用します。また、今回は使用しませんが、`uniforms`も`Program`クラスに渡せるようにします。

`Program`クラスは次のようになります。

```ts [Program]
export type ProgramOptions = {
  vertex: string;
  fragment: string;
  uniforms?: Record<string, any>;
};

export class Program {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  uniforms: Record<string, any>;

  constructor(gl: WebGL2RenderingContext, opts: ProgramOptions) {
    this.gl = gl;
    this.program = this.createProgram(opts.vertex, opts.fragment);
    this.uniforms = opts.uniforms ?? {};
  }

  private compile(type: number, source: string) {
    const gl = this.gl;
    const s = gl.createShader(type) as WebGLShader;
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(s);
      gl.deleteShader(s);
      throw new Error(`Shader compile error: ${info}`);
    }
    return s;
  }

  private createProgram(vertexSrc: string, fragSrc: string) {
    const gl = this.gl;
    const v = this.compile(gl.VERTEX_SHADER, vertexSrc);
    const f = this.compile(gl.FRAGMENT_SHADER, fragSrc);
    const p = gl.createProgram();
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(p);
      gl.deleteProgram(p);
      throw new Error(`Program link error: ${info}`);
    }
    gl.deleteShader(v);
    gl.deleteShader(f);
    return p;
  }
}
```

### シェーダーのコンパイルとリンク

シェーダーのコンパイルとリンクする処理をみていきます。`constructor`は次のようになってます。

```ts
constructor(gl: WebGL2RenderingContext, opts: ProgramOptions) {
  this.gl = gl;
  this.program = this.createProgram(opts.vertex, opts.fragment);
  this.uniforms = opts.uniforms ?? {};
}
```

`opts`には`vertex`と`fragment`が含まれています。これらのコンパイルとリンクする処理`createProgram`メソッドに渡します。`uniforms`に関してはあとで説明しますが、ひとまず`this.uniforms`に入れておきます。

`createProgram`メソッドは次のようになります。

```ts
private createProgram(vertexSrc: string, fragSrc: string) {
  const gl = this.gl;
  const v = this.compile(gl.VERTEX_SHADER, vertexSrc);
  const f = this.compile(gl.FRAGMENT_SHADER, fragSrc);
  const p = gl.createProgram();
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(p);
    gl.deleteProgram(p);
    throw new Error(`Program link error: ${info}`);
  }
  gl.deleteShader(v);
  gl.deleteShader(f);
  return p;
}
```

頂点・フラグメント両方を`compile`メソッドでコンパイルします。この`compile`メソッドはコードを見て分かる通り、コンパイル失敗時にはエラー内容をthrowして知らせます。

`createProgram`でプログラムを生成し、頂点・フラグメント両方を`attachShader`でアタッチし、`linkProgram`でリンクします。ここでもリンクエラーはthrowして知らせるようにします。

使い終わったシェーダーは`deleteShader`で削除します。以上の処理が`createProgram`メソッドで完了します。

## Meshクラス

`Mesh`クラスは、Three.jsのようにGeometry(頂点バッファ)とProgram(シェーダー)をまとめたクラスになります。使い方は次のようになります。

```ts
const mesh = new Mesh(gl, { geometry, program });
scene.add(mesh);
```

`Mesh`クラスのコードは次のようになります。

```ts [Mesh]
import type { Geometry } from './Geometry';
import type { Program } from './Program';
import { Scene } from './Scene';

export class Mesh extends Scene {
  geometry: Geometry;
  program: Program;

  constructor(gl: WebGL2RenderingContext, { geometry, program }: { geometry: Geometry; program: Program }) {
    super();
    this.geometry = geometry;
    this.program = program;
  }

  draw(gl: WebGL2RenderingContext) {
    const program = this.program;
    const geometry = this.geometry;

    program.use();
    geometry.bind(program);

    gl.drawElements(gl.TRIANGLES, geometry.indexCount, gl.UNSIGNED_SHORT, 0);

    geometry.unbind();
  }
}
```

`Mesh`クラスは`Scene`クラスを継承しています。これにより、`Mesh`クラスは`Scene`クラスの機能を継承し、さらに`draw`メソッドを追加することができます。

`Program`クラスの`use`メソッドと、`Geometry`クラスの`bind`メソッドに付いてはまだ、説明していなかったのでこれらを見ていきましょう。

### シェーダーの使用とユニフォーム変数の設定

`Program`クラスの`use`メソッドでは、シェーダーの使用とユニフォーム変数の設定を行います。

```ts [Program]
export class Program {
  // ...
  use() {
    this.gl.useProgram(this.program);
    this.setUniforms();
  }
}
```

ユニフォーム変数の設定をする`setUniforms`メソッドは次のようになります。

```ts [Program]
export class Program {
  // ...
  setUniforms() {
    const gl = this.gl;

    for (const name in this.uniforms) {
      const value = this.uniforms[name].value;
      const loc = gl.getUniformLocation(this.program, name);
      if (loc === null) continue;

      this.setUniform(gl, loc, value);
    }
  }
}
```

`setUniforms`メソッドでは、設定したuniformの参照(ロケーション)と値を`setUniform`メソッドに渡します。`getUniformLocation`メソッドは、現在のプログラムオブジェクト(this.program)とユニフォームの名前を受け取り、対応するユニフォームの参照を返します。

`setUniform`メソッドは、ユニフォームの値を設定するためのメソッドです。値の型に応じて、適切な関数を呼び出します。

```ts [Program]
export class Program {
  // ...
  setUniform(gl: WebGL2RenderingContext, loc: WebGLUniformLocation, value: number | number[] | Float32Array) {
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        gl.uniform1i(loc, value);
      } else {
        gl.uniform1f(loc, value);
      }
    } else if (Array.isArray(value)) {
      switch (value.length) {
        case 1:
          gl.uniform1f(loc, value[0]);
          break;
        case 2:
          gl.uniform2f(loc, value[0], value[1]);
          break;
        case 3:
          gl.uniform3f(loc, value[0], value[1], value[2]);
          break;
        case 4:
          gl.uniform4f(loc, value[0], value[1], value[2], value[3]);
          break;
        case 9:
          gl.uniformMatrix3fv(loc, false, value);
          break;
        case 16:
          gl.uniformMatrix4fv(loc, false, value);
          break;
      }
    }
  }
}
```

このメソッドは例えば、次のようなuniformsの場合はそれぞれ適切な関数を呼ぶことになります。

```ts [uniformsの例]
uniforms: {
  uResolution: { value: [canvas.width, canvas.height ]}, // gl.uniform2f
  uIntValue: { value: 1 }, // gl.uniform1i
  uFloatValue: { value: 0.5 }, // gl.uniform1f
}
```

### バッファの有効化

残りの`Geometry`クラスの`bind`メソッドは、バッファを有効化するためのメソッドになります。

```ts [Geometry]
import type { Program } from './Program';

export class Geometry {
  // ...
  bind(program: Program) {
    const gl = this.gl;
    gl.bindVertexArray(this.vao);

    for (const name in this.attributes) {
      if (name === 'index') continue;
      const attr = this.attributes[name];
      const loc = attr.location ?? gl.getAttribLocation(program.program, name);
      if (loc === -1) continue;

      const buf = this.vbos[name];
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, attr.size, attr.type ?? gl.FLOAT, !!attr.normalized, 0, 0);
    }

    if (this.ibo) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
  }
}
```

長くなりましたが、`Mesh`クラスの`draw`メソッドでこれらのメソッドを呼び出してから、`drawElements`メソッドを呼び出すことで、三角形を描くことができます。

```ts [Mesh]
export class Mesh extends Scene {
  // ...
  draw(gl: WebGL2RenderingContext) {
    const program = this.program;
    const geometry = this.geometry;

    program.use();
    geometry.bind(program);

    gl.drawElements(gl.TRIANGLES, geometry.indexCount, gl.UNSIGNED_SHORT, 0);

    geometry.unbind();
  }
}
```

このデモでは、単純な三角形を描画するだけなので、`drawElements`メソッドの第1引数のmodeは、`gl.TRIANGLES`と決め打ちにします。後々の記事で、modeの変更が行えるようにもしていきます。

## 更新処理

最後に更新処理を実装します。次のように`update`メソッドで行っています。

```ts
const update = () => {
  render.render({ scene });

  requestAnimationFrame(update);
}
```

まだ実装していなかった、`Render`クラスの`render`メソッドをみていきましょう。


```ts [Render]
export class Render {
  // ...
  render({ scene }: { scene: Scene }) {
    const gl = this.gl;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    scene.traverse(node => {
      if (node instanceof Mesh) {
        node.draw(gl);
      }
    });
  }
}
```

`render`メソッドは、追加したSceneの子ノードを順に処理し、Meshノードの場合はdrawメソッドを呼び出します。`Scene`クラスの`traverse`メソッドは、次のようにSceneツリーを深さ優先(DFS)で巡回するメソッドになります。

```ts [Scene]
export class Scene {
  // ...
  traverse(callback: (scene: Scene) => void) {
    callback(this);
    for (const child of this.children) {
      child.traverse(callback);
    }
  }
}
```

つまり、自分自身に対してcallbackを実行し、すべての子に対して再帰的にtraverseを実行します。

以上で、WebGLで三角形を描画する準備ができました。最後に三角形を描画するための頂点データ・インデックス・uvをみていきます。

## UV座標の色を描画する三角形

今回のデモでは、zの値が0に固定されたx-y平面上の単純な三角形を描画します。三角形を描画する頂点データは次のようになります。

```ts [三角形の頂点データ]
/*
       V2
    (0, 0.5, 0)
        X
       / \
      /   \
     /     \
    X-------X
V0 (-0.5,-0.5,0)   V1 (0.5,-0.5,0)
*/
const positions = new Float32Array([
  -0.5, -0.5, 0,
  0.5, -0.5, 0,
  0, 0.5, 0,
]);
```

WebGLではクリップ空間座標を使います。クリップ空間の座標は、canvasの大きさに関係なく、常に-1から+1の範囲に限定されます。なので、真ん中に三角形を描画するには上記のデータになります。コードにある図をみてもらえれば分かりやすいかと思います。

頂点データの順番に従って、三角形を描くためのインデックスを指定します。インデックスは通常は反時計回りで定義されるので次のようにします。

```ts [インデックス]
const indices = new Uint16Array([0, 1, 2]);
```

これらの頂点データと、インデックスを作成した`Geometry`クラスに渡せば、自動的にバッファの生成などをしてくれるようにこれまで実装してきました。

```ts
const geometry = new Geometry(gl, {
  position: { size: 3, data: positions },
  index: { size: 1, data: indices },
});
```

`position`は3次元のベクトルデータなので、`size`を3に設定し、`index`は1次元のデータなので`size`を1に設定します。

UV座標の定義をする前に、シェーダーをみていきましょう。

### 頂点シェーダー

頂点シェーダーは、先ほど定義した三角形の頂点データを用いて次のようになります。

```ts [index.vert]
#version 300 es
precision mediump float;

in vec3 position;
in vec2 uv;

out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
```

WebGL2(OpenGL ES 3.0)を前提としているので、先頭に`#version 300 es`を記述します。`position`は先ほど定義した三角形を描くための頂点データとなっているので、`in`で受け取ります。

この`position`は-1から+1の範囲にあるので、そのまま最終的なクリップ空間の`gl_Position`に代入します。`uv`は後ほど定義しますが、フラグメントシェーダーで使用しますので、`out vec2 vUv`として出力します。

### フラグメントシェーダー

フラグメントシェーダーは、頂点シェーダーから出力した`vUv`を用いて次のようになります。

```ts [index.frag]
#version 300 es
precision mediump float;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 uv = vUv;
  fragColor = vec4(uv, 0.0, 1.0);
}
```

このデモでは、UV座標の値を色として使用しますので、`fragColor`のxy座標にそのまま代入します。
それでは最後にUV座標を定義しましょう。

### UV座標の定義

今回のデモの頂点データとインデックス、UVの対応づけは次のようになります。

| インデックス | 頂点座標 | UV |
| --- | --- | --- |
| 0 | (-0.5, -0.5, 0) | (0.0, 0.0) : 黒|
| 1 | (0.5, -0.5, 0) | (1.0, 0.0) : 赤|
| 2 | (0, 0.5, 0) | (0.0, 1.0) : 緑|

三角形の左下は黒に、右下は赤に、上は緑になります。
それでは、UV座標を次のように準備しましょう。

```ts
const uvs = new Float32Array([0, 0, 1, 0, 0, 1]);

const geometry = new Geometry(gl, {
  position: { size: 3, data: positions },
  uv: { size: 2, data: uvs },
  index: { size: 1, data: indices },
});
```

最終的な結果は次のようになります。

![UV座標の色を描画する三角形](https://res.cloudinary.com/dy8ftemi0/image/upload/v1764458614/image_he1swo.jpg "UV座標の色を描画する三角形")

::link-btn
---
href: https://nono-k.github.io/webgl-study-note/webgl/triangle/
---
::

以上で、UV座標の色を描画する三角形が完成しました！

## まとめ

WebGLの基礎を学ぶために、まずは三角形を描画してみました。素のWebGLでは煩雑な処理が多くなるので、Three.jsやOGLを参考にして、コアな部分をクラスに分けて説明していきました。

少しでもThree.jsなどのWebGLライブラリが、どのようになっているのか理解できたら幸いです。今後はこのシリーズを通して、オレオレWebGLライブラリを育てていきたいと思います！