'use client';

import Image from 'next/image';
import { getAllVideoSongs, getYouTubeVideoId, getYouTubeThumbnail } from '@/data/songs';
import { HiPlay } from 'react-icons/hi2';

const videoSongs = getAllVideoSongs();

export default function VideoReel() {
  // Duplicate the songs array to create seamless infinite scroll
  const duplicatedSongs = [...videoSongs, ...videoSongs];

  return (
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
              <a
                key={`${song.title}-${index}`}
                href={song.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-40 sm:w-48 aspect-video rounded-lg overflow-hidden border-2 border-gray-700 hover:border-amber-400 transition-all duration-300 hover:scale-105 shadow-lg"
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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                  <p className="text-white text-xs font-medium truncate">
                    {song.title}
                  </p>
                  <p className="text-gray-400 text-[10px] truncate">
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
              </a>
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
  );
}
