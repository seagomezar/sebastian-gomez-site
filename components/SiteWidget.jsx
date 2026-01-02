import React from 'react';
import Image from 'next/image';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { grpahCMSImageLoader } from '../util';

function SiteWidget({ site }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 text-center">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {site.name}
      </h3>
      <div className="flex w-full mb-4 justify-center">
        <Image
          loader={grpahCMSImageLoader}
          alt={site.name}
          height="160"
          width="160"
          unoptimized
          className="align-middle rounded-full"
          src={site.image.url}
        />
      </div>
      <div className="flex items-center w-full mb-8 text-justify">
        {site.description}
      </div>
      <div className="flex justify-center gap-6">
        <a
          href="https://twitter.com/sebasgojs"
          target="_blank"
          rel="noreferrer"
          className="text-3xl text-gray-700 hover:text-black transition duration-300 transform hover:scale-110"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.linkedin.com/in/sebastian-gomez-frontend/"
          target="_blank"
          rel="noreferrer"
          className="text-3xl text-gray-700 hover:text-blue-600 transition duration-300 transform hover:scale-110"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

export default SiteWidget;
