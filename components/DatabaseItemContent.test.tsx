import { render, screen } from '@testing-library/react';
import DatabaseItemContent, { CalloutInformation } from './DatabaseItemContent';
import '@testing-library/jest-dom';

jest.mock('remark-unwrap-images', () => {});
jest.mock('unist-util-visit', () => {});
jest.mock('hast-util-raw', () => {});
jest.mock('rehype-raw', () => {});

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

  it('Renders title and tags', () => {
    render(<DatabaseItemContent
      content={null}
      id="test"
      title="Testing"
      description={null}
      previewImage={null}
      tags={['Tag 1', 'Tag 2']}
      prefix="work"
      links={[
        {
          name: 'Google',
          url: 'https://google.com',
        },
      ]}
      date={null}
      allImages={[]}
      wideImages={false}
    />);

    expect(screen.getByText('Testing')).toBeInTheDocument();

    // Renders at least one text element with tags
    const tags = screen.getAllByText(/.*Tag 1.*/);
    expect(tags.length).toBeGreaterThanOrEqual(1);

    const links = screen.getAllByRole('link', {
      
    });
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});

describe('CalloutInformation', () => {
  it('Renders props correctly', () => {
    render(
      <CalloutInformation
        title="Hello World"
        description="Test Description"
      />
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});