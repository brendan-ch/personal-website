import { Client } from '@notionhq/client';
import { DocumentDatabaseItem } from '../types';

const client = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Get all database items from the Project database that match the filter object.
 * Unlike `getChildrenBlocks`, does not return children blocks from each page.
 * @param databaseId
 */
 async function getDocumentDatabaseBlocks(databaseId: string, filter?: any) {
  const response = await client.databases.query({
    database_id: databaseId,
    filter,
  });

  
  const items: DocumentDatabaseItem[] = response.results.map((value: any) => {
    console.log(value.properties);
    return {
      title: value.properties.Name.title[0].plain_text,
      id: value.id,
      // prettyLink: value.properties['Pretty Link'] ? value.properties['Pretty Link']
    };
  });

  return items;
}

export default getDocumentDatabaseBlocks;