import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import Card from './Card';

describe('Card', () => {
  // Define attributes for the card
  const title = 'Test Title';
  const description = 'Test Description';
  const imagePath = '/test-image.jpg';
  const imageAlt = 'Test Image Alt';
  const externalLinks = [
    {
      name: 'Test Link 1',
      url: 'https://example.com',
    },
    {
      name: 'Test Link 2',
      url: 'https://example.org',
    },
  ];

  // Test that the card renders correctly
  it('renders the title, description, and image', () => {
    render(
      <Card
        title={title}
        description={description}
        imagePath={imagePath}
        imageAlt={imageAlt}
        externalLinks={externalLinks}
      />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByAltText(imageAlt)).toBeInTheDocument();
  });

  // Test that the card renders the external links if provided
  it('renders the external links', () => {
    render(
      <Card
        title={title}
        description={description}
        imagePath={imagePath}
        imageAlt={imageAlt}
        externalLinks={externalLinks}
      />
    );

    externalLinks.forEach((link) => {
      expect(screen.getByText(link.name)).toBeInTheDocument();
      expect(screen.getByText(link.name).closest('a')).toHaveAttribute(
        'href',
        link.url
      );
    });
  });
});
