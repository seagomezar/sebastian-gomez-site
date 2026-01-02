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

  it('renders a bulleted list correctly', () => {
    // simulating what PostDetail passes to getContentFragment for a list
    // It passes an array of rendered ListItems
    const listItems = [
      <li key="1">Item 1</li>,
      <li key="2">Item 2</li>
    ];
    const result = getContentFragment(0, listItems, {}, 'bulleted-list');
    render(result);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-disc');
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
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
