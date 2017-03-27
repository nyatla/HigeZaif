# HigeZaif
Zaifの注文が詰まったときにヒゲダンスを再生して場を盛り上げるユーザースクリプトです。
Chromeのユーザースクリプトとして動作します。

このスクリプトはZaifのウェブページに追加のJavascriptを挿入します。セキュリティ的には大変危険な代物ですので、ソースコードを理解できない人は使用しないでください。


### セットアップ方法
1. HigeZaifをダウンロードして適当な場所に展開する。
2. Chromeの設定→拡張機能を開く。
3. デベロッパーモードに☑をつけて有効化する。
4. パッケージ化されていない拡張機能を読み込むを押して、HigeZaifの保存されたフォルダを開く
5. HigeZaif 1.0が拡張機能に追加されているのを確認したら、有効に☑を入れる

<img src="http://cdn-ak.f.st-hatena.com/images/fotolife/n/nyatla/20170327/20170327170820_original.png?1490602113"/>



Zaifのbtc_jpyのページhttps://zaif.jp/trade_btc_jpy を開いて、ページ下部に""⚡HigeZaifパッチが有効です。""と表示されていれば成功です。

<img src="http://cdn-ak.f.st-hatena.com/images/fotolife/n/nyatla/20170212/20170212233856_original.png?1486910344"/>


### 利用方法

1. ZaifのWeb画面から注文をしたときに応答に３秒以上かかると演奏が始まります。
2. 運よく注文が成功すると自動的に演奏は終了します。
3. BGMにははYoutubeにある楽曲を使用しております。Youtubeが消音されていると何も起こりません。
4. BGMを暴れん坊将軍にするときはhigezaif.jsの39行目のcontentidをFCb3tahZZv8にしてください。
