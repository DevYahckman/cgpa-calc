"use client";
import Image from "next/image";
import React from "react";
import logoImage from "@/app/assets/imgs/ui logo.png";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import Link from "next/link";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useRouter } from "next/navigation";

const navItems = [
  {
    name: "Home",
    Path: "/",
  },
  {
    name: " Record Results",
    Path: "/record",
  },
  {
    name: "View Results",
    Path: "/results",
  },
  {
    name: "Quick CGPA",
    Path: "/quick-cgpa",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const route = useRouter();

  return (
    <>
      <div className="p-5 flex justify-between bg-[#101524] text-white">
        <Link href={"/"}>
          <div className="flex space-x-2 justify-center items-center font-bold">
            <Image src={logoImage} alt="uiLogo" width={50} />
            CGPA-Calculator
          </div>
        </Link>
        <div className="space-x-4 hidden md:flex">
          {navItems.map((items, i: number) => (
            <Link
              key={i}
              href={items.Path}
              className=" transition-all duration-300 border-b-1 border-transparent hover:border-white hover:font-bold "
            >
              {items.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden text-white ">
          <AiOutlineMenuUnfold size={40} color="white" onClick={toggleDrawer} />
        </div>
      </div>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="p-5 py-8 "
        size={300}
      >
        <Link href={"/"}>
          <div className="flex items-center font-bold my-3">
            <Image src={logoImage} alt="uiLogo" width={50} />
            CGPA-Calculator
          </div>
        </Link>

        {navItems.map((items, i: number) => (
          <div
            className="w-full text-xl mb-4 mx-5"
            key={i}
            onClick={() => {
              setIsOpen(false);
              route.push(items.Path);
            }}
          >
            {items.name}
          </div>
        ))}
      </Drawer>
    </>
  );
};

export default Header;
