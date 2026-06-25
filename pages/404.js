import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Categories, PostWidget } from '../components';

// Custom 404. In the Pages Router this page is statically generated, so it cannot
// fetch data per request — the recovery content (recent posts + categories) loads
// client-side via the existing components (same as the homepage sidebar).
export default function Custom404() {
  return (
    <div className="container mx-auto sm:px-4 md:px-10 mb-8">
      <Head>
        <title>Página no encontrada</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Página no encontrada</h1>
        <p className="text-lg text-gray-600 mb-6">
          Parece que lo que buscas no existe. Quizá quieras revisar las categorías
          o los posts recientes.
        </p>
        <Link href="/" className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-6 py-3 cursor-pointer">
          Ir al inicio
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          <PostWidget categories={undefined} slug={undefined} />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
