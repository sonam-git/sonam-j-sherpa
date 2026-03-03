"use client";

import { useState } from "react";
import Image from "next/image";
import { HiBookOpen, HiSparkles, HiMusicNote, HiClock } from "react-icons/hi";
import BookingCTA from "./BookingCTA";

const timelineData = [
  {
    year: '2007',
    title: 'Stage Performances Begin',
    description:
      'Started performing on stage with cover songs of popular singers, marking the beginning of my musical journey.',
    icon: '🎤',
  },
  {
    year: '2010',
    title: 'Out of Valley Concert',
    description:
      'Performed in Jiri Dolakha, and Tatopani concerts, expanding my reach beyond the Everest region and connecting with new audiences.',
    icon: '🎤',
  },
  {
    year: '2014',
    title: 'First Original Song',
    description:
      'Released my first original composition "Khulera Timle" recorded and published via different media platforms, followed by "Solukhumbu Khumjung", showcasing my hometown.',
    icon: '🎵',
  },
  {
    year: '2015',
    title: 'Second Original Song',
    description:
      'Released my second original composition "Solukhumbu Khumjung", showcasing my hometown and own lyrics and composition.',
    icon: '🎵',
  },
  {
    year: '2016',
    title: 'Debut Album "Sonaming"',
    description:
      'Released my debut album with 8 songs featuring both Nepali and Sherpa songs, blending traditional sounds with contemporary music.',
    icon: '💿',
  },
  {
    year: '2017',
    title: 'International Performances',
    description:
      'Performed in Japan and the United States, bringing Sherpa and Nepali music to international audiences.',
    icon: '🌍',
  },
   {
    year: '2018',
    title: 'Sonaming 2"',
    description:
      'Released my second album "Sonaming 2" with 8 Sherpa songs, blending traditional sounds with contemporary music.',
    icon: '💿',
  },
  {
    year: 'Present',
    title: 'New Creation Coming Soon',
    description:
      'Working on new music that celebrates our rich cultural heritage and traditions.',
    icon: '🎶',
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<"story" | "mission" | "journey">("story");

  return (
    <section
      id="about"
      className="relative z-20 py-20 md:py-32 transition-colors duration-500 overflow-hidden"
    >
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
              About Me
            </h2>
            <div className="w-24 h-1 bg-amber-500 dark:bg-amber-400 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image */}
            <div className="relative lg:sticky lg:top-24">
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about-photo.jpg"
                  alt="Sonam J Sherpa performing"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-amber-500/30 dark:border-amber-400/30 rounded-2xl" />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400/30 dark:bg-amber-400/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/30 dark:bg-purple-500/20 rounded-full blur-2xl" />
              
              {/* CTA for Event Hosts */}
              <BookingCTA className="mt-8" />
            </div>

            {/* Content with Tabs */}
            <div className="space-y-6">
              {/* Tab Buttons */}
              <div className="flex gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <button
                  onClick={() => setActiveTab("story")}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    activeTab === "story"
                      ? "bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <HiBookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">My Story</span>
                  <span className="sm:hidden">Story</span>
                </button>
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    activeTab === "mission"
                      ? "bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <HiSparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">My Mission</span>
                  <span className="sm:hidden">Mission</span>
                </button>
                <button
                  onClick={() => setActiveTab("journey")}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    activeTab === "journey"
                      ? "bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <HiClock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">My Journey</span>
                  <span className="sm:hidden">Journey</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-100">
                {/* My Story Tab */}
                <div
                  className={`space-y-6 transition-all duration-500 ${
                    activeTab === "story"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 hidden"
                  }`}
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-2 lugrasimo-regular">
                      From the Himalayas to the World
                    </h3>
                    <p className="text-gray-800 dark:text-gray-100 text-base sm:text-md leading-relaxed">
                      I am Sonam J Sherpa, originally from Khumjung Village in
                      the majestic Everest Region of Nepal, now based in
                      California, USA. My journey in music began around 2007
                      when I started performing on stage with cover songs of
                      popular artists.
                    </p>
                  </div>

                  <p className="text-gray-800 dark:text-gray-100 text-base sm:text-md leading-relaxed">
                    My first major performance took place during an event Sherpa Star in Boudha, Kathmandu, a moment that opened doors
                    to many new opportunities. Over the years, I have performed
                    across Nepal — from Tatopani, Sindhupalchowk to Dolakha Jiri
                    and my hometown Solukhumbu Khumjung — connecting with
                    audiences through music rooted in culture and emotion.
                  </p>
                  <p className="text-gray-800 dark:text-gray-100 text-base sm:text-md leading-relaxed">
                    Encouraged by senior musicians who recognized my passion and potential,
                    and supported by the love of my audiences, I began creating
                    original music that blends Sherpa and Nepali traditions with
                    contemporary sounds. In 2017, I had the honor of performing internationally in
                    Japan and the United States.
                  </p>

                  <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 lugrasimo-regular">
                      Music Rooted in Identity
                    </h4>
                   <p className="text-gray-800 dark:text-gray-100 text-base sm:text-md leading-relaxed italic">
                      For me, music is more than performance — it is a way to
                      honor my roots, tell untold stories, and carry forward the
                      cultural voice of the Sherpa community. Every song I
                      create is inspired by the mountains, memories, and
                      traditions that shaped who I am today.
                    </p>
                  </div>
                </div>

                {/* My Mission Tab */}
                <div
                  className={`space-y-5 transition-all duration-500 ${
                    activeTab === "mission"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 hidden"
                  }`}
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2 lugrasimo-regular">
                      <HiMusicNote className="w-6 h-6" />
                      Preserving Sherpa Musical Heritage
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-base sm:text-md leading-relaxed">
                      Growing up in a Sherpa village in the Khumbu region, I was
                      surrounded by a culture rich in tradition, stories,
                      and—most importantly—music. From a young age, I listened
                      to countless Sherpa songs and melodies passed down through
                      generations.
                    </p>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-400/10 rounded-xl p-5 border border-amber-200 dark:border-amber-400/20">
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed italic">
                      &ldquo;I still remember hearing elders sing and dance for
                      an entire day and night without repeating a single song.
                      That memory alone speaks to how deeply rich and diverse
                      our musical heritage truly is.&rdquo;
                    </p>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-base sm:text-md leading-relaxed">
                    After performing concerts and recording both Nepali and
                    Sherpa songs, a realization stayed with me. In today&apos;s
                    globalized world, many Sherpa children grow up in cities or
                    abroad, away from their villages and families. While this
                    opens doors to new opportunities, it often comes at the cost
                    of losing touch with their roots, language, and cultural
                    identity.
                  </p>

                  <p className="text-gray-600 dark:text-gray-400 text-base sm:text-md leading-relaxed">
                    This realization became stronger after my first album. I
                    decided to focus more deeply on preserving and reviving
                    traditional Sherpa melodies—reintroducing them to the new
                    generation in a way that feels relevant and engaging. By
                    blending modern musical elements with traditional
                    instruments like the{" "}
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      Dranyen (Tibetan lute)
                    </span>
                    , I aim to bridge the gap between the past and the present.
                  </p>

                  <div className="bg-linear-to-r from-purple-50 to-amber-50 dark:from-purple-400/10 dark:to-amber-400/10 rounded-xl p-5 border border-purple-200/50 dark:border-purple-400/20">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 lugrasimo-regular">
                      <HiSparkles className="w-5 h-5 text-amber-500 " />
                      The Impact
                    </h4>
                    <p className="text-gray-800 dark:text-gray-100 text-base leading-relaxed">
                      Since then, I have continued producing music inspired by
                      old Sherpa melodies, working closely with senior Sherpa
                      artists and cultural guardians. Slowly but surely,
                      I&apos;ve seen a beautiful change. More young Sherpas are
                      showing interest in their culture—learning Sherpa songs,
                      playing the Dranyen, and practicing traditional dances
                      like{" "}
                      <span className="text-purple-600 dark:text-purple-400 font-medium">
                        Shapdro
                      </span>
                      .
                    </p>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-base sm:text-md leading-relaxed">
                    Many have reached out to tell me they learned these songs
                    and instruments through my videos, and others through
                    cultural institutions now offering Sherpa music and dance
                    classes. These messages motivate me deeply.
                  </p>

                  <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                   <p className="text-gray-800 dark:text-gray-100 text-base leading-relaxed">
                      My mission is simple yet profound: to help preserve Sherpa
                      musical heritage, inspire the younger generation to
                      reconnect with their roots, and contribute—even if just
                      one brick at a time—to building the future of Sherpa music
                      alongside Nepali music.
                    </p>
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 text-base italic text-center pt-2">
                    This journey is far from over, and I am committed to doing
                    more—for the culture, for the community, and for generations
                    to come.
                  </p>
                </div>

                {/* My Journey Tab */}
                <div
                  className={`space-y-6 transition-all duration-500 ${
                    activeTab === "journey"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 hidden"
                  }`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-2 lugrasimo-regular">
                      My Musical Journey
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      From humble beginnings in Nepal to international stages — here are
                      the key milestones in my musical career.
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                    {/* Center Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-amber-400 via-purple-500 to-cyan-400" />

                    {/* Timeline Items */}
                    <div className="space-y-6">
                      {timelineData.map((item) => (
                        <div
                          key={item.year}
                          className="relative flex items-start"
                        >
                          {/* Icon */}
                          <div className="absolute left-0 w-8 h-8 bg-white dark:bg-gray-900 border-3 border-amber-500 dark:border-amber-400 rounded-full flex items-center justify-center text-base z-10">
                            {item.icon}
                          </div>

                          {/* Content */}
                          <div className="ml-12">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-400/50 dark:hover:border-amber-400/50 transition-colors group shadow-sm">
                              <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">
                                {item.year}
                              </span>
                              <h4 className="text-base font-semibold text-gray-900 dark:text-white mt-1 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors lugrasimo-regular">
                                {item.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats - Always visible */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">
                    18+
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base mt-1">
                    Years Performing
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">
                    2
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base mt-1">
                    Albums Released
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">
                    20+
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base mt-1">
                    Original Songs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
