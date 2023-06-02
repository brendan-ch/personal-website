import { render, screen, waitFor } from '@testing-library/react';
import ImageWithFadeIn from "./ImageWithFadeIn";
import '@testing-library/jest-dom';

// Component tests for the ImageWithFadeIn component
describe('ImageWithFadeIn', () => {
  it('renders an image without erroring', () => {
    // Render the element
    render(<ImageWithFadeIn
      src="/link-preview-image.png"
      alt="Testing Image"
    />);

    // Expect there to be an image
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  // No need to test whether props work, hopefully Next.JS tests their
  // image component
  
  // Ideally would also test whether opacity changes,
  // but not possible to simulate `onLoadingComplete` prop
  // without real browser
});