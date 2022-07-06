import { DatabaseItem } from '../../types';
import s3Client from './S3Client';
import uploadPreviewImages from './uploadPreviewImages';

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
  (s3Client.send as jest.Mock<any, any>).mockClear();
});

describe('uploadPreviewImages', () => {
  it('Doesn\'t upload images if nothing passed', async () => {
    const updated = await uploadPreviewImages([]);
    expect(updated.length).toBe(0);
    expect(s3Client.send).not.toHaveBeenCalled();
  });

  it('Uploads the preview images and returns the correct values', async () => {
    const updated = await uploadPreviewImages(mockDatabaseItems);
    expect(updated.length).toBeGreaterThan(0);
    expect(s3Client.send).toHaveBeenCalledTimes(2);
  });

  it('Throws an error if invalid response type', async () => {
    global.fetch = jest.fn(() => new Promise((res, rej) => {
      // @ts-ignore
      res({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(1)),
        // @ts-ignore
        headers: {
          get: () => 'notimage/png',
        },
      });
    }));

    // Expect promise to reject
    expect(async () => {
      await uploadPreviewImages(mockDatabaseItems)
    }).rejects.toBeDefined();
  });
});