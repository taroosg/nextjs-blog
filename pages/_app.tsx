// `_app.js`を追加/編集した場合は開発サーバの再起動が必要

import '../styles/global.css'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}