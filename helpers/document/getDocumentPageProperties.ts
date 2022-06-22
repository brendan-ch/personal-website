import { Client } from '@notionhq/client';
import { DocumentDatabaseItem } from '../../types';
import { ADDITIONAL_DOCS_DATABASE_ID } from '../Constants';

const client = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Get a database item object for a specific page.
 * @param prettyLink
 */
async function getDocumentPageProperties(prettyLink: string): Promise<DocumentDatabaseItem | null> {
  const dbResponse = await client.databases.query({
    database_id: ADDITIONAL_DOCS_DATABASE_ID,
    filter: {
      property: 'Pretty Link',
      rich_text: {
        equals: prettyLink,
      },
    },
  });
  if (dbResponse.results.length === 0) {
    return null;
  }

  const response: any = dbResponse.results[0];

  return {
    title: response.properties.Name.title[0].plain_text,
    id: response.id,
    prettyLink,
  };
}

export default getDocumentPageProperties;