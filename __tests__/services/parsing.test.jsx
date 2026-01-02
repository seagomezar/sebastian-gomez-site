import React from 'react';
import { render, screen } from '@testing-library/react';
import getContentFragment from '../../services/parsing';

// Mock Next.js Link
jest.mock('next/link', () => ({ children, href }) => <a href={href}>{children}</a>);

// Mock react-youtube
jest.mock('react-youtube', () => () => <div>YouTube Video</div>);

describe('getContentFragment', () => {
  it('renders a paragraph correctly', () => {
    const text = ['This is a paragraph'];
    const obj = { text: 'This is a paragraph' };
    const result = getContentFragment(0, text, obj, 'paragraph');
    render(result);
    expect(screen.getByText('This is a paragraph')).toBeInTheDocument();
    expect(screen.getByText('This is a paragraph').closest('p')).toBeInTheDocument();
  });

  it('renders bold text correctly', () => {
    const text = 'Bold Text';
    const obj = { bold: true };
    const result = getContentFragment(0, text, obj, 'text');
    render(result);
    const element = screen.getByText('Bold Text');
    expect(element.tagName).toBe('STRONG');
  });

  it('renders italic text correctly', () => {
    const text = 'Italic Text';
    const obj = { italic: true };
    const result = getContentFragment(0, text, obj, 'text');
    render(result);
    const element = screen.getByText('Italic Text');
    expect(element.tagName).toBe('EM');
  });

  it('renders a bulleted list correctly integration', () => {
    // We simulate the Loop in PostDetail by manually mapping the children of the list container
    // and passing them to getContentFragment
    const listObj = {
      type: 'bulleted-list',
      children: [
        {
          type: 'list-item',
          children: [
            {
              type: 'list-item-child',
              children: [
                {
                  text: 'Text Item 1'
                }
              ]
            }
          ]
        },
        {
          type: 'list-item',
          children: [
            {
              type: 'list-item-child',
              children: [
                {
                  bold: true,
                  text: 'Bold Item 2'
                }
              ]
            }
          ]
        }
      ]
    };

    // Simulate PostDetail.jsx loop:
    const renderedChildren = listObj.children.map((item, i) =>
      getContentFragment(i, item.text, item, item.type)
    );
    // Then call the list container handler
    const result = getContentFragment(0, renderedChildren, listObj, 'bulleted-list');

    render(result);

    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-disc');

    // Check for list items
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);

    // Check content
    expect(screen.getByText('Text Item 1')).toBeInTheDocument();

    const boldItem = screen.getByText('Bold Item 2');
    expect(boldItem).toBeInTheDocument();
    expect(boldItem.tagName).toBe('STRONG');
  });

  it('renders a code block correctly', () => {
    const code = 'console.log("Hello World");';
    const result = getContentFragment(0, code, {}, 'code-block');
    render(result);
    const codeElement = screen.getByText('console.log("Hello World");');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement).toHaveClass('language-javascript');
  });
});
