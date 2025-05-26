import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Variants } from 'framer-motion';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation variants
const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: {
    y: 60,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: defaultEasing,
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: defaultEasing,
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: defaultEasing,
    },
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: defaultEasing,
    },
  },
};

// Formatters
export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const cleaned = ('' + value).replace(/\D/g, '');
  
  // Check if the input is of correct length
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  
  if (match) {
    return !match[2] 
      ? match[1] 
      : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
  }
  
  return value;
}

// Validation
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  const re = /^[+]?[\s.-]?(?:\(\d{1,3}\)|\d{1,3})[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;
  return re.test(phone);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date
export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-AU', options);
}

// Truncate text
export function truncate(text: string, maxLength: number, ellipsis: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + ellipsis;
}
