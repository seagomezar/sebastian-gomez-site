import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Categories, PostWidget } from '../../components';
import { getSite } from '../../services';
import getContentFragment from '../../services/parsing';

export default function About({ site }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <div className="float-right">
            <Link href="/about">
              <Image
                unoptimized
                alt="Español"
                height="32px"
                width="32px"
                className="align-middle rounded-full"
                src="/es.jpg"
              />
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="px-4 lg:px-0 text-justify">
              <h1 className="mb-8 text-3xl font-semibold">
                {site.name}
              </h1>
              {site.about.raw.children.map((typeObj, index) => {
                const children = typeObj.children.map(
                  (item, itemindex) =>
                    getContentFragment(
                      itemindex,
                      item.text,
                      item,
                      item.type
                    )
                );
                return getContentFragment(
                  index,
                  children,
                  typeObj,
                  typeObj.type
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
            <PostWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const site = (await getSite('en')) || [];
  return {
    props: { site },
  };
}
