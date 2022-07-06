import { render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';
import '@testing-library/jest-dom';

describe('PageHeader', () => {
  it('Renders with above and below text', () => {
    render(<PageHeader aboveText="Above" belowText="Below" />);

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
  });

  it('Renders with back button and link', () => {
    render(
      <PageHeader
        aboveText="Above"
        belowText="Below"
        includeBackButton
        backButtonHref="/about"
      />
    );

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);

    const backButton = screen.getByRole('link');
    expect(backButton).toBeInTheDocument();
  });
  
  it('Renders with back button and without link', () => {
    render(
      <PageHeader
        aboveText="Above"
        belowText="Below"
        includeBackButton
      />
    );

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);

    const backButton = screen.getByRole('link');
    expect(backButton).toBeInTheDocument();
  });
});