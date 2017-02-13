# zpatch
Zaifの取引ページの表示を高速化するユーザースクリプトです。
Chromeのユーザースクリプトとして動作します。

このスクリプトはZaifのウェブページに追加のJavascriptを挿入します。セキュリティ的には大変危険な代物ですので、ソースコードを理解できない人は使用しないでください。


### セットアップ方法
1. zpatchをダウンロードして適当な場所に展開する。
2. Chromeの設定→拡張機能を開く。
3. デベロッパーモードに☑をつけて有効化する。
4. パッケージ化されていない拡張機能を読み込むを押して、zpatchの保存されたフォルダを開く
5. Zaifpatch 1.0が拡張機能に追加されているのを確認したら、有効に☑を入れる

<img src="http://cdn-ak.f.st-hatena.com/images/fotolife/n/nyatla/20170212/20170212233526_original.png?1486910172"/>



Zaifのbtc_jpyのページhttps://zaif.jp/trade_btc_jpy を開いて、ページ下部に""⚡表示高速化パッチが有効です。""と表示されていれば成功です。

<img src="http://cdn-ak.f.st-hatena.com/images/fotolife/n/nyatla/20170212/20170212233856_original.png?1486910344"/>


### 高速化したところ

1. Websocketのonmessageから呼び出されるFPS_CTRLオブジェクトを置き換えました。
2. 書き換え対象のタグオブジェクトを変数に保存するようにした(効果がある気がする)
3. 全取引履歴のinnerHTML書き換えを部分書き換えに変更(これはあんまり効果がない？)

