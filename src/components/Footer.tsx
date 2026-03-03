import Link from 'next/link';
import Image from 'next/image';
import {
  YouTubeIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from './icons/SocialIcons';

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
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/sonam.j.sherpa.865127/',
      icon: FacebookIcon,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sonam_j._sherpa/',
      icon: InstagramIcon,
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@sjsherpa',
      icon: TikTokIcon,
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-50 dark:bg-amber-950 border-t border-amber-200 dark:border-amber-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="#home" className="block">
              <Image
                src="/images/sonam-logo.png"
                alt="Sonam J Sherpa Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </Link>
            <Link
              href="#home"
              className="block text-2xl font-bold text-gray-900 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 transition-colors lugrasimo-regular"
            >
              Sonam J Sherpa
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Singer, and Musician from the Everest Region
              of Nepal, now based in California, USA.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Follow Me
            </h4>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
                  aria-label={`Follow on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            © {currentYear} Sonam J Sherpa | All rights reserved
          </p>
          <p className="text-gray-500 dark:text-gray-600 text-sm">
            Developed with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
