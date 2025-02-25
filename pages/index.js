import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FeaturedPosts } from '../sections/index';
import {
  PostCard,
  Categories,
  PostWidget,
  SiteWidget,
  AdWidget,
} from '../components';
import { getPostsPerPage, getSite } from '../services';

export default function Home({ posts, site }) {
  return (
    <div className="container mx-auto sm:px-4 md:px-10 mb-8">
      <Head>
        <title>Sebastian Gomez</title>
        <meta
          property="og:title"
          content="Sebastian Gomez"
          key="title"
        />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
          <div className="text-center">
            <Link href={`/posts/page/${posts.length / 4 + 1}`}>
              <div className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-3 cursor-pointer border-blue-400 border-r">
                Cargar Más ...
              </div>
            </Link>
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

// Fetch data at build time
export async function getServerSideProps() {
  const posts = (await getPostsPerPage(1)) || [];
  const site = (await getSite()) || [];
  return {
    props: { posts, site },
  };
}
