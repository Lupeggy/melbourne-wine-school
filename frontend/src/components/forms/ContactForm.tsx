'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Input, Textarea, Select } from './Input';

// Define form validation schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }).optional(),
  subject: z.string().min(1, { message: 'Please select a subject' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  subscribe: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      subscribe: true,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would do something like:
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      setIsSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center"
        variants={itemVariants}
      >
        Contact Us
      </motion.h2>
      
      {isSuccess && (
        <motion.div
          className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          Thank you for your message! We'll get back to you soon.
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <motion.div variants={itemVariants}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register('email')}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            type="tel"
            label="Phone Number (Optional)"
            placeholder="+61 4XX XXX XXX"
            error={errors.phone?.message}
            {...register('phone')}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Select
            label="Subject"
            error={errors.subject?.message}
            {...register('subject')}
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="courses">Course Information</option>
            <option value="private">Private Events</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Textarea
            label="Your Message"
            placeholder="How can we help you?"
            rows={5}
            error={errors.message?.message}
            {...register('message')}
          />
        </motion.div>

        <motion.div 
          className="flex items-center"
          variants={itemVariants}
        >
          <input
            type="checkbox"
            id="subscribe"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            {...register('subscribe')}
          />
          <label htmlFor="subscribe" className="ml-2 block text-sm text-gray-700">
            Subscribe to our newsletter
          </label>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6">
              <AnimatedButton
                type="submit"
                className="w-full sm:w-auto"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </AnimatedButton>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
