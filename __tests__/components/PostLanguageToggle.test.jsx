import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostLanguageToggle from '../../components/PostLanguageToggle';
import { event } from '../../lib/analytics';

jest.mock('../../lib/analytics', () => ({ event: jest.fn() }));
jest.mock('next/link', () => ({ children, href, onClick, ...rest }) => (
  <a href={href} onClick={onClick} {...rest}>{children}</a>
));
jest.mock('next/image', () => function MockImage({ src, alt }) {
  return <img src={src} alt={alt} />;
});

beforeEach(() => event.mockReset());

describe('PostLanguageToggle', () => {
  it('renders nothing when no English localization exists', () => {
    const { container } = render(
      <PostLanguageToggle slug="hola" locale="es" availableLocales={[]} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when availableLocales is undefined', () => {
    const { container } = render(<PostLanguageToggle slug="hola" locale="es" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the US flag linking to ?lang=en on a Spanish post', () => {
    render(<PostLanguageToggle slug="hola" locale="es" availableLocales={['en']} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/post/hola?lang=en');
    expect(screen.getByRole('img')).toHaveAttribute('src', '/en.png');
    expect(screen.getByAltText('View in English')).toBeInTheDocument();
  });

  it('shows the Spanish flag linking back to the post on the English view', () => {
    // On the EN view, Hygraph reports the *other* locale (es) as available.
    render(<PostLanguageToggle slug="hola" locale="en" availableLocales={['es']} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/post/hola');
    expect(screen.getByRole('img')).toHaveAttribute('src', '/es.jpg');
    expect(screen.getByAltText('Ver en Español')).toBeInTheDocument();
  });

  it('renders nothing on the English view when the target (es) is not available', () => {
    const { container } = render(
      <PostLanguageToggle slug="hola" locale="en" availableLocales={['en']} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('fires the GA4 event on click with the target locale', () => {
    render(<PostLanguageToggle slug="hola" locale="es" availableLocales={['en']} />);

    fireEvent.click(screen.getByRole('link'));

    expect(event).toHaveBeenCalledWith({
      action: 'toggle_post_language',
      category: 'post',
      label: 'hola',
      value: 'en',
    });
  });
});
