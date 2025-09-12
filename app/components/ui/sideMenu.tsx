"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Roboto_Flex } from "next/font/google";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
// Import Roboto Flex
const roboto = Roboto_Flex({
  subsets: ["latin"],
  weight: ["400", "500"], // 500 = medium
});

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(true);

  return (
    <menu
      className={`${roboto.className} ml-2 relative  block mobile:block tablet:hidden desktop:hidden`}
    >
      {/* Menu Button */}
      <button onClick={() => setIsOpen(true)} className="p-1 text-gray-700">
        <FiMenu size={32} color="black" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 py-4 h-full w-72 bg-[#0f3b4f] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-[250]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-white w-11/12 m-auto pb-6">
          <span className="text-2xl leading-[1.8]">
            <Image
              src="/logo.avif"
              alt="logo"
              width={150}
              height={60}
              className="object-contain"
            />
          </span>
          <button onClick={() => setIsOpen(false)}>
            <Image
              src={"/cancle_icon.png"}
              className=""
              width={20}
              height={20}
              alt="cancel"
            />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-5 py-12">
          <a
            href="https://osmrtnica.com/osmrtnice"
            className="block hover:text-indigo-300 ml-4 text-[18px] leading-[1.8]"
          >
            Osmrtnice
          </a>
          <a
            href="https://osmrtnica.com/pogrebi"
            className="block hover:text-indigo-300 ml-4 text-[18px] leading-[1.8]"
          >
            Pogrebi
          </a>
          <a
            href="https://osmrtnica.com/cvetlicarne"
            className="block hover:text-indigo-300 ml-4 text-[18px] leading-[1.8]"
          >
            Cvetličarne
          </a>
          <a
            href="https://osmrtnica.com/pogrebna-p"
            className="block hover:text-indigo-300 ml-4 text-[18px] leading-[1.8]"
          >
            Pogrebna podjetja
          </a>

          <div>
            <button
              onClick={() => setShowSubmenu(!showSubmenu)}
              className="w-full flex items-center justify-between px-4 py-2 text-[18px] leading-[1.8] hover:text-indigo-300"
            >
              <h2>Ostale strani</h2>
              {showSubmenu ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {showSubmenu && (
              <div
                className="mt-2 space-y-2 py-2"
                style={{ backgroundColor: "#05202f" }}
              >
                <a
                  href="https://osmrtnica.com/zalna-stran"
                  className="block hover:text-indigo-300 ml-6 text-[18px] leading-[1.8]"
                >
                  Žalna stran
                </a>
                <a
                  href="https://dev111.osmrtnica.com/spominska"
                  className="block hover:text-indigo-300 ml-6 text-[18px] leading-[1.8]"
                >
                  Spominska stran
                </a>
                <a
                  href="https://osmrtnica.com/splosni-pogoji"
                  className="block hover:text-indigo-300 ml-6 text-[18px] leading-[1.8]"
                >
                  Splošni pogoji in drobni tisk
                </a>
                <a
                  href="https://osmrtnica.com/"
                  className="block hover:text-indigo-300 ml-6 text-[18px] leading-[1.8]"
                >
                  Kontaktne informacije
                </a>
              </div>
            )}
          </div>

          <a
            href="https://osmrtnica.com/registracija"
            className="block border-white/20 hover:text-indigo-300 ml-4 text-[18px] leading-[1.8]"
          >
            Prijava
          </a>
        </nav>
      </div>
    </menu>
  );
}
