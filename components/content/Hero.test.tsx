import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the hero image with the correct alt text', () => {
    const imagePath = '/path/to/image.jpg';
    const imageAlt = 'Hero Image';
    render(<Hero imagePath={imagePath} imageAlt={imageAlt} />);
    
    const heroImage = screen.getByAltText(imageAlt);
    expect(heroImage).toBeInTheDocument();

    // 'src' attribute may differ due to Next.js image optimizations
  });

  it('renders the hero content', () => {
    const imagePath = '/path/to/image.jpg';
    const imageAlt = 'Hero Image';
    const heroContent = 'Welcome to my website!';
    render(
      <Hero imagePath={imagePath} imageAlt={imageAlt}>
        {heroContent}
      </Hero>
    );

    const contentElement = screen.getByText(heroContent);
    expect(contentElement).toBeInTheDocument();
  });
});