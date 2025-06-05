'use client';

import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  ShoppingCart, 
  User, 
  Wine, 
  Heart,
  LogIn,
  UserPlus,
  Search,
  PhoneCall,
  MapPin,
  Clock,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Home,
  BookOpen,
  Users,
  ShoppingBag,
  Calendar,
  MonitorPlay
} from 'lucide-react';
import jwt from 'jsonwebtoken';

type NavItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
  subItems?: {
    name: string;
    href: string;
    description?: string;
  }[];
  isButton?: boolean;
};

type ContactInfo = {
  icon: React.ReactNode;
  text: string;
  href?: string;
};

const FixedNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('email') || sessionStorage.getItem('email') || ''
      : ''
  );
  const [username, setUsername] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('username') || sessionStorage.getItem('username') || ''
      : ''
  );
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
        setIsCartOpen(false);
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check auth state on mount
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded && typeof decoded === 'object') {
          setIsAuthenticated(true);
          setUserEmail(decoded.email || '');
        }
      } catch (error) {
        console.error('Token decoding failed:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('email') || sessionStorage.getItem('email');
      const storedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
      
      if (storedEmail) setUserEmail(storedEmail);
      if (storedUsername) setUsername(storedUsername);
      
      if (storedEmail || storedUsername) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setActiveDropdown(null);
  };

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };
  
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isCartOpen) setIsCartOpen(false);
  };
  
  const closeAll = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setIsCartOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    setIsAuthenticated(false);
    setUserEmail('');
    setUsername('');
    closeAll();
    router.push('/');
  };

  const navItems: NavItem[] = [
    { 
      name: "Home", 
      href: "/",
      icon: <Home className="h-4 w-4 mr-1" />
    },
    { 
      name: "Courses", 
      href: "/courses",
      icon: <BookOpen className="h-4 w-4 mr-1" />,
      subItems: [
        { name: "View All Courses", href: "/courses" },
        { name: "WSET Courses", href: "/courses/wset" }
      ]
    },
    { 
      name: "Membership", 
      href: "/membership",
      icon: <Users className="h-4 w-4 mr-1" />
    },
    { 
      name: "Marketplace", 
      href: "/marketplace",
      icon: <ShoppingBag className="h-4 w-4 mr-1" />
    },
    { 
      name: "Events", 
      href: "/events",
      icon: <Calendar className="h-4 w-4 mr-1" />
    },
    { 
      name: "E-Learning", 
      href: "/e-learning",
      icon: <MonitorPlay className="h-4 w-4 mr-1" />
    },
    { 
      name: "Contact", 
      href: "/contact",
      icon: <Mail className="h-4 w-4 mr-1" />
    },
  ];

  const isActive = (item: NavItem) => {
    if (item.href === '/' && pathname === '/') return true;
    return item.href !== '/' && pathname.startsWith(item.href);
  };
  
  const hasSubItems = (item: NavItem): boolean => {
    return !!(item.subItems && item.subItems.length > 0);
  };

  const contactInfo: ContactInfo[] = [
    { 
      icon: <PhoneCall className="h-4 w-4 mr-2" />, 
      text: "+61 3 9654 1055",
      href: "tel:+61396541055"
    },
    { 
      icon: <MapPin className="h-4 w-4 mr-2" />, 
      text: "123 Wine Street, Melbourne"
    },
    { 
      icon: <Clock className="h-4 w-4 mr-2" />, 
      text: "Mon - Fri: 9:00 - 17:00"
    },
    { 
      icon: <Mail className="h-4 w-4 mr-2" />, 
      text: "info@melbournewineschool.com.au",
      href: "mailto:info@melbournewineschool.com.au"
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="h-4 w-4" />, href: "#" },
    { icon: <Twitter className="h-4 w-4" />, href: "#" },
    { icon: <Instagram className="h-4 w-4" />, href: "#" },
    { icon: <Youtube className="h-4 w-4" />, href: "#" },
  ];

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50" ref={navRef}>
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary-900 flex items-center">
                <Wine className="h-6 w-6 mr-2" />
                Melbourne Wine School
              </Link>
            </div>
            
            {/* Search Bar */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses, events, and more..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Support Links */}
            <div className="flex items-center space-x-6">
              <a href="/about" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors">
                About Us
              </a>
              <a href="/support" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors">
                Support
              </a>
              <a href="tel:+61396541055" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                +61 3 9654 1055
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex mx-auto">
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <div key={item.name} className="relative">
                    {hasSubItems(item) ? (
                      <div className="relative group">
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className={`flex items-center px-1 pt-1 pb-2 text-sm font-medium transition-colors ${
                            isActive(item)
                              ? 'text-primary-700 border-b-2 border-primary-700 font-semibold'
                              : 'text-gray-700 hover:text-primary-700 hover:border-b-2 hover:border-primary-100'
                          }`}
                        >
                          {item.name}
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform ${
                              activeDropdown === item.name ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {activeDropdown === item.name && item.subItems && (
                          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                            <div className="py-1">
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                                  onClick={closeAll}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`inline-flex items-center px-1 pt-1 pb-2 text-sm font-medium transition-colors ${
                          isActive(item)
                            ? 'text-primary-700 border-b-2 border-primary-700 font-semibold'
                            : 'text-gray-700 hover:text-primary-700 hover:border-b-2 hover:border-primary-100'
                        }`}
                        onClick={closeAll}
                      >
                        {item.icon}
                        <span className="ml-1">{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Right side - Auth and Cart */}
            <div className="flex items-center space-x-4">
              {/* Like Button */}
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 text-gray-500 hover:text-primary-600 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart 
                  className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                />
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center text-[10px]">0</span>
              </button>

              {/* Cart */}
              <div className="relative">
                <button 
                  onClick={toggleCart}
                  className="p-2 text-gray-500 hover:text-primary-600 transition-colors relative"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center text-[10px]">0</span>
                </button>
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm text-gray-700">Your cart is empty</p>
                    </div>
                    <div className="px-4 py-2">
                      <Link 
                        href="/cart" 
                        className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
                        onClick={closeAll}
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={toggleProfile}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                  aria-label="User Profile"
                >
                  <User className="h-5 w-5" />
                  <span>{isAuthenticated ? username : 'Account'}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-3 border-b">
                          <p className="text-sm font-medium text-gray-900">Welcome back, {username}!</p>
                        </div>
                        <Link 
                          href="/dashboard" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={closeAll}
                        >
                          My Dashboard
                        </Link>
                        <Link 
                          href="/orders" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={closeAll}
                        >
                          My Orders
                        </Link>
                        <Link 
                          href="/wishlist" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={closeAll}
                        >
                          Wishlist
                        </Link>
                        <div className="border-t border-gray-100"></div>
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b">
                          <p className="text-sm text-gray-700">Welcome to Melbourne Wine School</p>
                        </div>
                        <Link 
                          href="/login" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={closeAll}
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Sign In
                        </Link>
                        <Link 
                          href="/register" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={closeAll}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {hasSubItems(item) ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive(item)
                            ? 'bg-primary-50 text-primary-700 font-semibold'
                            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                        } flex justify-between items-center`}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.name}</span>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 transform transition-transform ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {activeDropdown === item.name && item.subItems && (
                        <div className="pl-6">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                              onClick={closeAll}
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
                      className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(item)
                          ? 'bg-primary-50 text-primary-700 font-semibold'
                          : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                      }`}
                      onClick={closeAll}
                    >
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 pb-2 border-t border-gray-200">
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    onClick={closeAll}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    onClick={closeAll}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixedNavigation;
