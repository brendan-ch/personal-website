import { render, screen, waitFor } from '@testing-library/react';
import ImageWithFadeIn from "../../components/ImageWithFadeIn";
import '@testing-library/jest-dom';

// Component tests for the ImageWithFadeIn component
describe('ImageWithFadeIn', () => {
  it('renders an image without erroring', () => {
    // Render the element
    const { getByRole } = render(<ImageWithFadeIn
      src="/link-preview-image.png"
      alt="Testing Image"
      layout="fill"
    />);

    // Expect there to be an image
    expect(getByRole('img')).toBeInTheDocument();
  });

  it('sets initial class to invisible', async () => {
    // Instead of checking for state change
    // Check for whether the image styling changes
    const { getByRole } = render(<ImageWithFadeIn
      src="/link-preview-image.png"
      alt="Testing Image"
      layout="fill"
    />);

    // Wait for the CSS to change
    await waitFor(() => expect(getByRole('img')).toHaveClass('invisible'));
  });
});