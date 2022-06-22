import { Client } from '@notionhq/client';
import { DatabaseItem } from '../../types';

const client = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Get a database item object for a specific page.
 * @param pageId
 */
async function getPageProperties(pageId: string): Promise<DatabaseItem | null> {
  const response: any = await client.pages.retrieve({
    page_id: pageId,
  });

  if (!response.properties.Published.checkbox) {
    return null;
  }

  // Return a database item
  let description = '';
  response.properties.Description.rich_text.map((textItem: any) => {
    description += textItem.text.content;
  });

  let imageLink = null;
    if (response.properties['Preview Image'].files && response.properties['Preview Image'].files.length > 0) {
      if (response.properties['Preview Image'].files[0].type === 'file') {
        imageLink = response.properties['Preview Image'].files[0].file.url;
      } else {
        imageLink = response.properties['Preview Image'].files[0].external.url;
      }
    }

  return {
    title: response.properties.Name.title[0].plain_text,
    id: response.id,
    tags: response.properties['Tags'].multi_select.map((item: any) => item.name),
    imageLink,
    description,
  };
}

export default getPageProperties;