import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

import MarkdownRenderer from './MarkdownRenderer';

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

const content = `
# Heading 1

## Heading 2

### Heading 3

Paragraph
`

describe('MarkdownRenderer', () => {
  it('Renders the component with Markdown', () => {
    render(<MarkdownRenderer content={content} />);
  });
});
