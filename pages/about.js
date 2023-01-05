import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { Categories, PostWidget } from '../components';
import { getSite } from '../services';
import getContentFragment from '../services/parsing';

export default function About({ site }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>About Sebastian Gomez</title>
        <meta
          property="og:title"
          content="About Sebastian Gomez"
          key="title"
        />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <div className="float-right">
            <Link href="/en/about" locale="en">
              <Image
                unoptimized
                alt="English"
                height="32"
                width="32"
                className="align-middle rounded-full"
                src="/en.png"
              />
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="px-4 lg:px-0 text-justify">
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
export async function getServerSideProps() {
  const site = (await getSite()) || [];
  return {
    props: { site },
  };
}
