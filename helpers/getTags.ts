import { PageData } from '../types';

/**
 * Given an array of pages, compile all available tag combinations for selection, without duplicates.
 * 
 * Note that this function doesn't check whether provided page data match the same prefix.
 * @return
 */
export default function getTags(pages: PageData[]): string[][] {
  let tagData: string[][] = [];
  pages.forEach((page) => {
    if (page.tags) {
      let filtered = tagData;
      page.tags.forEach((tag) => {
        filtered = filtered.filter((tagCombo) => tagCombo.includes(tag));
      });
      
      if (filtered.length === 0) {
        tagData.push(page.tags);
      }
    }
  });

  return tagData;
}