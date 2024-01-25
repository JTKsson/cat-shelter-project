"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

const navItems = {
  "/": {
    name: "Home",
  },
  "/vacant-cats": {
    name: "Vacant Cats",
  },
  "/info": {
    name: "Info",
  },
  "/about": {
    name: "About",
  },
  "/contact": {
    name: "Contact",
  },
};

const HamburgerMenu = () => {
  const pathname = usePathname() || "/";
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menuContainer = document.getElementById("menu-container");

      if (!menuContainer?.contains(target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full p-4 bg-transparent md:hidden">
      <div className="relative flex items-center text-2xl">
        {/* Hamburger Menu Icon */}
        <div className="cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen
              ? "absolute top-full -left-4 bg-gray-700 p-4 w-2/4 h-screen"
              : "hidden"
          } flex flex-col items-start min-w-fit max-w-60`}
        >
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = path === pathname;
            return (
              <Link key={path} href={path}>
                <span
                  className={`cursor-pointer ${
                    isActive ? "underline" : ""
                  } hover:underline`}
                >
                  {name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
