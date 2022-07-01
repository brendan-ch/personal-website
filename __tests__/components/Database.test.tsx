import { render, screen } from '@testing-library/react';
import Database from '../../components/Database';
import { DatabaseItem } from '../../types';
import '@testing-library/jest-dom';

describe('Database', () => {
  it('Renders a blank database', () => {
    render(<Database items={[]} />);

    const container = screen.getByRole('list');
    expect(container).toBeInTheDocument();
  });

  it('Renders a database with items', () => {
    // Mock some items
    const items: DatabaseItem[] = [
      {
        title: 'Item #1',
        id: '1',
      },
      {
        title: 'Item #2',
        id: '2',
      },
    ];

    // Check the number of `GalleryItem` children
    render(<Database items={items} />);
    const container = screen.getByRole('list');
    expect(container).toBeInTheDocument();
    expect(container.childElementCount).toBe(items.length);
  });
});