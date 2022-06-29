import { getPlaiceholder } from 'plaiceholder';

export default async function addImageBlockPlaceholders(blocks: any[]) {
  const blocksWithPlaceholders = await Promise.all(blocks.map(async (block: any) => {
    if (block.type !== 'image' || block.image.type !== 'external') return block;

    const url = block.image.external.url;

    const { base64, img } = await getPlaiceholder(url);
    console.log(base64);
    return {
      ...block,
      image: {
        ...block.image,
        placeholder: base64,
      }
    };
  }));

  return blocksWithPlaceholders;
}