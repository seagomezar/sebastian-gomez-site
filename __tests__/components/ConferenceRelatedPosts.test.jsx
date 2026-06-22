import React from 'react';
import { render, screen } from '@testing-library/react';
import ConferenceRelatedPosts from '../../components/ConferenceRelatedPosts';

jest.mock('next/link', () => ({ children, href }) => <a href={href}>{children}</a>);
jest.mock('next/image', () => function MockImage({ src, alt }) {
  return <img src={src} alt={alt} />;
});

const posts = [
  {
    node: {
      title: 'Construyendo agentes con Gemini',
      slug: 'agentes-gemini',
      createdAt: '2026-01-15T00:00:00Z',
      featuredImage: { url: 'https://example.com/a.jpg' },
    },
  },
  {
    node: {
      title: 'Introducción a Next.js',
      slug: 'introduccion-a-nextjs',
      createdAt: '2026-02-20T00:00:00Z',
      featuredImage: { url: 'https://example.com/b.jpg' },
    },
  },
];

describe('ConferenceRelatedPosts', () => {
  it('renders a heading and a link per post', () => {
    render(<ConferenceRelatedPosts posts={posts} />);
    expect(screen.getByText('Lecturas Recomendadas')).toBeInTheDocument();

    const first = screen.getByText('Construyendo agentes con Gemini');
    expect(first.closest('a')).toHaveAttribute('href', '/post/agentes-gemini');

    const second = screen.getByText('Introducción a Next.js');
    expect(second.closest('a')).toHaveAttribute('href', '/post/introduccion-a-nextjs');
  });

  it('shows an empty-state message when there are no posts', () => {
    render(<ConferenceRelatedPosts posts={[]} />);
    expect(screen.getByText('No hay lecturas recomendadas por el momento.')).toBeInTheDocument();
  });

  it('handles a missing posts prop without crashing', () => {
    render(<ConferenceRelatedPosts />);
    expect(screen.getByText('No hay lecturas recomendadas por el momento.')).toBeInTheDocument();
  });
});
