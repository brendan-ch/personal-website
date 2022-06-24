import client from './notionClient';
import { UpdatedBlockItem } from '../types';

/**
 * Write preview images back to Notion.
 */
export default async function writeImageBlocks(updatedItems: UpdatedBlockItem[]) {
  for (let i = 0; i < updatedItems.length; i++) {
    const item = updatedItems[i];

    try {
      await client.blocks.update({
        block_id: item.blockId,
        image: {
          caption: item.caption,
          external: {
            url: item.imageLink,
          },
        },
      });
    } catch(e) {
      console.error(e);
    }
  }
}