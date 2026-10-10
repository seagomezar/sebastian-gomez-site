import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SiteWidget from '../SiteWidget';
import PostWidget from '../PostWidget';
import PortfolioCategories from './PortfolioCategories';
import ProjectCard from './ProjectCard';
import { PROJECTS_PER_PAGE } from '../../services/portfolio';

function PortfolioPageView({
  projects = [],
  allProjects = [],
  categories = [],
  currentPage = 1,
  totalPages = 1,
  site = null,
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPage, setFilteredPage] = useState(1);
  // Tracks { projectId: 'inline' | 'fullscreen' }
  const [activeModes, setActiveModes] = useState({});

  const isFiltered = activeCategory !== 'all';

  const displayedProjects = useMemo(() => {
    if (!isFiltered) {
      return projects;
    }
    const sourceList = allProjects.length > 0 ? allProjects : projects;
    const matching = sourceList.filter((project) => {
      if (activeCategory === 'live-demos') {
        return project.isLive;
      }
      return project.categorySlug === activeCategory;
    });
    const start = (filteredPage - 1) * PROJECTS_PER_PAGE;
    return matching.slice(start, start + PROJECTS_PER_PAGE);
  }, [isFiltered, activeCategory, filteredPage, projects, allProjects]);

  const filteredTotalPages = useMemo(() => {
    if (!isFiltered) {
      return totalPages;
    }
    const sourceList = allProjects.length > 0 ? allProjects : projects;
    const matchingCount = sourceList.filter((project) => {
      if (activeCategory === 'live-demos') {
        return project.isLive;
      }
      return project.categorySlug === activeCategory;
    }).length;
    return Math.max(1, Math.ceil(matchingCount / PROJECTS_PER_PAGE));
  }, [isFiltered, activeCategory, totalPages, allProjects, projects]);

  const fullscreenProjectId = useMemo(
    () =>
      Object.keys(activeModes).find(
        (id) => activeModes[id] === 'fullscreen'
      ) || null,
    [activeModes]
  );

  const fullscreenProject = useMemo(() => {
    if (!fullscreenProjectId) return null;
    const pool = allProjects.length > 0 ? allProjects : projects;
    return pool.find((p) => p.id === fullscreenProjectId) || null;
  }, [fullscreenProjectId, allProjects, projects]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && fullscreenProjectId) {
        setActiveModes((prev) => ({
          ...prev,
          [fullscreenProjectId]: 'inline',
        }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenProjectId]);

  const handleSelectCategory = (slug) => {
    setActiveCategory(slug);
    setFilteredPage(1);
    setActiveModes({});
    if (
      typeof window !== 'undefined' &&
      typeof window.scrollTo === 'function' &&
      !window.navigator?.userAgent?.includes('jsdom')
    ) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleChangePreviewMode = (projectId, mode) => {
    setActiveModes((prev) => {
      if (mode === 'fullscreen') {
        const nextState = {};
        Object.keys(prev).forEach((key) => {
          if (prev[key] === 'fullscreen') {
            nextState[key] = 'static';
          } else {
            nextState[key] = prev[key];
          }
        });
        nextState[projectId] = 'fullscreen';
        return nextState;
      }
      return {
        ...prev,
        [projectId]: mode,
      };
    });
  };

  const handleSelectAdjacentInFullscreen = (targetProjectId) => {
    setActiveModes({ [targetProjectId]: 'fullscreen' });
  };

  const effectivePage = isFiltered ? filteredPage : currentPage;
  const effectiveTotalPages = isFiltered ? filteredTotalPages : totalPages;
  const prevPage = effectivePage > 1 ? effectivePage - 1 : 0;
  const nextPage =
    effectivePage < effectiveTotalPages ? effectivePage + 1 : 0;

  const pageTitle =
    currentPage > 1
      ? `Portafolio de Proyectos - Página ${currentPage} | Sebastian Gomez`
      : 'Portafolio de Proyectos | Sebastian Gomez';

  const poolForAdjacent =
    displayedProjects.length > 0 ? displayedProjects : projects;
  const fullscreenIndex = fullscreenProject
    ? poolForAdjacent.findIndex((p) => p.id === fullscreenProject.id)
    : -1;
  const prevFullscreenProject =
    fullscreenIndex > 0 ? poolForAdjacent[fullscreenIndex - 1] : null;
  const nextFullscreenProject =
    fullscreenIndex >= 0 && fullscreenIndex < poolForAdjacent.length - 1
      ? poolForAdjacent[fullscreenIndex + 1]
      : null;

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 mb-8">
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        <meta
          name="description"
          content="Portafolio de proyectos de ingeniería de software, inteligencia artificial, aplicaciones móviles y web interactivas de Sebastian Gomez."
        />
      </Head>

      {fullscreenProject ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-1 lg:col-span-12">
            <ProjectCard
              key={fullscreenProject.id}
              project={fullscreenProject}
              previewMode="fullscreen"
              onChangePreviewMode={(mode) =>
                handleChangePreviewMode(fullscreenProject.id, mode)
              }
              prevProject={prevFullscreenProject}
              nextProject={nextFullscreenProject}
              onSelectAdjacentProject={handleSelectAdjacentInFullscreen}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Mobile-only Quick Category Filter Bar at top of feed */}
          {categories.length > 0 && (
            <div className="col-span-1 lg:hidden bg-white shadow-lg rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-800">
                  Filtrar por Categoría
                </span>
                <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full">
                  {categories.length} Temas
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((category) => {
                  const isActive = activeCategory === category.slug;
                  return (
                    <button
                      key={`mobile-cat-${category.slug}`}
                      type="button"
                      onClick={() => handleSelectCategory(category.slug)}
                      className={`flex-none inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3.5 py-2 cursor-pointer transition ${
                        isActive
                          ? 'bg-pink-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span
                        className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-white text-gray-600'
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main 8-Column Project Cards Feed */}
          <div className="lg:col-span-8 col-span-1">
            {displayedProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                previewMode={activeModes[project.id] || 'static'}
                onChangePreviewMode={(mode) =>
                  handleChangePreviewMode(project.id, mode)
                }
                prevProject={idx > 0 ? displayedProjects[idx - 1] : null}
                nextProject={
                  idx < displayedProjects.length - 1
                    ? displayedProjects[idx + 1]
                    : null
                }
                onSelectAdjacentProject={handleSelectAdjacentInFullscreen}
              />
            ))}

            {/* Pagination Bar (responsive for 390px mobile and desktop) */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 mt-4 mb-8">
              {isFiltered ? (
                <button
                  type="button"
                  disabled={!prevPage}
                  onClick={() => setFilteredPage(prevPage)}
                  className={`transition duration-500 ease transform inline-block text-sm sm:text-lg font-medium rounded-full px-4 py-2.5 sm:px-8 sm:py-3 ${
                    prevPage
                      ? 'bg-pink-600 text-white hover:-translate-y-1 cursor-pointer'
                      : 'bg-pink-600/40 text-white/70 cursor-not-allowed'
                  }`}
                >
                  ← Anterior
                </button>
              ) : prevPage ? (
                <Link
                  href={
                    prevPage === 1
                      ? '/portafolio'
                      : `/portafolio/page/${prevPage}`
                  }
                >
                  <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-sm sm:text-lg font-medium rounded-full text-white px-4 py-2.5 sm:px-8 sm:py-3 cursor-pointer">
                    ← Anterior
                  </span>
                </Link>
              ) : (
                <span className="inline-block bg-pink-600/40 text-sm sm:text-lg font-medium rounded-full text-white/70 px-4 py-2.5 sm:px-8 sm:py-3 cursor-not-allowed">
                  ← Anterior
                </span>
              )}

              <span className="text-white font-semibold text-sm sm:text-lg">
                Página {effectivePage} de {effectiveTotalPages}
              </span>

              {isFiltered ? (
                <button
                  type="button"
                  disabled={!nextPage}
                  onClick={() => setFilteredPage(nextPage)}
                  className={`transition duration-500 ease transform inline-block text-sm sm:text-lg font-medium rounded-full px-4 py-2.5 sm:px-8 sm:py-3 ${
                    nextPage
                      ? 'bg-pink-600 text-white hover:-translate-y-1 cursor-pointer'
                      : 'bg-pink-600/40 text-white/70 cursor-not-allowed'
                  }`}
                >
                  Más proyectos →
                </button>
              ) : nextPage ? (
                <Link href={`/portafolio/page/${nextPage}`}>
                  <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-sm sm:text-lg font-medium rounded-full text-white px-4 py-2.5 sm:px-8 sm:py-3 cursor-pointer">
                    Más proyectos →
                  </span>
                </Link>
              ) : (
                <span className="inline-block bg-pink-600/40 text-sm sm:text-lg font-medium rounded-full text-white/70 px-4 py-2.5 sm:px-8 sm:py-3 cursor-not-allowed">
                  Más proyectos →
                </span>
              )}
            </div>
          </div>

          {/* Right 4-Column Sticky Sidebar (1. Categorías, 2. SiteWidget, 3. Recent Posts) */}
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PortfolioCategories
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
              />
              <SiteWidget site={site} />
              <PostWidget categories={undefined} slug={undefined} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioPageView;
