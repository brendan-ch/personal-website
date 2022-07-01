import { render, screen } from '@testing-library/react';
import Projects from '../pages';
import { ProjectDatabaseItem } from '../types';

describe('Projects', () => {
  const dbItems: ProjectDatabaseItem[] = [
    {
      title: 'Example Database Item',
      tags: ['testing'],
      id: '1',
    }
  ];
  
  it('renders the page', () => {
    const { container } = render(<Projects dbItems={dbItems} />);
    expect(container).toBeDefined();
  });
});
