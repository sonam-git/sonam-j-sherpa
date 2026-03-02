'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { IoGrid, IoMusicalNotes, IoCalendar, IoMic, IoPeople } from 'react-icons/io5';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  category: string;
}

interface CategoryTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
}

const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/event-image/Lhosar-2012.jpg', alt: 'Lhosar celebration 2012', caption: 'Lhosar Celebration 2012 - Celebrating Sherpa New Year with music and dance', category: 'Events' },
  { src: '/images/gallery/event-image/appreciation-tokyo.jpg', alt: 'Appreciation ceremony in Tokyo', caption: 'Appreciation Ceremony in Tokyo - Honored by the Sherpa community in Japan', category: 'Events' },
  { src: '/images/gallery/event-image/appreciation.jpg', alt: 'Appreciation ceremony', caption: 'Appreciation Ceremony - Recognition for contributions to Sherpa culture', category: 'Events' },
  { src: '/images/gallery/event-image/colorado-lhosar-2017.jpg', alt: 'Colorado Lhosar celebration 2017', caption: 'Colorado Lhosar 2017 - Performing for the Sherpa community in Colorado', category: 'Live' },
  { src: '/images/gallery/event-image/gutuk-sanjh-2012.jpg', alt: 'Gutuk Sanjh 2012', caption: 'Gutuk Sanjh 2012 - Traditional Sherpa evening celebration', category: 'Events' },
  { src: '/images/gallery/event-image/jiri-concert-2010.jpg', alt: 'Jiri concert 2010', caption: 'Jiri Concert 2010 - Live performance in Jiri, gateway to Everest', category: 'Live' },
  { src: '/images/gallery/event-image/jiri-concert.jpg', alt: 'Jiri concert', caption: 'Jiri Concert - Bringing music to the mountain communities', category: 'Live' },
  { src: '/images/gallery/event-image/lhosar-2014.jpg', alt: 'Lhosar celebration 2014', caption: 'Lhosar 2014 - Sherpa New Year celebration with traditional performances', category: 'Events' },
  { src: '/images/gallery/event-image/lhosar-concert-backstage.jpg', alt: 'Lhosar concert backstage', caption: 'Backstage at Lhosar Concert - Behind the scenes preparation', category: 'Backstage' },
  { src: '/images/gallery/event-image/nagoyo-lhosar-2017.jpg', alt: 'Nagoya Lhosar 2017', caption: 'Nagoya Lhosar 2017 - Celebrating with the Japanese Sherpa community', category: 'Live' },
  { src: '/images/gallery/event-image/performance-lhosar-sanjh.jpg', alt: 'Performance at Lhosar Sanjh', caption: 'Lhosar Sanjh Performance - Evening celebration of Sherpa New Year', category: 'Live' },
  { src: '/images/gallery/event-image/performance-lhosar.jpg', alt: 'Lhosar performance', caption: 'Lhosar Performance - Traditional and contemporary Sherpa music', category: 'Live' },
  { src: '/images/gallery/event-image/performance.jpg', alt: 'Live performance', caption: 'Live Performance - Sharing Sherpa culture through music', category: 'Live' },
  { src: '/images/gallery/event-image/radio-nepal-interview.jpg', alt: 'Radio Nepal interview', caption: 'Radio Nepal Interview - Discussing Sherpa music and culture on national radio', category: 'Studio' },
  { src: '/images/gallery/event-image/recording-solukhumbu-song.jpg', alt: 'Recording Solukhumbu song', caption: 'Recording Solukhumbu - Studio session for the beloved regional anthem', category: 'Studio' },
  { src: '/images/gallery/event-image/sherpa-artist-2011.jpg', alt: 'Sherpa artist 2011', caption: 'Sherpa Artist Recognition 2011 - Celebrating Sherpa artistic achievements', category: 'Events' },
  { src: '/images/gallery/event-image/sherpa-food-festival-2013.jpg', alt: 'Sherpa Food Festival 2013', caption: 'Sherpa Food Festival 2013 - Music performance at cultural food celebration', category: 'Events' },
  { src: '/images/gallery/event-image/tatopani-concert-2010.jpg', alt: 'Tatopani concert 2010', caption: 'Tatopani Concert 2010 - Live performance in the scenic village of Tatopani', category: 'Live' },
  { src: '/images/gallery/event-image/tokyo-lhosar.jpg', alt: 'Tokyo Lhosar celebration', caption: 'Tokyo Lhosar - Sherpa New Year celebration in Tokyo, Japan', category: 'Live' },
  { src: '/images/gallery/event-image/with-bijay-lama-and-ad-sherpa.jpg', alt: 'With Bijay Lama and AD Sherpa', caption: 'With Bijay Lama & AD Sherpa - Fellow artists and friends in music', category: 'Backstage' },
  { src: '/images/gallery/event-image/with-dhiraj-rai.jpg', alt: 'With Dhiraj Rai', caption: 'With Dhiraj Rai - Collaboration with the renowned Nepali singer', category: 'Backstage' },
  { src: '/images/gallery/event-image/with-maha-jodi.jpg', alt: 'With Maha Jodi', caption: 'With Maha Jodi - Meeting the legendary Nepali comedy duo', category: 'Backstage' },
  { src: '/images/gallery/event-image/with-radio-nepal-family.jpg', alt: 'With Radio Nepal family', caption: 'With Radio Nepal Family - Broadcasting Sherpa music to the nation', category: 'Studio' },
  { src: '/images/gallery/event-image/with-rajesh-hamal.jpg', alt: 'With Rajesh Hamal', caption: 'With Rajesh Hamal - Meeting the superstar of Nepali cinema', category: 'Backstage' },
  { src: '/images/gallery/event-image/with-roj-moktan-and-mingma-sherpa.jpg', alt: 'With Roj Moktan and Mingma Sherpa', caption: 'With Roj Moktan & Mingma Sherpa - Fellow musicians and collaborators', category: 'Backstage' },
  { src: '/images/gallery/event-image/with-sugam-pokharel-and-dhiraj-rai.jpg', alt: 'With Sugam Pokharel and Dhiraj Rai', caption: 'With Sugam Pokharel & Dhiraj Rai - Icons of Nepali music industry', category: 'Backstage' },
];

