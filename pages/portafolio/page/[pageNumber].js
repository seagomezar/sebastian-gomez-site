import React from 'react';
import { PortfolioPageView } from '../../../components';
import { getSite } from '../../../services';
import { getPortfolioPageData } from '../../../services/portfolio';

export default function PortfolioPaginatedPage({
  projects,
  allProjects,
  categories,
  currentPage,
  totalPages,
  site,
}) {
  return (
    <PortfolioPageView
      projects={projects}
      allProjects={allProjects}
      categories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
      site={site}
    />
  );
}

export async function getServerSideProps({ params, locale = 'es' }) {
  const pageNumber = Number(params?.pageNumber);
  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    return { notFound: true };
  }

  const pageData = getPortfolioPageData(pageNumber);
  if (!pageData) {
    return { notFound: true };
  }

  let site = null;
  try {
    site = (await getSite(locale)) || null;
  } catch {
    site = null;
  }

  return {
    props: {
      projects: pageData.projects,
      allProjects: pageData.allProjects,
      categories: pageData.categories,
      currentPage: pageData.currentPage,
      totalPages: pageData.totalPages,
      site,
    },
  };
}
