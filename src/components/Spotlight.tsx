import { ExternalLinkIcon } from './icons/SocialIcons';

interface SpotlightItem {
  id: string;
  title: string;
  source: string;
  excerpt: string;
  link?: string;
  date: string;
}

const spotlightData: SpotlightItem[] = [
  {
    id: '1',
    title: 'Sherpa Singer Bridges Cultural Gap Through Music',
    source: 'Kathmandu Post',
    excerpt:
      'Sonam J Sherpa brings traditional Sherpa melodies to contemporary audiences, creating a unique blend that resonates across generations.',
    date: '2017',
  },
  {
    id: '2',
    title: 'From Khumjung to California: A Musical Journey',
    source: 'Nepal Music Magazine',
    excerpt:
      "An inspiring story of how a singer from the Everest region is preserving Sherpa culture through his original compositions.",
    date: '2018',
  },
  {
    id: '3',
    title: 'Album "Sonaming" Celebrates Sherpa Heritage',
    source: 'Himalayan Times',
    excerpt:
      "The debut album features 11 tracks in both Nepali and Sherpa languages, showcasing the rich musical heritage of Nepal's mountain communities.",
    date: '2016',
  },
];

export default function Spotlight() {
  return (
    <section id="spotlight" className="py-20 md:py-32 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              In the Spotlight
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Media mentions, interviews, and articles featuring my musical journey.
            </p>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6" />
          </div>

          {/* Spotlight Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotlightData.map((item) => (
              <article
                key={item.id}
                className="group bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-amber-400/50 transition-all duration-300 hover:transform hover:-translate-y-1 shadow-sm hover:shadow-lg"
              >
                {/* Source Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-amber-600 dark:text-amber-400 text-sm font-medium">
                    {item.source}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 text-sm">{item.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                {/* Read More Link */}
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm font-medium transition-colors"
                  >
                    Read Article
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500 text-sm italic">
                    Media coverage
                  </span>
                )}
              </article>
            ))}
          </div>

          {/* Note for placeholder */}
          <p className="text-center text-gray-500 dark:text-gray-500 text-sm mt-8">
            * These are sample entries. Update with actual media mentions and links.
          </p>
        </div>
      </div>
    </section>
  );
}
