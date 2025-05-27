'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
//import { Home, Search, Bell, Bookmark, User } from 'lucide-react';
import { House, BookmarkSimple, UserCircle } from '@phosphor-icons/react';
import { H1Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  // const [active, setActive] = useState(f)

  const navItems = [
    {
      label: 'Learn',
      href: '/class',
      icon: House,
    },
    {
      label: 'Phrasebook',
      href: '/class/phrasebook',
      icon: BookmarkSimple,
    },
    {
      label: 'Profile',
      href: '/class/profile',
      icon: UserCircle,
    },
  ];


  return (
    <>
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <h2 className="hidden lg:inline text-gray-700 ">FourOf</h2>
      </div>
      {/* Sidebar Navigation */}
      <nav className="flex-1 flex flex-col items-center justify-center space-y-12">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center space-x-4 w-full p-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-violet-200 text-violet-900'
                  : 'text-violet-900 hover:bg-violet-100 hover:text-violet-900'
              }`}
            >
              <Icon
                size={32}
                weight={isActive ? 'fill' : 'regular'}
                color={isActive ? '#6B21A8' : '#6B21A8'} // violet-900
              />
              <h4 className="hidden lg:inline text-gray-600">{label}</h4>
            </Link>
          );
        })}
      </nav>

    </>
  );
};

export default Navbar;