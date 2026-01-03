import React, { memo } from 'react';
import YouTube from 'react-youtube';
import Link from 'next/link';
import Image from 'next/image';

const getModifiedText = (index, text, obj) => {
  let modifiedText = text;

  if (obj) {
    if (obj.bold) {
      modifiedText = <strong key={`b-${index}`}>{modifiedText}</strong>;
    }

    if (obj.italic) {
      modifiedText = <em key={`e-${index}`}>{modifiedText}</em>;
    }

    if (obj.underline) {
      modifiedText = <u key={`u-${index}`}>{modifiedText}</u>;
    }

    if (obj.code) {
      modifiedText = <code key={`c-${index}`} className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm text-pink-500">{modifiedText}</code>;
    }
  }

  return modifiedText;
};

const HeadingThree = memo(({ index, modifiedText }) => (
  <h2 key={`h3-${index}`} className="text-xl font-semibold mb-4 mt-8 text-gray-800">
    {modifiedText && modifiedText.map((item, i) => (
      <React.Fragment key={`h3-${i}-2`}>{item}</React.Fragment>
    ))}
  </h2>
));

const Paragraph = memo(({ index, modifiedText }) => (
  <p key={`p-${index}`} className="mb-4 text-gray-700 leading-relaxed">
    {modifiedText &&
      modifiedText.map((item, i) => (
        <React.Fragment key={`p-${i}-1`}>{item}</React.Fragment>
      ))}
  </p>
));

const HeadingFour = memo(({ index, modifiedText }) => (
  <h4 key={`h4-${index}`} className="text-lg font-semibold mb-4 mt-6 text-gray-800">
    {modifiedText && modifiedText.map((item, i) => (
      <React.Fragment key={`h4-${i}-1`}>{item}</React.Fragment>
    ))}
  </h4>
));

const RichTextImage = memo(({ index, obj }) => (
  <div className="my-8 flex justify-center">
    <Image
      key={index}
      alt={obj.title}
      height={obj.height}
      width={obj.width}
      src={obj.src}
      className="rounded-lg shadow-md max-w-full h-auto"
      sizes="(max-width: 768px) 100vw, 700px"
    />
  </div>
));

const BulletedList = memo(({ index, modifiedText }) => (
  <ul key={`ul-${index}`} className="mb-4 ml-6 list-disc text-gray-700">
    {modifiedText && modifiedText.map((item, i) => (
      <React.Fragment key={`ul-child-${i}`}>{item}</React.Fragment>
    ))}
  </ul>
));

const NumberedList = memo(({ index, modifiedText }) => (
  <ol key={`ol-${index}`} className="mb-4 ml-6 list-decimal text-gray-700">
    {modifiedText && modifiedText.map((item, i) => (
      <React.Fragment key={`ol-child-${i}`}>{item}</React.Fragment>
    ))}
  </ol>
));

const ListItem = memo(({ index, obj }) => {
  // Helper to process children of a list item
  const children = obj.children || [];

  const renderedChildren = children.map((child, i) => {
    // Handle Nested Lists
    if (child.type === 'bulleted-list' || child.type === 'numbered-list') {
      // We must manually process the children of the nested list first
      // just like the main recursive loop does in PostDetail or here.
      const nestedItems = child.children.map((grandChild, j) =>
        getContentFragment(j, grandChild.children, grandChild, 'list-item')
      );
      return getContentFragment(i, nestedItems, child, child.type);
    }

    // Handle text nodes or other inline elements
    // If it has 'text' property, it's a leaf node usually
    if (child.text !== undefined) {
      return getContentFragment(i, child.text, child, 'text');
    }

    // If it's a link or other element with children
    if (child.type === 'link') {
      // Links usually have children text nodes
      const linkText = child.children.map((c, k) => getContentFragment(k, c.text, c, 'text'));
      return getContentFragment(i, linkText, child, 'link');
    }

    // Handle Block Elements (paragraph, etc) inside ListItem
    // We must recurse on their children to provide content
    let childContent = undefined;
    if (child.children) {
      childContent = child.children.map((grandChild, j) => {
        // Recursively handle the children of the block element (e.g. text nodes inside a paragraph)
        // This was the missing step: previously we passed undefined or raw text, causing empty rendering
        if (grandChild.children) {
          const grandChildContent = grandChild.children.map((greatGrandChild, k) =>
            getContentFragment(k, greatGrandChild.text, greatGrandChild, greatGrandChild.type || 'text')
          );
          return getContentFragment(j, grandChildContent, grandChild, grandChild.type || 'text');
        }

        return getContentFragment(j, grandChild.text, grandChild, grandChild.type || 'text')
      });
    }

    // Special handling for list-item-child which is a wrapper
    if (child.type === 'list-item-child') {
      return (
        <React.Fragment key={i}>
          {childContent.map((item, k) => <React.Fragment key={k}>{item}</React.Fragment>)}
        </React.Fragment>
      )
    }

    return getContentFragment(i, childContent, child, child.type);
  });

  return (
    <li key={`li-${index}`} className="mb-1 pl-1">
      {renderedChildren}
    </li>
  );
});

