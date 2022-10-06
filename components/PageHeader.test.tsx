import { render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';
import '@testing-library/jest-dom';

describe('PageHeader', () => {
  it('Renders with below text', () => {
    render(<PageHeader belowText="Below" />);

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(1);
  });
});