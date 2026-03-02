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

      {/* === SMALL SCREEN LAYOUT (Stacked Rows) === */}
      
      {/* Row 1: Welcome & Name (18% height on mobile) - Musical themed */}
      <div className="lg:hidden relative flex flex-col items-center justify-center h-[18vh] overflow-hidden px-4 text-center pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        
        {/* Floating music notes decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
          <span className="absolute top-2 left-4 text-2xl text-amber-500 animate-pulse">♪</span>
          <span className="absolute top-4 right-8 text-lg text-purple-500 animate-pulse" style={{ animationDelay: '0.5s' }}>♫</span>
          <span className="absolute bottom-3 left-1/4 text-xl text-cyan-500 animate-pulse" style={{ animationDelay: '1s' }}>♪</span>
          <span className="absolute bottom-2 right-1/4 text-2xl text-amber-500 animate-pulse" style={{ animationDelay: '0.3s' }}>♬</span>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Welcome badge - improved UI */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 dark:from-amber-400/20 dark:via-amber-400/10 dark:to-amber-400/20 border border-amber-200/50 dark:border-amber-400/20 shadow-sm mb-3">
            <span className="text-amber-500 dark:text-amber-400 text-sm">♪</span>
            <span className="text-amber-700 dark:text-amber-300 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
              Welcome to my world
            </span>
            <span className="text-amber-500 dark:text-amber-400 text-sm">♪</span>
          </div>
          
          {/* Name - English and Tibetan on one line */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
            Sonam J Sherpa <span className="text-gray-400 dark:text-gray-500 font-normal">|</span> བསོད་ནམས་ ཇེ་ ཤེར་པ་
          </h1>
          
          {/* Role - Singer | Musician */}
          <p className="text-amber-600 dark:text-amber-400 text-sm sm:text-base font-medium mt-1 flex items-center gap-2">
            <span className="text-gray-400 dark:text-gray-600">♪</span>
            Singer | Musician
            <span className="text-gray-400 dark:text-gray-600">♪</span>
          </p>
        </div>
        
        {/* Bottom musical line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      </div>

      {/* Row 2: Image (40% height on mobile) */}
      <div className="lg:hidden relative h-[40vh] w-full">
        <Image
          src="/images/hero.png"
          alt="Sonam J Sherpa"
          fill
          className="object-cover object-top"
          priority
          quality={85}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Role badges */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
          <span className="px-3 py-1 bg-amber-500/90 text-white text-xs font-semibold rounded-full">
            Singer
          </span>
          <span className="px-3 py-1 bg-purple-500/90 text-white text-xs font-semibold rounded-full">
            Performer
          </span>
          <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-semibold rounded-full">
            Developer
          </span>
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
