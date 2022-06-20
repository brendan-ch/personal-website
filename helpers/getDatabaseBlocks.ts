import { Client } from '@notionhq/client';
import { DatabaseItem } from '../types';

const client = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Get all database items that match the filter object.
 * Unlike `getChildrenBlocks`, does not return children blocks from each page.
 * @param databaseId
 */
async function getDatabaseBlocks(databaseId: string, filter?: any) {
  const response = await client.databases.query({
    database_id: databaseId,
    filter,
  });

  const items: DatabaseItem[] = response.results.map((value: any) => {
    let description = '';
    value.properties.Description.rich_text.map((textItem: any) => {
      description += textItem.text.content;
    });

    return {
      title: value.properties.Name.title[0].plain_text,
      description,
      imageLink: value.properties['Preview Image'].files && value.properties['Preview Image'].files.length > 0
        ? value.properties['Preview Image'].files[0].file.url
        : null,
      id: value.id,
      tags: value.properties['Tags'].multi_select.map((item: any) => item.name),
    };
  });

  return items;
}

export default getDatabaseBlocks;