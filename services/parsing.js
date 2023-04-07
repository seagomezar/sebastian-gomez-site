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
    {modifiedText.map((item, i) => (
      <React.Fragment key={`p-${i}-1`}>{item}</React.Fragment>
    ))}
  </ul>
));

const NumberedList = memo(({ index, modifiedText }) => (
  <ol key={`ol-${index}`} className="mb-8 list-decimal list-inside">
    {modifiedText.map((item, i) => (
      <React.Fragment key={`p-${i}-1`}>{item}</React.Fragment>
    ))}
  </ol>
));

const ListItem = memo(({ obj }) => {
  console.log({obj});
  return (
    <li className="mb-2">
      {obj.children.map((child, index) => {
        if (child.type === 'list-item-child') {
          return child.children.map((nestedChild, nestedIndex) =>
            getContentFragment(
              `${index}-${nestedIndex}`,
              nestedChild.text,
              nestedChild,
              nestedChild.type
            )
          );
        } else {
          return getContentFragment(
            index,
            child.text,
            child,
            child.type
          );
        }
      })}
    </li>
  );});

const LinkElement = memo(({ obj }) => (
  <Link href={obj.href}>
    <span className="cursor-pointer font-semibold text-blue-400">
      {obj.children[0].text}
    </span>
  </Link>
));

const CodeBlock = memo(({ text }) => (
  <pre className="language-javascript">
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
  console.log(type);
  switch (type) {
    case 'heading-three':
      return <HeadingThree index={index} modifiedText={modifiedText} />;
    case 'paragraph':
      return <Paragraph index={index} modifiedText={modifiedText} />;
    case 'heading-four':
      return <HeadingFour index={index} modifiedText={modifiedText} />;
    case 'image':
      return <Image index={index} obj={obj} />;
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

