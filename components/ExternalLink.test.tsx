import ExternalLink from './ExternalLink';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('ExternalLink', () => {
  it('Renders a link with the passed text and url', () => {
    render(<ExternalLink
      name="Google"
      url="https://google.com"
    />);

    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://google.com');
  });
});