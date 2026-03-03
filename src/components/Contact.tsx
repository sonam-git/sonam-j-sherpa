'use client';

import { useState, useEffect, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  // Honeypot fields
  website: string;
  phone: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
    phone: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formLoadTime, setFormLoadTime] = useState<number>(0);

  // Record when form was loaded (for bot detection)
  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          website: formData.website, // Honeypot
          phone: formData.phone, // Honeypot
          timestamp: formLoadTime, // For timing check
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Thank you! Your message has been sent successfully.',
        });
        setFormData({ name: '', email: '', subject: '', message: '', website: '', phone: '' });
        setFormLoadTime(Date.now()); // Reset timer
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Sorry, something went wrong. Please try again later.',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden transition-colors duration-300">
     {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/about-photo.jpg')", opacity: 0.20 }}
      />
      {/* Theme-aware Overlay */}
      <div className="absolute inset-0 bg-gray-100/70 dark:bg-gray-900/80 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 lugrasimo-regular">
              Get In Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Have a question or want to collaborate? I&apos;d love to hear from you.
              Send me a message and I&apos;ll get back to you as soon as possible.
            </p>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Social Media Embeds - 3 rows */}
            <div className="flex flex-col gap-4 h-full order-2 lg:order-1">
              {/* Facebook Embed */}
              <div className="flex-1 min-h-50 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="font-semibold text-sm">Facebook</span>
                </div>
                <div className="h-[calc(100%-40px)] overflow-hidden">
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsonxangs%2F&tabs=timeline&width=500&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                    className="w-full h-full border-0"
                    style={{ minHeight: '160px' }}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="Sonam J Sherpa Facebook Page"
                  />
                </div>
              </div>

              {/* Instagram Embed */}
              <div className="flex-1 min-h-50 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span className="font-semibold text-sm">Instagram</span>
                </div>
                <div className="h-[calc(100%-40px)] flex flex-col items-center justify-center p-4 text-center">
                  <a 
                    href="https://www.instagram.com/sonam_j._sherpa/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                  >
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-0.5">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-[#E4405F] transition-colors">@sonam_j._sherpa</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Follow on Instagram</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* TikTok Embed */}
              <div className="flex-1 min-h-50 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-black text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                  <span className="font-semibold text-sm">TikTok</span>
                </div>
                <div className="h-[calc(100%-40px)] flex flex-col items-center justify-center p-4 text-center">
                  <a 
                    href="https://www.tiktok.com/@sjsherpa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                  >
                    <div className="w-16 h-16 rounded-full bg-black p-0.5 relative">
                      <div className="absolute inset-0 rounded-full bg-[#25F4EE] translate-x-0.5 -translate-y-0.5" />
                      <div className="absolute inset-0 rounded-full bg-[#FE2C55] -translate-x-0.5 translate-y-0.5" />
                      <div className="relative w-full h-full rounded-full bg-black flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-[#FE2C55] transition-colors">@sjsherpa</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Follow on TikTok</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 order-1 lg:order-2 bg-white dark:bg-gray-800/50 p-6 sm:p-8 rounded-2xl border-2 border-amber-400/50 dark:border-amber-400/30 shadow-xl shadow-amber-400/10">
              {/* Honeypot fields - hidden from real users */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="page-website">Website</label>
                <input
                  type="text"
                  id="page-website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <label htmlFor="page-phone">Phone</label>
                <input
                  type="text"
                  id="page-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all shadow-sm ${
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  }`}
                  placeholder="John Doe"
                  maxLength={100}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all shadow-sm ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  }`}
                  placeholder="john@example.com"
                  maxLength={254}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all shadow-sm ${
                    errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  }`}
                  placeholder="e.g., Booking Inquiry, Collaboration, General Question"
                  maxLength={200}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none shadow-sm ${
                    errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  }`}
                  placeholder="Tell me about your project or inquiry..."
                  maxLength={5000}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                  {formData.message.length}/5000
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-400/50 text-gray-900 font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-amber-400/30"
              >
                {status.type === 'loading' ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>

              {/* Status Message */}
              {status.type !== 'idle' && status.type !== 'loading' && (
                <div
                  className={`p-4 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-100 dark:bg-green-500/10 border border-green-300 dark:border-green-500/30 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-400'
                  }`}
                >
                  {status.message}
                </div>
              )}

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Your information is secure and will never be shared with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
