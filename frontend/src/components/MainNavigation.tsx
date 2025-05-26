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
        setIsNotificationsOpen(false);
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsCartOpen(false);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsCartOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
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
      name: "About Us", 
      href: "/about",
      icon: <Info className="h-4 w-4 mr-1" />
    },
    { 
      name: "Support", 
      href: "/support",
      icon: <HelpCircle className="h-4 w-4 mr-1" />
    }
  ];

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

                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={toggleNotifications}
                    className="p-1.5 hover:bg-primary-800 rounded-full transition-colors relative"
                    aria-label="Notifications"
                  >
                    <Bell className="h-4 w-4 text-white" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
                  </button>
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium text-gray-900">Notifications</p>
                      </div>
                      <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Your course "WSET Level 2" starts tomorrow
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          New wines added to the marketplace
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Special offer: 10% off your next purchase
                        </a>
                      </div>
                      <div className="px-4 py-2 border-t">
                        <a href="/notifications" className="text-xs font-medium text-primary-600 hover:text-primary-800">
                          View all notifications
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cart */}
                <div className="relative">
                  <button 
                    onClick={toggleCart}
                    className="p-1.5 hover:bg-primary-800 rounded-full transition-colors relative"
                    aria-label="Shopping Cart"
                  >
                    <ShoppingCart className="h-4 w-4 text-white" />
                    <span className="absolute -top-1 -right-1 bg-white text-primary-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">2</span>
                  </button>
                  {isCartOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium text-gray-900">Your Cart</p>
                      </div>
                      <div className="py-1">
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm text-gray-700">Your cart is empty</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t">
                        <a href="/cart" className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
                          View Cart & Checkout
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="relative">
                  <button 
                    onClick={toggleProfile}
                    className="flex items-center text-sm font-medium text-white hover:text-primary-200 transition-colors"
                    aria-label="User Profile"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-3 border-b">
                            <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                            <p className="text-xs text-gray-500">user@example.com</p>
                          </div>
                          <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            My Dashboard
                          </a>
                          <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            My Orders
                          </a>
                          <a href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Wishlist
                          </a>
                          <div className="border-t border-gray-100"></div>
                          <button 
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                          >
                            Sign out
                          </button>
                        </>
                      ) : (
                        <>
                          <a 
                            href="/login" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                            onClick={handleLogin}
                          >
                            <LogIn className="h-4 w-4 mr-2" />
                            Sign in
                          </a>
                          <a 
                            href="/register" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Create account
                          </a>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <Wine className="h-8 w-8 text-primary-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">Melbourne Wine School</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <div key={item.name} className="relative">
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                            isActive(item)
                              ? 'border-primary-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                          }`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        {openDropdown === item.name && (
                          <div className="absolute z-10 -ml-4 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={closeAll}
                                >
                                  <div className="font-medium">{subItem.name}</div>
                                  {subItem.description && (
                                    <div className="text-xs text-gray-500">{subItem.description}</div>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                          isActive(item)
                            ? 'border-primary-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                        onClick={closeAll}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
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
          {isOpen && (
            <div className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-2">{item.name}</span>
                          </div>
                          <ChevronDown 
                            className={`h-5 w-5 transform ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        {openDropdown === item.name && (
                          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                                onClick={closeAll}
                              >
                                <div className="flex items-center">
                                  <span className="ml-6">{subItem.name}</span>
                                </div>
                                {subItem.description && (
                                  <div className="ml-6 text-sm text-gray-500">{subItem.description}</div>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        onClick={closeAll}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="px-4 space-y-1">
                    <div className="text-sm font-medium text-gray-500">Signed in as</div>
                    <div className="text-sm font-medium text-gray-900">user@example.com</div>
                    <div className="mt-3 space-y-1">
                      <a
                        href="/dashboard"
                        className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                        onClick={closeAll}
                      >
                        My Dashboard
                      </a>
                      <a
                        href="/orders"
                        className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                        onClick={closeAll}
                      >
                        My Orders
                      </a>
                      <a
                        href="/wishlist"
                        className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                        onClick={closeAll}
                      >
                        Wishlist
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 rounded-md"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    <a
                      href="/login"
                      className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      onClick={handleLogin}
                    >
                      Sign in
                    </a>
                    <a
                      href="/register"
                      className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    >
                      Create account
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
