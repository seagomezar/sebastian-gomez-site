import React from 'react';
import Link from 'next/link';
import { FeaturedPosts } from '../../../sections/index';
import {
  PostCard,
  Categories,
  PostWidget,
  SiteWidget,
  AdWidget,
} from '../../../components';
import {
  getPosts,
  getPostsPerPage,
  getSite,
} from '../../../services';

export default function Home({ posts, site, nextPageNumber }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts &&
            posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          <div className="text-center">
            <Link href="/">
              <div className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-3 cursor-pointer border-blue-400 border-r">
                Ir al Inicio
              </div>
            </Link>
            {nextPageNumber ? (
              <Link href={`/posts/page/${nextPageNumber}`}>
                <div className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-3 cursor-pointer border-blue-400 border-r">
                  Cargar Más ...
                </div>
              </Link>
            ) : (
              <div>No hay mas posts por el momento</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <SiteWidget site={site} />
            <AdWidget />
            <PostWidget categories={undefined} slug={undefined} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data per request (SSR). A non-numeric or < 1 page number, or a page past
// the last one, returns 404 (see SPEC-404-handling.md). Page 1 always renders.
export async function getServerSideProps({ params }) {
  const pageNumber = Number(params.pageNumber);
  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    return { notFound: true };
  }

  const posts = (await getPostsPerPage(pageNumber)) || [];

  // Out of range: no posts on a page beyond the first => 404 (page 1 may be empty).
  if (posts.length === 0 && pageNumber > 1) {
    return { notFound: true };
  }

  const postsCount = (await getPosts()) || [];
  const site = (await getSite()) || [];
  const nextPageNumber =
    postsCount.length > pageNumber * 4 ? pageNumber + 1 : 0;
  return {
    props: {
      posts,
      site,
      nextPageNumber,
    },
  };
}
