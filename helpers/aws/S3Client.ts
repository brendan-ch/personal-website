import { S3Client } from '@aws-sdk/client-s3';
import { REGION } from '../Constants';

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_SDK_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SDK_SECRET_ACCESS_KEY!,
  },
});
export default s3Client;