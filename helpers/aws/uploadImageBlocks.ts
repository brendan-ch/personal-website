import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { UpdatedBlockItem } from "../../types";
import { BUCKET_NAME, REGION } from "../Constants";
import s3Client from "./S3Client";

/**
 * Takes an array of blocks, and uploads images to AWS.
 * Returns an array of block objects to update.
 * @param items
 * @returns
 */
export default async function uploadImageBlocks(blocks: any[]): Promise<UpdatedBlockItem[]> {
  let updated: UpdatedBlockItem[] = [];

  const blocksWithImage = blocks.filter((block) => block.type === 'image' && block.image.type === 'file');

  // Use regular for loop
  for (let i = 0; i < blocksWithImage.length; i++) {
    try {
      const blockContent = blocksWithImage[i].image;
      const id = blocksWithImage[i].id;

      // Download the image
      const response = await fetch(blockContent.file.url, {
        method: 'GET',
      });
      const contentType = response.headers.get('Content-Type');
      if (!contentType?.startsWith('image/')) {
        // Throw an error
        throw new Error('Invalid content type on response');
      }

      const saveAs = contentType.substring(contentType.indexOf('/') + 1);
      const arrayBuffer = await response.arrayBuffer();
      const params: PutObjectCommandInput = {
        Bucket: BUCKET_NAME,
        Key: `blocks/${id}/image.${saveAs}`,
        Body: Buffer.from(arrayBuffer),
        ACL: 'public-read',
      };

      await s3Client.send(new PutObjectCommand(params));

      // Add to updated
      updated.push({
        imageLink: `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/blocks/${id}/image.${saveAs}`,
        blockId: id,
        caption: blockContent.caption,
      });
      
    } catch(e) {
      // Log and manually resolve later
      console.error(e);
    }
  }

  return updated;
}