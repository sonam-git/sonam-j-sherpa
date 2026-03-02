'use client';

import { useState } from 'react';
import Image from 'next/image';
import { YouTubeIcon, MusicNoteIcon } from './icons/SocialIcons';
import { albumsData } from '@/data/songs';

export default function Albums() {
  const [activeAlbum, setActiveAlbum] = useState<string>(albumsData[0].id);

  const currentAlbum = albumsData.find((album) => album.id === activeAlbum);

  return (
    <section id="albums" className="py-20 md:py-32 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                    Track List ({currentAlbum.songs.length} songs)
                  </h4>
                </div>
                <ul className="space-y-3">
                  {currentAlbum.songs.map((song, index) => (
                    <li
                      key={song.title}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors group"
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
                        <a
                          href={song.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-red-500 transition-colors p-2"
                          aria-label={`Watch ${song.title} on YouTube`}
                        >
                          <YouTubeIcon className="w-5 h-5" />
                        </a>
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
    </section>
  );
}
