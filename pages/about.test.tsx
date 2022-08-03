import { render } from '@testing-library/react';
import About from './about.page';
import '@testing-library/jest-dom';

/* eslint-disable-next-line */
jest.mock('react-markdown', () => ({ children }: any) => (
  <div>
    {children}
  </div>
));


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