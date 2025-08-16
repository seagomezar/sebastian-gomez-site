import React from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import { getCategoryPost } from '../../services';
import { PostCard, Categories, Loader, AdWidget } from '../../components';

function CategoryPost({ posts }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Posts por categoría</title>
        <meta
          property="og:title"
          content="Posts por categoría"
          key="title"
        />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
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

// Fetch data at build time
export async function getServerSideProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}
