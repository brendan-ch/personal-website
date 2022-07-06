import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { DatabaseItem, UpdatedDatabaseItem } from '../../types';
import { BUCKET_NAME, REGION } from '../Constants';
import s3Client from './S3Client';

/**
 * Upload preview and cover images from the provided items to AWS.
 * Returns a list of `UpdatedDatabaseItem` objects.
 * @param items
 */
async function uploadPreviewImages(items: DatabaseItem[]): Promise<UpdatedDatabaseItem[]> {
  let updated: UpdatedDatabaseItem[] = [];

  const itemsWithImage = items.filter((item) => 
    (item.imageLink && !item.imageLink.startsWith(`https://${BUCKET_NAME}`))
    || (item.coverImageLink && !item.coverImageLink.startsWith(`https://${BUCKET_NAME}`))
  );

  // Use regular for loop to avoid 429 errors
  for (let i = 0; i < itemsWithImage.length; i++) {
    try {
      const item = itemsWithImage[i];

      let saveAsPreview = null;
      let saveAsCover = null;

      if (item.imageLink && !item.imageLink.startsWith(`https://${BUCKET_NAME}`)) {
        // Download the image
        const response = await fetch(item.imageLink, {
          method: 'GET',
        });
        const contentType = response.headers.get('Content-Type');
        if (!contentType?.startsWith('image/')) {
          // Throw an error
          throw new Error('Invalid content type on response');
        }
  
        saveAsPreview = contentType.substring(contentType.indexOf('/') + 1);
  
        const arrayBuffer = await response.arrayBuffer();
        const params: PutObjectCommandInput = {
          Bucket: BUCKET_NAME,
          Key: `preview/${item.id}/preview.${saveAsPreview}`,
          Body: Buffer.from(arrayBuffer),
          ACL: 'public-read',
        };
  
        // Overwrite if necessary
        await s3Client.send(new PutObjectCommand(params));
        // Successfully put object in S3 bucket
      }

      if (item.coverImageLink && !item.coverImageLink.startsWith(`https://${BUCKET_NAME}`)) {
        // Download the image
        const response = await fetch(item.coverImageLink, {
          method: 'GET',
        });
        const contentType = response.headers.get('Content-Type');
        if (!contentType?.startsWith('image/')) {
          // Throw an error
          throw new Error('Invalid content type on response');
        }
  
        saveAsCover = contentType.substring(contentType.indexOf('/') + 1);
  
        const arrayBuffer = await response.arrayBuffer();
        const params: PutObjectCommandInput = {
          Bucket: BUCKET_NAME,
          Key: `preview/${item.id}/cover.${saveAsCover}`,
          Body: Buffer.from(arrayBuffer),
          ACL: 'public-read',
        };
  
        // Overwrite if necessary
        await s3Client.send(new PutObjectCommand(params));
        // Successfully put object in S3 bucket
      }



      // Add to updated
      updated.push({
        imageLink: saveAsPreview ? `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/preview/${item.id}/preview.${saveAsPreview}` : undefined,
        coverImageLink: saveAsCover ? `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/preview/${item.id}/cover.${saveAsCover}` : undefined,
        pageId: item.id,
      });
    } catch(e: any) {
      // Failed to update an item
      // Log and manually resolve later
      // console.error(e);
      throw new Error(e);
    }
  }

  return updated;
}

export default uploadPreviewImages;