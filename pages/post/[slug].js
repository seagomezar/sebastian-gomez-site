import React from 'react';
import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';
import PostDetail from '../../components/PostDetail';
import Categories from '../../components/Categories';
import PostWidget from '../../components/PostWidget';
import Author from '../../components/Author';
import Comments from '../../components/Comments';
import CommentsForm from '../../components/CommentsForm';
import Loader from '../../components/Loader';
import AdWidget from '../../components/AdWidget';
import { getPostDetails } from '../../services';
import AdjacentPosts from '../../sections/AdjacentPosts';

function PostDetails({ post, locale = 'es' }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const localeParam = locale === 'es' ? '' : `?lang=${locale}`;
  const ogLocale = locale === 'en' ? 'en_US' : 'es_ES';

  return (
    <div className="container mx-auto md:px-10 mb-8">
      <NextSeo
        title={post.title}
        description={post.excerpt}
        openGraph={{
          title: post.title,
          description: post.excerpt,
          url: `https://www.sebastian-gomez.com/post/${post.slug}${localeParam}`,
          locale: ogLocale,
          type: 'article',
          article: {
            publishedTime: post.createdAt,
            authors: [post.author.name],
            tags: post.categories.map((cat) => cat.name),
          },
          images: [
            {
              url: post.featuredImage.url,
              width: 800,
              height: 600,
              alt: post.title,
            },
          ],
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <AdjacentPosts
            slug={post.slug}
            createdAt={post.createdAt}
          />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <AdWidget />
            <PostWidget
              slug={post.slug}
              categories={post.categories.map(
                (category) => category.slug
              )}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostDetails;

// Supported content locales (must exist in Hygraph). Anything else falls back to 'es'.
const SUPPORTED_LOCALES = ['es', 'en'];

// Fetch data per request (SSR) so new posts/locales go live without a redeploy.
export async function getServerSideProps({ params, query }) {
  const locale = SUPPORTED_LOCALES.includes(query.lang) ? query.lang : 'es';
  const data = await getPostDetails(params.slug, locale);
  return {
    props: {
      post: data,
      locale,
    },
  };
}
