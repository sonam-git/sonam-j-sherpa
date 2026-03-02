'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

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

export default function Spotlight() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const selectedArticle = selectedIndex !== null ? articleImages[selectedIndex] : null;

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
      <div className="absolute inset-0 bg-gray-100/70 dark:bg-gray-900/80 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Spotlight & Appreciation</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Media mentions, newspaper articles, press coverage, and recognition of my musical journey.</p>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/95" onClick={handleClose}>
          <button onClick={handleClose} className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors p-2 z-10" aria-label="Close lightbox">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {selectedIndex !== null && selectedIndex > 0 && (
            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 transition-colors p-2 bg-black/50 rounded-full z-10" aria-label="Previous article">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}

          {selectedIndex !== null && selectedIndex < articleImages.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 transition-colors p-2 bg-black/50 rounded-full z-10" aria-label="Next article">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}

          {/* Image with golden border - size based on image */}
          <div className="relative max-w-[95vw] md:max-w-5xl max-h-[80vh] md:max-h-[85vh] p-1 bg-linear-to-br from-amber-300 via-amber-400 to-amber-500 rounded-lg shadow-2xl shadow-amber-400/30" onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-black rounded-md overflow-hidden">
              <Image 
                src={selectedArticle.src} 
                alt={selectedArticle.alt} 
                width={1200}
                height={800}
                className="max-w-full max-h-[calc(80vh-2rem)] md:max-h-[calc(85vh-2rem)] w-auto h-auto object-contain" 
                sizes="(max-width: 768px) 95vw, 80vw" 
                priority 
              />
              {/* Caption overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-3 md:p-4">
                <p className="text-amber-400 text-xs font-medium mb-1">{selectedArticle.source}</p>
                <h3 className="text-white text-sm md:text-base font-semibold mb-1">{selectedArticle.title}</h3>
                <p className="text-gray-300 text-xs hidden sm:block line-clamp-2">{selectedArticle.description}</p>
                <p className="text-amber-400/70 text-xs mt-1">{selectedIndex !== null ? `${selectedIndex + 1} / ${articleImages.length}` : ''}</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
