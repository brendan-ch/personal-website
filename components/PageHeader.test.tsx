import { getAllByRole, getByText, render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';
import '@testing-library/jest-dom';

describe('PageHeader', () => {
  it('Renders with below text', () => {
    render(<PageHeader belowText="Below" />);

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(1);
  });

  it('Renders some breadcrumb with links', () => {
    const breadcrumb = [
      {
        name: 'Link 1',
        href: '/link-1',
      },
      {
        name: 'Link 2',
        href: '/link-2',
      },
    ];

    render(<PageHeader belowText="Below" breadcrumb={breadcrumb} />)

    // Get all links in the container
    const links = screen.getAllByRole('link');

    // Expect links to be equal to those provided
    expect(links[0].getAttribute('href')).toStrictEqual('/link-1');
    expect(links[1].getAttribute('href')).toStrictEqual('/link-2');
    
    // Check if correct text is rendered somewhere inside each link
    const textInLinks = links.map((link) => getByText(links[0], 'Link 1'));
    expect(textInLinks[0].innerHTML).toStrictEqual('Link 1');
    expect(textInLinks[1].innerHTML).toStrictEqual('Link 1');

  });
});