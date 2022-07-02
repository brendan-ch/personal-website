import { render, screen, waitFor } from '@testing-library/react';
import ImageWithFadeIn from "../../components/ImageWithFadeIn";
import '@testing-library/jest-dom';

// Component tests for the ImageWithFadeIn component
describe('ImageWithFadeIn', () => {
  it('renders an image without erroring', () => {
    // Render the element
    render(<ImageWithFadeIn
      src="/link-preview-image.png"
      alt="Testing Image"
      layout="fill"
    />);

    // Expect there to be an image
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('sets initial class to invisible', async () => {
    // Instead of checking for state change
    // Check for whether the image styling changes
    render(<ImageWithFadeIn
      src="/link-preview-image.png"
      alt="Testing Image"
      layout="fill"
    />);

    // Wait for the CSS to change
    await waitFor(() => expect(screen.getByRole('img')).toHaveClass('invisible'));
  });
});