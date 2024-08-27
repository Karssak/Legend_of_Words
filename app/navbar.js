"use client";

import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-[#ECD7C2] before:transform before:-translate-y-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#ECD7C2] font-macondo">
      <div className="flex justify-between px-4">
        <div className="flex">
          <div className="py-3 mr-4">
            <img src="/nav/logo.webp" />
          </div>
          <div className="flex">
            <a
              href="#"
              className="border-r-2 border-l-2 border-[#ECD7C2] px-4 py-5 relative group"
            >
              <span className="icon-background"></span>
              <img
                src="/nav/icon-map.svg"
                className="h-10 w-10 relative z-10"
              />
              <span className="icon-text">Map</span>
            </a>
            <a
              href="#"
              className="border-r-2 border-[#ECD7C2] px-4 py-5 relative group"
            >
              <span className="icon-background"></span>
              <img
                src="/nav/icon-manage.svg"
                className="h-10 w-10 relative z-10"
              />
              <span className="icon-text">Manage</span>
            </a>
            <a
              href="#"
              className="border-r-2 border-[#ECD7C2] px-4 py-5 relative group"
            >
              <span className="icon-background"></span>
              <img
                src="/nav/icon-messages.svg"
                className="h-10 w-10 relative z-10"
              />
              <span className="icon-text">Messages</span>
            </a>
            <a
              href="#"
              className="border-r-2 border-[#ECD7C2] px-4 py-5 relative group"
            >
              <span className="icon-background"></span>
              <img
                src="/nav/icon-forum.svg"
                className="h-10 w-10 relative z-10"
              />
              <span className="icon-text">Forum</span>
            </a>
            <a
              href="#"
              className="border-r-2 border-[#ECD7C2] px-4 py-5 relative group"
            >
              <span className="icon-background"></span>
              <img
                src="/nav/icon-encyclopedia.svg"
                className="h-10 w-10 relative z-10"
              />
              <span className="icon-text">Encyclopedia</span>
            </a>
            <a
              href="#"
              className="border-r-2 border-[#ECD7C2] px-4 py-5 relative group"
            >
              <span className="icon-background"></span>
              <img
                src="/nav/icon-hub.svg"
                className="h-10 w-10 relative z-10"
              />
              <span className="icon-text">Hub</span>
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4 mr-2">
          <a
            href="#"
            className="text-[#5A3E23] text-2xl py-1 px-3 border border-[#5A3E23]"
          >
            Register
          </a>
          <a href="#" className="text-[#5A3E23] pr-2 text-2xl">
            Login
          </a>
          <div
            className={`h-6 w-8  flex flex-col justify-between items-center cursor-pointer pt-[2px] pr-1 ${
              isMenuOpen ? "open" : ""
            }`}
            onClick={toggleMenu}
          >
            <span
              className={`block h-[3.3px] w-full bg-[#5A3E23] transform transition duration-500 ease-in-out rounded-full ${
                isMenuOpen ? "rotate-[46.5deg] -translate-y-[1px] w-[30px] ml-0.3" : ""
              }`}
              style={{ transformOrigin: "left" }}
            ></span>
            <span
              className={`block h-[3.3px] w-full bg-[#5A3E23] transform transition duration-500 ease-in-out rounded-full ${
                isMenuOpen ? "opacity-0" : ""
              }`}
              style={{ transformOrigin: "left" }}
            ></span>
            <span
              className={`block h-[3.3px] w-full bg-[#5A3E23] transform transition duration-500 ease-in-out rounded-full ${
                isMenuOpen
                  ? "-rotate-[46.5deg] -translate-y-[-1px] w-[30px] ml-0.3"
                  : ""
              }`}
              style={{ transformOrigin: "left" }}
            ></span>
          </div>
        </div>
      </div>
    </nav>
  );
}
