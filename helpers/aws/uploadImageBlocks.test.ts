import s3Client from './S3Client';
import uploadImageBlocks from './uploadImageBlocks';

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
  (s3Client.send as jest.Mock<any, any>).mockClear();
});

describe('uploadImageBlocks', () => {
  it('Uploads the image blocks and returns the correct value', async () => {
    const updated = await uploadImageBlocks(mockBlocks);
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
      await uploadImageBlocks(mockBlocks)
    }).rejects.toBeDefined();
  });
});