import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { PageData, PageListQuery, SortOrder } from '../types';
import { CONTENT_DIRECTORY } from './Constants';
import getPage from './getPage';


/**
 * Get a list of pages.
 * @param query
 * 
 * @todo implement filters
 */
export default async function getPages(query: PageListQuery) {
  const directories = ['blog', 'doc', 'work'];
  
  let pages: PageData[] = [];
  if (query.prefix) {
    let files = await readdir(path.join(CONTENT_DIRECTORY, query.prefix));
    files = files.filter((value) => value.endsWith('.md'));
    
    // To-do: limit number of pages returned here

    pages = await Promise.all(files.map(async (filename) => await getPage({
      id: filename.substring(0, filename.indexOf('.md')),
      prefix: query.prefix!,
    })));

    // if (query.sort) {
    //   query.sort.forEach((sort) => {
    //     pages.sort((a, b) => {
    //       if (sort.order === SortOrder.ASC) {
    //         // @ts-ignore
    //         return (a[sort.property] as string).localeCompare(b[sort.property] as string);
    //       } else {
    //         // @ts-ignore
    //         return (b[sort.property] as string).localeCompare(a[sort.property] as string);
    //       }
    //     })
    //   });
    // }

  } else {
    // Loop through directories
    await Promise.all(directories.map(async (directory) => {
      let files = await readdir(path.join(CONTENT_DIRECTORY, directory));
      files = files.filter((value) => value.endsWith('.md'));

      const tempPages = await Promise.all(files.map(async (id) => getPage({
        id,
        prefix: directory,
      })));

      tempPages.forEach((page) => {
        pages.push(page);
      });
    }));
  }

  return pages;
}