import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Categories from '../../components/Categories';
import { getCategories } from '../../services';

jest.mock('../../services', () => ({
  getCategories: jest.fn(),
}));

describe('Categories Sidebar Component', () => {
  beforeEach(() => {
    getCategories.mockReset();
  });

  it('renders categories with post counts and total topics badge', async () => {
    getCategories.mockResolvedValue([
      { name: 'Inteligencia Artificial', slug: 'inteligencia-artificial', count: 20 },
      { name: 'Chrome Extensions', slug: 'chrome-extensions', count: 15 },
    ]);

    render(<Categories />);

    await waitFor(() => {
      expect(screen.getByText('2 Temas')).toBeInTheDocument();
    });

    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Inteligencia Artificial')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('Chrome Extensions')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('highlights the active category when activeCategory prop matches slug', async () => {
    getCategories.mockResolvedValue([
      { name: 'Inteligencia Artificial', slug: 'inteligencia-artificial', count: 20 },
      { name: 'Chrome Extensions', slug: 'chrome-extensions', count: 15 },
    ]);

    render(<Categories activeCategory="chrome-extensions" />);

    await waitFor(() => {
      expect(screen.getByText('15')).toBeInTheDocument();
    });

    const activeBadge = screen.getByText('15');
    expect(activeBadge.className).toContain('bg-pink-100');
  });
});
