import { getProductsInCollections } from '../lib/shopify'
import ProductList from '../components/ProductList'
import Hero from '../components/Hero'
import Head from 'next/head'

export default function Home({products}) {

  return (
    <div>
      <Head>
        <title>Poymonters Modern eCommerce Store</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=ISO-8859-1" />
        <meta name="description" content="Modern eCommerce Store focusing on Shopify, Next.js, TailwindCSS, GraphQL. Additional topics include Storefront API, Static Site Generation, getStaticPaths, getStaticProps and more." />
        <meta property="og:title" content="Modern eCommerce Store" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="hhttps://shopify-nextjs-polymonsters.vercel.app/" />
        <meta property="og:image" content="https://shopify-nextjs-polymonsters.vercel.app/og.png" />
        <meta property="og:description"
          content="Modern eCommerce Store focusing on Shopify, Next.js, TailwindCSS, GraphQL. Additional topics include Storefront API, Static Site Generation, getStaticPaths, getStaticProps and more." />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Modern eCommerce Store" />
      </Head>
      <Hero />
      <ProductList products={products} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProductsInCollections()

  if (!products) {
    return {
      notFound: true,
    }
  }

  return {
    props: { products }, // will be passed to the page component as props
  }
}