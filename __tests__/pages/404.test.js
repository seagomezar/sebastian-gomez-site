import React from 'react';
import { render, screen } from '@testing-library/react';
import Custom404 from '../../pages/404';

// The 404 page renders PostWidget + Categories, which fetch client-side. Stub the
// services so the page renders without hitting a real CMS.
jest.mock('../../services', () => ({
  getRecentPosts: jest.fn().mockResolvedValue([]),
  getSimilarPosts: jest.fn().mockResolvedValue([]),
  getCategories: jest.fn().mockResolvedValue([]),
}));
jest.mock('next/link', () => ({ children, href }) => <a href={href}>{children}</a>);

describe('Custom404', () => {
  it('renders a friendly Spanish message and a home link', () => {
    render(<Custom404 />);

    expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
    expect(
      screen.getByText(/Quizá quieras revisar las categorías o los posts recientes/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Ir al inicio')).toBeInTheDocument();
  });
});
