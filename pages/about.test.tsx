import { render } from '@testing-library/react';
import About from './about.page';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

/* eslint-disable-next-line */
jest.mock('react-markdown', () => ({ children }: any) => (
  <div>
    {children}
  </div>
));

jest.mock('next/router');
(useRouter as jest.Mock<any, any>).mockImplementation(() => ({
  asPath: '',
}));


const mockContent = `
# Heading 1

## Heading 2

### Heading 3

Paragraph
`

describe('About', () => {

  it('Renders the page', () => {
    const { container } = render(<About
      imageAspectRatio={null}
      content={mockContent}
      id="about"
      title="About Me"
      description="About me"
      previewImage={null}  
      coverImage={null}
      tags={null}
      prefix=""
    />);
    expect(container).toBeInTheDocument();
  });
});