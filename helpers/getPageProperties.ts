import { Client } from '@notionhq/client';
import { DatabaseItem } from '../types';

const client = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Get a database item object for a specific page.
 * @param pageId
 */
async function getPageProperties(pageId: string): Promise<DatabaseItem> {
  const response: any = await client.pages.retrieve({
    page_id: pageId,
  });

  console.log(response);

  // Return a database item
  let description = '';
  response.Description.rich_text.map((textItem: any) => {
    description += textItem.text.content;
  });

  return {
    title: response.Name[0].plain_text,
    id: response.id,
    tags: response['Tags'].multi_select.map((item: any) => item.name),
    imageLink: response['Preview Image'].files && response['Preview Image'].files.length > 0
      ? response['Preview Image'].files[0].file.url
      : null,
    description,
  };
}

export default getPageProperties;