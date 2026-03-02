const timelineData = [
  {
    year: '2007',
    title: 'Stage Performances Begin',
    description:
      'Started performing on stage with cover songs of popular singers, marking the beginning of my musical journey.',
    icon: '🎤',
  },
  {
    year: '2015',
    title: 'First Original Song',
    description:
      'Released my first original composition "Khulera Timle", followed by "Solukhumbu Khumjung", showcasing my hometown.',
    icon: '🎵',
  },
  {
    year: '2016',
    title: 'Debut Album "Sonaming"',
    description:
      'Released my debut album featuring both Nepali and Sherpa songs, blending traditional sounds with contemporary music.',
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
    year: 'Present',
    title: 'Sonaming Vol 2',
    description:
      'Released "Sonaming Vol 2", a Sherpa album celebrating our rich cultural heritage and traditions.',
    icon: '🎶',
  },
];

export default function Timeline() {
  return (
    <section id="career" className="relative py-20 md:py-32 overflow-hidden transition-colors duration-500">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/about-photo.jpg')", opacity: 0.12 }}
      />
      {/* Theme-aware Overlay */}
      <div className="absolute inset-0 bg-gray-100/70 dark:bg-gray-800/80" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              From humble beginnings in Nepal to international stages — here are
              the key milestones in my musical career.
            </p>
            <div className="w-24 h-1 bg-amber-500 dark:bg-amber-400 mx-auto rounded-full mt-6" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-amber-400 via-purple-500 to-cyan-400" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <div
                      className={`bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-400/50 dark:hover:border-amber-400/50 transition-colors group shadow-sm`}
                    >
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-lg">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-2 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 md:w-12 md:h-12 bg-white dark:bg-gray-900 border-4 border-amber-500 dark:border-amber-400 rounded-full flex items-center justify-center text-lg md:text-2xl">
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
