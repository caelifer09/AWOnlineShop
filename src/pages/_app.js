import '@/styles/globals.css'
import '@/styles/slick-theme.css'
import '@/styles/slick.css'
import Layout from '@/components/Layout'
import { AlertProvider } from '@/context/AlertaProvider'
import {ProductoProvider} from '@/context/ProductoProvider'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <AlertProvider>
      <ProductoProvider>
        <Layout>
           <Head>
              <title>AW - Shop</title>
              <meta name="description" content='page made for learning and practice reasons' />
            </Head>
          <Component {...pageProps} />
        </Layout>
      </ProductoProvider>
    </AlertProvider>
  )
}
