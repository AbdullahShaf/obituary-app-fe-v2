'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'react-bootstrap-icons';
import './mobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="mobile-menu-backdrop"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="mobile-menu">
        {/* Header with close button */}
        <div className="mobile-menu-header">
          <div>
            <Link href="/" onClick={onClose}>
              <Image 
                src="/logo.png" 
                alt="Call Genie" 
                width={130} 
                height={40} 
                className="mobile-menu-logo"
              />
            </Link>
          </div>
          <button 
            onClick={onClose}
            className="mobile-menu-close"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="mobile-menu-nav">
          <ul className="mobile-menu-nav-list">
            <NavItem href="/" label="Home" onClick={onClose} />
            <NavItem href="/about-us" label="About Us" onClick={onClose} />
            <NavItem href="/services" label="Services" onClick={onClose} />
            <NavItem href="/renovations" label="Renovations" onClick={onClose} />
            <NavItem href="/digital-marketing" label="Digital Marketing" onClick={onClose} />
            <NavItem href="/faqs" label="FAQs" onClick={onClose} />
            <NavItem href="/contact-us" label="Contact Us" onClick={onClose} />
          </ul>
        </nav>
        
        {/* Login/Sign up button */}
        <div className="mobile-menu-footer">
          <Link 
            href="/login" 
            onClick={onClose}
            className="mobile-menu-login-btn"
          >
            Log in or Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

// NavItem component for consistent styling
const NavItem = ({ href, label, onClick }) => (
  <li className="mobile-menu-nav-item">
    <Link 
      href={href}
      onClick={onClick}
      className="mobile-menu-nav-link"
    >
      {label}
    </Link>
  </li>
);

export default MobileMenu;
