import client from '../notionClient';
import { DocumentDatabaseItem } from '../../types';
import returnPlainText from '../returnPlainText';

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
    return {
      title: value.properties.Name.title[0].plain_text,
      id: value.id,
      prettyLink: value.properties['Pretty Link'] ? returnPlainText(value.properties['Pretty Link'].rich_text) : undefined,
    };
  });

  return items;
}

export default getDocumentDatabaseBlocks;