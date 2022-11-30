import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ButtonAppBar from '../components/menu'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ButtonAppBar />
      <Component {...pageProps} />
    </>
  )
}
