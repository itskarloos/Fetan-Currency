import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-gray-300 dark:text-gray-300 py-8 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image src="/assets/logo.png" height={60} width={85} alt="logo" />
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end">
            <Link
              href="/"
              className="mx-3 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="mx-3 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="mx-3 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/api"
              className="mx-3 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              APIs
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Fetan™. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
