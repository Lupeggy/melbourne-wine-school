'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail, 
  ShoppingCart, 
  User, 
  Wine, 
  Users, 
  Store, 
  Calendar, 
  Info, 
  HelpCircle,
  BookOpen,
  Heart,
  Bell,
  LogIn,
  UserPlus
} from 'lucide-react';

type NavItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
  subItems?: {
    name: string;
    href: string;
    description?: string;
  }[];
};

const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
        setIsProfileOpen(false);
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsProfileOpen(false);
    setOpenDropdown(null);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsCartOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsCartOpen(false);
    setIsProfileOpen(false);
    setOpenDropdown(null);
  };

  const handleLogin = () => {
    // TODO: Implement login logic
    setIsAuthenticated(true);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    setIsAuthenticated(false);
    setIsProfileOpen(false);
  };

  const closeAll = () => {
    setIsOpen(false);
    setIsCartOpen(false);
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
    setOpenDropdown(null);
  };

  const navItems: NavItem[] = [
    { 
      name: "Home", 
      href: "/",
      icon: <Wine className="h-4 w-4 mr-1" />
    },
    { 
      name: "Courses", 
      href: "/courses",
      icon: <BookOpen className="h-4 w-4 mr-1" />,
      subItems: [
        { 
          name: "WSET Courses", 
          href: "/courses/wset",
          description: "Internationally recognized wine qualifications"
        },
        { 
          name: "Other Wine Courses", 
          href: "/courses/other",
          description: "Specialized and casual wine education"
        },
        { 
          name: "Tasting Workshops", 
          href: "/courses/workshops",
          description: "Interactive wine tasting experiences"
        },
      ]
    },
    { 
      name: "Wine Club", 
      href: "/wine-club",
      icon: <Users className="h-4 w-4 mr-1" />
    },
    { 
      name: "Marketplace", 
      href: "/marketplace",
      icon: <Store className="h-4 w-4 mr-1" />
    },
    { 
      name: "Events", 
      href: "/events",
      icon: <Calendar className="h-4 w-4 mr-1" />
    },
    { 
      name: "About", 
      href: "/about",
      icon: <Info className="h-4 w-4 mr-1" />
    },
    { 
      name: "Support", 
      href: "/support",
      icon: <HelpCircle className="h-4 w-4 mr-1" />
    },
  ];

  // Check if a nav item or its sub-items is active
  const isActive = (item: NavItem) => {
    if (pathname === item.href) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => pathname === subItem.href);
    }
    return false;
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div ref={navRef}>
        {/* Top bar with contact info */}
        <div className="bg-primary-900 text-white text-sm">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-between items-center">
              <div className="flex space-x-6">
                <a href="tel:+61396541055" className="flex items-center hover:text-primary-200 transition-colors">
                  <Phone className="h-3.5 w-3.5 mr-2" />
                  +61 3 9654 1055
                </a>
                <a href="mailto:info@melbournewineschool.com.au" className="flex items-center hover:text-primary-200 transition-colors">
                  <Mail className="h-3.5 w-3.5 mr-2" />
                  info@melbournewineschool.com.au
                </a>
              </div>
              <div className="flex items-center space-x-4">
                {/* Like Button */}
                <button 
                  onClick={toggleLike}
                  className="p-1.5 hover:bg-primary-800 rounded-full transition-colors relative"
                  aria-label="Wishlist"
                >
                  <Heart 
                    className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                  />
                  <span className="absolute -top-1 -right-1 bg-white text-primary-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
                </button>

                {/* Cart */}
                <div className="relative">
                  <button 
                    onClick={toggleCart}
                    className="p-1.5 hover:bg-primary-800 rounded-full transition-colors relative"
                    aria-label="Shopping Cart"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 bg-white text-primary-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
                  </button>
                  {isCartOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm text-gray-700">Your cart is empty</p>
                      </div>
                      <div className="px-4 py-2">
                        <a href="/cart" className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
                          View Cart
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={toggleNotifications}
                    className="p-1.5 hover:bg-primary-800 rounded-full transition-colors relative"
                    aria-label="Notifications"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
                  </button>
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-3 border-b">
                        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      </div>
                      <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <p>New course available: Wine Tasting 101</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <p>Special offer: 20% off all courses</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </a>
                      </div>
                      <div className="px-4 py-2 border-t">
                        <a href="/notifications" className="text-xs text-primary-600 hover:text-primary-800">View all notifications</a>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="relative">
                  <button 
                    onClick={toggleProfile}
                    className="p-1.5 hover:bg-primary-800 rounded-full transition-colors flex items-center"
                    aria-label="User Profile"
                  >
                    <User className="h-4 w-4 mr-1" />
                    <ChevronDown className={`h-3 w-3 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-3 border-b">
                            <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                            <p className="text-xs text-gray-500">user@example.com</p>
                          </div>
                          <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            My Dashboard
                          </a>
                          <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            My Orders
                          </a>
                          <a href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Wishlist
                          </a>
                          <div className="border-t border-gray-100"></div>
                          <button 
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="px-4 py-3 border-b">
                            <p className="text-sm text-gray-700">Welcome to Melbourne Wine School</p>
                          </div>
                          <a 
                            href="/login" 
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLogin();
                            }}
                          >
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                          </a>
                          <a 
                            href="/signup" 
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLogin(); // For demo, just log in
                            }}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Sign Up
                          </a>
                          <div className="border-t border-gray-100"></div>
                          <a href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            About Us
                          </a>
                          <a href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Contact Support
                          </a>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Main navigation */}
        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="text-xl font-bold text-gray-900 flex items-center">
                  <Wine className="h-6 w-6 mr-2 text-primary-600" />
                  Melbourne Wine School
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group">
                    {item.subItems ? (
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                            isActive(item)
                              ? 'text-primary-700 bg-primary-50'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-primary-700'
                          }`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                            openDropdown === item.name ? 'transform rotate-180' : ''
                          }`} />
                        </button>
                        <div 
                          className={`absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ${
                            openDropdown === item.name ? 'block' : 'hidden'
                          }`}
                        >
                          <div className="py-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                                onClick={closeAll}
                              >
                                {subItem.name}
                                {subItem.description && (
                                  <p className="text-xs text-gray-500 mt-1">{subItem.description}</p>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          pathname === item.href
                            ? 'text-primary-700 bg-primary-50'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary-700'
                        }`}
                        onClick={closeAll}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name} className="px-2 pt-2 pb-3 space-y-1">
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </div>
                        <ChevronDown className={`h-5 w-5 transform transition-transform ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      <div className={`${openDropdown === item.name ? 'block' : 'hidden'} mt-2 space-y-1`}>
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={closeAll}
                          >
                            {subItem.name}
                            {subItem.description && (
                              <span className="ml-2 text-xs text-gray-500 group-hover:text-gray-700">
                                {subItem.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      onClick={closeAll}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
