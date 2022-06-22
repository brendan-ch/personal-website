import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link rel="stylesheet" href="https://use.typekit.net/upd1iml.css" />
          <meta name="description" content="Hi there! I’m Brendan, a developer living in Orange, California."></meta>
          <meta name="og:image" content="/link-preview-image.png"></meta>
          {/* Fallback title */}
          {/* eslint-disable-next-line */}
          <title>Brendan Chen</title>
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