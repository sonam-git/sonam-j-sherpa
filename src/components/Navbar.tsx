'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import {
  HiHome,
  HiUser,
  HiClock,
  HiMusicNote,
  HiPhotograph,
  HiSparkles,
  HiMail,
  HiSun,
  HiMoon,
} from 'react-icons/hi';
import { HiXMark, HiBars3 } from 'react-icons/hi2';

const navLinks = [
  { href: '#home', label: 'Home', icon: HiHome },
  { href: '#about', label: 'About', icon: HiUser },
  { href: '#events', label: 'Event', icon: HiClock },
  { href: '#albums', label: 'Albums', icon: HiMusicNote },
  { href: '#gallery', label: 'Gallery', icon: HiPhotograph },
  { href: '#spotlight', label: 'Spotlight', icon: HiSparkles },
  { href: '#contact', label: 'Contact', icon: HiMail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-16 md:h-20 ${
          scrolled
            ? 'shadow-lg shadow-black/10 dark:shadow-black/30'
            : ''
        }`}
      >
        {/* Background with Image for scrolled state */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Image (visible when scrolled) */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src="/images/about-photo.jpg"
              alt=""
              fill
              className="object-cover object-top"
              priority
            />
            {/* Dark overlay on the image */}
            <div className="absolute inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-sm" />
            {/* Musical accent line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
        </div>

        <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              href="#home"
              className="flex items-center gap-2 sm:gap-3 group"
              aria-label="Go to home"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-amber-400/50 group-hover:ring-amber-400 transition-all duration-300 group-hover:scale-105 flex-shrink-0">
                <Image
                  src="/images/sonam-logo.png"
                  alt="Sonam J Sherpa Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Name & Tagline - Desktop always visible, Mobile only when scrolled */}
              <div className={`transition-all duration-300 ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 sm:opacity-100 sm:translate-x-0'} ${scrolled ? 'block' : 'hidden sm:block'}`}>
                <span className={`text-sm sm:text-base md:text-lg font-bold transition-colors whitespace-nowrap ${
                  scrolled 
                    ? 'text-white' 
                    : 'text-amber-400 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400'
                }`}>
                  Sonam J Sherpa
                </span>
                <span className={`flex items-center gap-1 text-[10px] sm:text-xs -mt-0.5 transition-colors ${
                  scrolled 
                    ? 'text-amber-400' 
                    : 'text-gray-100 dark:text-gray-400'
                }`}>
                  <span>♪</span> Singer | Musician <span>♪</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.substring(1);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                      scrolled
                        ? isActive
                          ? 'text-amber-400 bg-amber-400/20'
                          : 'text-gray-200 hover:text-amber-400 hover:bg-white/10'
                        : isActive
                          ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10'
                          : 'text-gray-100 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? 'text-amber-500 dark:text-amber-400' : ''
                      }`}
                    />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Side: Theme Toggle + Mobile Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`relative p-2 sm:p-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  scrolled
                    ? 'bg-white/20 text-white hover:bg-white/30 hover:text-amber-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-400/20 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className="relative w-5 h-5">
                  <HiSun
                    className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                      theme === 'dark'
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 rotate-90 scale-50'
                    }`}
                  />
                  <HiMoon
                    className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                      theme === 'light'
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 -rotate-90 scale-50'
                    }`}
                  />
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden relative p-2 sm:p-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  scrolled
                    ? 'bg-white/20 text-white hover:bg-white/30 hover:text-amber-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-400/20 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
              >
                <div className="relative w-5 h-5">
                  <HiBars3
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                      isOpen
                        ? 'opacity-0 rotate-90 scale-50'
                        : 'opacity-100 rotate-0 scale-100'
                    }`}
                  />
                  <HiXMark
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                      isOpen
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 -rotate-90 scale-50'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-500 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <Link
              href="#home"
              onClick={handleNavClick}
              className="flex items-center gap-3"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-amber-400">
                <Image
                  src="/images/sonam-logo.png"
                  alt="Sonam J Sherpa Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Sonam J Sherpa
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-400/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
              aria-label="Close menu"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="p-4 space-y-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                    transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isActive
                        ? 'bg-amber-100 dark:bg-amber-400/20'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {link.label}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-amber-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Theme
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-400/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
              >
                {theme === 'dark' ? (
                  <>
                    <HiSun className="w-4 h-4" />
                    Light
                  </>
                ) : (
                  <>
                    <HiMoon className="w-4 h-4" />
                    Dark
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
