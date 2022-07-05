import { databaseQuery } from '../../__mocks__/@notionhq/client';
import getDocumentDatabaseBlocks from './getDocumentDatabaseBlocks';

describe('getDocumentDatabaseBlocks', () => {
  it('Returns an array of DatabaseItem\'s', async () => {
    const items = await getDocumentDatabaseBlocks('1');
    expect(databaseQuery).toHaveBeenCalled();
    expect(items.length).toBeGreaterThan(0);
  });
});