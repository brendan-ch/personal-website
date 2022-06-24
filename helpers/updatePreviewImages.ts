// To-do: write convenience function that takes array of database items,
// uploads preview images to AWS, writes preview images back to Notion,
// and returns array of database items with updated images

import { DatabaseItem } from '../types';
import uploadPreviewImages from './aws/uploadPreviewImages';
import { BUCKET_NAME } from './Constants';
import writePreviewImages from './writePreviewImages';

export default async function updatePreviewImages(items: DatabaseItem[]) {
  const copy: DatabaseItem[] = JSON.parse(JSON.stringify(items));

  // Upload to AWS
  const updated = await uploadPreviewImages(items);
  // Write back to Notion
  await writePreviewImages(updated);

  // Write to memory
  copy.forEach((item) => {
    if (item.imageLink && !item.imageLink?.startsWith(`https://${BUCKET_NAME}`)) {
      // Look for new image URL
      // Pretty much guaranteed to be 0
      const updatedItemIndex = updated.findIndex((value) => value.pageId === item.id);
      
      if (updated[updatedItemIndex]?.imageLink) {
        // Update item
        item.imageLink = updated[updatedItemIndex].imageLink;
      }

      updated.splice(updatedItemIndex, 1);
    }
  });

  return copy;
}