'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userId = searchParams.get('id');
        const username = searchParams.get('username');

        if (!token || !userId) {
          throw new Error('Missing authentication data');
        }

        // Store the token and user info
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        if (username) {
          localStorage.setItem('username', username);
          sessionStorage.setItem('username', username);
        }

        // Show success message
        toast.success('Successfully logged in!', {
          position: "top-right",
          autoClose: 2000,
        });

        // Redirect to home after a short delay
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);

      } catch (error) {
        console.error('Google OAuth error:', error);
        setError('Failed to complete login. Please try again.');
        toast.error('Login failed. Please try again.', {
          position: "top-right",
          autoClose: 3000,
        });
        
        // Redirect to login page after showing error
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-800">Completing Login...</h1>
            <p className="text-gray-600">Please wait while we log you in.</p>
          </>
        ) : error ? (
          <>
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-red-600">Login Failed</h1>
            <p className="text-gray-600 mt-2">{error}</p>
            <p className="text-gray-500 text-sm mt-4">Redirecting to login page...</p>
          </>
        ) : (
          <p className="text-gray-600">Redirecting you to the home page...</p>
        )}
      </div>
    </div>
  );
}
