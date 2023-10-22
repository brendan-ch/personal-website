import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* @ts-ignore */}
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
