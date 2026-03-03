export interface Song {
  title: string;
  youtubeUrl?: string;
  composer?: string;
  lyricist?: string;
  music?: string;
  text?: string; // For cover songs or songs without YouTube links, to provide additional context or credits
}

export interface Album {
  id: string;
  title: string;
  year: string;
  language: string;
  coverImage: string;
  songs: Song[];
}

// Default credits for Sonam J Sherpa's songs (used as fallback)
export const DEFAULT_CREDITS = {
  composer: 'Sonam J Sherpa',
  lyricist: 'Sonam J Sherpa',
  music: 'Sonam J Sherpa',
};

export const albumsData: Album[] = [
  {
    id: 'sonaming',
    title: 'Sonaming',
    year: '2016',
    language: 'Nepali & Sherpa',
    coverImage: '/images/album-sonaming.png',
    songs: [
      { 
        title: 'Khulera Timle', 
        youtubeUrl: 'https://youtu.be/wwjjHBPmhRU?si=fqvGCzMElSfFqcP1',
        music: 'Saran Joshi',
        lyricist: 'Saran Joshi'
      },
      { 
        title: 'Jau Maichyang', 
        youtubeUrl: 'https://youtu.be/VtoAJuCECAg?si=Va5iKFVHpN-7wmeh',
        music: 'Sonam J Sherpa',
        lyricist: 'Dorjee Sherpa'
      },
      { 
        title: 'Solukhumbu Khumjung', 
        youtubeUrl: 'https://youtu.be/yME4anr5eWI?si=Bb0VnoKr8S1XWAwW',
        music: 'Sonam J Sherpa',
        lyricist: 'Sonam J Sherpa'
      },
      { 
        title: 'Kanchhi Ko', 
        youtubeUrl: 'https://youtu.be/vdkeTU0zsDo?si=3HdFUki0WaMPgKvJ',
        music: 'Hawal Lama',
        lyricist: 'Hawal Lama'
      },
      { 
        title: 'Dadai Ko Jyammai', 
        youtubeUrl: 'https://youtu.be/q3llxSaaQ-I?si=PD2fI5gTDFwfTwnt',
        music: 'Saran Joshi',
        lyricist: 'Hawal Lama'
      },
      { 
        title: 'Nasam Lemu', 
        youtubeUrl: 'https://youtu.be/h9tHrsViXk4?si=4gv11w0zpRrbmEgW',
        music: ' Inspired from nepali song kaan kholera',
        lyricist: 'Nawang Tharwa Sherpa'
      },
      { 
        title: 'Tashi Lhosar', 
        youtubeUrl: 'https://youtu.be/hx459XRPaKU?si=A3VCFdexMCeXQUAy',
        music: 'Sonam J Sherpa',
        lyricist: 'Nawang T Sherpa | Ngima T Sherpa'
      },
      { 
        title: 'Chhorten Kora', 
        youtubeUrl: 'https://youtu.be/BJUZVCdIcrE?si=zOhdfQOKcROpiyts',
        music: 'Sonam J Sherpa',
        lyricist: 'Ngima T Sherpa'
      },
    ],
  },
  {
    id: 'sonaming-vol-2',
    title: 'Sonaming Vol 2',
    year: '2020',
    language: 'Sherpa Songs',
    coverImage: '/images/album-sonaming-vol2.png',
    songs: [
      { 
        title: 'Kesangla', 
        youtubeUrl: 'https://youtu.be/pAr5fsZ13To?si=ppziLCtsljmbPU3R',
        music: 'Sonam J Sherpa',
        lyricist: 'Mingma P Sherpa'
      },
      { 
        title: 'Toeki Khangchen', 
        youtubeUrl: 'https://youtu.be/JTene1FESfs?si=eNGBW2QqOGkJxADC',
        music: 'Sonam J Sherpa',
        lyricist: 'Sonam J Sherpa'
      },
      { 
        title: 'Allami Hos', 
        youtubeUrl: 'https://youtu.be/9sEssYg8wec?si=LpnbZ_zmHyRAio2N',
        music: 'Sonam J Sherpa',
        lyricist: 'Nawang T Sherpa'
      },
      { 
        title: 'Sungla Riku Yoyo', 
        youtubeUrl: 'https://youtu.be/qbHY6rGeqIc?si=nt-9ouTXlbdezWri',
        music: 'Sonam J Sherpa',
        lyricist: 'Ngima T Sherpa'
      },
      { 
        title: 'Nela Chhewa Chungsi', 
        youtubeUrl: 'https://youtu.be/9sEssYg8wec?si=LpnbZ_zmHyRAio2N',
        music: 'Sonam J Sherpa',
        lyricist: 'Kami R Sherpa'
      },
      { 
        title: 'Khumbu Serki Pata', 
        youtubeUrl: 'https://youtu.be/pX_bjJ8sFIM?si=m_Sp-EHbk7UaubJJ',
        music: 'Sonam J Sherpa',
        lyricist: 'Sonam J Sherpa'
      },
      { 
        title: 'Thalu Lumu Leso', 
        youtubeUrl: 'https://youtu.be/lGCxlAnF29g?si=LEDn2Tj-B4KekTEI',
        music: 'Sonam J Sherpa',
        lyricist: 'Sonam J Sherpa'
      },
      { 
        title: 'Chisu Rimu', 
        youtubeUrl: 'https://youtu.be/C7I-1DlTTFg?si=kuiwTNqGkgeyTy2G',
        music: 'Sonam J Sherpa',
        lyricist: 'Sonam J Sherpa'
      },
      {
        title: 'Gomba Tena',
        youtubeUrl: 'https://youtu.be/iybE7WpIV40?si=BBYmKxqmrviJQEUz',
        music: 'Sonam J Sherpa',
        lyricist: 'Sonam J Sherpa'
      },
    ],
  },
  {
    id: 'cover-songs',
    title: 'Cover Songs',
    year: '2016',
    language: 'Tibetan',
    coverImage: '/images/about-photo.jpg',
    songs: [
      { 
        title: 'Emaa Lenchik', 
        youtubeUrl: 'https://youtu.be/Ek0eXDe80Kw?si=CCopnKyrcRQzq9FI',
        text: 'All credit goes to the original artists and composers of these traditional Tibetan songs.',
      },
      { 
        title: 'Kharik Ri', 
        youtubeUrl: 'https://youtu.be/eH2WHXQtxI0?si=EFPxWzHE7Uy7kX_c',
        text: 'All credit goes to the original artists and composers of these traditional Tibetan songs.',
      },
      {
          title: 'Phuyi Khangri Karpo | Ama Lenchik',
          youtubeUrl: 'https://youtu.be/UiPwhfKbiWc?si=4bcmMY5YzrjoDwSb',
          text: 'All credit goes to the original artists and composers of these traditional Tibetan songs.',
      },
      { 
        title: 'Dolma Lhakhang', 
        youtubeUrl: 'https://youtu.be/ZEMeDtkbC4E?si=2Ze9EZ7HSv5Z8SXl',
        text: 'All credit goes to the original artists and composers of these traditional Tibetan songs.',
      },
      { 
        title: 'Yarki Thramo', 
        youtubeUrl: 'https://youtu.be/U5jdUOyBy2M?si=qRQ8qGEHY-p3SmC1',
        text: 'All credit goes to the original artists and composers of these traditional Tibetan songs.',
      },
      { 
        title: 'Oh kanchha', 
        youtubeUrl: 'https://youtu.be/skFmkuzRZg8?si=m6vkwMsMMJkYV3EE',
        text: 'All credit goes to the original artists and composers of these traditional Tibetan songs.',
      },
    ],
  },
];

// Type for songs with album info attached (used in VideoReel)
export interface VideoSong extends Song {
  albumTitle: string;
  albumCover: string;
}

// Get all songs with YouTube URLs for the video reel
export const getAllVideoSongs = (): VideoSong[] => {
  return albumsData
    .flatMap((album) =>
      album.songs
        .filter((song) => song.youtubeUrl)
        .map((song) => ({
          ...song,
          albumTitle: album.title,
          albumCover: album.coverImage,
        }))
    );
};

// Extract YouTube video ID from URL
export const getYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Get YouTube thumbnail URL
export const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'medium'): string => {
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault',
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
};
