import Document, { Html, Head, Main, NextScript } from 'next/document'
import { RECAPTCHA_SITE_KEY_V3 } from '../helpers/Constants'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/upd1iml.css" />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#be3223" />
          <meta name="msapplication-TileColor" content="#e6e6e6" />
          <meta name="theme-color" content="#E6E6E6"></meta>

          <meta name="description" content="I'm Brendan, a developer and designer living in Orange, California."></meta>

          <meta charSet="utf-8" />
          <meta name="og:description" content="I'm Brendan, a developer and designer living in Orange, California."></meta>
          <meta name="og:image" content="/link-preview-image.png"></meta>

          <meta name="twitter:description" content="I'm Brendan, a developer and designer living in Orange, California."></meta>
          <meta name="twitter:image" content="/link-preview-image.png"></meta>

          <meta name="google-site-verification" content="4f6AZxwJwKFUlOFOJdcfAbCKMqxOiEcGQ4N7NefSsI4"></meta>

          <script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY_V3}`} async></script>
          {/* Fallback title */}
          {/* eslint-disable-next-line */}
          {/* <title>Brendan Chen</title> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument