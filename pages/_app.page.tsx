import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CustomLayout from '../components/layout/CustomLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomLayout>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </CustomLayout>
      <Analytics />
    </>
  )
}

export default MyApp
