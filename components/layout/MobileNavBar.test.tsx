import { render, screen } from '@testing-library/react';
import MobileNavBar from './MobileNavBar';
import '@testing-library/jest-dom';

describe('MobileNavBar', () => {
  it('Renders without passing selected', () => {
    render(<MobileNavBar />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('Renders with passing selected', () => {
    render(<MobileNavBar selected="Featured" />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});