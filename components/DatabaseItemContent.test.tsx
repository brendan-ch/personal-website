import { render, screen } from '@testing-library/react';
import DatabaseItemContent from './DatabaseItemContent';
import '@testing-library/jest-dom';

jest.mock('remark-unwrap-images', () => {});
jest.mock('unist-util-visit', () => {});

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
      logo={null}
      content={null}
      id="test"
      title="Testing"
      description={null}
      previewImage={null}
      tags={null}
      prefix="work"
      coverImage={{
        width: 200,
        height: 200,
        imagePath: "https://image.link"
      }}
      links={null}
      date={null}
      type={null}
      allImages={[]}
    />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});