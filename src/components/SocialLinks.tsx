import {
  YouTubeIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from './icons/SocialIcons';

const socialLinks = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@SonamJSherpaOfficial',
    icon: YouTubeIcon,
    color: 'hover:text-red-500 hover:border-red-500',
    bgColor: 'hover:bg-red-500/10',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/sonam.j.sherpa.865127/',
    icon: FacebookIcon,
    color: 'hover:text-blue-500 hover:border-blue-500',
    bgColor: 'hover:bg-blue-500/10',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/sonam_j._sherpa/',
    icon: InstagramIcon,
    color: 'hover:text-pink-500 hover:border-pink-500',
    bgColor: 'hover:bg-pink-500/10',
  },
  {
    name: 'TikTok',
    href: '#', // Placeholder - update with actual TikTok URL
    icon: TikTokIcon,
    color: 'hover:text-cyan-400 hover:border-cyan-400',
    bgColor: 'hover:bg-cyan-400/10',
  },
];

export default function SocialLinks() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden transition-colors duration-300">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/about-photo.jpg')", opacity: 0.12 }}
      />
      {/* Theme-aware Overlay */}
       <div className="absolute inset-0 bg-white/5 dark:bg-gray-900/10" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 lugrasimo-regular">
            Connect With Me
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
            Follow my musical journey on social media
          </p>

          {/* Social Icons */}
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 transition-all duration-300 shadow-sm hover:shadow-lg ${social.color} ${social.bgColor}`}
                aria-label={`Follow on ${social.name}`}
              >
                <social.icon className="w-8 h-8 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-all duration-300" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium group-hover:text-current transition-colors">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
