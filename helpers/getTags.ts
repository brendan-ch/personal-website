import { PageData, TagObject } from '../types';
import { EXCLUDED_TAGS } from './Constants';

/**
 * Given an array of pages, compile all available tags and related tags.
 * 
 * Note that this function doesn't check whether provided page data match the same prefix.
 * @return
 */
export default function getTags(pages: PageData[]): TagObject[] {
  /**
   * Contains tag indices by name.
   */
  const tagIndex: {
    [key: string]: number,
  } = {};
  
  const tagData: TagObject[] = [];

  // Add all tags
  pages.forEach(({ tags }) => {
    if (tags) {
      tags.filter((tag) => !EXCLUDED_TAGS.includes(tag)).forEach((tag) => {
        if (tagIndex[tag] === undefined || tagIndex[tag] === -1) {
          // Doesn't exist yet
          tagIndex[tag] = tagData.length;
          tagData.push({
            name: tag,
            relatedTo: [],
          });
        }
      });
    }
  });

  // Perform linking
  pages.forEach(({ tags }) => {
    if (tags) {
      tags.filter((tag) => !EXCLUDED_TAGS.includes(tag)).forEach((tag) => {
        // Link to other tags
        const others = tags.filter((otherTag) => otherTag !== tag && !EXCLUDED_TAGS.includes(otherTag));
        const otherIndices = others.map((other) => tagIndex[other]);
        otherIndices.forEach((index) => {
          if (!tagData[tagIndex[tag]].relatedTo.includes(index)) {
            tagData[tagIndex[tag]].relatedTo.push(index);
          }
        });
      });
    }
  });

  return tagData;
}