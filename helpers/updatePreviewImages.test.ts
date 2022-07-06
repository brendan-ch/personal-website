import { DatabaseItem } from '../types';
import { updatePages } from '../__mocks__/@notionhq/client';
import s3Client from './aws/S3Client';
import updatePreviewImages from './updatePreviewImages';

const mockDatabaseItems: DatabaseItem[] = [
  {
    title: 'Item #1',
    id: '0',
    imageLink: 'https://image-link-1.com',
  },
  {
    title: 'Item #2',
    id: '1',
    imageLink: 'https://image-link-2.com',
  },
];

s3Client.send = jest.fn();

// For this set of tests, fetch will return an image
global.fetch = jest.fn(() => new Promise((res) => {
  res({
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(1)),
    // @ts-ignore
    headers: {
      get: () => 'image/png',
    },
  });
}));

beforeEach(() => {
  updatePages.mockClear();
  (s3Client.send as jest.Mock<any, any>).mockClear();
});

describe('updateImageBlocks', () => {
  it('Uploads image blocks and writes them back to Notion', async () => {
    const updated = await updatePreviewImages(mockDatabaseItems);
    expect(updated).toHaveLength(2);

    // Test function calls
    expect(s3Client.send).toHaveBeenCalledTimes(2);
    expect(updatePages).toHaveBeenCalledTimes(2);
  });
});