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

  </div>
);

export default SiteWidget;
