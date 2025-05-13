"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../reuseable/Logo";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContexts";
import Dropdown from "../reuseable/Dropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user,setIsLoading } = useUser();
  const activeLink = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="w-full border-b rounded-b-md shadow-md bg-white z-50 relative">
      <nav className="w-[98%] lg:w-[90%] mx-auto flex justify-between items-center py-4">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 text-blue-950 font-semibold">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={activeLink === href ? "text-red-700" : ""}
            >
              {label}
            </Link>
          ))}

          {user ? (
            <Dropdown user={user} setIsLoading={setIsLoading} />
          ) : (
            <Link
              href="/login"
              className={activeLink === "/login" ? "text-red-700" : ""}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-blue-950" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col absolute top-16 left-0 md:hidden bg-white w-full shadow-md px-6 py-4 space-y-4 text-blue-950 font-semibold">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={activeLink === href ? "text-red-700" : ""}
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
              className={activeLink === "/login" ? "text-red-700" : ""}
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
