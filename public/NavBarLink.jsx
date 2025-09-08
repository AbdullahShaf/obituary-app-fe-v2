'use client'

import Link from 'next/link';
import React from 'react';

const NavBarLink = ({ Name, Link_To, onLinkClick, Border }) => {

  return (
    <li id='desktop-active-link' className="nav-item fs-ss-links me-lg-3 text-opensauce">
      <Link
        className={`px-lg-2 mx-2 mx-lg-0 nav-link py-lg-3 fw-500 bg-offwhite text-ss-primary mb-3 mb-lg-0`}
        href={`/${Link_To}`}
        onClick={onLinkClick} // Call the passed function to close offcanvas
      >
        {Name}
      </Link>
    </li>
  );
}

export default NavBarLink;