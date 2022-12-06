import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

jest.mock('remark-unwrap-images', () => {});
jest.mock('unist-util-visit', () => {});
jest.mock('hast-util-raw', () => {});
jest.mock('rehype-raw', () => {});

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
    render(<MarkdownRenderer content={content} allImages={[]} />);
  });
});
