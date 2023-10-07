import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CustomLayout from '../components/layout/CustomLayout';

function MyApp({ Component, pageProps }: AppProps) {
  // Disable layout for unified home page
  if (process.env.NEXT_PUBLIC_UNIFIED_HOME === '1') {
    return <>
      {/* @ts-ignore */}
      <Component {...pageProps} />
      <Analytics />
    </>
  }

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
