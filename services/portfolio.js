import catalog from '../docs/portfolio/projects_catalog.json';
import assetsManifest from '../public/portfolio/assets-manifest.json';

export const PROJECTS_PER_PAGE = 4;

const CATEGORY_DEFINITIONS = [
    {
        slug: 'web-app-saas',
        name: 'Web App / SaaS',
        categoryName: 'Web App / SaaS',
    },
    {
        slug: 'ai-ml-data-science',
        name: 'AI & Machine Learning',
        categoryName: 'AI / ML / Data Science',
    },
    {
        slug: 'mobile-app',
        name: 'Mobile Apps',
        categoryName: 'Mobile App',
    },
    {
        slug: '3d-game-creative-tech',
        name: '3D, Juegos & Creative Tech',
        categoryName: '3D / Game / Creative Tech',
    },
];

export const getCuratedProjects = () => {
    const rawProjects = (catalog.projects || [])
        .filter((project) => project.recommendation === 'INCLUDED')
        .sort((a, b) => a.rank - b.rank);

    return rawProjects.map((project) => {
        const assetEntry = assetsManifest[project.id] || {
            primaryImage: `/portfolio/${project.id}/cover.svg`,
            galleryImages: [`/portfolio/${project.id}/cover.svg`],
            hasRealScreenshots: false,
            coverImage: `/portfolio/${project.id}/cover.svg`,
        };

        const isLive =
            project.liveDeployment?.status === 'LIVE' &&
            project.liveDeployment?.httpStatusCode === 200;
        const isEmbeddable = Boolean(
            isLive && project.embeddability?.isEmbeddable && project.liveDeployment?.url
        );

        const categoryDef = CATEGORY_DEFINITIONS.find(
            (def) => def.categoryName === project.category
        );

        return {
            id: project.id,
            name: project.name,
            title: project.title || project.name,
            visibility: project.visibility,
            rank: project.rank,
            pageGroup: project.pageGroup,
            category: project.category,
            categorySlug: categoryDef ? categoryDef.slug : 'web-app-saas',
            tags: project.tags || [],
            score: project.score || { total: 40 },
            description: project.description || '',
            repoUrl: project.visibility === 'public' ? project.repoUrl : null,
            isLive,
            isEmbeddable,
            liveUrl: isLive ? project.liveDeployment.url : null,
            livePlatform: project.liveDeployment?.platform || null,
            embedMode: project.embeddability?.mode || 'IMAGE_CAROUSEL',
            primaryImage: assetEntry.primaryImage,
            galleryImages: assetEntry.galleryImages,
            coverImage: assetEntry.coverImage,
            hasRealScreenshots: assetEntry.hasRealScreenshots,
        };
    });
};

export const getPortfolioCategories = (projectsInput) => {
    const projects = projectsInput || getCuratedProjects();
    const liveCount = projects.filter((p) => p.isLive).length;

    const categoryItems = CATEGORY_DEFINITIONS.map((def) => ({
        slug: def.slug,
        name: def.name,
        categoryName: def.categoryName,
        count: projects.filter((p) => p.category === def.categoryName).length,
    }));

    return [
        {
            slug: 'all',
            name: 'Todos los Proyectos',
            categoryName: null,
            count: projects.length,
        },
        {
            slug: 'live-demos',
            name: 'Demos Interactivas Live',
            categoryName: 'LIVE_ONLY',
            count: liveCount,
        },
        ...categoryItems,
    ];
};

export const getPortfolioPageData = (pageNumberInput = 1) => {
    const pageNumber = Number(pageNumberInput);
    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        return null;
    }

    const allProjects = getCuratedProjects();
    const totalProjects = allProjects.length;
    const totalPages = Math.max(1, Math.ceil(totalProjects / PROJECTS_PER_PAGE));

    if (pageNumber > totalPages) {
        return null;
    }

    const startIndex = (pageNumber - 1) * PROJECTS_PER_PAGE;
    const projects = allProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
    const categories = getPortfolioCategories(allProjects);

    return {
        projects,
        allProjects,
        categories,
        currentPage: pageNumber,
        totalPages,
        totalProjects,
        nextPageNumber: pageNumber < totalPages ? pageNumber + 1 : 0,
        prevPageNumber: pageNumber > 1 ? pageNumber - 1 : 0,
    };
};
