"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "../reuseable/Logo";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContexts";
import Dropdown from "../reuseable/Dropdown";
import clsx from "clsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setIsLoading } = useUser();
  const activeLink = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50 border-b">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-blue-950">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "hover:text-blue-600 transition-colors",
                activeLink === href && "text-indigo-600 font-semibold"
              )}
            >
              {label}
            </Link>
          ))}

          {user ? (
            <Dropdown user={user} setIsLoading={setIsLoading} />
          ) : (
            <Link
              href="/login"
              className={clsx(
                "hover:text-blue-600 transition-colors",
                activeLink === "/login" && "text-indigo-600 font-semibold"
              )}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-blue-950 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={clsx(
          "md:hidden transition-all duration-300 bg-white shadow-md overflow-hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col px-6 py-4 space-y-4 text-blue-950 font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "hover:text-blue-600 transition-colors",
                activeLink === href && "text-indigo-600 font-semibold"
              )}
            >
              {label}
            </Link>
          ))}

          {user ? (
            <Dropdown user={user} setIsLoading={setIsLoading} />
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className={clsx(
                "hover:text-blue-600 transition-colors",
                activeLink === "/login" && "text-indigo-600 font-semibold"
              )}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
