"use client";
import React, { useState } from "react";
import {

  Menu,
  MenuItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="relative w-full flex items-center justify-center">
      <NavbarDemo className="top-2" />
    </div>
  );
};

function NavbarDemo({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>

        <Link href={"/about"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="About"
          ></MenuItem>
        </Link>

        <Link href={"/contact"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Contact"
          ></MenuItem>
        </Link>

        <Link href={"/Login"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Login"
          ></MenuItem>
        </Link>

        <Link href={"/shop"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Shop"
          ></MenuItem>
        </Link>

        
      </Menu>
    </div>
  );
}

export default Navbar;
