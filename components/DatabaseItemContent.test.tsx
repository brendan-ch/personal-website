import { render, screen } from '@testing-library/react';
import DatabaseItemContent from './DatabaseItemContent';
import '@testing-library/jest-dom';

describe('DatabaseItemContent', () => {
  it('Renders an error message', () => {
    render(<DatabaseItemContent
      error="We couldn't find the page you were looking for."
    />);

    expect(screen.getByText("We couldn't find the page you were looking for.")).toBeInTheDocument();
  });

  it('Renders the cover image', () => {
    render(<DatabaseItemContent
      coverImageLink="https://image.link"
    />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});