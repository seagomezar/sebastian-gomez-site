import React from 'react';
import moment from 'moment';
import Link from 'next/link';

function FeaturedImage({ imageUrl }) {
  return (
    <div
      className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    />
  );
}

function GradientOverlay() {
  return (
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
  );
}

function CardHeader({ date, title }) {
  return (
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white text-shadow font-semibold text-xs">
        {moment(date).format('MMM DD, YYYY')}
      </p>
      <p className="text-white text-shadow font-semibold text-2xl text-center">
        {title}
      </p>
    </div>
  );
}

function NavigationArrow({ direction, onClick }) {
  const arrowClasses =
    'absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-pink-600 rounded-full ' +
    (direction === 'left' ? 'left-4' : 'right-4');
  const arrowPath =
    direction === 'left'
      ? 'M10 19l-7-7m0 0l7-7m-7 7h18'
      : 'M14 5l7 7m0 0l-7 7m7-7H3';

  return (
    <div className={arrowClasses} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 text-white w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={arrowPath}
        />
      </svg>
    </div>
  );
}

function AdjacentPostCard({ post, position, onNavigationClick }) {
  return (
    <div className="relative w-full h-72">
      <FeaturedImage imageUrl={post.featuredImage.url} />
      <GradientOverlay />
      <CardHeader date={post.createdAt} title={post.title} />
      <Link href={`/post/${post.slug}`} className="z-10 cursor-pointer absolute w-full h-full" aria-label={`Go to ${post.title}`}/>
      {position === 'LEFT' && (
        <NavigationArrow
          direction="left"
          onClick={() => onNavigationClick('left')}
        />
      )}
      {position === 'RIGHT' && (
        <NavigationArrow
          direction="right"
          onClick={() => onNavigationClick('right')}
        />
      )}
    </div>
  );
}

export default AdjacentPostCard;
