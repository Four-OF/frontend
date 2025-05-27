'use client'
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faSearch,
    faCog,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import { Home, Search, Bell, MessageSquare, User } from 'lucide-react';

const MobileNavbar = () => {
    return (
        <>
            <div className="md:hidden fixed bottom-0 w-full bg-black border-t border-gray-800 p-2 flex justify-around items-center z-10 animate-slide-up">
                <Link href="/" className="flex flex-col items-center hover:text-blue-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faHome} className="text-2xl" />
                    <span className="text-xs">Home</span>
                </Link>
                <Link href="/explore" className="flex flex-col items-center hover:text-blue-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faSearch} className="text-2xl" />
                    <span className="text-xs">Explore kok</span>
                </Link>
                <Link href="/profile" className="flex flex-col items-center hover:text-blue-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faUser} className="text-2xl" />
                    <span className="text-xs">Profile lok</span>
                </Link>
                <Link href="/settings" className="flex flex-col items-center hover:text-blue-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faCog} className="text-2xl" />
                    <span className="text-xs">Settings</span>
                </Link>
            </div>
        </>
    );
};

export default MobileNavbar;