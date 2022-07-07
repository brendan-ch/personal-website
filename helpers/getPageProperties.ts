import client from './notionClient';
import { DatabaseItem } from '../types';
import { PROJECTS_DATABASE_ID } from './Constants';
import getDatabaseItemFromResponse from './getDatabaseItemFromResponse';

/**
 * Get a database item object for a specific page.
 * @param prettyLink
 */
async function getPageProperties(dbId: string, prettyLink: string): Promise<DatabaseItem | null> {
  const dbResponse = await client.databases.query({
    database_id: dbId,
    filter: {
      and: [
        {
          property: 'Pretty Link',
          rich_text: {
            equals: prettyLink
          },
        },
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  if (dbResponse.results.length === 0) {
    return null;
  }

  const response: any = dbResponse.results[0];

  // Return a database item
  return getDatabaseItemFromResponse(response);
}

export default getPageProperties;