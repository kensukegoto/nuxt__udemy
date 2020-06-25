(6/25)

```
# 各ディレクトリの意味

## assets

小さめ画像（webpackで取り込まれる）
使い回したいscss

## static

大きめ画像
jsonやmarkdown、またwebpackしたくない画像（？）

## middleware

plugins → middleware → fetch → asyncData

大きな処理の流れの中で使う関数。ログインに失敗したら、再度ログインページにリダイレクトさせるなど。関数をエクスポート。

ページロード、ミドルウェアを仕込んだページ移動時に呼ばれる。
全ページに仕込んで特定のページのみ外す事も可能。

## plugins

全ページ共通パーツを使いやすくする、ページまたがり使う関数
nuxt.config.jsのpluginsディレクティブで設定

全ページでAppButtonコンポーネントが使える
Vue.component("AppButton",AppButton);

全ページでdataフィルターが使える
Vue.filter("date",dataFilter);

## api


# nuxt.config.jsonの各設定

## serverMiddleware

```

# 実用のためのタスク

```
- Sassが使える
- jQueryとの共存
- 画像の圧縮
```

---

(~6/24)

# Nuxt moduleとは？

# computed

例えば vueが持つデータ index が 奇数ならred、偶数ならばbleuとHTMLのクラスを付けたい場合を想定
HTML側で cumputed に定義した奇数か偶数か判断するメソッドを呼ぶような場面で使う
同様の事は methods でも可能だが methodsは都度実行されるが computed はindexが変わらない限り実行されず同じ結果を返す。

# mutationとは？

$storeを書き換えるにはmutationを経由するルール
コンポーネント側で$store.commit()するとvuexのmutationに送られる
mutationは必ず同期。ajaxなど非同期通信をしたいならば**action**を使う。
mutationからaction内のメソッドを呼び出す。


# what's does it mean ?

子をクリックすると'childEvent'が起きたことを親に伝える<br>
'childEvent'が起きた知らせを受けると親は'parentMethod'を実行する<br>
<br>
[Vue.jsで$emitとv-onを使った子から親のコンポーネントにおける値の受け渡し](https://designsupply-web.com/knowledgeside/5599/)

```
// 親
<template>
  <Child @childEvent="parentMethod" />
  <Child2 @toggle="parentToggle" /> // 子２で'toggle'発火
</template>

// 子
<template>
  <div @click="$emit('childEvent')"> // 子要素（自身も？）でのclickを検知し'childEvent'を発火
    <button>子</button>
  </div>
</template>

// 子2
<template>
  <div @click="$emit('toggle')">
  子
  </div>
</template>
```




# my-first-nuxt-app

> My transcendent Nuxt.js project

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
