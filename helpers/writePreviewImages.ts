import client from './notionClient';
import { UpdatedDatabaseItem } from '../types';

/**
 * Write preview and cover images back to Notion.
 */
export default async function writePreviewImages(updatedItems: UpdatedDatabaseItem[]) {
  for (let i = 0; i < updatedItems.length; i++) {
    const item = updatedItems[i];

    const propertyObj: any = {};

    if (item.imageLink) {
      propertyObj['Preview Image'] = {
        files: [
          {
            type: 'external',
            external: {
              url: item.imageLink,
            },
            name: 'image',
          }
        ],
      };
    }

    if (item.coverImageLink) {
      propertyObj['Cover Image'] = {
        files: [
          {
            type: 'external',
            external: {
              url: item.coverImageLink,
            },
            name: 'image',
          }
        ],
      };
    }

    try {
      await client.pages.update({
        page_id: item.pageId,
        properties: propertyObj,
      });
    } catch(e) {
      console.error(e);
    }
  }
}