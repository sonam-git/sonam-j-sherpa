export interface Song {
  title: string;
  youtubeUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  year: string;
  language: string;
  coverImage: string;
  songs: Song[];
}

export const albumsData: Album[] = [
  {
    id: 'sonaming',
    title: 'Sonaming',
    year: '2016',
    language: 'Nepali & Sherpa',
    coverImage: '/images/album-sonaming.png',
    songs: [
      { title: 'Khulera Timle', youtubeUrl: 'https://youtu.be/wwjjHBPmhRU?si=fqvGCzMElSfFqcP1' },
      { title: 'Jau Maichyang', youtubeUrl: 'https://youtu.be/VtoAJuCECAg?si=Va5iKFVHpN-7wmeh' },
      { title: 'Solukhumbu Khumjung', youtubeUrl: 'https://youtu.be/yME4anr5eWI?si=Bb0VnoKr8S1XWAwW' },
      { title: 'Kanchhi Ko', youtubeUrl: 'https://youtu.be/vdkeTU0zsDo?si=3HdFUki0WaMPgKvJ' },
      { title: 'Dadai Ko Jyammai', youtubeUrl: 'https://youtu.be/q3llxSaaQ-I?si=PD2fI5gTDFwfTwnt' },
      { title: 'Nasam Lemu', youtubeUrl: 'https://youtu.be/h9tHrsViXk4?si=4gv11w0zpRrbmEgW' },
      { title: 'Tashi Lhosar', youtubeUrl: 'https://youtu.be/hx459XRPaKU?si=A3VCFdexMCeXQUAy' },
      { title: 'Chhorten Kora', youtubeUrl: 'https://youtu.be/BJUZVCdIcrE?si=zOhdfQOKcROpiyts' },
    ],
  },
  {
    id: 'sonaming-vol-2',
    title: 'Sonaming Vol 2',
    year: '2020',
    language: 'Sherpa Songs',
    coverImage: '/images/album-sonaming-vol2.png',
    songs: [
      { title: 'Kesangla', youtubeUrl: 'https://youtu.be/pAr5fsZ13To?si=ppziLCtsljmbPU3R' },
      { title: 'Toeki Khangchen', youtubeUrl: 'https://youtu.be/JTene1FESfs?si=eNGBW2QqOGkJxADC' },
      { title: 'Allami Hos', youtubeUrl: 'https://youtu.be/9sEssYg8wec?si=LpnbZ_zmHyRAio2N' },
      { title: 'Sungla Riku Yoyo', youtubeUrl: 'https://youtu.be/qbHY6rGeqIc?si=nt-9ouTXlbdezWri' },
      { title: 'Nela Chhewa Chungsi', youtubeUrl: 'https://youtu.be/9sEssYg8wec?si=LpnbZ_zmHyRAio2N' },
      { title: 'Khumbu Serki Pata', youtubeUrl: 'https://youtu.be/pX_bjJ8sFIM?si=m_Sp-EHbk7UaubJJ' },
      { title: 'Thalu Lumu Leso', youtubeUrl: 'https://youtu.be/lGCxlAnF29g?si=LEDn2Tj-B4KekTEI' },
      { title: 'Chisu Rimu', youtubeUrl: 'https://youtu.be/C7I-1DlTTFg?si=kuiwTNqGkgeyTy2G' },
    ],
  },
];

// Get all songs with YouTube URLs for the video reel
export const getAllVideoSongs = () => {
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
