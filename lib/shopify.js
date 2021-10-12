const storefrontAccesToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
const domain = process.env.SHOPIFY_STORE_DOMAIN;


export async function ShopifyData(query) {
    const URL = `${domain}/api/2021-10/graphql.json`;

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccesToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query})
    }

    try {
        const data = await fetch(URL, options).then(res => {
            return res.json();
        })
        return data;

    } catch (error) {
        throw new Error("Products not fetched")
    }
}

export async function getProductsInCollections() {
    const query = `{
        collection(handle: "frontpage"){
            id
            title
            products(first: 20){
                edges{
                    node{
                        id
                        title
                        description
                        handle
                        priceRange {
                            minVariantPrice {
                              amount
                            }
                        }
                        images(first: 5){
                            edges{
                                node{
                                    originalSrc
                                    altText
                                }
                            }
                        }
                    }
                }
            }
        }
    }`

    const response = await ShopifyData(query);
    const allProducts = response.data.collection.products.edges ? response.data.collection.products.edges : [];

    return allProducts;
}
export async function getProducts() {
    const query = `{
        products(first: 20) {
        edges{
          node{
            id
            handle
          }
        }
      }
    }`

    const response = await ShopifyData(query);
    const allProducts = response.data.products.edges ? response.data.products.edges : [];

    return allProducts;
}

export async function getProduct(id) {
    const query = `{
        product(id: "${id}") {
        id
        title
        description
        images(first: 5){
          edges{
            node{
              originalSrc
              altText
            }
          }
        }
        options(first: 5){
          id
          name
          values
        }
        priceRange{
          minVariantPrice{
            amount
          }
        }
      }
    }`

    const response = await ShopifyData(query);
    const product = response.data.product ? response.data.product : [];

    return product;
}


