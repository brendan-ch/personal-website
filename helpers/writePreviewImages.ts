import client from './notionClient';
import { UpdatedDatabaseItem } from '../types';

/**
 * Write preview images back to Notion.
 */
export default async function writePreviewImages(updatedItems: UpdatedDatabaseItem[]) {
  for (let i = 0; i < updatedItems.length; i++) {
    const item = updatedItems[i];

    try {
      await client.pages.update({
        page_id: item.pageId,
        properties: {
          'Preview Image': {
            files: [
              {
                type: 'external',
                external: {
                  url: item.imageLink,
                },
                name: 'image',
              }
            ],
          },
        },
      });
    } catch(e) {
      console.error(e);
    }
  }
}