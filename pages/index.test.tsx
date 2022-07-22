import { render } from '@testing-library/react';
import Projects from './index.page';
import '@testing-library/jest-dom';

describe('Projects', () => {
  // const dbItems: PageData[] = [
  //   {
  //     title: 'Example Database Item',
  //     tags: ['testing'],
  //     id: '1',
  //     content: null,
  //     previewImage: null,
  //     coverImage: null,
  //     description: null,
  //     prefix: 'work',
  //   }
  // ];
  
  it('Renders the page', () => {
    const { container } = render(<Projects />);
    expect(container).toBeInTheDocument();
  });
});
