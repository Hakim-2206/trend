import React from 'react';
import img_logo from '/tREND.png'

const Navbar = () => {
    return (
        <nav className="bg-blue-500/80 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <img src={img_logo} alt="Logo" className='w-20 h-20 rounded-xl shadow-lg'/>
                </div>
                <div>
                    <ul className="flex space-x-6 text-white font-bold">
                        <li className="hover:text-gray-900 text-gray-800 transition-colors cursor-pointer">Home</li>
                        <li className="hover:text-gray-900 text-gray-800 transition-colors cursor-pointer">About</li>
                        <li className="hover:text-gray-900 text-gray-800 transition-colors cursor-pointer">Contact</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;