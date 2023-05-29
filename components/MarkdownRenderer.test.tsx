import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarkdownRenderer from './MarkdownRenderer';

jest.mock('remark-unwrap-images', () => {});
jest.mock('unist-util-visit', () => {});
jest.mock('hast-util-raw', () => {});
jest.mock('rehype-raw', () => {});

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
  pathname: '/',
}));

/* eslint-disable-next-line */
jest.mock('react-markdown', () => ({ children }: any) => (
  <div>
    {children}
  </div>
));

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
