import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('../../services', () => ({
  getSite: jest.fn(),
  getRecentPosts: jest.fn().mockResolvedValue([]),
  getSimilarPosts: jest.fn().mockResolvedValue([]),
  getCategories: jest.fn().mockResolvedValue([]),
}));

import { getSite } from '../../services';
import {
  getCuratedProjects,
  getPortfolioCategories,
  getPortfolioPageData,
  PROJECTS_PER_PAGE,
} from '../../services/portfolio';
import { getServerSideProps as getPaginatedProps } from '../../pages/portafolio/page/[pageNumber]';
import { getServerSideProps as getIndexProps } from '../../pages/portafolio/index';
import PortfolioPageView from '../../components/portfolio/PortfolioPageView';

describe('Portfolio Service (services/portfolio.js)', () => {
  it('returns 32 curated projects ordered by rank', () => {
    const projects = getCuratedProjects();
    expect(projects).toHaveLength(32);
    expect(projects[0].rank).toBe(1);
    expect(projects[31].rank).toBe(32);
  });

  it('redacts repoUrl for private repositories', () => {
    const projects = getCuratedProjects();
    const privateProjects = projects.filter((p) => p.visibility === 'private');
    expect(privateProjects.length).toBeGreaterThan(0);
    privateProjects.forEach((p) => {
      expect(p.repoUrl).toBeNull();
    });
  });

  it('paginates into 8 pages of 4 projects each', () => {
    const page1 = getPortfolioPageData(1);
    expect(page1).not.toBeNull();
    expect(page1.projects).toHaveLength(PROJECTS_PER_PAGE);
    expect(page1.totalPages).toBe(8);
    expect(page1.nextPageNumber).toBe(2);
    expect(page1.prevPageNumber).toBe(0);

    const page8 = getPortfolioPageData(8);
    expect(page8).not.toBeNull();
    expect(page8.projects).toHaveLength(4);
    expect(page8.nextPageNumber).toBe(0);
    expect(page8.prevPageNumber).toBe(7);
  });

  it('returns null for invalid or out-of-range page numbers', () => {
    expect(getPortfolioPageData('abc')).toBeNull();
    expect(getPortfolioPageData(0)).toBeNull();
    expect(getPortfolioPageData(-2)).toBeNull();
    expect(getPortfolioPageData(9)).toBeNull();
    expect(getPortfolioPageData(99)).toBeNull();
  });

  it('returns portfolio categories including Todos and Demos Interactivas Live', () => {
    const categories = getPortfolioCategories();
    expect(categories[0].slug).toBe('all');
    expect(categories[0].count).toBe(32);
    expect(categories[1].slug).toBe('live-demos');
    expect(categories[1].count).toBeGreaterThan(0);
  });
});

describe('Portfolio Routes getServerSideProps', () => {
  beforeEach(() => {
    getSite.mockReset();
    getSite.mockResolvedValue({ name: 'Sebastian Gomez', description: 'Bio' });
  });

  it('returns Page 1 props on /portafolio', async () => {
    const result = await getIndexProps({ locale: 'es' });
    expect(result.props.currentPage).toBe(1);
    expect(result.props.totalPages).toBe(8);
    expect(result.props.projects).toHaveLength(4);
  });

  it('returns notFound for non-numeric or out-of-range /portafolio/page/[pageNumber]', async () => {
    expect(
      await getPaginatedProps({ params: { pageNumber: 'abc' } })
    ).toEqual({ notFound: true });
    expect(
      await getPaginatedProps({ params: { pageNumber: '0' } })
    ).toEqual({ notFound: true });
    expect(
      await getPaginatedProps({ params: { pageNumber: '99' } })
    ).toEqual({ notFound: true });
  });

  it('returns valid props for /portafolio/page/2', async () => {
    const result = await getPaginatedProps({ params: { pageNumber: '2' } });
    expect(result.notFound).toBeUndefined();
    expect(result.props.currentPage).toBe(2);
    expect(result.props.projects).toHaveLength(4);
    expect(result.props.projects[0].rank).toBe(5);
  });
});

describe('PortfolioPageView & Dual Demo Mode UI', () => {
  it('renders Categorías widget, dual demo buttons, and switches between Inline and Fullscreen modes', () => {
    const pageData = getPortfolioPageData(1);
    render(
      <PortfolioPageView
        projects={pageData.projects}
        allProjects={pageData.allProjects}
        categories={pageData.categories}
        currentPage={1}
        totalPages={pageData.totalPages}
        site={{ name: 'Sebastian Gomez', description: 'GDE & Frontend Architect' }}
      />
    );

    // Verify Categorías widget is rendered
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Todos los Proyectos')).toBeInTheDocument();

    // Verify 4 project cards and dual buttons render
    const inlineButtons = screen.getAllByText('▶ Probar Demo Inline');
    const fullscreenButtons = screen.getAllByText('⤢ Pantalla Completa');
    expect(inlineButtons).toHaveLength(4);
    expect(fullscreenButtons).toHaveLength(4);

    // Click "▶ Probar Demo Inline" on the 2nd card (music-journal-app, which is isEmbeddable: true)
    fireEvent.click(inlineButtons[1]);
    expect(screen.getByText('✓ Demo Inline Activa')).toBeInTheDocument();
    expect(screen.getByText('● HTTP 200 • Live Iframe')).toBeInTheDocument();

    // Click "⤢ Pantalla Completa" on the 2nd card to expand to 12-column Fullscreen mode
    const expandButtons = screen.getAllByText('⤢ Pantalla Completa');
    fireEvent.click(expandButtons[1]);

    const minimizeButtons = screen.getAllByText('⤡ Minimizar a Tarjeta Inline');
    expect(minimizeButtons.length).toBeGreaterThan(0);

    // Click "⤡ Minimizar a Tarjeta Inline" to return to Inline mode
    fireEvent.click(minimizeButtons[0]);
    expect(screen.getByText('✓ Demo Inline Activa')).toBeInTheDocument();
  });

  it('filters projects when clicking a category in PortfolioCategories', () => {
    const pageData = getPortfolioPageData(1);
    render(
      <PortfolioPageView
        projects={pageData.projects}
        allProjects={pageData.allProjects}
        categories={pageData.categories}
        currentPage={1}
        totalPages={pageData.totalPages}
        site={{ name: 'Sebastian Gomez', description: 'GDE' }}
      />
    );

    const aiCategoryBtn = screen.getByText('AI & Machine Learning');
    fireEvent.click(aiCategoryBtn);

    // Top AI project (#7 crecere-agents -> "Agent2Agent (A2A) Multi-Agent Ecosystem") should now appear on page 1 of filtered view
    expect(
      screen.getByText('Agent2Agent (A2A) Multi-Agent Ecosystem')
    ).toBeInTheDocument();
  });
});
