'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { IoGrid, IoMusicalNotes, IoCalendar, IoMic, IoPeople, IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5';
import { ModalImageLoader } from './ui/LoadingSpinner';

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
  { src: '/images/gallery/event-image/Lhosar-2012.jpg', alt: 'Lhosar celebration 2012', caption: 'Lhosar Celebration 2012 - Celebrating Sherpa New Year with music and dance', category: 'Live' },
  { src: '/images/gallery/event-image/appreciation-tokyo.jpg', alt: 'Appreciation ceremony in Tokyo', caption: 'Appreciation Ceremony in Tokyo - Honored by the Sherpa community in Japan', category: 'Events' },
  { src: '/images/gallery/event-image/appreciation.jpg', alt: 'Appreciation ceremony', caption: 'Appreciation Ceremony - Recognition for contributions to Sherpa culture', category: 'Events' },
  { src: '/images/gallery/event-image/colorado-lhosar-2017.jpg', alt: 'Colorado Lhosar celebration 2017', caption: 'Colorado Lhosar 2017 - Performing for the Sherpa community in Colorado', category: 'Live' },
  { src: '/images/gallery/event-image/gutuk-sanjh-2012.jpg', alt: 'Gutuk Sanjh 2012', caption: 'Gutuk Sanjh 2012 - Traditional Sherpa evening celebration', category: 'Live' },
  { src: '/images/gallery/event-image/jiri-concert-2010.jpg', alt: 'Jiri concert 2010', caption: 'Jiri Concert 2010 - Live performance in Jiri, gateway to Everest', category: 'Events' },
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
  { src: '/images/gallery/event-image/tatopani-concert-2010.jpg', alt: 'Tatopani concert 2010', caption: 'Tatopani Concert 2010 - Live performance in the scenic village of Tatopani', category: 'Backstage' },
  { src: '/images/gallery/event-image/tokyo-lhosar.jpg', alt: 'Tokyo Lhosar celebration', caption: 'Tokyo Lhosar - Sherpa New Year celebration in Tokyo, Japan', category: 'Events' },
  { src: '/images/gallery/event-image/with-bijay-lama-and-ad-sherpa.jpg', alt: 'With Bijay Lama and AD Sherpa', caption: 'With Bijay Lama & AD Sherpa - Fellow artists and friends in music', category: 'Backstage' },
  { src: '/images/gallery/event-image/with-dhiraj-rai.jpg', alt: 'With Dhiraj Rai', caption: 'With Dhiraj Rai - Collaboration with the renowned Nepali singer', category: 'Backstage' },
  { src: '/images/gallery/event-image/with-maha-jodi.jpg', alt: 'With Maha Jodi', caption: 'With Maha Jodi - Meeting the legendary Nepali comedy duo', category: 'Backstage' },
  { src: '/images/gallery/event-image/with-radio-nepal-family.jpg', alt: 'With Radio Nepal family', caption: 'With Radio Nepal Family - Broadcasting Sherpa music to the nation', category: 'Studio' },
  { src: '/images/gallery/event-image/with-rajesh-hamal.jpg', alt: 'With Rajesh Hamal', caption: 'With Rajesh Hamal - Meeting the superstar of Nepali cinema', category: 'Backstage' },
  { src: '/images/gallery/event-image/with-roj-moktan-and-mingma-sherpa.jpg', alt: 'With Roj Moktan and Mingma Sherpa', caption: 'With Roj Moktan & Mingma Sherpa - Fellow musicians and collaborators', category: 'Backstage' },
  { src: '/images/gallery/event-image/with-sugam-pokharel-and-dhiraj-rai.jpg', alt: 'With Sugam Pokharel and Dhiraj Rai', caption: 'With Sugam Pokharel & Dhiraj Rai - Icons of Nepali music industry', category: 'Backstage' },
  { src: '/images/gallery/event-image/Jiri-Concert-2011.jpg', alt: 'Jiri Concert', caption: 'With Jiri Concert members on the way', category: 'Events' },
];

// Category tabs with icons and counts
const getCategoryTabs = (): CategoryTab[] => [
  { id: 'All', label: 'All Photos', icon: <IoGrid className="w-5 h-5" />, count: galleryImages.length },
  { id: 'Live', label: 'Live Shows', icon: <IoMusicalNotes className="w-5 h-5" />, count: galleryImages.filter(img => img.category === 'Live').length },
  { id: 'Events', label: 'Events', icon: <IoCalendar className="w-5 h-5" />, count: galleryImages.filter(img => img.category === 'Events').length },
  { id: 'Studio', label: 'Studio', icon: <IoMic className="w-5 h-5" />, count: galleryImages.filter(img => img.category === 'Studio').length },
  { id: 'Backstage', label: 'Backstage', icon: <IoPeople className="w-5 h-5" />, count: galleryImages.filter(img => img.category === 'Backstage').length },
];

// Mobile Gallery Carousel Component
interface MobileGalleryCarouselProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

