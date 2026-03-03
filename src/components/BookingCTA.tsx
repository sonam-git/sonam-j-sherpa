'use client';

import { useState } from 'react';
import { HiMusicNote } from 'react-icons/hi';
import ContactModal from './ContactModal';

interface BookingCTAProps {
  tagline?: string;
  buttonText?: string;
  modalTitle?: string;
  modalSubtitle?: string;
  className?: string;
}

export default function BookingCTA({
  tagline = 'Want to bring the Himalayan vibes to your event?',
  buttonText = 'Book Sonam J Sherpa',
  modalTitle = 'Book Sonam J Sherpa',
  modalSubtitle = "Fill out the form below and I'll get back to you as soon as possible.",
  className = '',
}: BookingCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`text-center ${className}`}>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          {tagline}
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <HiMusicNote className="w-5 h-5" />
          {buttonText}
        </button>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        subtitle={modalSubtitle}
      />
    </>
  );
}
