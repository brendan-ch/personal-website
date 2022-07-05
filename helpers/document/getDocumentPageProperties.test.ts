import getDocumentPageProperties from './getDocumentPageProperties';

/**
 * @todo test null return value when filter checking implemented in mock
 */
describe('getDocumentPageProperties', () => {
  const mockPrettyLink = 'pretty-link';

  // it('Returns null if page not found', async () => {
  //   const item = await getDocumentPageProperties('invalid-link');
  //   expect(item).toBeNull();
  // });

  it('Gets page properties', async () => {
    const item = await getDocumentPageProperties(mockPrettyLink);
    expect(item).not.toBeNull();
  });
});