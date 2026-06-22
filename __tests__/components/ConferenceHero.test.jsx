import React from 'react';
import { render, screen } from '@testing-library/react';
import ConferenceHero from '../../components/ConferenceHero';

// Helper to stub window.matchMedia for a given desktop / reduce-motion combination.
const setMatchMedia = ({ desktop, reduceMotion }) => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query.includes('min-width') ? desktop : reduceMotion,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
};

describe('ConferenceHero', () => {
  it('always renders its foreground children', () => {
    setMatchMedia({ desktop: false, reduceMotion: false });
    render(<ConferenceHero><p>Hero content</p></ConferenceHero>);
    expect(screen.getByText('Hero content')).toBeInTheDocument();
  });

  it('plays the muted, looping video on desktop without reduced motion', () => {
    setMatchMedia({ desktop: true, reduceMotion: false });
    const { container } = render(<ConferenceHero><span>x</span></ConferenceHero>);

    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video.muted).toBe(true); // React sets muted as a property, not an attribute
    expect(video.hasAttribute('loop')).toBe(true);
    expect(video.hasAttribute('autoplay')).toBe(true);
    expect(video.hasAttribute('playsinline')).toBe(true);
    expect(container.querySelector('source[type="video/mp4"]')).toBeInTheDocument();
    expect(container.querySelector('source[type="video/webm"]')).toBeInTheDocument();
  });

  it('shows the poster image (no video) when reduced motion is preferred', () => {
    setMatchMedia({ desktop: true, reduceMotion: true });
    const { container } = render(<ConferenceHero><span>x</span></ConferenceHero>);
    expect(container.querySelector('video')).not.toBeInTheDocument();
  });

  it('shows the poster image (no video) on small screens', () => {
    setMatchMedia({ desktop: false, reduceMotion: false });
    const { container } = render(<ConferenceHero><span>x</span></ConferenceHero>);
    expect(container.querySelector('video')).not.toBeInTheDocument();
  });
});
