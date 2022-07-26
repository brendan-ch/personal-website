import { readdir } from 'fs/promises';
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

  // Get page data
  pages = await Promise.all(files.map(async (filename) => await getPage({
    id: filename.substring(0, filename.indexOf('.md')),
    prefix: query.prefix!,
  })));

  // Apply filter
  query.filter?.forEach((obj) => {
    if (obj.description) {
      pages = pages.filter((page) => page.description?.includes(obj.description?.contains || ''));
    }
    
    if (obj.title) {
      pages = pages.filter((page) => page.title?.includes(obj.title?.contains || ''));
    }

    if (obj.tags) {
      obj.tags.contains?.forEach((tag) => {
        pages = pages.filter((page) => page.tags?.includes(tag));
      });
    }
  });

  // Total count matching filter
  const totalCount = pages.length;

  // Then limit pages returned that match filter
  let start = 0;
  if (query.startIndex) {
    start = query.startIndex;
  }

  // If query has both start index and page size
  // and start index + page size is less than the file length
  if (query.pageSize && start + query.pageSize < files.length) {
    // Set next index value
    nextIndex = start + query.pageSize;
  }

  pages = pages.slice(start, nextIndex);

  return {
    pageData: pages,
    nextIndex: nextIndex || null,
    totalCount,
  };
}