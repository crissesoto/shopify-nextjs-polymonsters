import { createContext, useState, useEffect } from 'react'
import { createCheckout, updateCheckout } from '../lib/shopify'

const CartContext = createContext()

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutId, setCheckoutId] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')

  useEffect(() => {
      if (localStorage.checkout_id) {
          const cartObject = JSON.parse(localStorage.checkout_id);

          if (cartObject[0].id) {
              setCart([cartObject[0]])
          } else if (cartObject[0].length > 0) {
            setCart(...[cartObject[0]])
          }

          setCheckoutId(cartObject[1].id)
          setCheckoutUrl(cartObject[1].webUrl)
      }
  }, [])

  async function addToCart(newItem) {
    setCartOpen(true)

    if(cart.length === 0) {
      setCart([newItem])
      
      const checkout = await createCheckout(newItem.id, newItem.variantQuantity)

      setCheckoutId(checkout.id)
      setCheckoutUrl(checkout.webUrl)

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]))
    } else {
      let newCart = [...cart]

      cart.map(item => {
        if (item.id === newItem.id) {
          item.variantQuantity++
          newCart = [...cart]
        } else {
          newCart = [...cart, newItem]
        }
      })

      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)
      localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
    }
  }

  async function removeCartItem(itemToRemove) {
    console.log(itemToRemove)
    let updatedCart = [];

    if (itemToRemove.variantQuantity > 1) {
      cart.map(item => {
        if (item.id === itemToRemove.id) {
          item.variantQuantity--
          updatedCart = [...cart]
        }
      })
    } else if (itemToRemove.variantQuantity <= 1) {
      updatedCart = cart.filter(item => item.id !== itemToRemove.id)
    }

    setCart(updatedCart)

    const newCheckout = await updateCheckout(checkoutId, updatedCart)

    localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]))

    if (cart.length === 1) {
      setCartOpen(false)
    }
  }

  return (
    <CartContext.Provider value={{ 
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      checkoutUrl,
      removeCartItem
    }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, ShopProvider }