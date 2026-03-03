'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
  YouTubeIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from './icons/SocialIcons';
import { albumsData, getYouTubeVideoId, DEFAULT_CREDITS, Song } from '@/data/songs';
import { HiMusicNote, HiExternalLink, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';

const footerLinks = {
  quickLinks: [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#events', label: 'Events' },
    { href: '#albums', label: 'Albums' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ],
  social: [
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@SonamJSherpaOfficial',
      icon: YouTubeIcon,
      hoverColor: 'hover:text-red-500 hover:bg-red-500/10',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/sonxangs/',
      icon: FacebookIcon,
      hoverColor: 'hover:text-blue-500 hover:bg-blue-500/10',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sonam_j._sherpa/',
      icon: InstagramIcon,
      hoverColor: 'hover:text-pink-500 hover:bg-pink-500/10',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@sjsherpa',
      icon: TikTokIcon,
      hoverColor: 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/10 dark:hover:bg-white/10',
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const album1 = albumsData[0]; // Sonaming
  const album2 = albumsData[1]; // Sonaming Vol 2
  const album3 = albumsData[2]; // Cover Songs

  // Combine all songs with album info for navigation
  const allSongs = useMemo(() => [
    ...album1.songs.map(song => ({ ...song, albumTitle: album1.title, albumCover: album1.coverImage })),
    ...album2.songs.map(song => ({ ...song, albumTitle: album2.title, albumCover: album2.coverImage })),
    ...album3.songs.map(song => ({ ...song, albumTitle: album3.title, albumCover: album3.coverImage })),
  ], [album1, album2, album3]);

  // Modal state
  const [selectedSong, setSelectedSong] = useState<typeof allSongs[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Open modal with selected song
  const openModal = (song: Song, albumTitle: string, albumCover: string, globalIndex: number) => {
    setSelectedSong({ ...song, albumTitle, albumCover });
    setCurrentIndex(globalIndex);
  };

  // Close modal
  const closeModal = useCallback(() => {
    setSelectedSong(null);
  }, []);

  // Navigate to previous song
  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? allSongs.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedSong(allSongs[newIndex]);
  }, [currentIndex, allSongs]);

  // Navigate to next song
  const goToNext = useCallback(() => {
    const newIndex = currentIndex === allSongs.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedSong(allSongs[newIndex]);
  }, [currentIndex, allSongs]);

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
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* First Row - Brand + 3 Album Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="#home" className="inline-block group">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-amber-400 to-amber-600 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity" />
                <Image
                  src="/images/sonam-logo.png"
                  alt="Sonam J Sherpa Logo"
                  width={70}
                  height={70}
                  className="relative rounded-full border-2 border-amber-400/50"
                />
              </div>
            </Link>
            <div>
              <Link
                href="#home"
                className="text-lg font-bold text-white hover:text-amber-400 transition-colors lugrasimo-regular"
              >
                Sonam J Sherpa
              </Link>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                Singer & Musician from the Everest Region of Nepal, now based in California, USA.
              </p>
            </div>
          </div>

          {/* Album 1 Songs - Single Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={album1.coverImage}
                alt={album1.title}
                width={36}
                height={36}
                className="rounded-lg shadow-lg"
              />
              <div>
                <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  {album1.title}
                </h4>
                <p className="text-xs text-gray-500">{album1.year}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {album1.songs.map((song, index) => (
                <button
                  key={song.title}
                  onClick={() => openModal(song, album1.title, album1.coverImage, index)}
                  className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors text-left w-full"
                >
                  <span className="text-xs text-gray-600 group-hover:text-amber-400 w-4 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate">{song.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Album 2 Songs - Single Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={album2.coverImage}
                alt={album2.title}
                width={36}
                height={36}
                className="rounded-lg shadow-lg"
              />
              <div>
                <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  {album2.title}
                </h4>
                <p className="text-xs text-gray-500">{album2.year}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {album2.songs.map((song, index) => (
                <button
                  key={song.title}
                  onClick={() => openModal(song, album2.title, album2.coverImage, album1.songs.length + index)}
                  className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors text-left w-full"
                >
                  <span className="text-xs text-gray-600 group-hover:text-amber-400 w-4 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate">{song.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cover Songs - Single Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={album3.coverImage}
                alt={album3.title}
                width={36}
                height={36}
                className="rounded-lg shadow-lg object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  {album3.title}
                </h4>
                <p className="text-xs text-gray-500">{album3.year}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {album3.songs.map((song, index) => (
                <button
                  key={song.title}
                  onClick={() => openModal(song, album3.title, album3.coverImage, album1.songs.length + album2.songs.length + index)}
                  className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors text-left w-full"
                >
                  <span className="text-xs text-gray-600 group-hover:text-amber-400 w-4 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate">{song.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row - Quick Links in Single Line */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Quick Links:</span>
            {footerLinks.quickLinks.map((link, index) => (
              <span key={link.href} className="flex items-center gap-6">
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
                {index < footerLinks.quickLinks.length - 1 && (
                  <span className="text-gray-700 hidden sm:inline">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm order-2 sm:order-1">
              © {currentYear} Sonam J Sherpa. All rights reserved.
            </p>

            {/* Social Icons with Follow Me */}
            <div className="flex items-center gap-4 order-1 sm:order-2">
              <span className="text-gray-500 text-sm hidden sm:inline">Follow</span>
              <div className="flex items-center gap-2">
                {footerLinks.social.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-gray-400 transition-all ${social.hoverColor}`}
                    aria-label={`Follow on ${social.name}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

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
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="hidden sm:block absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            aria-label="Close modal"
          >
            <HiXMark className="w-6 h-6" />
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

            {/* Credits - Show text for cover songs, music/lyrics for originals */}
            {selectedSong.text ? (
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm italic">{selectedSong.text}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Music</p>
                  <p className="text-white font-medium">{selectedSong.music || DEFAULT_CREDITS.music}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Lyrics</p>
                  <p className="text-white font-medium">{selectedSong.lyricist || DEFAULT_CREDITS.lyricist}</p>
                </div>
              </div>
            )}

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
              {currentIndex + 1} of {allSongs.length} songs
            </p>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
