import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Lightbox from './Lightbox';

describe('Lightbox', () => {
  it('Doesn\'t render an image if no link provided', () => {
    render(
      <Lightbox />
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('Renders an image without the caption', () => {
    render(
      <Lightbox
        visible
        imageLink="/link"
      />
    );

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('alt')).toBeNull();
  });

  it('Renders an image with the caption', () => {
    const caption = 'Test caption';

    render(
      <Lightbox
        visible
        imageLink="/link-"
        caption={caption}
      />
    );

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('alt')).toStrictEqual('Test caption');
  });

  it('Calls `onClose` when clicking in the div', () => {
    const onClose = jest.fn();

    render(
      <Lightbox
        visible
        imageLink="/link"
        onClose={onClose}
      />
    );

    // Click on the div
    fireEvent.click(screen.getByRole('group'));
    expect(onClose).toHaveBeenCalled();
  });
});