const LinkElement = memo(({ obj }) => (
  <Link key={obj.toString()} href={obj.href} target="_blank" rel="noopener noreferrer">
    <span className="cursor-pointer font-semibold text-pink-600 hover:text-pink-700 hover:underline">
      {obj.children[0]?.text || obj.href}
    </span>
  </Link>
));

const CodeBlock = memo(({ obj, text: textProp }) => {
  // Extract raw text from children to ensure Prism gets clean code
  const text = obj.children?.map((child) => child.text).join('') || textProp || '';

  // Simple heuristic for auto-detection if language is missing
  let language = obj?.language || (obj?.className ? obj.className.replace('language-', '') : null);

  if (!language) {
    if (text.includes('def ') || text.includes('import ') || text.includes('print(')) {
      language = 'python';
    } else if (text.includes('console.log') || text.includes('const ') || text.includes('=>') || text.includes('function')) {
      language = 'javascript'; // Default to JS/JSX for web code
    } else if (text.startsWith('$') || text.includes('npm run') || text.includes('yarn add')) {
      language = 'bash';
    } else {
      language = 'text';
    }
  }

  return (
    <div className="my-6">
      <pre
        suppressHydrationWarning
        className="rounded-lg p-4 bg-gray-900 overflow-x-auto text-sm leading-relaxed text-gray-100 shadow-lg"
      >
        <code suppressHydrationWarning className={`language-${language}`}>{text}</code>
      </pre>
    </div>
  );
});

const Iframe = memo(({ obj }) => (
  <div className="my-8 aspect-w-16 aspect-h-9">
    <YouTube
      videoId={obj.url.replace('https://youtu.be/', '')}
      opts={{
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 0,
        },
      }}
    />
  </div>
));

const getContentFragment = (index, text, obj, type) => {
  const modifiedText = getModifiedText(index, text, obj);
  switch (type) {
    case 'heading-three':
      return <HeadingThree key={index} index={index} modifiedText={modifiedText} />;
    case 'paragraph':
      return <Paragraph key={index} index={index} modifiedText={modifiedText} />;
    case 'heading-four':
      return <HeadingFour key={index} index={index} modifiedText={modifiedText} />;
    case 'image':
      return <RichTextImage key={index} index={index} obj={obj} />;
    case 'bulleted-list':
      return <BulletedList key={index} index={index} modifiedText={modifiedText} />;
    case 'numbered-list':
      return <NumberedList key={index} index={index} modifiedText={modifiedText} />;
    case 'list-item':
      // modifiedText passed here from PostDetail loop is technically 'children' array if processed there,
      // but in our recursion fix we pass the object.
      // Let's use 'obj' which is the raw node.
      return <ListItem key={index} index={index} obj={obj} />;
    case 'list-item-child':
      return (
        <React.Fragment key={index}>
          {modifiedText && modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </React.Fragment>
      );
    case 'link':
      return <LinkElement key={index} obj={obj} />;
    case 'code-block':
      return <CodeBlock key={index} text={text} obj={obj} />;
    case 'iframe':
      return <Iframe key={index} obj={obj} />;
    case 'text':
      return modifiedText;
    default:
      return modifiedText;
  }
};

export default getContentFragment;