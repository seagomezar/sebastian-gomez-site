import Head from 'next/head';
import React from 'react';
import { Categories, PostWidget, AdWidget } from '../components';
import { getSite } from '../services';
import getContentFragment from '../services/parsing';

export default function About({ site }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Conferences</title>
        <meta property="og:title" content="Conferences" key="title" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="px-4 lg:px-0 text-justify">
              {site.talks.raw.children.map((typeObj, index) => {
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
            <AdWidget />
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
