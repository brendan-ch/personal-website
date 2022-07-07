import client from './notionClient';
import { DatabaseItem } from '../types';
import getDatabaseItemFromResponse from './getDatabaseItemFromResponse';

/**
 * Get all database items from the specified database that match the filter object.
 * Unlike `getChildrenBlocks`, does not return children blocks from each page.
 * @param filter
 */
async function getDatabaseItems(dbId: string, filter?: any) {
  const response = await client.databases.query({
    database_id: dbId,
    filter,
  });

  const items: DatabaseItem[] = await Promise.all(response.results.map(async (value: any) => {
    return getDatabaseItemFromResponse(value);
  }));

  return items;
}

export default getDatabaseItems;