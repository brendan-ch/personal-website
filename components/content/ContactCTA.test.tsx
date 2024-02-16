import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import ContactCTA from './ContactCTA';

describe('ContactCTA', () => {
  // Test that the card renders correctly
  it('renders contact CTA with background image', () => {
    render(
      <ContactCTA />
    );

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
    expect(img).toHaveAttribute('alt');
  });

  it('Renders links to resume and email', () => {
    render(
      <ContactCTA />
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    expect(links.find((link) => link.getAttribute('href') === '/resume.pdf')).toBeInTheDocument();
    expect(links.find((link) => link.getAttribute('href') === 'mailto:me@bchen.dev')).toBeInTheDocument();
  });

});
