'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { YouTubeIcon, MusicNoteIcon } from './icons/SocialIcons';
import { albumsData, getYouTubeVideoId, DEFAULT_CREDITS, Song } from '@/data/songs';
import { HiXMark, HiChevronLeft, HiChevronRight, HiMusicalNote, HiPlay } from 'react-icons/hi2';

interface ModalSong extends Song {
  albumTitle: string;
  index: number;
}

export default function Albums() {
  const [activeAlbum, setActiveAlbum] = useState<string>(albumsData[0].id);
  const [modalSong, setModalSong] = useState<ModalSong | null>(null);

  const currentAlbum = albumsData.find((album) => album.id === activeAlbum);

  // Memoize current album songs to avoid re-renders
  const currentAlbumSongs = useMemo(() => {
    if (!currentAlbum) return [];
    return currentAlbum.songs
      .map((song, index) => ({ ...song, albumTitle: currentAlbum.title, index }))
      .filter((song) => song.youtubeUrl);
  }, [currentAlbum]);

  // Open modal with specific song
  const openModal = (song: Song, index: number) => {
    if (song.youtubeUrl && currentAlbum) {
      setModalSong({ ...song, albumTitle: currentAlbum.title, index });
    }
  };

  // Close modal
  const closeModal = () => {
    setModalSong(null);
  };

  // Navigate to previous song
  const goToPrevious = useCallback(() => {
    if (!modalSong || !currentAlbum) return;
    const currentIdx = currentAlbumSongs.findIndex(s => s.index === modalSong.index);
    if (currentIdx > 0) {
      const prevSong = currentAlbumSongs[currentIdx - 1];
      setModalSong(prevSong);
    }
  }, [modalSong, currentAlbum, currentAlbumSongs]);

  // Navigate to next song
  const goToNext = useCallback(() => {
    if (!modalSong || !currentAlbum) return;
    const currentIdx = currentAlbumSongs.findIndex(s => s.index === modalSong.index);
    if (currentIdx < currentAlbumSongs.length - 1) {
      const nextSong = currentAlbumSongs[currentIdx + 1];
      setModalSong(nextSong);
    }
  }, [modalSong, currentAlbum, currentAlbumSongs]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalSong) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalSong, goToPrevious, goToNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalSong) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalSong]);

  // Get current song position for navigation
  const currentSongIdx = modalSong 
    ? currentAlbumSongs.findIndex(s => s.index === modalSong.index) 
    : -1;
  const hasPrevious = currentSongIdx > 0;
  const hasNext = currentSongIdx < currentAlbumSongs.length - 1;

  return (
    <section id="albums" className="relative py-20 md:py-32 overflow-hidden transition-colors duration-300">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/sj-logo.png')", opacity: 0.15 }}
      />
      {/* Theme-aware Overlay */}
       <div className="absolute inset-0 bg-white/5 dark:bg-gray-900/10" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 lugrasimo-regular">
              Albums & Songs
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Explore my discography — original compositions blending Nepali and
              Sherpa musical traditions.
            </p>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6" />
          </div>

          {/* Album Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {albumsData.map((album) => (
              <button
                key={album.id}
                onClick={() => setActiveAlbum(album.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeAlbum === album.id
                    ? 'bg-amber-400 text-gray-900 shadow-lg shadow-amber-400/30'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white shadow-sm'
                }`}
              >
                {album.title}
              </button>
            ))}
          </div>

          {/* Album Content */}
          {currentAlbum && (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Album Cover */}
              <div className="relative group">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={currentAlbum.coverImage}
                    alt={`${currentAlbum.title} album cover`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {currentAlbum.title}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-300">
                      <span>{currentAlbum.year}</span>
                      <span>•</span>
                      <span>{currentAlbum.language}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Song List */}
              <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <MusicNoteIcon className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Track List {currentAlbum.songs.length} songs
                  </h4>
                </div>
                <ul className="space-y-3">
                  {currentAlbum.songs.map((song, index) => (
                    <li
                      key={song.title}
                      className={`flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 transition-all group ${
                        song.youtubeUrl 
                          ? 'hover:bg-amber-50 dark:hover:bg-amber-400/10 cursor-pointer hover:shadow-md' 
                          : 'hover:bg-gray-200 dark:hover:bg-gray-900'
                      }`}
                      onClick={() => song.youtubeUrl && openModal(song, index)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400 dark:text-gray-500 font-mono text-sm w-6">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {song.title}
                        </span>
                      </div>
                      {song.youtubeUrl && (
                        <button
                          className="flex items-center gap-2 text-gray-500 group-hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10"
                          aria-label={`Watch ${song.title}`}
                        >
                          <HiPlay className="w-5 h-5" />
                          <span className="text-sm font-medium hidden sm:inline">Watch</span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href="https://www.youtube.com/@SonamJSherpaOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors font-medium"
                  >
                    <YouTubeIcon className="w-5 h-5" />
                    Listen to all songs on YouTube
                    <svg
                      className="w-4 h-4"
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
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal - rendered via portal to ensure it's above everything */}
      {modalSong && modalSong.youtubeUrl && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl animate-fade-in ring-1 ring-white/10">
            {/* Close button - hidden on small screens */}
            <button
              onClick={closeModal}
              className="hidden sm:flex absolute top-4 right-4 z-50 items-center justify-center w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Close modal"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            {/* Video Container */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(modalSong.youtubeUrl)}?autoplay=1&rel=0`}
                title={modalSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Song Info */}
            <div className="p-4 sm:p-6 bg-linear-to-b from-gray-900 to-gray-950">
              {/* Title and Album */}
              <div className="mb-4">
                <h3 
                  id="modal-title"
                  className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2"
                >
                  <HiMusicalNote className="w-5 h-5 text-amber-400" />
                  {modalSong.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  From album: <span className="text-amber-400">{modalSong.albumTitle}</span>
                </p>
              </div>

              {/* Credits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Music & Composition</p>
                  <p className="text-white font-medium">
                    {modalSong.music || DEFAULT_CREDITS.music}
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Lyrics</p>
                  <p className="text-white font-medium">
                    {modalSong.lyricist || DEFAULT_CREDITS.lyricist}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-800">
                <button
                  onClick={goToPrevious}
                  disabled={!hasPrevious}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    hasPrevious
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                  }`}
                  aria-label="Previous song"
                >
                  <HiChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  Close
                </button>

                <button
                  onClick={goToNext}
                  disabled={!hasNext}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    hasNext
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                  }`}
                  aria-label="Next song"
                >
                  <span className="hidden sm:inline">Next</span>
                  <HiChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Song indicator */}
              <p className="text-center text-gray-500 text-sm mt-3">
                {currentSongIdx + 1} of {currentAlbumSongs.length} songs
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
