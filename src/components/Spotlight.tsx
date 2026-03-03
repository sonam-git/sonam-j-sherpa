'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5';

interface ArticleImage {
  src: string;
  alt: string;
  title: string;
  source: string;
  description: string;
}

const articleImages: ArticleImage[] = [
  { src: '/images/gallery/articles/everest-times-article.jpg', alt: 'Everest Times newspaper article', title: 'Featured in Everest Times', source: 'Everest Times', description: 'News coverage of Sonam J Sherpa musical journey and contributions to Sherpa culture in the Everest Times.' },
  { src: '/images/gallery/articles/losar-culture.jpg', alt: 'Certificate of Appreciation', title: 'Certificate of Appreciation', source: 'Max Events', description: 'Certificate of appreciation from the Max Events for outstanding contribution to the Losar celebrations.' },
  { src: '/images/gallery/articles/losar.jpg', alt: 'Certificate of Appreciation', title: 'Certificate of Appreciation', source: 'Pikey Media', description: 'Certificate of appreciation from the Pikey Media for promoting Sherpa culture through music.' },
  { src: '/images/gallery/articles/pratibha-article.jpg', alt: 'Pratibha magazine article', title: 'Pratibha Magazine Feature', source: 'Pratibha Magazine', description: 'In-depth feature article about the artistic journey and cultural mission of Sonam J Sherpa.' },
  { src: '/images/gallery/articles/sherpa-khabar.jpg', alt: 'Sherpa Khabar article', title: 'Sherpa Khabar Coverage', source: 'Sherpa Khabar', description: 'Sonam J Sherpa after moves to the United States, continuing to promote Sherpa culture through music.' },
  { src: '/images/gallery/articles/csa.jpeg', alt: 'CSA appreciation', title: 'CSA Recognition', source: 'CSA', description: 'Recognition and appreciation from CSA for contributions to Sherpa music and cultural preservation.' },
  { src: '/images/gallery/articles/news.jpeg', alt: 'Sherpa Khabar article', title: 'Media Coverage', source: 'News Media', description: 'News about Sonams First album SONAMING in the market' },
  { src: '/images/gallery/articles/news1.jpeg', alt: 'Sherpa Khabar article', title: 'Featured in News', source: 'News Publication', description: 'Feature article celebrating the journey and achievements of Sonam J Sherpa in music.' },
];

// Mobile Spotlight Carousel Component
interface MobileSpotlightCarouselProps {
  articles: ArticleImage[];
  onArticleClick: (index: number) => void;
}

function MobileSpotlightCarousel({ articles, onArticleClick }: MobileSpotlightCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
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
    if (isLeftSwipe && articles.length > 1) goToNext();
    if (isRightSwipe && articles.length > 1) goToPrevious();
  };

  if (articles.length === 0) return null;

  return (
    <div className="sm:hidden">
      {/* Carousel Container */}
      <div 
        className="relative px-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {articles.map((article, index) => (
              <div key={article.src} className="w-full shrink-0 px-1">
                <button
                  onClick={() => onArticleClick(index)}
                  className="group w-full bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-amber-400/50 transition-all duration-300 shadow-lg text-left focus:outline-none"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={article.src}
                      alt={article.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-3 right-3 bg-amber-400 text-gray-900 p-2 rounded-full opacity-90">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-amber-600 dark:text-amber-400 text-sm font-medium">{article.source}</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1 mb-2 line-clamp-1">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{article.description}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {articles.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goToPrevious}
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300"
            aria-label="Previous article"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-amber-500 w-8"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to article ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300"
            aria-label="Next article"
          >
            <IoChevronForward className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Counter */}
      <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">
        {currentIndex + 1} of {articles.length}
      </p>
    </div>
  );
}

export default function Spotlight() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [modalTouchStart, setModalTouchStart] = useState<number | null>(null);
  const [modalTouchEnd, setModalTouchEnd] = useState<number | null>(null);

  const selectedArticle = selectedIndex !== null ? articleImages[selectedIndex] : null;

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
    if (isLeftSwipe && selectedIndex !== null && selectedIndex < articleImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
    if (isRightSwipe && selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  useEffect(() => { const id = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(id); }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < articleImages.length - 1) setSelectedIndex(selectedIndex + 1);
  }, [selectedIndex]);

  const handleClose = useCallback(() => { setSelectedIndex(null); }, []);

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
    <section id="spotlight" className="relative py-20 md:py-32 overflow-hidden transition-colors duration-300">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/sj-logo.png')", opacity: 0.15 }}
      />
      {/* Theme-aware Overlay */}
        <div className="absolute inset-0 bg-white/5 dark:bg-gray-900/10" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 lugrasimo-regular">Spotlight & Appreciation</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Media mentions, newspaper articles, press coverage, and recognition of my musical journey.</p>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6" />
          </div>

          {/* Mobile Carousel */}
          <MobileSpotlightCarousel
            articles={articleImages}
            onArticleClick={(index) => setSelectedIndex(index)}
          />

          {/* Desktop Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articleImages.map((article, index) => (
              <button key={article.src} onClick={() => setSelectedIndex(index)}
                className="group bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-amber-400/50 transition-all duration-300 hover:transform hover:-translate-y-1 shadow-sm hover:shadow-lg text-left focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image src={article.src} alt={article.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-3 right-3 bg-amber-400 text-gray-900 p-2 rounded-full opacity-90">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-amber-600 dark:text-amber-400 text-sm font-medium">{article.source}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{article.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-medium">
                    <span>View Article</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {mounted && selectedArticle && createPortal(
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
            <div className="relative w-full max-h-[60vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image 
                src={selectedArticle.src} 
                alt={selectedArticle.alt} 
                width={1200}
                height={800}
                className="w-full h-auto max-h-[60vh] object-contain bg-black" 
                sizes="(max-width: 768px) 95vw, 80vw" 
                priority 
              />
              {/* Caption overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-3 md:p-4">
                <p className="text-amber-400 text-xs font-medium mb-1">{selectedArticle.source}</p>
                <h3 className="text-white text-sm md:text-base font-semibold mb-1">{selectedArticle.title}</h3>
                <p className="text-gray-300 text-xs hidden sm:block line-clamp-2">{selectedArticle.description}</p>
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
                aria-label="Previous article"
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
                disabled={selectedIndex === articleImages.length - 1}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedIndex !== null && selectedIndex < articleImages.length - 1
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
                    : "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
                }`}
                aria-label="Next article"
              >
                <span className="hidden sm:inline">Next</span>
                <IoChevronForward className="w-5 h-5" />
              </button>
            </div>

            {/* Counter */}
            <p className="text-gray-400 text-sm mt-4">
              {selectedIndex !== null ? `${selectedIndex + 1} of ${articleImages.length}` : ''}
            </p>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
