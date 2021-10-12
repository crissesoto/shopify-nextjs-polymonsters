import { getProducts, getProduct } from "../../lib/shopify"
import ProductPageContent from "../../components/ProductPageContent"

export default function ProductPage({ product }) {
    return (
        <ProductPageContent product={product} />
    )
  }
  
  // This function gets called at build time
  export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const products = await getProducts();

    if (!products) {
        return {
          notFound: true,
        }
      }  
  
    // Get the paths we want to pre-render based on posts
    const paths = products.map((product) => {
        const id = String(product.node.id);

        return {
            params: {product: id}
        }
    })
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }
  
  // This also gets called at build time
  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const product = await getProduct(params.product);

    if (!product) {
        return {
          notFound: true,
        }
      }  
    // Pass post data to the page via props
    return { props: { product } }
  }
  
