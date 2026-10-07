import React, { useState } from 'react';

const VIEWPORT_WIDTHS = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
};

function ProjectCard({
  project,
  previewMode = 'static',
  onChangePreviewMode,
  prevProject = null,
  nextProject = null,
  onSelectAdjacentProject,
}) {
  const [viewport, setViewport] = useState('desktop');
  const [activeSlide, setActiveSlide] = useState(0);

  const gallery =
    project.galleryImages && project.galleryImages.length > 0
      ? project.galleryImages
      : [project.primaryImage];

  const currentImage = gallery[activeSlide] || project.primaryImage;
  const isInteractiveOpen =
    previewMode === 'inline' || previewMode === 'fullscreen';
  const isFullscreen = previewMode === 'fullscreen';

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % gallery.length);
  };

  const setMode = (targetMode) => {
    if (onChangePreviewMode) {
      onChangePreviewMode(targetMode);
    }
  };

  return (
    <div
      id={`project-card-${project.id}`}
      className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8"
    >
      {/* Top Visual / Interactive Area */}
      {isInteractiveOpen ? (
        <div className="mb-6 rounded-t-lg lg:rounded-lg overflow-hidden border border-gray-200 shadow-md">
          {/* Browser Chrome Toolbar */}
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
              </div>
              {project.isEmbeddable ? (
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  ● HTTP 200 • Live Iframe
                </span>
              ) : (
                <span className="text-xs font-semibold text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
                  ● Galería Interactiva ({activeSlide + 1}/{gallery.length})
                </span>
              )}
              <span className="text-xs text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1 truncate max-w-xs sm:max-w-md">
                {project.liveUrl || `portfolio://${project.name}`}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {project.isEmbeddable && (
                <div className="flex items-center bg-white border border-gray-200 rounded-full p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setViewport('desktop')}
                    className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
                      viewport === 'desktop'
                        ? 'bg-pink-50 text-pink-600 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewport('tablet')}
                    className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
                      viewport === 'tablet'
                        ? 'bg-pink-50 text-pink-600 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Tablet
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewport('mobile')}
                    className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
                      viewport === 'mobile'
                        ? 'bg-pink-50 text-pink-600 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Móvil
                  </button>
                </div>
              )}

              {isFullscreen ? (
                <button
                  type="button"
                  onClick={() => setMode('inline')}
                  className="border border-pink-600 text-pink-600 hover:bg-pink-50 text-xs font-semibold rounded-full px-3.5 py-1.5 cursor-pointer transition"
                >
                  ⤡ Minimizar a Tarjeta Inline
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode('fullscreen')}
                  className="border border-pink-600 text-pink-600 hover:bg-pink-50 text-xs font-semibold rounded-full px-3.5 py-1.5 cursor-pointer transition"
                >
                  ⤢ Pantalla Completa
                </button>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-gray-700 hover:text-pink-600 px-2.5 py-1.5"
                >
                  Abrir en pestaña ↗
                </a>
              )}

              <button
                type="button"
                onClick={() => setMode('static')}
                className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-full px-4 py-1.5 cursor-pointer transition"
              >
                Cerrar Demo ✕
              </button>
            </div>
          </div>

          {/* Interactive Viewport Canvas */}
          <div
            className={`w-full bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden ${
              isFullscreen ? 'h-[680px]' : 'h-96'
            }`}
          >
            {project.isEmbeddable ? (
              <iframe
                src={project.liveUrl}
                title={project.title}
                style={{ width: VIEWPORT_WIDTHS[viewport] }}
                className="h-full border-0 bg-white shadow-inner transition-all duration-300"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-between p-4">
                <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
                  <img
                    src={currentImage}
                    alt={`${project.title} - captura ${activeSlide + 1}`}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                  />
                  {gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevSlide}
                        aria-label="Captura anterior"
                        className="absolute left-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={handleNextSlide}
                        aria-label="Siguiente captura"
                        className="absolute right-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>
                {gallery.length > 1 && (
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto max-w-full py-1 px-2">
                    {gallery.map((imgUrl, idx) => (
                      <button
                        key={imgUrl}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={`h-12 w-20 rounded overflow-hidden border-2 flex-none cursor-pointer transition ${
                          idx === activeSlide
                            ? 'border-pink-500 scale-105'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${project.title} miniatura ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden shadow-md pb-80 mb-6 rounded-t-lg lg:rounded-lg bg-slate-900">
          <img
            src={currentImage}
            alt={project.title}
            className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {project.isLive ? (
              <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                ● HTTP 200 • Demo
              </span>
            ) : (
              <span className="bg-gray-900/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                {project.visibility === 'private'
                  ? '🔒 Proyecto Privado'
                  : `📸 ${gallery.length} Capturas`}
              </span>
            )}
          </div>
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Imagen anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-pink-600/90 hover:bg-pink-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Siguiente imagen"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-pink-600/90 hover:bg-pink-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md cursor-pointer"
              >
                →
              </button>
            </>
          )}
        </div>
      )}

      {/* Centered Title (matches PostCard.jsx) */}
      <h2
        onClick={() => setMode(isInteractiveOpen ? 'static' : 'inline')}
        className="transition duration-700 text-center mb-6 cursor-pointer hover:text-pink-600 text-3xl font-semibold px-4"
      >
        {project.title}
      </h2>

      {/* Centered Metadata Row with pink-500 icons (matches PostCard.jsx) */}
      <div className="flex flex-wrap text-center items-center justify-center gap-4 mb-6 w-full px-4">
        <div className="flex items-center justify-center font-medium text-gray-700 text-base">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline mr-1.5 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <span>{(project.tags || []).slice(0, 4).join(' • ')}</span>
        </div>

        <div className="flex items-center justify-center font-medium text-gray-700 text-sm">
          {project.isLive ? (
            <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-semibold">
              ● HTTP 200 • Demo Interactiva
            </span>
          ) : (
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
              {project.visibility === 'private'
                ? '🔒 Privado / Cliente'
                : `📂 ${project.category}`}
            </span>
          )}
        </div>

        <div className="flex items-center justify-center font-medium text-gray-700 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline mr-1 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Score: {project.score?.total || 40}/50</span>
        </div>
      </div>

      {/* Description Paragraph (matches PostCard.jsx) */}
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8 text-justify">
        {project.description}
      </p>

      {/* Dual Action Buttons Row (Inline + Fullscreen + Repo Link) */}
      <div className="text-center flex flex-wrap items-center justify-center gap-4 px-4">
        <button
          type="button"
          onClick={() =>
            setMode(previewMode === 'inline' ? 'static' : 'inline')
          }
          className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 hover:bg-pink-700 text-base lg:text-lg font-medium rounded-full text-white px-7 py-3 cursor-pointer shadow-md"
        >
          {previewMode === 'inline'
            ? '✓ Demo Inline Activa'
            : '▶ Probar Demo Inline'}
        </button>

        <button
          type="button"
          onClick={() =>
            setMode(isFullscreen ? 'inline' : 'fullscreen')
          }
          className="transition duration-500 ease transform hover:-translate-y-1 inline-block border-2 border-pink-600 text-pink-600 hover:bg-pink-50 text-base lg:text-lg font-medium rounded-full px-7 py-2.5 cursor-pointer"
        >
          {isFullscreen
            ? '⤡ Minimizar a Tarjeta Inline'
            : '⤢ Pantalla Completa'}
        </button>

        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-700 hover:text-pink-600 font-medium text-base px-4 py-2 transition"
          >
            <span>Ver Repositorio</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-gray-500 font-medium text-sm px-4 py-2">
            🔒 Repositorio Privado
          </span>
        )}
      </div>

      {/* Fullscreen Bottom Footer Navigation Bar (matches Stitch Screen 3) */}
      {isFullscreen && (
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 mt-8 lg:-mx-8 lg:-mb-12 rounded-b-lg flex flex-wrap items-center justify-between gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-6">
            {prevProject && (
              <button
                type="button"
                onClick={() =>
                  onSelectAdjacentProject &&
                  onSelectAdjacentProject(prevProject.id)
                }
                className="font-medium text-gray-700 hover:text-pink-600 cursor-pointer"
              >
                ← Anterior: {prevProject.name}
              </button>
            )}
            {nextProject && (
              <button
                type="button"
                onClick={() =>
                  onSelectAdjacentProject &&
                  onSelectAdjacentProject(nextProject.id)
                }
                className="font-medium text-gray-700 hover:text-pink-600 cursor-pointer"
              >
                Siguiente: {nextProject.name} →
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
              ● Readiness: {project.score?.total || 40}/50
            </span>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 hover:underline font-medium"
              >
                Ver Código en GitHub ↗
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
