// `getStaticProps`あるいは`getStaticPaths`からはAPIルートをフェッチすべきではない．
// そうする代わりに`getStaticProps`あるいは`getStaticPaths`の中に直接サーバサイドのコードを記述する

// `getStaticProps`あるいは`getStaticPaths`はサーバサイドでのみ実行される．
// クライアントサイドで実行されることはなく，ブラウザ用のJSバンドルに含まれることもない．
// これはデータベースに直接問い合わせるようなコードを書くことができ，そういったコードがブラウザ側に送られることは無いということ．

export default (req, res) => {
  res.status(200).json({ text: 'Hello' })
}