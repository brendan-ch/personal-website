import { readFile } from 'fs/promises';
import path from 'path';
import { PageData, PageQuery } from '../types';

/**
 * Get information about a page.
 * @param query
 */
export default async function getPage(query: PageQuery): Promise<PageData> {
  // Filter generated data
  // const data = await readFile(path.join(process.cwd(), 'scripts', 'output', 'data.json'));
  // const parsed: any = JSON.parse(data.toString());
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


  // const fileDirectory = query.prefix ? path.join(CONTENT_DIRECTORY, query.prefix, `${query.id}.md`) : path.join(CONTENT_DIRECTORY, `${query.id}.md`);
  // const fileContents = await readFile(fileDirectory);

  // // Parse metadata
  // const matterResult: any = matter(fileContents);

  // let content = null;
  // if (query.withContent) {
  //   content = matterResult.content;
  // }

  // return {
  //   id: query.id,
  //   prefix: query.prefix || null,
  //   content,
  //   ...matterResult.data,
  // }
}