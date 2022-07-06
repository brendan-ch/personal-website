import { render } from "@testing-library/react";
import Footer from './Footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('renders copyright text', () => {
    const { getByText } = render(<Footer />);

    const copyrightText = '© 2022 Brendan Chen';
    const p = getByText(copyrightText);
    expect(p).toBeInTheDocument();
  });

  it('renders links to legal documents', () => {
    const { debug, getByText } = render(<Footer />);

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
        href: '/doc/copyright',
        name: 'Copyright and Licenses',
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