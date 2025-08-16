import React, { useEffect, useMemo } from 'react';
import moment from 'moment';
import Prism from 'prismjs';
import Image from 'next/image';
import SocialShare from './SocialShare';
import Applause from './Applause';
import getContentFragment from '../services/parsing';

function AuthorInfo({ author }) {
  return (
    <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
      <div className="relative h-8 w-8">
        <Image
          src={author.photo.url}
          alt={author.name}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-full"
          sizes="(max-width: 768px) 100vw"
        />
      </div>
      <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
        {author.name}
      </p>
    </div>
  );
}

function PostDate({ createdAt }) {
  return (
    <div className="font-medium text-gray-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline mr-2 text-pink-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="align-middle">
        {moment(createdAt).format('MMM DD, YYYY')}
      </span>
    </div>
  );
}

function PostDetail({ post }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []);

  const renderedContent = useMemo(() => post.content.raw.children.map((typeObj, index) => {
    const children = typeObj.children.map((item, itemindex) =>
      getContentFragment(itemindex, item.text, item, item.type)
    );
    return getContentFragment(index, children, typeObj, typeObj.type);
  }), [post.content.raw.children]);

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6 h-48 lg:h-64 rounded-t-lg lg:rounded-lg">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          className="rounded-t-lg lg:rounded-lg object-contain"
          sizes="(max-width: 768px) 100vw"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <AuthorInfo author={post.author} />
          <PostDate createdAt={post.createdAt} />
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {renderedContent}
        <SocialShare url={post.slug} />
        <Applause slug={post.slug} />
      </div>
    </div>
  );
}

export default PostDetail;
