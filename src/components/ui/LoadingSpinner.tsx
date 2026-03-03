'use client';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Sizes in pixels
const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div className={`${sizeMap[size]} ${className}`} role="status" aria-label="Loading">
      <svg
        className="animate-spin w-full h-full text-amber-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Pulsing dots loader
export function DotsLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`} role="status" aria-label="Loading">
      <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Ring loader with gradient
export function RingLoader({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div className={`${sizeMap[size]} ${className} relative`} role="status" aria-label="Loading">
      <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Image skeleton loader
export function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}>
      <div className="flex items-center justify-center h-full">
        <svg
          className="w-10 h-10 text-gray-300 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
    </div>
  );
}

// Full page loader
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-200 dark:border-amber-900 rounded-full" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-amber-500 rounded-full animate-spin" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

// Modal image loader with nice animation
export function ModalImageLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        {/* Spinning gradient ring */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
          style={{
            borderTopColor: '#f59e0b',
            borderRightColor: '#f59e0b50',
            animationDuration: '1s',
          }}
        />
        {/* Inner pulse */}
        <div className="absolute inset-3 rounded-full bg-amber-500/20 animate-pulse" />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
      <p className="text-white/70 text-sm font-medium">Loading image...</p>
    </div>
  );
}

// Musical note loader for music-themed pages
export function MusicLoader({ className = '' }: { className?: string }) {
  const heights = [20, 28, 16, 24, 20]; // Fixed heights to avoid impure function
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`} role="status" aria-label="Loading">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1.5 bg-amber-500 rounded-full animate-pulse"
          style={{
            height: `${h}px`,
            animationDelay: `${i * 100}ms`,
            animationDuration: '0.6s',
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Equalizer-style music loader
export function EqualizerLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-end justify-center gap-1 h-8 ${className}`} role="status" aria-label="Loading">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1.5 bg-linear-to-t from-amber-600 to-amber-400 rounded-t-sm"
          style={{
            animation: 'equalizerBounce 0.6s ease-in-out infinite alternate',
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes equalizerBounce {
          0% { height: 8px; }
          100% { height: 32px; }
        }
      `}</style>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
