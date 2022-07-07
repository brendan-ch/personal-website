import { PROJECTS_DATABASE_ID } from './Constants';
import getProjectPageProperties from './getPageProperties';

describe('getProjectPageProperties', () => {
  const mockPrettyLink = 'pretty-link';

  it('Gets page properties', async () => {
    const item = await getProjectPageProperties(PROJECTS_DATABASE_ID, mockPrettyLink);
    expect(item).not.toBeNull();
  });
});