import getProjectPageProperties from './getProjectPageProperties';

describe('getProjectPageProperties', () => {
  const mockPrettyLink = 'pretty-link';

  it('Gets page properties', async () => {
    const item = await getProjectPageProperties(mockPrettyLink);
    expect(item).not.toBeNull();
  });
});