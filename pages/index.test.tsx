import { render } from '@testing-library/react';
import Projects from './index.page';
import { DatabaseItem } from '../types';
import '@testing-library/jest-dom';

describe('Projects', () => {
  const dbItems: DatabaseItem[] = [
    {
      title: 'Example Database Item',
      tags: ['testing'],
      id: '1',
    }
  ];
  
  it('Renders the page', () => {
    const { container } = render(<Projects dbItems={dbItems} />);
    expect(container).toBeInTheDocument();
  });
});
