import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { event } from '../lib/analytics';

// Bidirectional language flag for a post. Renders nothing unless the *target* locale
// genuinely exists (Hygraph falls back to Spanish, so an always-on flag would serve
// Spanish content under an English URL). `availableLocales` is the post's other
// localizations relative to the current view: ['en'] on the ES view, ['es'] on the
// EN view. Reuses the about page's flag assets/styling.
function PostLanguageToggle({ slug, locale, availableLocales }) {
  const toEnglish = locale === 'es';
  const targetLocale = toEnglish ? 'en' : 'es';
  if (!availableLocales?.includes(targetLocale)) return null;

  const href = toEnglish ? `/post/${slug}?lang=en` : `/post/${slug}`;
  const flagSrc = toEnglish ? '/en.png' : '/es.jpg'; // target-language flag
  const flagAlt = toEnglish ? 'View in English' : 'Ver en Español';

  const handleClick = () => {
    event({
      action: 'toggle_post_language',
      category: 'post',
      label: slug,
      value: toEnglish ? 'en' : 'es',
    });
  };

  return (
    <div className="float-right">
      <Link href={href} onClick={handleClick} aria-label={flagAlt} title={flagAlt}>
        <Image
          unoptimized
          alt={flagAlt}
          height="32"
          width="32"
          sizes="(max-width: 768px) 100vw"
          className="align-middle rounded-full"
          src={flagSrc}
        />
      </Link>
    </div>
  );
}

export default PostLanguageToggle;
