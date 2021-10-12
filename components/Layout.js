import React from 'react'
import Navbar
 from './Navbar'
function Layout({children}) {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Navbar />
            <main>
                {children}
            </main>
            <footer>Footer</footer>
        </div>
    )
}

export default Layout