// Category tabs with icons and counts
const getCategoryTabs = (): CategoryTab[] => [
  { id: 'All', label: 'All Photos', icon: <IoGrid className="w-5 h-5" />, count: galleryImages.length },
  { id: 'Live', label: 'Live Shows', icon: <IoMusicalNotes className="w-5 h-5" />, count: galleryImages.filter(img => img.category === 'Live').length },
  { id: 'Events', label: 'Events', icon: <IoCalendar className="w-5 h-5" />, count: galleryImages.filter(img => img.category === 'Events').length },
  { id: 'Studio', label: 'Studio', icon: <IoMic className="w-5 h-5" />, count: galleryImages.filter(img => img.category === 'Studio').length },
  { id: 'Backstage', label: 'Backstage', icon: <IoPeople className="w-5 h-5" />, count: galleryImages.filter(img => img.category === 'Backstage').length },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const categoryTabs = getCategoryTabs();
  const filteredImages = activeCategory === 'All' ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);
  const selectedImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  useEffect(() => { const id = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(id); }, []);

  // Sticky tab bar logic
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !tabBarRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const navbarHeight = 80;
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;
      const inGallerySection = sectionRect.top < navbarHeight && sectionRect.bottom > navbarHeight + 100;
      setIsSticky(inGallerySection && scrollingUp);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < filteredImages.length - 1) setSelectedIndex(selectedIndex + 1);
  }, [selectedIndex, filteredImages.length]);

  const handleClose = useCallback(() => { setSelectedIndex(null); }, []);

  useEffect(() => { const id = requestAnimationFrame(() => setSelectedIndex(null)); return () => cancelAnimationFrame(id); }, [activeCategory]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext, handleClose]);

  useEffect(() => {
    if (selectedIndex !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedIndex]);

  return (
    <section id="gallery" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden transition-colors duration-300">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/about-photo.jpg')", opacity: 0.12 }}
      />
      {/* Theme-aware Overlay */}
      <div className="absolute inset-0 bg-gray-200/70 dark:bg-gray-800/80 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Gallery</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Moments captured from live performances, studio sessions, and special events around the world.</p>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6" />
          </div>

          {/* Sticky Tab Bar Container */}
          <div 
            ref={tabBarRef}
            className={`transition-all duration-300 mb-12 ${isSticky ? 'fixed top-20 left-0 right-0 z-40 bg-gray-200/95 dark:bg-gray-800/95 backdrop-blur-md py-4 shadow-lg border-b border-amber-400/30' : ''}`}
          >
            <div className={isSticky ? 'container mx-auto px-4 sm:px-6 lg:px-8' : ''}>
              <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex gap-2 sm:gap-3 justify-start sm:justify-center min-w-max sm:min-w-0 pb-2 sm:pb-0">
                  {categoryTabs.map((tab) => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveCategory(tab.id)}
                      className={`group relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                        activeCategory === tab.id 
                          ? 'bg-linear-to-r from-amber-400 to-amber-500 text-gray-900 shadow-lg shadow-amber-400/40 scale-105' 
                          : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white shadow-md hover:shadow-lg hover:scale-102'
                      }`}
                    >
                      <span className={`transition-transform duration-300 ${activeCategory === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {tab.icon}
                      </span>
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.id}</span>
                      <span className={`ml-1 px-2 py-0.5 text-xs rounded-full transition-colors duration-300 ${
                        activeCategory === tab.id ? 'bg-gray-900/20 text-gray-900' : 'bg-amber-400/20 text-amber-600 dark:text-amber-400'
                      }`}>
                        {tab.count}
                      </span>
                      {activeCategory === tab.id && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-amber-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {isSticky && <div className="h-16" />}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredImages.map((image, index) => (
              <button key={image.src} onClick={() => setSelectedIndex(index)}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-200 dark:focus:ring-offset-gray-800 shadow-lg">
                <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </div>
                <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">{image.category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {mounted && selectedImage && createPortal(
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/95" onClick={handleClose}>
          <button onClick={handleClose} className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors p-2 z-10" aria-label="Close lightbox">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {selectedIndex !== null && selectedIndex > 0 && (
            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 transition-colors p-2 bg-black/50 rounded-full z-10" aria-label="Previous image">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}

          {selectedIndex !== null && selectedIndex < filteredImages.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 transition-colors p-2 bg-black/50 rounded-full z-10" aria-label="Next image">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}

          {/* Image with golden border - size based on image */}
          <div className="relative max-w-[95vw] md:max-w-5xl max-h-[80vh] md:max-h-[85vh] p-1 bg-linear-to-br from-amber-300 via-amber-400 to-amber-500 rounded-lg shadow-2xl shadow-amber-400/30" onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-black rounded-md overflow-hidden">
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                width={1200}
                height={800}
                className="max-w-full max-h-[calc(80vh-2rem)] md:max-h-[calc(85vh-2rem)] w-auto h-auto object-contain" 
                sizes="(max-width: 768px) 95vw, 80vw" 
                priority 
              />
              {/* Caption overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-3 md:p-4">
                <p className="text-white text-xs sm:text-sm md:text-base leading-snug line-clamp-2 sm:line-clamp-none">{selectedImage.caption}</p>
                <p className="text-amber-400 text-xs mt-1">{selectedIndex !== null ? `${selectedIndex + 1} / ${filteredImages.length}` : ''}</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
