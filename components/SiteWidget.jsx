import React from 'react';
import Image from 'next/image';
import { grpahCMSImageLoader } from '../util';

const SiteWidget = ({ site }) => (
  <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
    <h3 className="text-xl mb-8 font-semibold border-b pb-4">{site.name}</h3>
    <div className="flex w-full mb-4 place-content-center">
      <Image
        loader={grpahCMSImageLoader}
        alt={site.name}
        height="160px"
        width="160px"
        unoptimized
        className="align-middle rounded-full"
        src={site.image.url}
      />
    </div>
    <div className="flex items-center w-full mb-4 text-justify">
      {site.description}
    </div>
    <a href="https://twitter.com/sebasgojs" target="_blank" rel="noreferrer">
      <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-3 cursor-pointer border-blue-400 border-r">Twitter</span>
    </a>
    <a href="https://www.linkedin.com/in/sebastian-gomez-frontend/" target="_blank" rel="noreferrer">
      <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-3 cursor-pointer border-blue-400 border-r">LinkedIn</span>
    </a>

  </div>
);

export default SiteWidget;
