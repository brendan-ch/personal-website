import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { PageData, PageQuery } from '../types';
import { CONTENT_DIRECTORY } from './Constants';

/**
 * Get information about a page.
 * @param query
 */
export default async function getPage(query: PageQuery): Promise<PageData> {
  const fileDirectory = query.prefix ? path.join(CONTENT_DIRECTORY, query.prefix, `${query.id}.md`) : path.join(CONTENT_DIRECTORY, `${query.id}.md`);
  const fileContents = await readFile(fileDirectory);

  // Parse metadata
  const matterResult: any = matter(fileContents);

  let content = null;
  if (query.withContent) {
    content = matterResult.content;
  }

  return {
    id: query.id,
    prefix: query.prefix || null,
    content,
    ...matterResult.data,
  }
}