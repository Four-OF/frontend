import React from 'react';
import { Button } from "@/components/ui/button";
//import { Separator } from "@/components/ui/separator";
import { XLogo, InstagramLogo, TiktokLogo, EnvelopeSimple } from '@phosphor-icons/react';
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-purple-300">
        <div className="flex flex-col md:flex-row gap-x-40 md:gap-40 justify-center mt-14 md:mt-40 p-5">
          <div className="mt-2 p-2">
            <h3 className="">Products</h3>
            <ul className="text-gray-500 dark:text-gray-400">
              <li>
                <Link href="https://www.instagram.com/fourof.learn/" target="_blank" rel="noopener noreferrer">FourOf</Link>
              </li>
              {/* <li>
                  <p href="#" className="hover:underline">Privacy Policy</p>
                </li>
                <li>
                  <p href="#" className="hover:underline">Licensing</p>
                </li>
                <li>
                  <p href="#" className="hover:underline">Contact</p>
                </li> */}
            </ul>
          </div>
          <div className="mt-2 p-2">
            <h2 className="text-xl font-sans font-semibold">Resources</h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li>
                <p href="#" className="hover:underline">About</p>
              </li>
              <li>
                <p href="#" className="hover:underline">Privacy Policy</p>
              </li>
              <li>
                <p href="#" className="hover:underline">Licensing</p>
              </li>
              <li>
                <p href="#" className="hover:underline">Contact</p>
              </li>
            </ul>
          </div>
          <div className="mt-2 p-2">
            <h2 className="text-xl font-sans font-semibold">Socials</h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li>
                <Link href="https://www.instagram.com/fourof.learn/" target="_blank" rel="noopener noreferrer">
                  <InstagramLogo className="text-pink-500 hover:text-pink-600 transition-transform transform hover:scale-110 hover:drop-shadow-md" size={32} />

                </Link>
              </li>
              <li>
                <Link href="https://x.com/FourOf" target="_blank" rel="noopener noreferrer">
                  <XLogo className="text-black hover:text-gray-700 transition-transform transform hover:scale-110 hover:drop-shadow-md" size={32} />

                </Link>
              </li>
              <li>
                <Link href="https://www.tiktok.com/@fourof.learn" target="_blank" rel="noopener noreferrer">
                  <TiktokLogo className="text-gray-900 hover:text-gray-600 transition-transform transform hover:scale-110 hover:drop-shadow-md" size={32} />
                </Link>
              </li>
              <li>
                <Link href="mailto:fourofofficial@gmail.com" target="_blank" rel="noopener noreferrer">
                  <EnvelopeSimple className="text-black hover:text-gray-700 transition-transform transform hover:scale-110 hover:drop-shadow-md" size={32} />

                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4 mx-5"></div>
        <div className="flex flex-col justify-center items-center pb-5 md:flex-row">
          <p className="text-gray-500 hover:underline dark:text-gray-400 text-center ">FourOf &copy; {new Date().getFullYear()}</p>

        </div>

      </footer>
    </>
  );
}