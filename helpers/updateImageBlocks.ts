// To-do: write convenience function that takes array of blocks,
// uploads images to AWS, writes image blocks back to Notion,
// and returns array with updated images

import addImageBlockPlaceholders from './addImageBlockPlaceholders';
import uploadImageBlocks from './aws/uploadImageBlocks';
import writeImageBlocks from './writeImageBlocks';

/**
 * Returns a deep copy of the Notion block array, with
 * Notion-hosted image links replaced with AWS permalinks. Also adds image block placeholders.
 * @param blocks
 * @returns
 */
export default async function updateImageBlocks(blocks: any[]) {
  let copy: any[] = JSON.parse(JSON.stringify(blocks));

  const updated = await uploadImageBlocks(blocks);
  if (updated.length < 1) {
    // copy = await addImageBlockPlaceholders(copy);

    return copy;
  }

  await writeImageBlocks(updated);

  // Return updated blocks in memory
  // Serialize and return
  
  // Based on `updated` array, update the image inside each block

  // Since updates happen in order of blocks, calling updated.find is pretty much
  // guarenteed to return the first element, if elements are removed from
  // `updated` after updating
  copy.forEach((block) => {
    if (block.type === 'image' && block.image.type === 'file') {
      // Look for new image URL
      const updatedItemIndex = updated.findIndex((value) => value.blockId === block.id);
      if (updated[updatedItemIndex]?.imageLink) {
        // Update block
        block.image.type = 'external';
        block.image.external = {
          url: updated[updatedItemIndex].imageLink,
        };

        delete block.image.file;
      }
      updated.splice(updatedItemIndex, 1);
    }
  });

  // copy = await addImageBlockPlaceholders(copy);

  return copy;
}