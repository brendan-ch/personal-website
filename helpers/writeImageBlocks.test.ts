import { updateBlocks } from '../__mocks__/@notionhq/client';
import writeImageBlocks from './writeImageBlocks';

beforeEach(() => {
  updateBlocks.mockReset();
});
describe('writeImageBlocks', () => {
  it('Calls the `client.blocks.update` method', () => {
    writeImageBlocks([
      {
        blockId: '0',
        imageLink: 'https://image.link',
        caption: [],
      },
    ]);

    expect(updateBlocks).toHaveBeenCalled();
  });
});