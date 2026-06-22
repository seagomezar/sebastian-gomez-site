import React, { useEffect, useState } from 'react';

// Hero banner for the conference landing page. Shows an optimized, muted, looping
// video behind the talk title/buttons on desktop. On small screens and when the
// user prefers reduced motion, it shows the static poster image instead (saves
// mobile data/battery and respects accessibility preferences).
function ConferenceHero({ children }) {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isDesktop = window.matchMedia('(min-width: 768px)');

    const update = () => setPlayVideo(isDesktop.matches && !reduceMotion.matches);
    update();

    reduceMotion.addEventListener('change', update);
    isDesktop.addEventListener('change', update);
    return () => {
      reduceMotion.removeEventListener('change', update);
      isDesktop.removeEventListener('change', update);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg mb-8 mt-8">
      {/* Background layer: poster by default, video on capable desktops. */}
      <div className="absolute inset-0 z-0">
        {playVideo ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/conference/conference-bg-poster.jpg"
            aria-hidden="true"
          >
            <source src="/conference/conference-bg.mp4" type="video/mp4" />
            <source src="/conference/conference-bg.webm" type="video/webm" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: 'url(/conference/conference-bg-poster.jpg)' }}
            aria-hidden="true"
          />
        )}
        {/* Dark overlay keeps the foreground text legible over the footage. */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      </div>

      {/* Foreground content. */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default ConferenceHero;
