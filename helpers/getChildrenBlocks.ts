import client from './notionClient';
import { MAX_RECURSION_DEPTH, PAGE_SIZE } from './Constants';
import { NotionBlock } from '../types';

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
  let blocks: NotionBlock[] = response.results as NotionBlock[];

  // If cursor detected, loop until all blocks received
  while (response.has_more && response.next_cursor) {
    // Loop
    response = await client.blocks.children.list({
      block_id: blockId,
      page_size: PAGE_SIZE,
      start_cursor: response.next_cursor,
    });
    blocks = blocks.concat(response.results as NotionBlock[]);
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
    blockObj[blockObj.type].children = blocks;
  }
}

export default getChildrenBlocks;