import Link from 'next/link';
import Image from 'next/image';
import { YouTubeIcon } from './icons/SocialIcons';
import VideoReel from './VideoReel';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden"
    >
      {/* === LARGE SCREEN LAYOUT (Background Image with Overlay) === */}
      <div className="hidden lg:block absolute inset-0 h-[calc(100vh-120px)]">
        {/* Background Image */}
        <Image
        src="/images/hero.png"
          alt="Sonam J Sherpa"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 dark:from-black/90 dark:via-black/70 dark:to-black/50" />
        {/* Decorative gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* === SMALL SCREEN LAYOUT (Image as full background for top section) === */}
      
      {/* Hero Image - extends from top to cover Row 1 + Row 2 */}
      <div className="lg:hidden relative h-[58vh] w-full">
        <Image
          src="/images/hero.png"
          alt="Sonam J Sherpa"
          fill
          className="object-content object-top"
          priority
          quality={85}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        
        {/* Content at bottom - replacing badges */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center px-4 text-center">
          {/* Welcome badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg mb-2">
            <span className="text-amber-400 text-sm">♪</span>
            <span className="text-white/90 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
              Welcome to my world
            </span>
            <span className="text-amber-400 text-sm">♪</span>
          </div>
          
          {/* Name - English and Tibetan on one line */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap drop-shadow-lg">
            Sonam J Sherpa <span className="text-white/50 font-normal">|</span> བསོད་ནམས་ ཇེ་ ཤེར་པ་
          </h1>
          
          {/* Role - Singer | Musician */}
          <p className="text-amber-400 text-sm sm:text-base font-medium mt-1 flex items-center gap-2 drop-shadow-md">
            <span className="text-white/40">♪</span>
            Singer | Musician
            <span className="text-white/40">♪</span>
          </p>
        </div>
      </div>

      {/* Row 3: Video Reel (15% height on mobile) - right below image */}
      <div className="lg:hidden h-[15vh]">
        <VideoReel />
      </div>

      {/* Row 4: Text & CTA (27% height on mobile) */}
      <div className="lg:hidden flex flex-col items-center justify-center h-[27vh] bg-gradient-to-t from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-md mb-3 leading-relaxed">
          From the majestic Himalayas of Nepal to stages across the world —
          sharing stories through music and building digital experiences.
        </p>
        <div className="flex flex-row items-center justify-center gap-3">
          <a
            href="https://www.youtube.com/@SonamJSherpaOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
          >
            <YouTubeIcon className="w-5 h-5" />
            YouTube
          </a>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-amber-500 dark:border-amber-400 text-amber-600 dark:text-amber-400 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-white dark:hover:text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </Link>
        </div>
      </div>

      {/* === LARGE SCREEN CONTENT (Overlay Content) === */}
      <div className="hidden lg:flex relative z-10 h-[calc(100vh-120px)] items-center">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-2xl">
            {/* Greeting */}
            <p className="text-amber-400 text-base lg:text-lg font-medium tracking-wider uppercase mb-4 animate-fade-in">
              Welcome to my world
            </p>

            {/* Name */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 animate-slide-up">
              Sonam J Sherpa
            </h1>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white/90 mb-6 animate-slide-up">
              བསོད་ནམས་ ཇེ ་ཤེར་པ་
            </h2>

            {/* Tagline */}
            <p className="text-xl lg:text-2xl text-gray-200 mb-6 animate-slide-up animation-delay-200">
              <span className="text-amber-400">Singer</span> |{' '}
              <span className="text-purple-400">Performer</span> |{' '}
              <span className="text-cyan-400">Full-Stack Developer</span>
            </p>

            {/* Intro Text */}
            <p className="text-gray-300 text-base lg:text-lg max-w-xl mb-8 animate-fade-in animation-delay-400 leading-relaxed">
              From the majestic Himalayas of Nepal to stages across the world —
              sharing stories through music and building digital experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row items-center gap-4 animate-fade-in animation-delay-600">
              <a
                href="https://www.youtube.com/@SonamJSherpaOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
              >
                <YouTubeIcon className="w-6 h-6" />
                Listen on YouTube
              </a>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Contact Me
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* === LARGE SCREEN VIDEO REEL (Bottom of Hero) === */}
      <div className="hidden lg:block relative z-10 h-30">
        <VideoReel />
      </div>
    </section>
  );
}
