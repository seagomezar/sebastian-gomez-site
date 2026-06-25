import React from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import { getCategoryPageData } from '../../services';
import { PostCard, Categories, Loader, AdWidget } from '../../components';

function CategoryPost({ category, posts }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const title = category ? `Posts de ${category.name}` : 'Posts por categoría';

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>{title}</title>
        <meta
          property="og:title"
          content={title}
          key="title"
        />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.length === 0 ? (
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Aún no hay posts en esta categoría</h2>
              <p className="text-gray-600">
                Mientras tanto, revisa otras categorías o los posts recientes.
              </p>
            </div>
          ) : (
            posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))
          )}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <AdWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CategoryPost;

// Fetch data per request (SSR). An unknown category slug => 404; a known category
// with zero posts => 200 with an empty state (see SPEC-404-handling.md).
export async function getServerSideProps({ params }) {
  const { category, posts } = await getCategoryPageData(params.slug);

  if (!category) {
    return { notFound: true };
  }

  return {
    props: { category, posts },
  };
}
