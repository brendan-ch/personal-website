import { updateBlocks } from '../__mocks__/@notionhq/client';
import writeImageBlocks from './writeImageBlocks';

describe('writeImageBlocks', () => {
  it('Calls the `client.blocks.update` method', () => {
    writeImageBlocks([
      {
        blockId: '0',
        imageLink: 'https://image.link',
        caption: [],
      },
    ]);

    expect(updateBlocks).toBeCalledTimes(1);
  });
});