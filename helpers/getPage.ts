import { PageData, PageQuery } from '../types';

/**
 * Get information about a page.
 * @param query
 */
export default async function getPage(query: PageQuery): Promise<PageData> {
  // Filter generated data
  // @ts-ignore
  const parsed = require('../scripts/output/data.json');

  // @todo fix script for about page
  // @ts-ignore
  const prefixData: PageData[] = parsed[query.prefix];

  // Filter parsed data
  const correctPage = prefixData.find((page) => page.id === query.id);
  if (correctPage && !query.withContent) {
    correctPage.content = null;
  }

  return correctPage!;
}