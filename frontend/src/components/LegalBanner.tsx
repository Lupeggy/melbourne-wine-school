'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function LegalBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isWarningDismissed, setIsWarningDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('legalWarningDismissed') === 'true';
    }
    return false;
  });

  // Always show on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Clear any existing dismissal from sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('legalBannerDismissed');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('legalWarningDismissed', 'true');
    setIsWarningDismissed(true);
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 200);
  };

  if (!isVisible || isWarningDismissed) return null;

  return (
    <div 
      className={`bg-white border-b border-gray-200 text-gray-800 shadow-sm transition-all duration-200 ease-in-out ${
        isClosing ? 'max-h-0 opacity-0 py-0' : 'opacity-100 py-2'
      } overflow-hidden sticky top-16 z-40`}
    >
      <div className="container mx-auto px-4">
        {/* Legal Warning */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3 mt-0.5">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-red-100">
                <span className="text-red-600 font-bold text-xs">!</span>
              </div>
            </div>
            <div className="text-xs">
              <p className="font-medium">
                <span className="text-red-600">WARNING:</span> Under the Liquor Control Reform Act 1998 it is an offence:
              </p>
              <div className="flex flex-wrap gap-x-4">
                <p className="text-gray-600">
                  • To supply alcohol to a person under 18 years (penalty exceeds $19,000)
                </p>
                <p className="text-gray-600">
                  • For a person under 18 years to purchase or receive liquor (penalty exceeds $700)
                </p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleDismiss}
            className="ml-4 px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors whitespace-nowrap"
          >
            I Understand
          </button>
        </div>
        
        {/* Acknowledgment of Country */}
        <div className="flex items-start border-t border-gray-100 pt-2">
          <div className="flex-shrink-0 mr-3 mt-0.5">
            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-amber-100">
              <span className="text-amber-600 font-bold text-xs">A</span>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            Melbourne Wine School acknowledges the Wurundjeri Woi Wurrung people of the Kulin Nation as the Traditional custodians of the lands on which we live and work. We pay respect to their Elders past, present and emerging. We acknowledge this place always was, and always will be Aboriginal land.
          </p>
        </div>
      </div>
    </div>
  );
}
