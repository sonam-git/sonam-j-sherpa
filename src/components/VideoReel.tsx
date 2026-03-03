'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { getAllVideoSongs, getYouTubeVideoId, getYouTubeThumbnail, DEFAULT_CREDITS, VideoSong } from '@/data/songs';
import { HiPlay } from 'react-icons/hi2';
import { HiX, HiChevronLeft, HiChevronRight, HiMusicNote, HiExternalLink } from 'react-icons/hi';

const videoSongs = getAllVideoSongs();

export default function VideoReel() {
  // Duplicate the songs array to create seamless infinite scroll
  const duplicatedSongs = [...videoSongs, ...videoSongs];
  
  // Modal state
  const [selectedSong, setSelectedSong] = useState<VideoSong | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Open modal with selected song
  const openModal = (song: VideoSong, index: number) => {
    // Use modulo to get the actual index in the original array
    const actualIndex = index % videoSongs.length;
    setSelectedSong(song);
    setCurrentIndex(actualIndex);
  };

  // Close modal
  const closeModal = useCallback(() => {
    setSelectedSong(null);
  }, []);

  // Navigate to previous song
  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? videoSongs.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedSong(videoSongs[newIndex]);
  }, [currentIndex]);

  // Navigate to next song
  const goToNext = useCallback(() => {
    const newIndex = currentIndex === videoSongs.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedSong(videoSongs[newIndex]);
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedSong) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSong, closeModal, goToPrevious, goToNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedSong) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedSong]);

  // Get video ID for modal
  const modalVideoId = selectedSong?.youtubeUrl ? getYouTubeVideoId(selectedSong.youtubeUrl) : null;

  return (
    <>
      <div className="w-full overflow-hidden bg-black/80 dark:bg-black/90 backdrop-blur-sm py-4">
        {/* Film reel top border */}
        <div className="flex justify-between px-2 mb-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`top-${i}`}
              className="w-3 h-2 bg-gray-700 rounded-sm"
            />
          ))}
        </div>

        {/* Scrolling video reel */}
        <div className="relative">
          <div className="flex gap-4 animate-scroll-left">
            {duplicatedSongs.map((song, index) => {
              const videoId = song.youtubeUrl ? getYouTubeVideoId(song.youtubeUrl) : null;
              const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId, 'medium') : null;

              return (
                <button
                  key={`${song.title}-${index}`}
                  onClick={() => openModal(song, index)}
                  className="group relative shrink-0 w-40 sm:w-48 aspect-video rounded-lg overflow-hidden border-2 border-gray-700 hover:border-amber-400 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
                >
                  {/* Thumbnail */}
                  {thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={song.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 160px, 192px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">No thumbnail</span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600 rounded-full p-2">
                      <HiPlay className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Song title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-2">
                    <p className="text-white text-xs font-medium truncate text-left">
                      {song.title}
                    </p>
                    <p className="text-gray-400 text-[10px] truncate text-left">
                      {song.albumTitle}
                    </p>
                  </div>

                  {/* Film sprocket holes on sides */}
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-black/50 flex flex-col justify-around py-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={`left-${i}`} className="w-1 h-1 bg-gray-600 rounded-full mx-auto" />
                    ))}
                  </div>
                  <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-black/50 flex flex-col justify-around py-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={`right-${i}`} className="w-1 h-1 bg-gray-600 rounded-full mx-auto" />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Film reel bottom border */}
        <div className="flex justify-between px-2 mt-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`bottom-${i}`}
              className="w-3 h-2 bg-gray-700 rounded-sm"
            />
          ))}
        </div>
      </div>

      {/* Video Modal - rendered via portal to ensure it's above everything */}
      {selectedSong && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - hidden on small screens, visible on large */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="hidden sm:block absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Close modal"
            >
              <HiX className="w-6 h-6" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              {modalVideoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&rel=0`}
                  title={selectedSong.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Video not available
                </div>
              )}
            </div>

            {/* Song Info */}
            <div className="p-4 sm:p-6 bg-linear-to-b from-gray-900 to-gray-950">
              {/* Title and Album */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  <HiMusicNote className="w-5 h-5 text-amber-400" />
                  {selectedSong.title}
                </h3>
                {selectedSong.albumTitle && (
                  <p className="text-gray-400 text-sm">
                    From album: <span className="text-amber-400">{selectedSong.albumTitle}</span>
                  </p>
                )}
              </div>

              {/* Credits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Music & Composition</p>
                  <p className="text-white font-medium">{selectedSong.composer || DEFAULT_CREDITS.composer}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Lyrics</p>
                  <p className="text-white font-medium">{selectedSong.lyricist || DEFAULT_CREDITS.lyricist}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Artist</p>
                  <p className="text-white font-medium">{selectedSong.music || DEFAULT_CREDITS.music}</p>
                </div>
              </div>

              {/* Watch on YouTube link */}
              {selectedSong.youtubeUrl && (
                <a
                  href={selectedSong.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 text-sm transition-colors"
                >
                  <HiExternalLink className="w-4 h-4" />
                  Watch on YouTube
                </a>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-800">
                <button
                  onClick={goToPrevious}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <HiChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
                
                <button
                  onClick={goToNext}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <span className="hidden sm:inline">Next</span>
                  <HiChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Song counter */}
              <p className="text-center text-gray-500 text-sm mt-3">
                {currentIndex + 1} of {videoSongs.length} songs
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
