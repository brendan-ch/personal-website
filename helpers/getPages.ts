import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { PageData, PageListQuery, PageListResponse, SortOrder } from '../types';
import { CONTENT_DIRECTORY, PAGINATION_LIMIT } from './Constants';
import getPage from './getPage';


/**
 * Get a list of pages.
 * @param query
 * 
 * @todo implement filters
 */
export default async function getPages(query: PageListQuery): Promise<PageListResponse> {
  const directories = ['blog', 'doc', 'work'];
  if (!directories.includes(query.prefix)) {
    const err = new Error(`Supplied prefix does not exist. Supported prefixes are ${directories}.`);
    throw err;
  }
  
  let pages: PageData[] = [];
  let nextIndex;
  let files = await readdir(path.join(CONTENT_DIRECTORY, query.prefix));
  // First filter to markdown files only
  files = files.filter((value) => value.endsWith('.md'));

  // Then limit files returned
  let start = 0;
  if (query.startIndex) {
    start = query.startIndex;
  }

  // If query has both start index and page size
  // and start index + page size is less than the file length
  if (query.pageSize && start + query.pageSize < files.length) {
    // Set next index value
    nextIndex = start + query.pageSize;
  // If no page size provided
  } else if (start + PAGINATION_LIMIT < files.length) {
    // Set to default
    nextIndex = start + PAGINATION_LIMIT;
  }

  files = files.slice(start, nextIndex);

  // Get page data
  pages = await Promise.all(files.map(async (filename) => await getPage({
    id: filename.substring(0, filename.indexOf('.md')),
    prefix: query.prefix!,
  })));

  return {
    pageData: pages,
    nextIndex: nextIndex || null,
  };
}