import { MAX_RECURSION_DEPTH } from './Constants';
import getChildrenBlocks from './getChildrenBlocks';

describe('getChildrenBlocks', () => {
  it('Recursively gets children blocks', async () => {
    const result = await getChildrenBlocks('0');
    expect(result).toBeDefined();
  });

  it('Returns nothing if recursion depth exceeded', async () => {
    const result = await getChildrenBlocks('0', MAX_RECURSION_DEPTH + 1);
    expect(result).toBeUndefined();
  });
});