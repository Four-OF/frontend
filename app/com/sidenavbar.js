"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  // Home,
  BookOpen,
  Layers,
  NotebookText,
  RefreshCcw,
  Users,
  Trophy,
  UserRound,
  Settings,
  Languages,
  Library,
  BookmarkCheck,
  NotepadTextDashed
} from "lucide-react";
//import { House, BookmarkSimple, UserCircle } from '@phosphor-icons/react';

import { H1Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const SideNavbar = () => {
  const pathname = usePathname();

  const [activeItem, setActiveItem] = useState('');

  const menuItems = [
    { name: 'Book', href: '/class', icon: NotebookText,},
    { name: 'Review', href: '/class/review', icon: RefreshCcw, hasAction: true },
    { name: 'Phrasebook', href: '/class/phrasebook', icon: NotepadTextDashed, hasAction: true },
    // { name: 'Community', href: '/class/team', icon: Users },
    { name: 'Profile', href: '/class/profile', icon: UserRound },
    { name: 'Settings', href: '/class/settings', icon: Settings }
  ];

  return (
    <>
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <h2 className="hidden lg:inline text-gray-700 ">FourOf</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const href = item.href || '#';
          const isActive = activeItem === item.href || pathname === item.href;
          
          return (
            <Link
              role='button'
              key={item.name}
              href={href}
              onClick={() => setActiveItem(item.name)}
              //     -mx-5     w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
              className={`-mx-5 flex items-center justify-between px-4 py-5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-violet-200 text-violet-900 shadow-sm'
                  : 'text-gray-600 hover:bg-violet-50 hover:text-violet-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon 
                  size={24} 
                  className={`${isActive ? 'text-violet-900' : 'text-gray-500 group-hover:text-violet-700'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="hidden lg:inline font-medium text-base">{item.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${
                    item.badge === 'New'
                      ? 'bg-violet-100 text-violet-600 border border-violet-200'
                      : 'bg-violet-200 text-violet-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.hasAction && (
                  <button
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 ${
                      isActive 
                        ? 'bg-violet-300 hover:bg-violet-400' 
                        : 'bg-violet-100 hover:bg-violet-200'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {/* <Plus size={14} className={isActive ? 'text-violet-900' : 'text-violet-700'} /> */}
                  </button>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

    </>
  );
};

export default SideNavbar;