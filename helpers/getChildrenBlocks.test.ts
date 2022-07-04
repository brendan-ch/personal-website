import getChildrenBlocks from './getChildrenBlocks';

describe('getChildrenBlocks', () => {
  it('Recursively gets children blocks', async () => {
    const result = await getChildrenBlocks('0');
    console.log(result);
  });
});