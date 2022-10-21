import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import HeaderComponent from '../components/HeaderComponent'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <div className='bg-c60 w-full h-full text-white'>
      <Head>
        <title>Memento mori</title>
        <meta name="description" content="Check how many days you left" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderComponent />

      <div className='mt-9 container mx-auto text-xl'>
        <Component {...pageProps} />
      </div>
    </div>
    </>
  )
}

export default MyApp
