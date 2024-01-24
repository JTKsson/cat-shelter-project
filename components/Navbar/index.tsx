"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const Navbar = () => {
  const pathname = usePathname() || "/";

  return (
    <div className="flex justify-center p-4 bg-transparent">
    <div className="flex flex-row justify-evenly w-4/5 text-center">
      {Object.entries(navItems).map(([path, { name }]) => {
        const isActive = path === pathname;
        return (
          <Link key={path} href={path}>
            <span
                className={`cursor-pointer ${
                  isActive ? "underline" : ""
                } hover:underline`}
              >{name}</span>
          </Link>
        );
      })}
    </div>
    </div>
  );
};

export default Navbar;
