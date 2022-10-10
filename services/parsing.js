import React from 'react';
import YouTube from 'react-youtube';
import Link from 'next/link';

const getContentFragment = (index, text, obj, type) => {
  let modifiedText = text;

  if (obj) {
    if (obj.bold) {
      modifiedText = <strong key={`b-${index}`}>{text}</strong>;
    }

    if (obj.italic) {
      modifiedText = <em key={`e-${index}`}>{text}</em>;
    }

    if (obj.underline) {
      modifiedText = <u key={`u-${index}`}>{text}</u>;
    }
  }
  switch (type) {
    case 'heading-three':
      return (
        <h3
          key={`h3-${index}`}
          className="text-xl font-semibold mb-4"
        >
          {modifiedText.map((item, i) => (
            <React.Fragment key={`h3-${i}-2`}>{item}</React.Fragment>
          ))}
        </h3>
      );
    case 'paragraph':
      return (
        <p key={`p-${index}`} className="mb-8">
          {modifiedText &&
            modifiedText.map((item, i) => (
              <React.Fragment key={`p-${i}-1`}>{item}</React.Fragment>
            ))}
        </p>
      );
    case 'heading-four':
      return (
        <h4
          key={`h4-${index}`}
          className="text-md font-semibold mb-4"
        >
          {modifiedText.map((item, i) => (
            <React.Fragment key={`h4-${i}-1`}>{item}</React.Fragment>
          ))}
        </h4>
      );
    case 'image':
      return (
        <img
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
        />
      );
    case 'bulleted-list':
      return (
        <ul
          key={`ul-${index}`}
          className="mb-8 list-disc list-inside"
        >
          {modifiedText.map((item, i) => (
            <React.Fragment key={`p-${i}-1`}>{item}</React.Fragment>
          ))}
        </ul>
      );
    case 'list-item':
      return <li className="">{obj.children[0].children[0].text}</li>;
    case 'link':
      return (
        <Link href={obj.href}>
          <span className="cursor-pointer font-semibold text-blue-400">
            {obj.children[0].text}
          </span>
        </Link>
      );
    case 'code-block':
      return (
        <pre className="language-javascript">
          <code>{text}</code>
        </pre>
      );
    case 'iframe':
      return (
        <div>
          <YouTube
            videoId={obj.url.replace('https://youtu.be/', '')}
            opts={{
              height: '390',
              width: '640',
              playerVars: {
                autoplay: 1,
              },
            }}
            onReady={(event) => {
              event.target.pauseVideo();
            }}
          />
        </div>
      );
    default:
      return modifiedText;
  }
};

export default getContentFragment;
