"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { HiCalendar, HiClock, HiSparkles, HiChevronLeft, HiChevronRight, HiX } from "react-icons/hi";
import BookingCTA from "./BookingCTA";

interface EventItem {
  src: string;
  alt: string;
  date?: string; // Format: "YYYY-MM-DD" - the event date
}

const pastEvents: EventItem[] = [
  { src: "/images/gallery/event-flyer/california-sherpa-lhosar.jpg", alt: "California Sherpa Lhosar" },
  { src: "/images/gallery/event-flyer/Lhosar-Cultural-Night-2016.jpg", alt: "Lhosar Cultural Night 2016" },
  { src: "/images/gallery/event-flyer/colorado-lhosar.jpg", alt: "Colorado Lhosar" },
  { src: "/images/gallery/event-flyer/lhosar-sanjh.jpg", alt: "Lhosar Sanjh" },
  { src: "/images/gallery/event-flyer/sonoma-night.jpg", alt: "Sonoma Night" },
  { src: "/images/gallery/event-flyer/sonoma-sherpa-night.jpg", alt: "Sonoma Sherpa Night" },
  { src: "/images/gallery/event-flyer/tokyo-lhosar.jpg", alt: "Tokyo Lhosar" },
  { src: "/images/gallery/event-flyer/acoustic-duo-night-2016.jpg", alt: "Shared Stage with Adrian P & Phiroj S" },
  { src: "/images/gallery/event-flyer/HSCC-Lhosar-2013.jpg", alt: "Himalayan Sherpa Culture Center Lhosar Gutuk Night 2013" },
];

const upcomingEventsData: EventItem[] = [
  { src: "/images/gallery/upcoming/csa-lhosar-2026.jpg", alt: "CSA Lhosar 2026", date: "2026-03-15" },
];

// Helper function to check if an event date has passed
const isEventPassed = (eventDate?: string): boolean => {
  if (!eventDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const event = new Date(eventDate);
  return event < today;
};

// Filter upcoming events to only show those that haven't passed
const getActiveUpcomingEvents = (): EventItem[] => {
  return upcomingEventsData.filter(event => !isEventPassed(event.date));
};

// Event Card Component
interface EventCardProps {
  event: EventItem;
  isUpcoming?: boolean;
  onClick: () => void;
}

function EventCard({ event, isUpcoming = false, onClick }: EventCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-3/4 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-full cursor-pointer"
    >
      <Image
        src={event.src}
        alt={event.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Badge for upcoming */}
      {isUpcoming && (
        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          Upcoming
        </div>
      )}
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white font-semibold text-lg">{event.alt}</p>
      </div>
    </button>
  );
}

// Mobile Carousel Component
interface MobileCarouselProps {
  events: EventItem[];
  isUpcoming?: boolean;
  onEventClick: (index: number) => void;
}

function MobileCarousel({ events, isUpcoming = false, onEventClick }: MobileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance threshold (in px)
  const minSwipeDistance = 50;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && events.length > 1) {
      goToNext();
    }
    if (isRightSwipe && events.length > 1) {
      goToPrevious();
    }
  };

  if (events.length === 0) return null;

  return (
    <div className="sm:hidden">
      {/* Carousel Container */}
      <div className="relative px-4">
        <div 
          className="overflow-hidden rounded-2xl"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {events.map((event, index) => (
              <div key={index} className="w-full flex-shrink-0 px-1">
                <EventCard
                  event={event}
                  isUpcoming={isUpcoming}
                  onClick={() => onEventClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {events.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goToPrevious}
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300"
            aria-label="Previous event"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-amber-500 w-8"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300"
            aria-label="Next event"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Counter */}
      <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">
        {currentIndex + 1} of {events.length}
      </p>
    </div>
  );
}

// Event Modal Component
interface EventModalProps {
  events: EventItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

function EventModal({ events, currentIndex, isOpen, onClose, onPrevious, onNext }: EventModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrevious, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || events.length === 0) return null;

  const currentEvent = events[currentIndex];
  const hasPrevious = events.length > 1;
  const hasNext = events.length > 1;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl flex flex-col items-center">
        {/* Image Container */}
        <div className="relative w-full aspect-3/4 max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <Image
            src={currentEvent.src}
            alt={currentEvent.alt}
            fill
            className="object-contain bg-black"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        {/* Event Title */}
        <h3 className="text-white text-xl font-bold mt-4 text-center">
          {currentEvent.alt}
        </h3>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
              hasPrevious
                ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
                : "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
            }`}
            aria-label="Previous event"
          >
            <HiChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25"
            aria-label="Close modal"
          >
            <HiX className="w-5 h-5" />
            Close
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
              hasNext
                ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
                : "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
            }`}
            aria-label="Next event"
          >
            <span className="hidden sm:inline">Next</span>
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Counter */}
        <p className="text-gray-400 text-sm mt-4">
          {currentIndex + 1} of {events.length}
        </p>
      </div>
    </div>,
    document.body
  );
}

