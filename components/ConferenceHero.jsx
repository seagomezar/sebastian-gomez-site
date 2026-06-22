import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const POSTER = '/conference/conference-bg-poster.webp';

// Hero banner for the conference landing page. The poster is always rendered as a
// high-priority next/image so it is the preloadable LCP element (a CSS background
// is invisible to the preload scanner and loads late). On desktop without
// prefers-reduced-motion, an optimized muted/looping video layers on top; on small
// screens and reduced-motion the poster alone shows (saves mobile data/battery).
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
      {/* Background layer. */}
      <div className="absolute inset-0 z-0">
        {/* Poster as a preloadable, high-priority image = the LCP element. */}
        <Image
          src={POSTER}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        {/* Video overlays the poster on capable desktops. */}
        {playVideo && (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={POSTER}
            aria-hidden="true"
          >
            <source src="/conference/conference-bg.mp4" type="video/mp4" />
            <source src="/conference/conference-bg.webm" type="video/webm" />
          </video>
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
