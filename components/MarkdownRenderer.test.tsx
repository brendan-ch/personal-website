import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import MarkdownRenderer from './MarkdownRenderer';

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
    render(<MarkdownRenderer content={content} />);
  });
});