export default function Events() {
  const [activeTab, setActiveTab] = useState<"past" | "upcoming">("upcoming");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEvents, setModalEvents] = useState<EventItem[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  const activeUpcomingEvents = getActiveUpcomingEvents();

  const openModal = (events: EventItem[], index: number) => {
    setModalEvents(events);
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToPreviousModal = () => {
    setModalIndex((prev) => (prev === 0 ? modalEvents.length - 1 : prev - 1));
  };

  const goToNextModal = () => {
    setModalIndex((prev) => (prev === modalEvents.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="events"
      className="relative py-20 md:py-32 overflow-hidden transition-colors duration-500"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/about-photo.jpg')", opacity: 0.12 }}
      />
      {/* Theme-aware Overlay */}
       <div className="absolute inset-0 bg-white/5 dark:bg-gray-900/10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 lugrasimo-regular">
              Events
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              From memorable performances to upcoming shows — join me on this musical journey.
            </p>
            <div className="w-24 h-1 bg-amber-500 dark:bg-amber-400 mx-auto rounded-full mt-6" />
          </div>

          {/* Tab Buttons */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-2 p-1.5 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === "upcoming"
                    ? "bg-amber-500 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <HiCalendar className="w-5 h-5" />
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === "past"
                    ? "bg-amber-500 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <HiClock className="w-5 h-5" />
                Past Events
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-100">
            {/* Upcoming Events Tab */}
            <div
              className={`transition-all duration-500 ${
                activeTab === "upcoming"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 hidden"
              }`}
            >
              {activeUpcomingEvents.length > 0 ? (
                <>
                  {/* Mobile Carousel */}
                  <MobileCarousel
                    events={activeUpcomingEvents}
                    isUpcoming={true}
                    onEventClick={(index) => openModal(activeUpcomingEvents, index)}
                  />

                  {/* Desktop Grid */}
                  <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeUpcomingEvents.map((event, index) => (
                      <EventCard
                        key={index}
                        event={event}
                        isUpcoming={true}
                        onClick={() => openModal(activeUpcomingEvents, index)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-amber-100 dark:bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <HiSparkles className="w-10 h-10 text-amber-500 dark:text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Stay Tuned!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base mb-6 leading-relaxed">
                      There are no upcoming events at the moment, but exciting performances are always in the works. 
                      Follow along to be the first to know about new shows!
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                        🎤 <span className="font-medium">Planning an event?</span> Bring the authentic Himalayan musical experience to your celebration!
                      </p>
                      <BookingCTA 
                        tagline=""
                        buttonText="Invite Sonam J Sherpa"
                        modalTitle="Book for Your Event"
                        modalSubtitle="Fill out the form and let's make your event memorable!"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Past Events Tab */}
            <div
              className={`transition-all duration-500 ${
                activeTab === "past"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 hidden"
              }`}
            >
              {/* Mobile Carousel */}
              <MobileCarousel
                events={pastEvents}
                isUpcoming={false}
                onEventClick={(index) => openModal(pastEvents, index)}
              />

              {/* Desktop Grid */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    event={event}
                    isUpcoming={false}
                    onClick={() => openModal(pastEvents, index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        events={modalEvents}
        currentIndex={modalIndex}
        isOpen={modalOpen}
        onClose={closeModal}
        onPrevious={goToPreviousModal}
        onNext={goToNextModal}
      />
    </section>
  );
}
