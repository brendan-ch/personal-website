import { render, screen } from '@testing-library/react';
import GalleryItem from './GalleryItem';
import '@testing-library/jest-dom';

const title = 'coffeetype';
const link = '/test-link';
describe('GalleryItem', () => {
  it('Renders the gallery item with just a title and no link', () => {

    render(<GalleryItem
      title={title}
    />);

    // Check that the link is somewhere in the tree
    const a = screen.getByRole('link');
    expect(a.getAttribute('href')).toStrictEqual('/');
  });

  it('Renders the gallery item with just a title and a link', () => {

    render(<GalleryItem
      title={title}
      link={link}
    />);

    // Check that the link is somewhere in the tree
    const a = screen.getByRole('link');
    expect(a.getAttribute('href')).toStrictEqual(link);
  });

  it('Renders the gallery item, with an image, without passing width and height', () => {
    render(<GalleryItem
      title={title}
      link={link}
      imageLink="/link-preview-image.png"
    />);

    // To-do: find a way to test image link without having Next.JS server running
    // imageLink prop currently converts into a base64 string

    // Check that it still renders the link correctly
    const a = screen.getByRole('link');
    expect(a.getAttribute('href')).toStrictEqual(link);

    // Check that the image is somewhere in the tree
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();

    // Check that it includes some form of alt text
    // Don't check what it specifically includes (implementation), just that it includes it (expectation)
    expect(img.getAttribute('alt')).toBeDefined();
    expect(img.getAttribute('alt')?.length).toBeGreaterThan(0);
  });

  // No need to test existence of SVG icon (implementation detail)
});