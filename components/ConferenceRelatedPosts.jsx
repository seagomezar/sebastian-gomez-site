import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { grpahCMSImageLoader } from '../util';

// Compact "recommended reading" sidebar for the conference landing page.
// Mirrors the post page's PostWidget style so the two-column layout matches.
function ConferenceRelatedPosts({ posts = [] }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Lecturas Recomendadas
      </h3>
      {posts.length > 0 ? (
        posts.map((post, index) => {
          const { node } = post;
          return (
            <div key={index} className="flex items-center w-full mb-4">
              <div className="w-16 flex-none">
                {node.featuredImage?.url && (
                  <Image
                    loader={grpahCMSImageLoader}
                    alt={node.title}
                    height="60"
                    width="60"
                    sizes="60px"
                    className="align-middle rounded-full"
                    src={node.featuredImage.url}
                  />
                )}
              </div>
              <div className="flex-grow ml-4">
                <p className="text-gray-600 font-xs">
                  {moment(node.createdAt).format('MMM DD, YYYY')}
                </p>
                <Link href={`/post/${node.slug}`} className="text-md">
                  {node.title}
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-600">No hay lecturas recomendadas por el momento.</p>
      )}
    </div>
  );
}

export default ConferenceRelatedPosts;
