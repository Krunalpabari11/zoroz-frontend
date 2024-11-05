// components/Navbar.js
'use clinet'
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-black bg-opacity-50 p-5">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">ShopSphere</h1>
                <div className="flex space-x-8">
                    <Link href="/">
                        <span className="text-white text-lg hover:underline">Home</span>
                    </Link>
                    <Link href="/addNew">
                        <span className="text-white text-lg hover:underline">Add Product</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;