---
title: "Nuxtモジュールのおすすめ"
description: "このサイトの製作で初めてNuxtを使用して作りました。その際に、Nuxtモジュールを使用して便利だったのでおすすめのNuxtモジュールについて紹介します！"
date: 2025-07-02
tags: 
  - "Nuxt.js"
image: "/images/blog/no-image-green.jpg"
summaryList:
  - "Nuxtモジュールについて"
  - "このサイトで使用しているNuxtモジュール"
  - "おすすめのNuxtモジュール"
---

## Nuxtモジュールとは

現在、273個以上が提供されてる<Marker color="var(--green)">Nuxtプロジェクトを強化するモジュール・ライブラリです。</Marker>

機能などを自作するのもいいですが、公式サイトを見て似たような機能があれば楽に導入することができます。

https://nuxt.com/modules

### インストール方法

公式サイトから使用したいモジュールが見つかったら、インストール方法を確認しましょう。ターミナルで<ColorText>npm</ColorText>などでインストールします。

### 使用方法

Nuxtモジュールを使用するには、`nuxt.config.js`にモジュールを追加します。

```js [nuxt.config.js]
export default defineNuxtConfig({
  modules: [
    // ここにモジュールを追加
  ],
});
```

以上でNuxtモジュールが使用できるようになります。

## おすすめのNuxtモジュール

それでは、このサイトで使用しているNuxtモジュールを紹介します！

### @nuxt/content

Nuxt Contentを利用することで、アプリケーションのコンテンツをシンプルに管理できます。ContentフォルダにMarkdown,YAML,CSV,JSONでファイルを作成することで、それらを<Marker>Nuxtのページに表示することができます。</Marker>SQLデータベースに影響を受けており、コンテンツから柔軟にページを生成できます。

また、VueコンポーネントをMarkdownに埋め込むことができ、表現豊かなブログやドキュメントサイトを作成することができます。このサイトの根幹になっています！

https://nuxt.com/modules/content

### @nuxt/eslint

Nuxt用のオールインワンESLint統合になります。プロジェクトに応じたESLintを設定でき、オプションで開発サーバーと並行してESLintチェックを実行する機能も提供します。ESLintをNuxtで使用する場合は入れておきましょう。

https://nuxt.com/modules/eslint

### @nuxt/fonts 

NuxtプロジェクトにGoogleフォントを簡単に追加できます。このサイトではGoogleフォントのみ使用していますが、ローカルにあるフォントも使用できるみたいです。

使用方法は簡単で、cssで`font-family`と`font-weight`で指定するだけです。
このサイトでは、[ここ](https://github.com/nono-k/feylo/blob/main/styles/utility/font.scss)で下記のようにユーティリティで定義して利用するようにしています。

```scss [font.scss]
.ff-zen-kaku-gothic-500 {
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-weight: 500;
}

.ff-zilla-slab-700-italic {
  font-family: "Zilla Slab", serif;
  font-weight: 700;
  font-style: italic;
}
```

https://nuxt.com/modules/fonts

### @nuxt/icon

Nuxtプロジェクトにアイコンを簡単に追加できます。アイコンは[Iconify](https://icon-sets.iconify.design/)を使用しているので、利用したいアイコンを探したら、`Icon`コンポーネントの`name`にアイコン名を指定するだけで表示することができます。

```js [Iconコンポーネント]
<Icon name="uil:github" size="1.5rem" style="color: black" />
```

サイズを変えたいときは、`size`で指定します。また、アイコンの色を変えたいときは`style`で設定することができます。

https://nuxt.com/modules/icon

### nuxt-marquee

このサイトのTopページなどに、テキストが流れ続けるアニメーションを実装するために使用しています。一例としてnuxt-marqueeを使用した見出しのコンポーネントを下記に紹介します。

```vue [Marqueeコンポーネント]
<script setup lang="ts">
interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  text?: string;
  marqueeSpeed?: number;
  marqueeDirection?: 'left' | 'right';
  marqueePauseOnHover?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  level: 2,
  text: '',
  marqueeSpeed: 40,
  marqueeDirection: 'left',
  marqueePauseOnHover: false,
});

const tag = `h${props.level || 2}`;
</script>

<template>
  <div class="heading__wrap">
    <div class="heading__deco ff-open-sans-700">
      <NuxtMarquee
        :auto-fill="true"
        :speed="40"
        :direction="props.marqueeDirection"
        :pause-on-hover="props.marqueePauseOnHover"
      >
        <slot />
      </NuxtMarquee>
    </div>
    <component :is="tag" class="heading container ff-open-sans-700">
      <slot />
    </component>
    <p v-if="text" class="text container">{{ text }}</p>
  </div>
</template>
```

https://nuxt.com/modules/marquee

### @nuxtjs/cloudinary

このサイトでは、記事内の画像をCloudinaryで管理しています。画像の場合は、`CldImage`コンポーネント、動画の場合は`CldVideoPlayer`コンポーネントを使用しています。

使用するには、`.env`ファイルに`CLOUDINARY_CLOUD_NAME`を設定する必要があります。

```bash [.env]
CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
```

Markdown内では自前の画像も使っているので、条件分岐で分けています。このサイトの画像についての実装は[こちら](https://github.com/nono-k/feylo/blob/main/components/contnet/ProseImg.vue)をご覧ください。

https://nuxt.com/modules/cloudinary

### @nuxt/scripts

Nuxt Scriptsは、サードパーティスクリプトの最適化をサポートするモジュールになります。このブログではGoogle Analyticsを導入しているので使用しています。Nuxt ScriptsでGoogle Analyticsを設定するには、`nuxt.config.ts`に下記のように記述すればよいでしょう。

```js [nuxt.config.ts]
export default defineNuxtConfig({
  // ...
  $production: {
    scripts: {
      registry: {
        googleAnalytics: {
          id: 'YOUR-ID',
        },
      },
    },
  },
})
```

https://scripts.nuxt.com/

## まとめ

Nuxtプロジェクトで便利に開発できるNuxtモジュールを紹介しました。
Nuxtモジュールは、公式サイトから探していけば、目的のものが見つかるかと思います。

ぜひみなさんも利用してみてください！