// `_app.js`を追加/編集した場合は開発サーバの再起動が必要

import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}