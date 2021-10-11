import Head from 'next/head'
import { getProductsInCollections } from '../lib/shopify'

export default function Home({products}) {
  console.log(products)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>hello</h1>
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