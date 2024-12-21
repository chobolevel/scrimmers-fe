import { Head, Html, Main, NextScript } from 'next/document'

const document = () => {
  return (
    <Html lang="ko" suppressHydrationWarning>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default document
