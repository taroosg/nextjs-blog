// `getStaticProps`あるいは`getStaticPaths`からはAPIルートをフェッチすべきではない．
// そうする代わりに`getStaticProps`あるいは`getStaticPaths`の中に直接サーバサイドのコードを記述する

// `getStaticProps`あるいは`getStaticPaths`はサーバサイドでのみ実行される．
// クライアントサイドで実行されることはなく，ブラウザ用のJSバンドルに含まれることもない．
// これはデータベースに直接問い合わせるようなコードを書くことができ，そういったコードがブラウザ側に送られることは無いということ．
import { NextApiRequest, NextApiResponse } from 'next'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${_.query.lat}&lon=${_.query.lon}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`);
  const weather = await response.json();
  res.status(200).json(weather);
  // res.status(200).json({ text: 'Hello' })
}