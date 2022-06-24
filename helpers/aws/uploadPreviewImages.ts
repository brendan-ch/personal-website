import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { DatabaseItem, UpdatedDatabaseItem } from '../../types';
import { BUCKET_NAME, REGION } from '../Constants';
import s3Client from './S3Client';

/**
 * Upload files from the provided items to AWS.
 * Returns a list of `UpdatedDatabaseItem` objects.
 * @param items
 */
async function uploadPreviewImages(items: DatabaseItem[]): Promise<UpdatedDatabaseItem[]> {
  let updated: UpdatedDatabaseItem[] = [];

  const itemsWithImage = items.filter((item) => item.imageLink && !item.imageLink.startsWith(`https://${BUCKET_NAME}`));

  // Use regular for loop to avoid 429 errors
  for (let i = 0; i < itemsWithImage.length; i++) {
    try {
      const item = itemsWithImage[i];

      // Download the image
      const response = await fetch(item.imageLink!, {
        method: 'GET',
      });

      const arrayBuffer = await response.arrayBuffer();
      const params: PutObjectCommandInput = {
        Bucket: BUCKET_NAME,
        Key: `${item.id}`,
        Body: Buffer.from(arrayBuffer),
        ACL: 'public-read',
      };

      // Overwrite if necessary
      const result = await s3Client.send(new PutObjectCommand(params));
      // Successfully put object in S3 bucket

      // Add to updated
      updated.push({
        link: `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${item.id}`,
        pageId: item.id,
      });
    } catch(e) {
      // Failed to update an item
      // Log and manually resolve later
      console.error(e);
    }
  }

  console.log(updated);
  return updated;
}

export default uploadPreviewImages;