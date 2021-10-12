import Link from 'next/link'

function Navbar() {
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
                <a className="text-md font-bold cursor-pointer">cart</a>
            </div>
        </header>
    )
}

export default Navbar
