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

  
  const items: DocumentDatabaseItem[] = await Promise.all(response.results.map(async (value: any) => {
    const description = returnPlainText(value.properties['Description'].rich_text);

    let imageLink = null;
    if (value.properties['Preview Image'] && value.properties['Preview Image'].files && value.properties['Preview Image'].files.length > 0) {
      if (value.properties['Preview Image'].files[0].type === 'file') {
        imageLink = value.properties['Preview Image'].files[0].file.url;
      } else {
        imageLink = value.properties['Preview Image'].files[0].external.url;
      }
    }

    let coverImageLink = null;
    if (value.properties['Cover Image'] && value.properties['Cover Image'].files && value.properties['Cover Image'].files.length > 0) {
      if (value.properties['Cover Image'].files[0].type === 'file') {
        coverImageLink = value.properties['Cover Image'].files[0].file.url;
      } else {
        coverImageLink = value.properties['Cover Image'].files[0].external.url;
      }
    }

    return {
      title: value.properties.Name.title[0].plain_text,
      id: value.id,
      description,
      imageLink,
      coverImageLink,
      prettyLink: value.properties['Pretty Link'] ? returnPlainText(value.properties['Pretty Link'].rich_text) : undefined,
    };
  }));

  return items;
}

export default getDocumentDatabaseBlocks;