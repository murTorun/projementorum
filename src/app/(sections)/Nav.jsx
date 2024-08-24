"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-3xl font-bold text-white">
            <Image
              src="/logo.png"
              alt="Projementorum Logo"
              width={120}
              height={40}
              className="h-auto w-auto"
              priority
            />
          </div>

          {/* Hamburger menu for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:space-x-4">
            <a href="#" className="btn btn-ghost text-white">
              Ana Sayfa
            </a>
            <a href="#" className="btn btn-ghost text-white">
              Hakkımızda
            </a>
            <a href="#" className="btn btn-ghost text-white">
              Özellikler
            </a>
            <a href="#" className="btn btn-ghost text-white">
              İletişim
            </a>
            <a href="/login" className="btn btn-primary">
              Giriş Yap
            </a>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <a
              href="#"
              className="block py-2 px-4 text-sm text-white hover:bg-white hover:bg-opacity-20"
            >
              Ana Sayfa
            </a>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-white hover:bg-white hover:bg-opacity-20"
            >
              Hakkımızda
            </a>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-white hover:bg-white hover:bg-opacity-20"
            >
              Özellikler
            </a>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-white hover:bg-white hover:bg-opacity-20"
            >
              İletişim
            </a>
            <Link
              href="/login"
              className="block py-2 px-4 text-sm bg-white text-blue-600"
            >
              Giriş Yap
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default Nav;
