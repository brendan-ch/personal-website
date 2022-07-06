import { updateBlocks } from '../__mocks__/@notionhq/client';
import s3Client from './aws/S3Client';
import updateImageBlocks from './updateImageBlocks';

const mockBlocks: any[] = [
  {
    type: 'image',
    image: {
      type: 'file',
      file: {
        url: 'https://image-link-1.com',
      },
    },
    id: '0',
  },
  {
    type: 'image',
    image: {
      type: 'file',
      file: {
        url: 'https://image-link-2.com',
      },
    },
    id: '1',
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
  updateBlocks.mockClear();
  (s3Client.send as jest.Mock<any, any>).mockClear();
});

describe('updateImageBlocks', () => {
  it('Uploads image blocks and writes them back to Notion', async () => {
    const updated = await updateImageBlocks(mockBlocks);
    expect(updated).toHaveLength(2);

    // Test function calls
    expect(s3Client.send).toHaveBeenCalledTimes(2);
    expect(updateBlocks).toHaveBeenCalledTimes(2);
  });
});