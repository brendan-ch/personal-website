import { databaseQuery } from '../../__mocks__/@notionhq/client';
import { ADDITIONAL_DOCS_DATABASE_ID } from '../Constants';
import getDocumentDatabaseBlocks from './getDocumentDatabaseBlocks';

describe('getDocumentDatabaseBlocks', () => {
  it('Returns an array of DatabaseItem\'s', async () => {
    const items = await getDocumentDatabaseBlocks(ADDITIONAL_DOCS_DATABASE_ID);
    expect(databaseQuery).toHaveBeenCalled();
    expect(items.length).toBeGreaterThan(0);
  });
});