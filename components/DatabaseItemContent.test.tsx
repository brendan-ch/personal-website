import { render, screen } from '@testing-library/react';
import DatabaseItemContent from './DatabaseItemContent';
import '@testing-library/jest-dom';

/* eslint-disable-next-line */
jest.mock('react-markdown', () => ({ children }: any) => (
  <div>
    {children}
  </div>
));

describe('DatabaseItemContent', () => {
  // it('Renders an error message', () => {
  //   render(<DatabaseItemContent />);

  //   expect(screen.getByText("We couldn't find the page you were looking for.")).toBeInTheDocument();
  // });

  it('Renders the cover image', () => {
    render(<DatabaseItemContent
      content={null}
      id="test"
      title="Testing"
      description={null}
      previewImage={null}
      tags={null}
      prefix="work"
      coverImage="https://image.link"
    />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});