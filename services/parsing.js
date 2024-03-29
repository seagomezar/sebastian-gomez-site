import React, { memo } from 'react';
import YouTube from 'react-youtube';
import Link from 'next/link';

const getModifiedText = (index, text, obj) => {
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

  return modifiedText;
};

const HeadingThree = memo(({ index, modifiedText }) => (
  <h3 key={`h3-${index}`} className="text-xl font-semibold mb-4">
    {modifiedText.map((item, i) => (
      <React.Fragment key={`h3-${i}-2`}>{item}</React.Fragment>
    ))}
  </h3>
));

const Paragraph = memo(({ index, modifiedText }) => (
  <p key={`p-${index}`} className="mb-8">
    {modifiedText &&
      modifiedText.map((item, i) => (
        <React.Fragment key={`p-${i}-1`}>{item}</React.Fragment>
      ))}
  </p>
));

const HeadingFour = memo(({ index, modifiedText }) => (
  <h4 key={`h4-${index}`} className="text-md font-semibold mb-4">
    {modifiedText.map((item, i) => (
      <React.Fragment key={`h4-${i}-1`}>{item}</React.Fragment>
    ))}
  </h4>
));

const Image = memo(({ index, obj }) => (
  <img
    key={index}
    alt={obj.title}
    height={obj.height}
    width={obj.width}
    src={obj.src}
  />
));

const BulletedList = memo(({ index, modifiedText }) => (
  <ul key={`ul-${index}`} className="mb-8 list-disc list-inside">
    {modifiedText && modifiedText.map((item, i) => (
      <React.Fragment key={`p-${i+Date.now()}-1`}>{item}</React.Fragment>
    ))}
  </ul>
));

const NumberedList = memo(({ index, modifiedText }) => (
  <ol key={`ol-${index}`} className="mb-8 list-decimal list-inside">
    {modifiedText.map((item, i) => (
      <React.Fragment key={`p-${i+Date.now()}-1`}>{item}</React.Fragment>
    ))}
  </ol>
));

const ListItem = memo(({ obj }) => {
  // Función para procesar cada hijo del elemento de lista, incluyendo los anidados
  const processChildren = (children) => {
    return children.map((child, index) => {
      // Verificar si el hijo tiene sus propios hijos y procesarlos recursivamente
      if (child.children) {
        return processChildren(child.children);
      }
      // Si el hijo es un objeto simple, procesarlo con getContentFragment
      return getContentFragment(
        index,
        child.text,
        child,
        child.type || (child.code ? 'text' : 'text')
      );
    });
  };

  // Renderizar los hijos del elemento de lista utilizando la función auxiliar
  return (
    <li key={obj.toString()} className="mb-2">
      {processChildren(obj.children)}
    </li>
  );
});

const LinkElement = memo(({ obj }) => (
  <Link key={obj.toString()} href={obj.href}>
    <span className="cursor-pointer font-semibold text-blue-400">
      {obj.children[0].text}
    </span>
  </Link>
));

const CodeBlock = memo(({ text }) => (
  <pre key={text.toString()} className="language-javascript">
    <code>{text}</code>
  </pre>
));

const Iframe = memo(({ obj }) => (
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
));

const getContentFragment = (index, text, obj, type) => {
  const modifiedText = getModifiedText(index, text, obj);
  switch (type) {
    case 'heading-three':
      return <HeadingThree index={index} modifiedText={modifiedText} />;
    case 'paragraph':
      return <Paragraph index={index} modifiedText={modifiedText} />;
    case 'heading-four':
      return <HeadingFour index={index} modifiedText={modifiedText} />;
    case 'image':
      return <Image index={index} obj={obj} sizes="(max-width: 768px) 100vw" />;
    case 'bulleted-list':
      return <BulletedList index={index} modifiedText={modifiedText} />;
    case 'numbered-list':
      return <NumberedList index={index} modifiedText={modifiedText} />;
    case 'list-item':
      return <ListItem obj={obj}/>;
    case 'link':
      return <LinkElement obj={obj} />;
    case 'code-block':
      return <CodeBlock text={text} />;
    case 'iframe':
      return <Iframe obj={obj} />;
    case 'list-item-child':
        return text;
    default:
      return modifiedText;
  }
};

export default getContentFragment;

