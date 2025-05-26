'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, Mail, Wine } from 'lucide-react';
import styles from './navigation.module.css';

type NavItem = {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { 
    name: "Courses", 
    href: "/courses",
    subItems: [
      { name: "WSET Level 1", href: "/courses/wset-level-1" },
      { name: "WSET Level 2", href: "/courses/wset-level-2" },
      { name: "WSET Level 3", href: "/courses/wset-level-3" },
      { name: "Casual Classes", href: "/courses/casual" },
    ]
  },
  { 
    name: "Wine Club", 
    href: "/wine-club",
    subItems: [
      { name: "Membership Benefits", href: "/wine-club/benefits" },
      { name: "Events Calendar", href: "/wine-club/events" },
      { name: "Join Now", href: "/wine-club/join" },
    ]
  },
  { name: "Events", href: "/events" },
  { name: "Shop", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeAll = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="bg-white">
      {/* Top bar with contact info */}
      <div className={styles.topBar}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <a href="tel:+61396541055" className={styles.topBarLink}>
                <Phone className={styles.topBarIcon} />
                +61 3 9654 1055
              </a>
              <a href="mailto:info@melbournewineschool.com.au" className={styles.topBarLink}>
                <Mail className={styles.topBarIcon} />
                info@melbournewineschool.com.au
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <a href="#" className="px-3 py-1.5 hover:bg-primary-800 rounded transition-colors">
                Login
              </a>
              <a href="#" className="bg-primary-700 text-white px-4 py-1.5 rounded font-medium hover:bg-primary-800 transition-colors">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className={styles.logo}>
                <Wine className={styles.logoIcon} />
                <span className={styles.logoText}>Melbourne Wine School</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="nav-link nav-link-primary flex items-center"
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      {openDropdown === item.name && (
                        <div className="dropdown-menu">
                          <div className="py-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="dropdown-item"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`nav-link ${
                        pathname === item.href ? 'nav-link-active' : 'nav-link-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.mobileMenuButton}
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className={styles.mobileMenuIcon} />
                ) : (
                  <Menu className={styles.mobileMenuIcon} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className={styles.mobileNavContainer}>
              {navItems.map((item) => (
                <div key={item.name} className="px-2">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full flex justify-between items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-700 rounded-lg transition-colors"
                      >
                        {item.name}
                        <ChevronDown
                          className={`ml-2 h-4 w-4 transition-transform ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block pl-6 pr-4 py-2.5 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary-700 rounded-lg transition-colors"
                              onClick={() => {
                                setIsOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 text-base font-medium ${
                        pathname === item.href ? 'text-primary-700' : 'text-gray-700'
                      } hover:bg-gray-50 hover:text-primary-700 rounded-lg transition-colors`}
                      onClick={() => {
                        setIsOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className={styles.mobileAuthContainer}>
                <a
                  href="#"
                  className="block w-full text-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary-700 text-base font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </a>
                <a
                  href="#"
                  className="block w-full text-center px-4 py-2.5 bg-primary-700 text-white rounded-lg text-base font-medium hover:bg-primary-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
