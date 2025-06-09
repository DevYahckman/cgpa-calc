"use client";
import Image from "next/image";
import React from "react";
import logoImage from "@/app/assets/imgs/ui logo.png";
import Link from "next/link";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const navItems = [
  {
    name: "Home",
    Path: "#",
  },
  {
    name: " Record Results",
    Path: "#",
  },
  {
    name: "View Results",
    Path: "#",
  },
  {
    name: "Quick CGPA",
    Path: "#",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="p-5 flex justify-between bg-[#101524] text-white">
        <Link href={"/"}>
          <div className="flex space-x-2 justify-center items-center font-bold">
            <Image src={logoImage} alt="uiLogo" width={50} />
            CGPA-Calculator
          </div>
        </Link>
        <div className="space-x-4">
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

        <div className=" ">
          <Image
            src={logoImage}
            alt="uiLogo"
            width={50}
            onClick={toggleDrawer}
          />
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="p-5 "
        size={300}
      >

        <div  className="w-full text-xl mb-4"> Home</div>
        <div  className="w-full text-xl mb-4"> Home</div>
        <div  className="w-full text-xl mb-4"> Home</div>
        
      </Drawer>
    </>
  );
};

export default Header;
