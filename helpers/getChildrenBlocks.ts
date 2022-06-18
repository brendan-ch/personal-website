import { Client } from '@notionhq/client';
import { MAX_RECURSION_DEPTH, PAGE_SIZE } from './Constants';

// Call Notion endpoint
const client = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Recursively get children blocks from a Notion block.
 * @param blockId
 * @param blockObj
 * @returns An array of blocks containing their respective children,
 * unless `blockObj` is provided. In that case, blocks are nested in the
 * `children` property of the `blockObj`.
 * @throws If the Notion API call fails.
 */
async function getChildrenBlocks(blockId: string, depth?: number, blockObj?: any) {
  if (!depth) depth = 0;
  if (depth > MAX_RECURSION_DEPTH) return;
  
  // Get response
  let response = await client.blocks.children.list({
    block_id: blockId,
    page_size: PAGE_SIZE,
  });
  let blocks = response.results;

  // If cursor detected, loop until all blocks received
  while (response.has_more && response.next_cursor) {
    // Loop
    response = await client.blocks.children.list({
      block_id: blockId,
      page_size: PAGE_SIZE,
      start_cursor: response.next_cursor,
    });
    blocks.concat(response.results);
  }

  // Loop through children and recursively get child blocks
  for (let i = 0; i < blocks.length; i++) {
    // @ts-ignore
    if (blocks[i].has_children) {
      // Recurse
      await getChildrenBlocks(blocks[i].id, depth + 1, blocks[i]);
    }
  }


  // Return block objects
  if (!blockObj) {
    return blocks;
  } else {
    blockObj.children = blocks;
  }
}

export default getChildrenBlocks;