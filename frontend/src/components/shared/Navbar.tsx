"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../reuseable/Logo";
import { Menu, X } from "lucide-react"; // Optional: for icons
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const activeLink = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full border-b rounded-b-md shadow-md bg-white z-50 relative">
      <nav className="w-[98%] lg:w-[80%] mx-auto flex justify-between items-center py-4">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 text-blue-950 font-semibold">
          <Link
            href="/"
            className={`${activeLink === "/" ? "text-red-700" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/services"
            className={`${activeLink === "/services" ? "text-red-700" : ""}`}
          >
            Services
          </Link>
          <Link
            href="/about"
            className={`${activeLink === "/about" ? "text-red-700" : ""}`}
          >
            About
          </Link>
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className={`${activeLink === "/dashboard" ? "text-red-700" : ""}`}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className={`${activeLink === "/login" ? "text-red-700" : ""}`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden text-blue-950" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`flex flex-col absolute top-16 left-0  md:hidden bg-white  w-full shadow-md px-6 py-4 space-y-4 text-blue-950 font-semibold`}
        >
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`${activeLink === "/" ? "text-red-700" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className={`${activeLink === "/services" ? "text-red-700" : ""}`}
          >
            Services
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className={`${activeLink === "/about" ? "text-red-700" : ""}`}
          >
            About
          </Link>
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className={`${activeLink === "/dashboard" ? "text-red-700" : ""}`}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className={`${activeLink === "/login" ? "text-red-700" : ""}`}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
