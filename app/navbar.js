'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

const Navbar = ({ hidden }) => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add('border-b-2', 'border-gray-200');
        } else {
          navbar.classList.remove('border-b-2', 'border-gray-200');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="navbar" className="fixed top-0 z-10 w-full py-5 bg-white px-4 ">
       <div className="container mx-auto flex justify-between">
         <div className="flex lg:ml-72 items-center justify-center w-full lg:w-auto">
          <Link href="/">
            <h1 className="tracking-normal">FourOf</h1>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;