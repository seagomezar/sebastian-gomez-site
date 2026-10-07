import React from 'react';
import { PortfolioPageView } from '../../components';
import { getSite } from '../../services';
import { getPortfolioPageData } from '../../services/portfolio';

export default function PortfolioIndex({
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

export async function getServerSideProps({ locale = 'es' }) {
  const pageData = getPortfolioPageData(1);
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
