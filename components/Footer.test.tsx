import { render } from "@testing-library/react";
import Footer from './Footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('Renders copyright text with the correct year.', () => {
    const { getByText } = render(<Footer />);

    const currentYear = (new Date()).getUTCFullYear();
    const copyrightText = `© ${currentYear} Brendan Chen. All rights reserved.`;
    const p = getByText(copyrightText);
    expect(p).toBeInTheDocument();
  });

  it('renders links to legal documents', () => {
    const { getByText } = render(<Footer />);

    interface Link {
      href: string,
      name: string,
    }

    // Put links to test in this array
    const links: Link[] = [
      {
        href: '/doc/privacy',
        name: 'Privacy Policy',
      },
      {
        href: '/doc/open-source-licenses',
        name: 'Open Source Licenses',
      },
      {
        href: '/doc/fair-use-statement',
        name: 'Fair Use Statement',
      },
    ];

    links.forEach((value) => {
      // Get the text
      const u = getByText(value.name);
      expect(u).toBeInTheDocument();

      // Ensure that text is nested in a link
      const a = u.parentElement?.parentElement;
      expect(a).toBeInTheDocument();
      expect(a?.getAttribute('href')).toStrictEqual(value.href);
    });
  });
});