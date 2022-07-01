import { render, screen } from '@testing-library/react';
import Database from '../../components/Database';
import { DatabaseItem } from '../../types';

describe('Database', () => {
  it('Renders a blank database', () => {
    render(<Database items={[]} />);
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
    expect(container).toBeDefined();
    expect(container.childElementCount).toBe(items.length);
  });
});