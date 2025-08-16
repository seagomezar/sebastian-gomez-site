import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image'; // Import Image
import { Categories, PostWidget, AdWidget } from '../../components';
import Clase from '../../components/Clase';
import data from './data.json';

function Protected() {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem('isLoggedIn')) {
      router.push('/education/login');
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    router.push('/education/login');
  };

  return (
    <div
      className="container mx-auto px-10 mb-8"

    >
      <Head>
        <title>Clases</title>
        <meta property="og:title" content="Clases" key="title" />
      </Head>
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        style={{
          backgroundImage: 'url(/background-tech.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="flex items-center justify-between">
              <Image // Replace img tag with Image component
                src="/logo.png"
                alt="Logo"
                width={128} // Specify width
                height={42} // Specify height
                className="mb-4"
              />
              <div className="text-right">
                <p className="text-xl mb-8">
                  Hola, Estudiante
                </p>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  type="button"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
            <div className="mt-8">
              {data.clases.map((clase) => (
                <Clase key={clase.id} clase={clase} />
              ))}
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

export default Protected;
