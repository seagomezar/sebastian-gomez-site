import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { getConferenceDetails, getCategoryPost } from '../../services';
import ConferenceFeedbackForm from '../../components/ConferenceFeedbackForm';
import ConferenceHero from '../../components/ConferenceHero';
import ConferenceRelatedPosts from '../../components/ConferenceRelatedPosts';
import Loader from '../../components/Loader';
import { event } from '../../lib/analytics';
import { getReadableTextColor, getVisibleColorOnWhite } from '../../lib/color';

function ConferenceLanding({ conference, relatedPosts }) {
  const router = useRouter();

  useEffect(() => {
    if (conference) {
      event({
        action: 'view_conference_page',
        category: 'conference_landing',
        label: conference.name
      });
    }
  }, [conference]);

  if (router.isFallback || !conference) {
    return <Loader />;
  }

  const handleSlidesClick = () => {
    event({
      action: 'click_conference_slides',
      category: 'conference_landing',
      label: conference.name
    });
  };

  const handleFormClick = () => {
    event({
      action: 'click_conference_form',
      category: 'conference_landing',
      label: conference.name
    });
  };

  const themeColor = conference.themeColor?.hex || '#db2777'; // pink-600 default
  const themeTextColor = getReadableTextColor(themeColor); // contrast-safe label color
  const themeBorderColor = getVisibleColorOnWhite(themeColor); // stays visible on white card

  return (
    <div className="container mx-auto md:px-10 mb-8 px-4">
      <NextSeo
        title={`${conference.talkTitle} - Materiales de Conferencia`}
        description={`Materiales y lecturas recomendadas para la conferencia ${conference.name}`}
      />
      <ConferenceHero>
        <div className="p-8 pb-12 text-center text-white" style={{ borderTop: `8px solid ${themeBorderColor}` }}>
          <h1 className="text-3xl font-bold mb-4">¡Gracias por haber participado en mi charla!</h1>
          <h2 className="text-xl text-gray-200 mb-8">&quot;{conference.talkTitle}&quot;</h2>

          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            {conference.slidesUrl && (
              <a
                href={conference.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSlidesClick}
                className="transition duration-500 ease inline-block text-lg font-medium rounded-full px-8 py-3 cursor-pointer"
                style={{ backgroundColor: themeColor, color: themeTextColor }}
              >
                Descargar Diapositivas
              </a>
            )}
          </div>

          {conference.googleFormUrl && (
            <div className="mt-12 mb-8 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="text-xl mb-4 font-semibold">¿Te gustaría llevar esta charla a tu empresa o universidad?</h3>
              <a
                href={conference.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleFormClick}
                className="transition duration-500 ease hover:-translate-y-1 inline-block bg-gray-800 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
              >
                Contáctame aquí
              </a>
            </div>
          )}
        </div>
      </ConferenceHero>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <ConferenceFeedbackForm
            slug={conference.slug}
            conferenceName={conference.name}
            themeColor={themeColor}
          />
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <ConferenceRelatedPosts posts={relatedPosts.slice(0, 3)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConferenceLanding;

export async function getServerSideProps({ params }) {
  const conference = await getConferenceDetails(params.slug);
  
  let relatedPosts = [];
  if (conference && conference.categories && conference.categories.length > 0) {
    relatedPosts = await getCategoryPost(conference.categories[0].slug);
  }

  if (!conference) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      conference,
      relatedPosts,
    },
  };
}
