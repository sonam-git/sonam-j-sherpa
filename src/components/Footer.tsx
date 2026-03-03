import Link from 'next/link';
import Image from 'next/image';
import {
  YouTubeIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from './icons/SocialIcons';
import { albumsData } from '@/data/songs';

const footerLinks = {
  quickLinks: [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#career', label: 'Career' },
    { href: '#albums', label: 'Albums' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ],
  social: [
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@SonamJSherpaOfficial',
      icon: YouTubeIcon,
      hoverColor: 'hover:text-red-500 hover:bg-red-500/10',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/sonxangs/',
      icon: FacebookIcon,
      hoverColor: 'hover:text-blue-500 hover:bg-blue-500/10',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sonam_j._sherpa/',
      icon: InstagramIcon,
      hoverColor: 'hover:text-pink-500 hover:bg-pink-500/10',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@sjsherpa',
      icon: TikTokIcon,
      hoverColor: 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/10 dark:hover:bg-white/10',
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const album1 = albumsData[0]; // Sonaming
  const album2 = albumsData[1]; // Sonaming Vol 2

  return (
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-3 space-y-5">
            <Link href="#home" className="inline-block group">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-amber-400 to-amber-600 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity" />
                <Image
                  src="/images/sonam-logo.png"
                  alt="Sonam J Sherpa Logo"
                  width={80}
                  height={80}
                  className="relative rounded-full border-2 border-amber-400/50"
                />
              </div>
            </Link>
            <div>
              <Link
                href="#home"
                className="text-xl font-bold text-white hover:text-amber-400 transition-colors lugrasimo-regular"
              >
                Sonam J Sherpa
              </Link>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                Singer & Musician from the Everest Region of Nepal, now based in California, USA.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
                Quick Links
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {footerLinks.quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Album 1 Songs */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={album1.coverImage}
                alt={album1.title}
                width={40}
                height={40}
                className="rounded-lg shadow-lg"
              />
              <div>
                <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  {album1.title}
                </h4>
                <p className="text-xs text-gray-500">{album1.year} • {album1.language}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {album1.songs.map((song, index) => (
                <a
                  key={song.title}
                  href={song.youtubeUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <span className="text-xs text-gray-600 group-hover:text-amber-400 w-4 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate">{song.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Album 2 Songs */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={album2.coverImage}
                alt={album2.title}
                width={40}
                height={40}
                className="rounded-lg shadow-lg"
              />
              <div>
                <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  {album2.title}
                </h4>
                <p className="text-xs text-gray-500">{album2.year} • {album2.language}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {album2.songs.map((song, index) => (
                <a
                  key={song.title}
                  href={song.youtubeUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <span className="text-xs text-gray-600 group-hover:text-amber-400 w-4 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate">{song.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm order-2 sm:order-1">
              © {currentYear} Sonam J Sherpa. All rights reserved.
            </p>

            {/* Social Icons with Follow Me */}
            <div className="flex items-center gap-4 order-1 sm:order-2">
              <span className="text-gray-500 text-sm hidden sm:inline">Follow</span>
              <div className="flex items-center gap-2">
                {footerLinks.social.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-gray-400 transition-all ${social.hoverColor}`}
                    aria-label={`Follow on ${social.name}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
