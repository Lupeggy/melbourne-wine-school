'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [showReactivate, setShowReactivate] = useState(false);
  const [isReactivating, setIsReactivating] = useState(false);
  const router = useRouter();

  const handleLogin = async (reactivate = false) => {
    setError('');
    const loadingState = reactivate ? setIsReactivating : setIsLoading;
    loadingState(true);

    try {
      const url = new URL('http://localhost:3000/api/auth/login');
      if (reactivate) {
        url.searchParams.append('reactivate', 'true');
      }

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle account deactivation
        if (!reactivate) {
          if (data.errorCode === 'account_inactive') {
            setShowReactivate(true);
            setError(data.message);
            return;
          } else if (data.errorCode === 'email_not_verified') {
            setError('Please verify your email address before logging in. Check your inbox for a verification link.');
            return;
          }
        }
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      if (data.token) {
        localStorage.setItem('token', data.token);
        const username = data.user?.username || email.split('@')[0];
        localStorage.setItem('username', username);
        sessionStorage.setItem('username', username);
        window.location.href = '/';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setShowReactivate(false);
    } finally {
      loadingState(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(false);
  };

  const handleReactivate = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLogin(true);
  };

  const handleGoogleLogin = async () => {
    try {
      // This will redirect to Google's OAuth page
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Google login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
            {showReactivate && (
              <div className="mt-2">
                <button
                  onClick={handleReactivate}
                  disabled={isReactivating}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                >
                  {isReactivating ? 'Reactivating...' : 'Click here to reactivate your account'}
                </button>
              </div>
            )}
          </div>
        )}
        
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Please enter your details to sign in
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#8B5CF6] focus:ring-[#8B5CF6] border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#8B5CF6] hover:text-[#7C3AED]">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8B5CF6] hover:bg-[#7C4DFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6]"
          >
            <FcGoogle className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6]"
          >
            <FaFacebook className="h-5 w-5 text-[#1877F2]" />
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6]"
          >
            <FaApple className="h-5 w-5 text-gray-900" />
          </button>
        </div>

        <div className="text-sm text-center mt-6">
          <span className="text-gray-600">Don't have an account? </span>
          <Link href="/signup" className="font-medium text-[#8B5CF6] hover:text-[#7C3AED]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
