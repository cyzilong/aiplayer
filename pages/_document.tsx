import { Html, Head, Main, NextScript } from 'next/document';


export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body className='bg-white antialiased dark:bg-zinc-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}