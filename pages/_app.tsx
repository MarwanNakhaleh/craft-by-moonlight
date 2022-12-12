import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ProductsContextProvider } from '../components/ProductContext'

export default function App({ Component, pageProps }: AppProps) {
  return <ProductsContextProvider>
    <Component {...pageProps} />
  </ProductsContextProvider>
}
