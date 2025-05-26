'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart, CartItem } from '@/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Image from 'next/image';
import Link from 'next/link';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test'; // Use 'test' as fallback for development

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle Stripe checkout
  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });
      
      const session = await response.json();
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle PayPal approval
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toFixed(2),
            currency_code: 'USD',
          },
        },
      ],
    });
  };

  const onApprove = async (data: { orderID: string }, actions: any) => {
    setLoading(true);
    try {
      const order = await actions.order.capture();
      // Handle successful payment
      console.log('Payment successful:', order);
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Apple Pay
  const handleApplePay = async () => {
    if (typeof window === 'undefined' || !(window as any).ApplePaySession) {
      alert('Apple Pay is not available in this browser');
      return;
    }

    try {
      // Initialize Apple Pay
      const paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        total: {
          label: 'Melbourne Wine School',
          amount: totalPrice.toFixed(2),
        },
        supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
        merchantCapabilities: ['supports3DS'],
        requiredBillingContactFields: ['postalAddress'],
      };

      // Show Apple Pay sheet
      const session = new (window as any).ApplePaySession(3, paymentRequest);
      
      session.onvalidatemerchant = async (event: { validationURL: string }) => {
        try {
          const response = await fetch('/api/apple-pay/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              validationUrl: event.validationURL,
              domainName: window.location.hostname,
              displayName: 'Melbourne Wine School',
            }),
          });
          
          const merchantSession = await response.json();
          session.completeMerchantValidation(merchantSession);
        } catch (error) {
          console.error('Error validating merchant:', error);
          session.abort();
        }
      };

      session.onpaymentauthorized = async (event: { payment: { token: any } }) => {
        try {
          // Process the payment with your server
          const response = await fetch('/api/apple-pay/process', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: event.payment.token,
              items: cart,
            }),
          });

          if (response.ok) {
            session.completePayment((window as any).ApplePaySession.STATUS_SUCCESS);
            clearCart();
            router.push('/checkout/success');
          } else {
            throw new Error('Payment processing failed');
          }
        } catch (error) {
          console.error('Payment failed:', error);
          session.completePayment((window as any).ApplePaySession.STATUS_FAILURE);
        }
      };

      session.oncancel = () => {
        console.log('Apple Pay was cancelled');
      };

      session.begin();
    } catch (error) {
      console.error('Apple Pay error:', error);
      alert('Error initializing Apple Pay. Please try another payment method.');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-gray-600 mb-8">Looks like you haven't added any courses yet.</p>
            <Link
              href="/courses"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart items */}
          <div className="lg:col-span-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={150}
                          height={100}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.title}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.duration}
                        </p>
                        <div className="mt-2 flex items-center">
                          <label htmlFor={`quantity-${item.id}`} className="mr-2 text-sm text-gray-700">
                            Qty:
                          </label>
                          <select
                            id={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className="mt-2 text-lg font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-4">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  Shipping and taxes calculated at checkout.
                </p>

                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={handleStripeCheckout}
                    disabled={loading}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Pay with Card (Stripe)'}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, components: 'buttons' }}>
                    <div className="w-full">
                      <PayPalButtons
                        style={{ layout: 'vertical' }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={(err) => console.error('PayPal error:', err)}
                      />
                    </div>
                  </PayPalScriptProvider>

                  {typeof window !== 'undefined' && (window as any).ApplePaySession && (
                    <button
                      type="button"
                      onClick={handleApplePay}
                      disabled={loading}
                      className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="mr-2"></span> Pay
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
