import { render, screen } from '@testing-library/react';
import MobileNavMenu, { MobileNavMenuButton } from './MobileNavMenu';
import '@testing-library/jest-dom';

describe('MobileNavMenuButton', () => {
  it('Renders a link to specifed href', () => {
    render(<MobileNavMenuButton
      text="Testing"
      href="/test-link"
    />);

    const a = screen.getByRole('link');
    expect(a).toHaveAttribute('href', '/test-link');
  });

  it('Renders the correct text', () => {
    render(<MobileNavMenuButton
      text="Testing"
      href="/test-link"
    />);

    const text = screen.getByText("Testing");
    expect(text).toBeInTheDocument();
  });
});

describe('MobileNavMenu', () => {
  it('Renders without passing selected', () => {
    render(<MobileNavMenu />);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('Renders with passing selected', () => {
    render(<MobileNavMenu selected="About Me" />);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});