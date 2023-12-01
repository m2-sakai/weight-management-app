# 体重管理アプリ

## 概要

本アプリは、日々の体重を記録し管理することができる体重管理アプリケーションです。

## 機能

本アプリでは以下の機能を有しています。

| 機能名         | 説明                                       |
| -------------- | ------------------------------------------ |
| カレンダー機能 | 毎日の体重を数値で入力・管理できる         |
| グラフ機能     | 毎日の体重の増減をグラフで見ることができる |
| チャット機能   | 優れた AI と対話ができる                   |
| 認証機能       | 各ユーザーごとにパーソナライズされる       |

## 起動方法

まず、本リポジトリをローカル環境に取り込みます。

```bash
git clone https://github.com/m2-sakai/weight-management-app.git
cd weight-management-app
```

その後、以下で依存ライブラリをインストールします。

```bash
npm i
```

次に、本アプリは Vercel の DB を使用することを前提としていますので、事前に Vercel にログインして DB を作成してください。
DB のテーブル定義は `scripts/seed.js` に記載されております。以下のコマンドを実行してテーブルを作成してください。

```
npm run seed
```

最後に以下のコマンドを実行し、[http://localhost:3000](http://localhost:3000) にアクセスしてください。

```bash
npm run dev
```
