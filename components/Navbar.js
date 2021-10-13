import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '../context/shopContext'
import Cart from './Cart';

function Navbar() {
    const {cart, cartOpen, setCartOpen} = useContext(CartContext);
    let cartQuantity = 0;

    cart.map((item) => {
        return (cartQuantity += item?.variantQuantity)
    })

    return (
        <header className="border-b p-1 sticky top-0 z-20 bg-white">
            <div className="flex items-center justify-between max-w-6xl pt-4 mx-auto lg:max-w-screen-xl">
                <Link href="/" passHref>
                    <a className="cursor-pointer">
                        <span className="text-lg pt-1 font-bold">
                            Polymonsters
                        </span>
                    </a>
                </Link>
                <a onClick={() => setCartOpen(!cartOpen)} className="text-md font-bold cursor-pointer">{`Cart (${cartQuantity})`}</a>
                <Cart />
            </div>
        </header>
    )
}

export default Navbar