function MobileGalleryCarousel({ images, onImageClick }: MobileGalleryCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const imagesPerPage = 2;
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const minSwipeDistance = 50;

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && totalPages > 1) goToNext();
    if (isRightSwipe && totalPages > 1) goToPrevious();
  };

  if (images.length === 0) return null;

  return (
    <div className="sm:hidden">
      {/* Carousel Container */}
      <div 
        className="relative px-2"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {/* Group images into pages of 2 */}
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full shrink-0 grid grid-cols-2 gap-2 px-1">
                {images
                  .slice(pageIndex * imagesPerPage, (pageIndex + 1) * imagesPerPage)
                  .map((image, imgIndex) => {
                    const actualIndex = pageIndex * imagesPerPage + imgIndex;
                    return (
                      <button
                        key={image.src}
                        onClick={() => onImageClick(actualIndex)}
                        className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer focus:outline-none shadow-lg"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="50vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {image.category}
                        </span>
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goToPrevious}
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300"
            aria-label="Previous page"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.min(totalPages, 7) }).map((_, index) => {
              // Show first 3, current, and last 3 if many pages
              let pageToShow = index;
              if (totalPages > 7) {
                if (index < 3) pageToShow = index;
                else if (index === 3) pageToShow = currentPage;
                else pageToShow = totalPages - (7 - index);
              }
              return (
                <button
                  key={index}
                  onClick={() => setCurrentPage(pageToShow)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    pageToShow === currentPage
                      ? "bg-amber-500 w-6"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  aria-label={`Go to page ${pageToShow + 1}`}
                />
              );
            })}
          </div>

          <button
            onClick={goToNext}
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300"
            aria-label="Next page"
          >
            <IoChevronForward className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Counter */}
      <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">
        Page {currentPage + 1} of {totalPages}
      </p>
    </div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [modalTouchStart, setModalTouchStart] = useState<number | null>(null);
  const [modalTouchEnd, setModalTouchEnd] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);

  const categoryTabs = getCategoryTabs();
  const filteredImages = activeCategory === 'All' ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);
  const selectedImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  // Modal swipe handlers
  const minSwipeDistance = 50;

  const onModalTouchStart = (e: React.TouchEvent) => {
    setModalTouchEnd(null);
    setModalTouchStart(e.targetTouches[0].clientX);
  };

  const onModalTouchMove = (e: React.TouchEvent) => {
    setModalTouchEnd(e.targetTouches[0].clientX);
  };

  const onModalTouchEnd = () => {
    if (!modalTouchStart || !modalTouchEnd) return;
    const distance = modalTouchStart - modalTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && selectedIndex !== null && selectedIndex < filteredImages.length - 1) {
      setImageLoading(true);
      setSelectedIndex(selectedIndex + 1);
    }
    if (isRightSwipe && selectedIndex !== null && selectedIndex > 0) {
      setImageLoading(true);
      setSelectedIndex(selectedIndex - 1);
    }
  };

  useEffect(() => { const id = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(id); }, []);

  // Sticky tab bar logic - always sticky when within section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !tabBarRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const navbarHeight = window.innerWidth >= 768 ? 80 : 64; // md:h-20 : h-16
      const tabBarHeight = 70;
      // Sticky when section header has scrolled past navbar and section is still visible
      const inGallerySection = sectionRect.top < navbarHeight - 150 && sectionRect.bottom > navbarHeight + tabBarHeight + 100;
      setIsSticky(inGallerySection);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setImageLoading(true);
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < filteredImages.length - 1) {
      setImageLoading(true);
      setSelectedIndex(selectedIndex + 1);
    }
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
      <div className="absolute inset-0 bg-white/5 dark:bg-gray-900/10" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 lugrasimo-regular">Gallery</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Moments captured from live performances, studio sessions, and special events around the world.</p>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6" />
          </div>

          {/* Sticky Tab Bar Container */}
          <div 
            ref={tabBarRef}
            className={`transition-all duration-300 mb-12 ${isSticky ? 'fixed top-16 md:top-20 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-3 shadow-lg border-b border-amber-400/30' : ''}`}
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

          {/* Mobile Carousel */}
          <MobileGalleryCarousel
            key={activeCategory}
            images={filteredImages}
            onImageClick={(index) => { setImageLoading(true); setSelectedIndex(index); }}
          />

          {/* Desktop Grid */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredImages.map((image, index) => (
              <button key={image.src} onClick={() => { setImageLoading(true); setSelectedIndex(index); }}
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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={handleClose}>
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-4xl flex flex-col items-center" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onModalTouchStart}
            onTouchMove={onModalTouchMove}
            onTouchEnd={onModalTouchEnd}
          >
            {/* Image Container */}
            <div className="relative w-full max-h-[65vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                  <ModalImageLoader />
                </div>
              )}
              <Image 
                key={selectedImage.src}
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                width={1200}
                height={800}
                className={`w-full h-auto max-h-[65vh] object-contain bg-black transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} 
                sizes="(max-width: 768px) 95vw, 80vw" 
                priority 
                onLoad={() => setImageLoading(false)}
              />
              {/* Caption overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-3 md:p-4">
                <p className="text-white text-xs sm:text-sm md:text-base leading-snug line-clamp-2 sm:line-clamp-none">{selectedImage.caption}</p>
              </div>
            </div>

            {/* Navigation Controls - Below Image */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                disabled={selectedIndex === 0}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedIndex !== null && selectedIndex > 0
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
                    : "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
                }`}
                aria-label="Previous image"
              >
                <IoChevronBack className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={handleClose}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25"
                aria-label="Close modal"
              >
                <IoClose className="w-5 h-5" />
                Close
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                disabled={selectedIndex === filteredImages.length - 1}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedIndex !== null && selectedIndex < filteredImages.length - 1
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
                    : "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
                }`}
                aria-label="Next image"
              >
                <span className="hidden sm:inline">Next</span>
                <IoChevronForward className="w-5 h-5" />
              </button>
            </div>

            {/* Counter */}
            <p className="text-gray-400 text-sm mt-4">
              {selectedIndex !== null ? `${selectedIndex + 1} of ${filteredImages.length}` : ''}
            </p>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
