import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CustomLayout from '../components/CustomLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomLayout>
      <Component {...pageProps} />
    </CustomLayout>
  )
}

export default MyApp
