'use client'

import Link from 'next/link';
import React from 'react';
import { usePathname } from "next/navigation";

const NavBarLink2 = ({ Name, Link_To, DropdownMenu, onLinkClick, Border }) => {
  const pathname = usePathname();
  const isActive = pathname === `/${Link_To}`;

  return (
    <>
      <li id='desktop-active-link' className="nav-item fs-ss-links right-menu d-block d-lg-none text-opensauce">
        <div className="btn-group dropdown">
          <Link
            className={`px-2 nav-link py-lg-3 fw-500 ${isActive ? 'bg-ss-primary text-white' : 'bg-hover-white'} ${Border}`}
          href={`/${Link_To}`}
            onClick={onLinkClick} // Close offcanvas on click
          >
            {Name}
          </Link>
          <Link
            href=""
            className="btn px-4 dropdown-toggle dropdown-toggle-split border-0 text-white pt-2 mt-1"
            data-bs-toggle="dropdown-menu"
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </Link>
        </div>
        <ul className="dropdown-menu fs-ss-links p-0 bg-ss-primary-op">
          {DropdownMenu}
        </ul>
      </li>

      <li id='desktop-active-link' className="nav-item fs-ss-links right-menu d-none d-lg-block me-lg-3 text-opensauce">
        <Link
          className={`nav-link dropdown-toggle py-lg-3 fw-500 ${isActive ? 'bg-ss-primary text-white' : 'bg-hover-white'} ${Border}`}
          href={`/${Link_To}`}
          onClick={onLinkClick} // Close offcanvas on click (though not needed for desktop)
        >
          {Name}
        </Link>
        <ul className="dropdown-menu fs-ss-links w-content p-0 bg-white">
          {DropdownMenu}
        </ul>
      </li>
    </>
  );
}

export default NavBarLink2;